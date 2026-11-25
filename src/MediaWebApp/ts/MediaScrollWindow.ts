export interface MediaScrollPosition {
    index: number;
    offset: number;
}

interface ScrollBatch {
    element: HTMLDivElement;
    content: HTMLDivElement;
    loaded: boolean;
    height: number;
}

interface ScrollCallbacks {
    create(start: number, end: number, container: HTMLElement): void;
    dispose(start: number, end: number): void;
    pinned(start: number, end: number): boolean;
    artwork(container: HTMLElement): void;
    position(index: number): void;
    error(error: unknown): void;
}

export class MediaScrollWindow {
    private batches: ScrollBatch[] = [];
    private footer = document.createElement("div");
    private button = document.createElement("button");
    private observer: IntersectionObserver | null = null;
    private layoutObserver: ResizeObserver | null = null;
    private lastPosition: (MediaScrollPosition & { scroll: number; height: number }) | null = null;
    private previousScrollRestoration = history.scrollRestoration;
    private timer: number | undefined;
    private disposed = false;
    private updating = false;
    private failed = false;
    private failedBatch: number | undefined;
    private columns = this.ColumnCount();
    private schedule = () => {
        if(!this.disposed && !this.failed && this.timer === undefined)
            this.timer = window.setTimeout(() => {
                this.timer = undefined;
                this.Update();
            }, 100);
    };

    constructor(private host: HTMLElement, public readonly scope: string, public readonly size: number,
        private count: number, index: number, label: string, private callbacks: ScrollCallbacks) {
        host.classList.add("media-scroll-window");
        if("scrollRestoration" in history)
            history.scrollRestoration = "manual";
        this.footer.className = "col-12 media-scroll-footer";
        this.button.className = "media-button media-button-text";
        this.button.type = "button";
        this.button.textContent = label;
        this.button.addEventListener("click", () => {
            this.failed = false;
            this.Run(() => {
                const next = (this.failedBatch ?? this.batches.length) * this.size;
                if(this.ShowIndex(next))
                {
                    const card = this.batches[Math.floor(next / this.size)].content.firstElementChild as HTMLElement | null;
                    if(card)
                    {
                        card.tabIndex = -1;
                        card.focus();
                    }
                }
            });
        });
        this.footer.appendChild(this.button);
        host.appendChild(this.footer);
        window.addEventListener("scroll", this.schedule, false);
        window.addEventListener("resize", this.schedule, false);
        host.addEventListener("load", this.schedule, true);
        $(host).on("slid.bs.carousel.mediaScroll", this.schedule);
        if(typeof IntersectionObserver !== "undefined")
        {
            this.observer = new IntersectionObserver(this.schedule, { rootMargin: "400px" });
            this.observer.observe(this.footer);
        }
        if(typeof ResizeObserver !== "undefined")
            this.layoutObserver = new ResizeObserver(this.schedule);
        document.fonts?.ready.then(this.schedule);
        try {
            this.RevealThrough(Math.floor(index / size));
            this.Render(Math.floor(index / size));
        }
        catch(error) {
            this.Dispose();
            throw error;
        }
        this.schedule();
    }

    public GetPosition(): MediaScrollPosition | null {
        for(const batch of this.batches)
        {
            if(!batch.loaded)
                continue;
            for(const card of Array.from(batch.content.children))
            {
                const rect = card.getBoundingClientRect();
                if(rect.bottom > 80 && rect.top < window.innerHeight)
                    return { index: Number((card as HTMLElement).dataset.mediaIndex), offset: Math.round(rect.top) };
            }
        }
        return null;
    }

    public ShowIndex(index: number, offset: number = 100): boolean {
        if(this.disposed || index < 0 || index >= this.count)
            return false;
        const target = Math.floor(index / this.size);
        this.RevealThrough(target + 1);
        this.Render(target);
        this.Render(target + 1);
        this.Trim(target);
        const card = this.batches[target].content.querySelector<HTMLElement>('[data-media-index="' + index + '"]');
        if(!card)
            throw new Error("Unable to render the requested media.");
        window.scrollBy(0, card.getBoundingClientRect().top - offset);
        this.callbacks.artwork(this.batches[target].content);
        this.callbacks.position(target * this.size);
        this.SavePosition();
        this.schedule();
        return true;
    }

    public Restore(position: MediaScrollPosition): void {
        this.Run(() => this.ShowIndex(position.index, position.offset));
    }

    public Dispose(): void {
        if(this.disposed)
            return;
        this.disposed = true;
        if(this.timer !== undefined)
            window.clearTimeout(this.timer);
        this.observer?.disconnect();
        this.layoutObserver?.disconnect();
        window.removeEventListener("scroll", this.schedule, false);
        window.removeEventListener("resize", this.schedule, false);
        this.host.removeEventListener("load", this.schedule, true);
        $(this.host).off(".mediaScroll");
        this.host.classList.remove("media-scroll-window");
        if(this.previousScrollRestoration !== undefined)
            history.scrollRestoration = this.previousScrollRestoration;
        this.batches.forEach((batch, index) => {
            if(batch.loaded)
                this.callbacks.dispose(index * this.size, Math.min((index + 1) * this.size, this.count));
        });
    }

    private Run(action: () => void): void {
        try { action(); }
        catch(error) {
            this.failed = true;
            this.observer?.disconnect();
            this.footer.hidden = false;
            this.callbacks.error(error);
        }
    }

    private RevealThrough(target: number): void {
        const last = Math.min(target, Math.ceil(this.count / this.size) - 1);
        while(this.batches.length <= last)
        {
            const element = document.createElement("div");
            element.className = "col-12 media-scroll-batch";
            const content = document.createElement("div");
            content.className = "row";
            element.appendChild(content);
            const remaining = Math.min(this.size, this.count - this.batches.length * this.size);
            const height = Math.ceil(remaining / this.columns) * 440;
            element.style.height = height + "px";
            this.host.insertBefore(element, this.footer);
            this.batches.push({ element, content, loaded: false, height });
            this.observer?.observe(element);
        }
        this.footer.hidden = this.batches.length * this.size >= this.count;
    }

    private Render(index: number): void {
        const batch = this.batches[index];
        if(!batch || batch.loaded)
            return;
        const start = index * this.size;
        const end = Math.min(start + this.size, this.count);
        try {
            this.callbacks.create(start, end, batch.content);
        }
        catch(error) {
            this.failedBatch = index;
            this.callbacks.dispose(start, end);
            batch.content.innerHTML = "";
            throw error;
        }
        batch.loaded = true;
        if(this.failedBatch === index)
            this.failedBatch = undefined;
        batch.element.style.height = "";
        batch.height = batch.element.getBoundingClientRect().height;
        this.layoutObserver?.observe(batch.content);
    }

    private Trim(center: number): void {
        this.batches.forEach((batch, index) => {
            if(!batch.loaded || Math.abs(index - center) <= 1 ||
                this.callbacks.pinned(index * this.size, Math.min((index + 1) * this.size, this.count)))
                return;
            batch.height = batch.element.getBoundingClientRect().height;
            this.layoutObserver?.unobserve(batch.content);
            this.callbacks.dispose(index * this.size, Math.min((index + 1) * this.size, this.count));
            batch.content.innerHTML = "";
            batch.loaded = false;
            batch.element.style.height = batch.height + "px";
        });
    }

    private Update(): void {
        if(this.disposed || this.updating || this.failed)
            return;
        if(!this.host.isConnected)
        {
            this.Dispose();
            return;
        }
        if(document.body.classList.contains("media-fullscreen-open"))
            return;
        this.updating = true;
        this.Run(() => {
            let anchor = this.GetPosition();
            if(this.lastPosition)
            {
                const offset = this.lastPosition.offset - (window.scrollY - this.lastPosition.scroll);
                if(offset < window.innerHeight && offset + this.lastPosition.height > 80 &&
                    this.batches[Math.floor(this.lastPosition.index / this.size)]?.loaded)
                    anchor = { index: this.lastPosition.index, offset };
            }
            const columns = this.ColumnCount();
            if(columns !== this.columns)
            {
                this.batches.forEach((batch, index) => {
                    if(!batch.loaded)
                    {
                        const count = Math.min(this.size, this.count - index * this.size);
                        batch.height *= Math.ceil(count / columns) / Math.ceil(count / this.columns);
                        batch.element.style.height = batch.height + "px";
                    }
                });
                this.columns = columns;
                if(anchor)
                    this.ShowIndex(anchor.index, anchor.offset);
            }
            let center = this.batches.findIndex(batch => {
                const rect = batch.element.getBoundingClientRect();
                return rect.bottom > 80 && rect.top < window.innerHeight;
            });
            const footer = this.footer.getBoundingClientRect();
            if(!this.footer.hidden && document.activeElement !== this.button &&
                footer.top < window.innerHeight + 400 && footer.bottom > 0)
            {
                const next = this.batches.length;
                this.RevealThrough(next);
                this.Render(next);
                if(center < 0)
                    center = next;
                this.schedule();
            }
            if(center >= 0)
            {
                this.Render(center);
                if(center > 0)
                    this.Render(center - 1);
                if(center + 1 < this.batches.length)
                    this.Render(center + 1);
                this.Trim(center);
                this.callbacks.position(center * this.size);
            }
            this.batches.filter(batch => batch.loaded).forEach(batch => this.callbacks.artwork(batch.content));
            // Rehydrating an earlier batch can change its estimated height.
            if(anchor)
            {
                const card = this.batches[Math.floor(anchor.index / this.size)]?.content
                    .querySelector<HTMLElement>('[data-media-index="' + anchor.index + '"]');
                if(card)
                    window.scrollBy(0, card.getBoundingClientRect().top - anchor.offset);
            }
            this.SavePosition();
        });
        this.updating = false;
    }

    private SavePosition(): void {
        const position = this.GetPosition();
        if(!position)
            return;
        const card = this.batches[Math.floor(position.index / this.size)].content
            .querySelector<HTMLElement>('[data-media-index="' + position.index + '"]');
        if(card)
            this.lastPosition = { ...position, scroll: window.scrollY, height: card.getBoundingClientRect().height };
        const parameters = new URLSearchParams(window.location.search);
        parameters.set("ScrollPath", this.scope);
        parameters.set("ScrollIndex", String(position.index));
        parameters.set("ScrollOffset", String(position.offset));
        const url = window.location.pathname + "?" + parameters.toString();
        if(url !== window.location.pathname + window.location.search)
            history.replaceState(history.state, "", url);
    }

    private ColumnCount(): number {
        return window.innerWidth >= 992 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 576 ? 2 : 1;
    }
}
