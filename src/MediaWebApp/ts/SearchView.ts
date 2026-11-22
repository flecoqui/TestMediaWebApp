import { IMediaObject } from "./IMediaObject";
import { MediaView } from "./MediaView";
import { MediaObject } from "./MediaObject";
import { GetCurrentString, GetFileAsync, isNullOrUndefinedOrEmpty } from "./Common";

interface SearchResult {
    name: string;
    type: string;
    match: string;
    path: string;
    file: string;
}

export class SearchView extends MediaView {
    private results: SearchResult[] = [];
    private searchRequestId = 0;

    public CreateChildView(current: IMediaObject): boolean {
        return this.InternalCreateChildView(current);
    }

    public RegisterViewEvents(current: IMediaObject): boolean {
        const input = document.getElementById("searchasset") as HTMLInputElement | null;
        const button = document.getElementById("searchassetbutton");
        const caseSensitive = document.getElementById("searchcasesensitive") as HTMLInputElement | null;
        const wholeWord = document.getElementById("searchwholeword") as HTMLInputElement | null;
        const search = () => this.PerformSearch();
        button?.addEventListener("click", search);
        input?.addEventListener("keydown", event => {
            if(event.key === "Enter")
                search();
        });
        const updateOptions = () => {
            if(input?.value.trim())
                void search();
        };
        caseSensitive?.addEventListener("change", updateOptions);
        wholeWord?.addEventListener("change", updateOptions);
        const parameters = new URLSearchParams(window.location.search);
        if(parameters.get("path") === "/Search" && input && caseSensitive && wholeWord)
        {
            const fields = Array.from(parameters.keys());
            fields.splice(fields.indexOf("path"), 1);
            input.value = fields.shift() ?? "";
            caseSensitive.checked = fields.includes("CaseSensitive");
            wholeWord.checked = fields.includes("WholeWord");
            if(input.value)
                queueMicrotask(() => {
                    if(input.isConnected)
                        void search();
                });
        }
        this.RegisterColumnResize();
        return true;
    }

    public InitializeViewControls(current: IMediaObject): boolean {
        return true;
    }

    public MakeViewControlVisible(current: IMediaObject): boolean {
        return true;
    }

    public CreateView(current: IMediaObject): string {
        return "<div id=\"search\" class=\"container\"><h3>" + GetCurrentString("Search") + "</h3>" +
            "<div class=\"row\"><label class=\"col-sm-3\" for=\"searchasset\"><strong>" + GetCurrentString("Search assets:") + "</strong></label>" +
            "<div class=\"col-sm-6\"><input type=\"search\" class=\"form-control\" id=\"searchasset\" placeholder=\"" + GetCurrentString("Asset name or metadata") + "\"></div>" +
            "<div class=\"col-sm-3\"><button type=\"button\" id=\"searchassetbutton\" class=\"media-button media-button-text\">" + GetCurrentString("Search") + "</button></div></div>" +
            "<div class=\"row\"><div class=\"col-sm-9 offset-sm-3\"><div class=\"form-check form-check-inline\"><input type=\"checkbox\" class=\"form-check-input\" id=\"searchcasesensitive\"><label class=\"form-check-label\" for=\"searchcasesensitive\">" + GetCurrentString("Case sensitive") + "</label></div>" +
            "<div class=\"form-check form-check-inline\"><input type=\"checkbox\" class=\"form-check-input\" id=\"searchwholeword\"><label class=\"form-check-label\" for=\"searchwholeword\">" + GetCurrentString("Whole word") + "</label></div></div></div>" +
            "<div class=\"row\"><div class=\"col-sm-12\"><p id=\"searchstatus\"></p><div class=\"table-responsive\"><table id=\"searchresultstable\" class=\"table table-striped media-resizable-table\"><thead><tr><th>" +
            GetCurrentString("Name") + "<span class=\"media-column-resizer\"></span></th><th>" + GetCurrentString("Open") + "<span class=\"media-column-resizer\"></span></th><th>" + GetCurrentString("Type") + "<span class=\"media-column-resizer\"></span></th><th>" + GetCurrentString("Match") + "<span class=\"media-column-resizer\"></span></th></tr></thead>" +
            "<tbody id=\"searchresults\"></tbody></table></div></div></div></div>";
    }

    public CreatePreview(): string {
        return "<div><label>Search Preview</label></div>";
    }

    private async PerformSearch(): Promise<void> {
        const input = document.getElementById("searchasset") as HTMLInputElement | null;
        const status = document.getElementById("searchstatus");
        const tbody = document.getElementById("searchresults");
        if(!input || !status || !tbody)
            return;

        const requestId = ++this.searchRequestId;
        const query = input.value.trim();
        const caseSensitive = (document.getElementById("searchcasesensitive") as HTMLInputElement | null)?.checked ?? false;
        const wholeWord = (document.getElementById("searchwholeword") as HTMLInputElement | null)?.checked ?? false;
        const url = window.location.pathname + "?path=/Search" + (query
            ? "&" + encodeURIComponent(query) + (caseSensitive ? "&CaseSensitive" : "") + (wholeWord ? "&WholeWord" : "")
            : "");
        history.replaceState("/Search", "", url);
        if(query.length === 0)
        {
            status.textContent = GetCurrentString("Enter a search string.");
            tbody.innerHTML = "";
            return;
        }

        const literal = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const matcher = new RegExp(wholeWord ? "(?<![\\p{L}\\p{N}_])" + literal + "(?![\\p{L}\\p{N}_])" : literal,
            caseSensitive ? "u" : "iu");
        status.textContent = GetCurrentString("Searching...");
        tbody.innerHTML = "";

        const sources = [
            { type: "Music", file: "data/musicobject.json" },
            { type: "Radio", file: "data/radioobject.json" },
            { type: "TV", file: "data/tvobject.json" },
            { type: "Video", file: "data/videoobject.json" },
            { type: "Photo", file: "data/photoobject.json" }
        ];

        this.results = [];
        await Promise.all(sources.map(async source => {
            try
            {
                const json = await GetFileAsync(source.file);
                if(!json)
                    return;
                const root = MediaObject.Deserialize(json);
                if(!root)
                    return;
                if(requestId !== this.searchRequestId || !input.isConnected)
                    return;
                this.FindAssets(root, source.type, source.file, matcher);
            }
            catch(error)
            {
                console.error("Unable to search " + source.file, error);
            }
        }));

        if(requestId !== this.searchRequestId || !input.isConnected)
            return;
        if(this.results.length === 0)
            status.textContent = GetCurrentString("No assets found.");
        else
        {
            status.textContent = this.results.length + " " + GetCurrentString("asset(s) found.");
            tbody.innerHTML = this.results.map((result, index) =>
                "<tr><td>" + this.EscapeHtml(result.name) + "</td>" +
                "<td><button type=\"button\" class=\"media-button media-button-text search-result-open\" data-result-index=\"" + index + "\">" +
                GetCurrentString("Open") + "</button></td>" +
                "<td>" + this.EscapeHtml(result.type) + "</td>" +
                "<td>" + this.EscapeHtml(result.match) + "</td></tr>").join("");
            tbody.querySelectorAll<HTMLButtonElement>(".search-result-open").forEach(button =>
                button.addEventListener("click", () => {
                    const index = parseInt(button.dataset.resultIndex ?? "-1");
                    if(index >= 0)
                        void this.OpenResult(this.results[index]);
                }));
            this.RegisterColumnResize();
        }
    }

    private FindAssets(node: IMediaObject, type: string, file: string, matcher: RegExp): void {
        const contentUrl = node.GetContentUrl();
        const imageUrl = node.GetImageUrl();
        const searchable = [
            { label: "Name", value: node.GetName() },
            { label: "Description", value: node.GetDescription() },
            { label: "Title", value: node.GetTitle() },
            { label: "Artist", value: node.GetArtist() },
            { label: "Album", value: node.GetAlbum() },
            { label: "Track", value: node.GetTrack() },
            { label: "Folder", value: node.GetFolder() },
            { label: "Path", value: node.GetPath() },
            { label: "Content URL", value: contentUrl },
            { label: "Image URL", value: imageUrl }
        ];
        const matches = searchable.filter(attribute =>
            !isNullOrUndefinedOrEmpty(attribute.value) &&
            matcher.test(attribute.value));

        if((!isNullOrUndefinedOrEmpty(contentUrl) || (!isNullOrUndefinedOrEmpty(imageUrl) && type === "Photo")) &&
            matches.length > 0)
        {
            const fields = type === "Music"
                ? ["Artist", "Album", "Title", "Path", "Content URL"]
                : ["Title", "Path", "Content URL"];
            const details = type === "Radio" ? matches : fields.map(label => ({
                label,
                value: searchable.find(attribute => attribute.label === label)?.value ?? ""
            }));
            const matchText = details.map(attribute =>
                GetCurrentString(attribute.label) + ": " + attribute.value).join("; ");
            this.results.push({
                name: node.GetName() || node.GetTitle() || node.GetPath(),
                type,
                match: matchText,
                path: node.GetPath(),
                file
            });
        }

        for(let index = 0; index < node.GetChildrenLength(); index++)
        {
            const child = node.GetChildWithIndex(index);
            if(child)
                this.FindAssets(child, type, file, matcher);
        }
    }

    private async OpenResult(result: SearchResult): Promise<void> {
        try
        {
            const json = await GetFileAsync(result.file);
            if(!json)
                return;
            const root = MediaObject.Deserialize(json);
            if(!root)
                return;
            const target = this.FindByPath(root, result.path);
            if(!target)
                return;

            this.GetMediaManager()?.SetRoot(root);
            this.GetMediaManager()?.SetCurrentMediaObject(target);
            this.GetMediaManager()?.RenderMediaView(true);

            const menuIds: Record<string, string> = {
                Music: "musicTitle",
                Radio: "radioTitle",
                TV: "tvTitle",
                Video: "videoTitle",
                Photo: "photoTitle"
            };
            window.UpdateMenuBar(menuIds[result.type]);
        }
        catch(error)
        {
            console.error("Unable to open search result.", error);
        }
    }

    private FindByPath(node: IMediaObject, path: string): IMediaObject | null {
        if(node.GetPath() === path)
            return node;
        for(let index = 0; index < node.GetChildrenLength(); index++)
        {
            const child = node.GetChildWithIndex(index);
            if(child)
            {
                const found = this.FindByPath(child, path);
                if(found)
                    return found;
            }
        }
        return null;
    }

    private RegisterColumnResize(): void
    {
        const table = document.getElementById("searchresultstable") as HTMLTableElement | null;
        if(!table)
            return;

        const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>("thead th"));
        headers.forEach((header, columnIndex) => {
            const resizer = header.querySelector<HTMLElement>(".media-column-resizer");
            if(!resizer || resizer.dataset.resizeRegistered === "true")
                return;
            resizer.dataset.resizeRegistered = "true";

            const savedWidth = this.GetSavedColumnWidth(columnIndex);
            if(savedWidth)
                header.style.width = savedWidth + "px";

            resizer.addEventListener("pointerdown", event => {
                event.preventDefault();
                const startX = event.clientX;
                const startWidth = header.getBoundingClientRect().width;
                resizer.setPointerCapture(event.pointerId);
                document.body.classList.add("media-resizing-columns");

                const move = (moveEvent: PointerEvent) => {
                    const width = Math.max(70, startWidth + moveEvent.clientX - startX);
                    header.style.width = width + "px";
                };
                const end = () => {
                    resizer.removeEventListener("pointermove", move);
                    resizer.removeEventListener("pointerup", end);
                    resizer.removeEventListener("pointercancel", end);
                    document.body.classList.remove("media-resizing-columns");
                    const width = Math.round(header.getBoundingClientRect().width);
                    this.SaveColumnWidth(columnIndex, width);
                };
                resizer.addEventListener("pointermove", move);
                resizer.addEventListener("pointerup", end);
                resizer.addEventListener("pointercancel", end);
            });
        });
    }

    private GetSavedColumnWidth(columnIndex: number): number | null
    {
        if(typeof(Storage) === "undefined")
            return null;
        const value = localStorage.getItem("mediawebapp-search-column-" + columnIndex);
        if(!value)
            return null;
        const width = parseInt(value);
        return Number.isFinite(width) && width >= 70 ? width : null;
    }

    private SaveColumnWidth(columnIndex: number, width: number): void
    {
        if(typeof(Storage) !== "undefined")
            localStorage.setItem("mediawebapp-search-column-" + columnIndex, width.toString());
    }

    private EscapeHtml(value: string): string {
        return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
}
