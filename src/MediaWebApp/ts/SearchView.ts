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
interface SearchMatcher {
    test(value: string): boolean;
}
interface SearchWordRange {
    start: number;
    end: number;
}

export class SearchView extends MediaView {
    private static readonly mediaTypes = [
        { type: "All", label: "All", icon: "fa-photo-film" },
        { type: "Music", label: "Music", icon: "fa-music" },
        { type: "Radio", label: "Radio", icon: "fa-radio" },
        { type: "Video", label: "Video", icon: "fa-file-video" },
        { type: "Photo", label: "Pictures", icon: "fa-images" },
        { type: "TV", label: "Television", icon: "fa-tv" }
    ];
    private mediaType = "All";
    private results: SearchResult[] = [];
    private resultPage = 0;
    private searchRequestId = 0;
    private static popupOwner: SearchView | null = null;
    private static wordRanges: SearchWordRange[] | null = null;

    private static MediaTypeContent(option: { label: string; icon: string }): string {
        return "<i class=\"fa-solid " + option.icon + " fa-fw\" aria-hidden=\"true\"></i> " +
            GetCurrentString(option.label);
    }

    private SetMediaType(type: string): boolean {
        const selected = SearchView.mediaTypes.find(option => option.type === type);
        if(!selected)
        {
            console.error("Invalid search media type.", type);
            this.GetMediaManager()?.ShowAlertPopupError(GetCurrentString("Unable to search."));
            return false;
        }
        this.mediaType = selected.type;
        const caption = document.getElementById("searchmediatypename");
        if(caption)
            caption.innerHTML = SearchView.MediaTypeContent(selected);
        document.getElementById("searchmediatypes")?.querySelectorAll<HTMLButtonElement>(".dropdown-item").forEach(button =>
            button.setAttribute("aria-checked", String(button.dataset.mediaType === type)));
        return true;
    }

    private async CreateMatcher(query: string, caseSensitive: boolean, wholeWord: boolean): Promise<SearchMatcher> {
        let unicode = "";
        try
        {
            new RegExp("", "u");
            unicode = "u";
        }
        catch(error)
        {
            if(!(error instanceof SyntaxError))
                throw error;
        }
        const literal = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = new RegExp(literal, "g" + unicode + (caseSensitive ? "" : "i"));
        let ranges: SearchWordRange[] = [];
        if(wholeWord)
        {
            if(!SearchView.wordRanges)
            {
                const source = await GetFileAsync("data/search-word-ranges.json");
                if(!source)
                    throw new Error("Unable to load search word boundaries.");
                const parsed: unknown = JSON.parse(source);
                if(!Array.isArray(parsed) || parsed.length === 0)
                    throw new Error("Invalid search word boundaries.");
                let previousEnd = -1;
                SearchView.wordRanges = parsed.map(range => {
                    if(typeof range !== "object" || range === null ||
                        !("start" in range) || !("end" in range) ||
                        typeof range.start !== "number" || typeof range.end !== "number" ||
                        !Number.isInteger(range.start) || !Number.isInteger(range.end) ||
                        range.start <= previousEnd || range.end < range.start || range.end > 0x10ffff)
                        throw new Error("Invalid search word boundaries.");
                    previousEnd = range.end;
                    return { start: range.start, end: range.end };
                });
            }
            ranges = SearchView.wordRanges;
        }
        const isWordCharacter = (point: number | undefined): boolean => {
            if(point === undefined)
                return false;
            let low = 0;
            let high = ranges.length - 1;
            while(low <= high)
            {
                const middle = Math.floor((low + high) / 2);
                const range = ranges[middle];
                if(point < range.start)
                    high = middle - 1;
                else if(point > range.end)
                    low = middle + 1;
                else
                    return true;
            }
            return false;
        };
        return {
            test(value: string): boolean {
                pattern.lastIndex = 0;
                let match: RegExpExecArray | null;
                while((match = pattern.exec(value)) !== null)
                {
                    if(!wholeWord)
                        return true;
                    let previous = match.index - 1;
                    const code = value.charCodeAt(previous);
                    if(previous > 0 && code >= 0xdc00 && code <= 0xdfff)
                        previous--;
                    if(!isWordCharacter(previous >= 0 ? value.codePointAt(previous) : undefined) &&
                        !isWordCharacter(value.codePointAt(match.index + match[0].length)))
                        return true;
                }
                return false;
            }
        };
    }

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
        document.getElementById("searchresultprevious")?.addEventListener("click", () => this.RenderResults(this.resultPage - 1));
        document.getElementById("searchresultnext")?.addEventListener("click", () => this.RenderResults(this.resultPage + 1));
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
        document.getElementById("searchmediatypes")?.querySelectorAll<HTMLButtonElement>(".dropdown-item").forEach(option =>
            option.addEventListener("click", () => {
                if(this.SetMediaType(option.dataset.mediaType ?? ""))
                {
                    document.getElementById("searchmediatype")?.focus();
                    void search();
                }
            }));
        const parameters = new URLSearchParams(window.location.search);
        if(parameters.get("path") === "/Search" && input && caseSensitive && wholeWord)
        {
            const fields = Array.from(parameters.entries());
            fields.splice(fields.findIndex(([key]) => key === "path"), 1);
            input.value = fields[0]?.[1] === "" ? fields.shift()?.[0] ?? "" : "";
            const options = new URLSearchParams(fields);
            caseSensitive.checked = options.has("CaseSensitive");
            wholeWord.checked = options.has("WholeWord");
            if(!this.SetMediaType(options.get("MediaType") ?? "All"))
                return false;
            if(input.value || this.mediaType !== "All")
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
            "<div class=\"row mt-2 mb-2\"><label class=\"col-sm-3\" id=\"searchmediatypelabel\" for=\"searchmediatype\"><strong>" + GetCurrentString("Media type:") + "</strong></label>" +
            "<div class=\"col-sm-6\"><div class=\"dropdown\"><button type=\"button\" id=\"searchmediatype\" class=\"form-control dropdown-toggle text-left\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-labelledby=\"searchmediatypelabel searchmediatypename\">" +
            "<span id=\"searchmediatypename\">" + SearchView.MediaTypeContent(SearchView.mediaTypes[0]) + "</span></button>" +
            "<div id=\"searchmediatypes\" class=\"dropdown-menu w-100\" role=\"menu\" aria-labelledby=\"searchmediatypelabel\">" +
            SearchView.mediaTypes.map(option => "<button type=\"button\" class=\"dropdown-item\" role=\"menuitemradio\" aria-checked=\"" +
                (option.type === "All") + "\" data-media-type=\"" + option.type + "\">" + SearchView.MediaTypeContent(option) + "</button>").join("") +
            "</div></div></div></div>" +
            "<div class=\"row\"><div class=\"col-sm-9 offset-sm-3\"><div class=\"form-check form-check-inline\"><input type=\"checkbox\" class=\"form-check-input\" id=\"searchcasesensitive\"><label class=\"form-check-label\" for=\"searchcasesensitive\">" + GetCurrentString("Case sensitive") + "</label></div>" +
            "<div class=\"form-check form-check-inline\"><input type=\"checkbox\" class=\"form-check-input\" id=\"searchwholeword\"><label class=\"form-check-label\" for=\"searchwholeword\">" + GetCurrentString("Whole word") + "</label></div></div></div>" +
            "<div class=\"row\"><div class=\"col-sm-12\"><p id=\"searchstatus\"></p><div class=\"table-responsive\"><table id=\"searchresultstable\" class=\"table table-striped media-resizable-table\"><thead><tr><th>" +
            GetCurrentString("Name") + "<span class=\"media-column-resizer\"></span></th><th>" + GetCurrentString("Open") + "<span class=\"media-column-resizer\"></span></th><th>" + GetCurrentString("Type") + "<span class=\"media-column-resizer\"></span></th><th>" + GetCurrentString("Match") + "<span class=\"media-column-resizer\"></span></th></tr></thead>" +
            "<tbody id=\"searchresults\"></tbody></table></div>" +
            "<div id=\"searchresultpages\" hidden><button type=\"button\" id=\"searchresultprevious\" class=\"media-button\" aria-label=\"" +
            GetCurrentString("Previous results") + "\"><i class=\"fa-solid fa-backward-step\" aria-hidden=\"true\"></i></button> " +
            "<span id=\"searchresultpage\" aria-live=\"polite\"></span> " +
            "<button type=\"button\" id=\"searchresultnext\" class=\"media-button\" aria-label=\"" +
            GetCurrentString("Next results") + "\"><i class=\"fa-solid fa-forward-step\" aria-hidden=\"true\"></i></button></div></div></div></div>";
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
        const manager = this.GetMediaManager();
        const query = input.value.trim();
        const caseSensitive = (document.getElementById("searchcasesensitive") as HTMLInputElement | null)?.checked ?? false;
        const wholeWord = (document.getElementById("searchwholeword") as HTMLInputElement | null)?.checked ?? false;
        const mediaType = this.mediaType;
        const url = window.location.pathname + "?path=/Search" + (query
            ? "&" + encodeURIComponent(query) + (caseSensitive ? "&CaseSensitive" : "") + (wholeWord ? "&WholeWord" : "")
            : "") + (mediaType === "All" ? "" : "&MediaType=" + encodeURIComponent(mediaType));
        history.replaceState("/Search", "", url);
        const pages = document.getElementById("searchresultpages");
        if(pages)
            pages.hidden = true;
        if(query.length === 0)
        {
            if(SearchView.popupOwner === this)
            {
                manager?.HideModalPopup();
                SearchView.popupOwner = null;
            }
            status.textContent = GetCurrentString("Enter a search string.");
            tbody.innerHTML = "";
            return;
        }

        const message = GetCurrentString("Search for ") + query;
        let progressMessage = message;
        SearchView.popupOwner = this;
        try
        {
            manager?.ShowModalPopup(this.EscapeHtml(message));
            const matcher = await this.CreateMatcher(query, caseSensitive, wholeWord);
            const isActive = () => requestId === this.searchRequestId && input.isConnected;
            if(!isActive())
                return;
            status.textContent = GetCurrentString("Searching...");
            tbody.innerHTML = "";

            const legacy = document.documentElement.classList.contains("media-legacy");
            const sources = [
                { type: "Music", file: legacy ? "data/music/0.json" : "data/musicsdata.json" },
                { type: "Radio", file: "data/radiosdata.json" },
                { type: "TV", file: "data/tvsdata.json" },
                { type: "Video", file: "data/videosdata.json" },
                { type: "Photo", file: "data/photosdata.json" }
            ].filter(source => mediaType === "All" || source.type === mediaType);

            this.results = [];
            const failures: string[] = [];
            const searchSource = async (source: { type: string; file: string }) => {
                if(!isActive())
                    return;
                try
                {
                    if(legacy && source.type === "Music")
                    {
                        await this.FindLegacyMusic(matcher, isActive, (completed, total) => {
                            progressMessage = message + " (" + completed + "/" + total + ")";
                            status.textContent = GetCurrentString("Searching...") + " (" + completed + "/" + total + ")";
                            if(SearchView.popupOwner === this)
                            {
                                const popup = document.getElementById("modalpopupmessage");
                                if(popup)
                                    popup.textContent = progressMessage;
                            }
                        });
                        return;
                    }
                    const json = await GetFileAsync(source.file, 30000);
                    if(!json)
                        throw new Error("Unable to load " + source.file);
                    const root = MediaObject.Deserialize(json);
                    if(!root)
                        throw new Error("Invalid catalog " + source.file);
                    if(!isActive())
                        return;
                    await this.FindAssets(root, source.type, source.file, matcher, isActive);
                }
                catch(error)
                {
                    console.error("Unable to search " + source.file, error);
                    failures.push(source.file);
                }
            };
            if(legacy)
            {
                for(const source of sources)
                    await searchSource(source);
            }
            else
                await Promise.all(sources.map(searchSource));

            if(!isActive())
                return;
            if(failures.length)
                throw new Error("Unable to search catalogs: " + failures.join(", "));
            if(this.results.length === 0)
                status.textContent = GetCurrentString("No assets found.");
            else
            {
                status.textContent = this.results.length + " " + GetCurrentString("asset(s) found.");
                this.RenderResults();
            }
        }
        catch(error)
        {
            console.error("Unable to search.", error);
            if(requestId === this.searchRequestId && input.isConnected)
            {
                status.textContent = GetCurrentString("Unable to search.");
                manager?.ShowAlertPopupError(GetCurrentString("Unable to search."));
            }
        }
        finally
        {
            if(requestId === this.searchRequestId && SearchView.popupOwner === this)
            {
                if(document.getElementById("modalpopupmessage")?.textContent === progressMessage)
                    manager?.HideModalPopup();
                SearchView.popupOwner = null;
            }
        }
    }

    private RenderResults(page: number = 0): void {
        const tbody = document.getElementById("searchresults");
        if(!tbody)
            return;
        const size = document.documentElement.classList.contains("media-legacy") ? 100 : Math.max(1, this.results.length);
        this.resultPage = Math.max(0, Math.min(page, Math.ceil(this.results.length / size) - 1));
        const start = this.resultPage * size;
        const end = Math.min(start + size, this.results.length);
        tbody.innerHTML = this.results.slice(start, end).map((result, index) =>
            "<tr><td>" + this.EscapeHtml(result.name) + "</td>" +
            "<td><button type=\"button\" class=\"media-button media-button-text search-result-open\" data-result-index=\"" + (start + index) + "\">" +
            GetCurrentString("Open") + "</button></td>" +
            "<td>" + this.EscapeHtml(result.type) + "</td>" +
            "<td>" + this.EscapeHtml(result.match) + "</td></tr>").join("");
        tbody.querySelectorAll<HTMLButtonElement>(".search-result-open").forEach(button =>
            button.addEventListener("click", () => {
                const index = parseInt(button.dataset.resultIndex ?? "-1");
                if(index >= 0)
                    void this.OpenResult(this.results[index]);
            }));
        const pages = document.getElementById("searchresultpages");
        const label = document.getElementById("searchresultpage");
        const previous = document.getElementById("searchresultprevious") as HTMLButtonElement | null;
        const next = document.getElementById("searchresultnext") as HTMLButtonElement | null;
        if(pages && label && previous && next)
        {
            pages.hidden = this.results.length <= size;
            label.textContent = (start + 1) + "-" + end + " / " + this.results.length;
            previous.disabled = start === 0;
            next.disabled = end === this.results.length;
        }
        this.RegisterColumnResize();
    }

    private async FindLegacyMusic(matcher: SearchMatcher, isActive: () => boolean,
        progress: (completed: number, total: number) => void): Promise<void> {
        const source = await GetFileAsync("data/music-search/index.json", 30000);
        if(!isActive())
            return;
        if(!source)
            throw new Error("Unable to load the music search index.");
        const manifest = JSON.parse(source);
        if(!manifest || manifest.version !== 1 || !Array.isArray(manifest.files) ||
            !manifest.files.every((file: unknown, index: number) => file === "data/music-search/" + index + ".json"))
            throw new Error("Invalid music search index.");
        progress(0, manifest.files.length);
        for(let index = 0; index < manifest.files.length; index++)
        {
            if(!isActive())
                return;
            const json = await GetFileAsync(manifest.files[index], 30000);
            if(!isActive())
                return;
            if(!json)
                throw new Error("Unable to load a music search chunk.");
            const data = JSON.parse(json);
            if(!data || !Array.isArray(data._mediaChildList) ||
                !data._mediaChildList.every((entry: Record<string, unknown> | null) => entry &&
                    ["_title", "_description", "_path", "_mainContentUrl", "_mainContentImageUrl"]
                        .every(field => typeof entry[field] === "string") &&
                    Array.isArray(entry._mediaChildList) && entry._mediaChildList.length === 0))
                throw new Error("Invalid music search chunk.");
            const root = MediaObject.Deserialize(json);
            await this.FindAssets(root, "Music", "data/music/0.json", matcher, isActive);
            if(!isActive())
                return;
            progress(index + 1, manifest.files.length);
        }
    }

    private async FindAssets(node: IMediaObject, type: string, file: string, matcher: SearchMatcher,
        isActive: () => boolean, budget = { count: 0 }): Promise<void> {
        if(!isActive())
            return;
        if(++budget.count % 100 === 0)
            await new Promise<void>(resolve => setTimeout(resolve, 0));
        if(!isActive())
            return;
        const lazyNode = node instanceof MediaObject && node.HasUnloadedCatalogChildren() ? node : null;
        try
        {
            if(lazyNode)
                await lazyNode.LoadCatalogChildren();
            if(!isActive())
                return;
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
                    await this.FindAssets(child, type, file, matcher, isActive, budget);
            }
        }
        finally
        {
            // Search results retain paths, not hydrated catalog branches.
            lazyNode?.SetChildren([]);
        }
    }

    private async OpenResult(result: SearchResult): Promise<void> {
        try
        {
            const json = await GetFileAsync(result.file, 30000);
            if(!json)
                throw new Error("Unable to load the search result catalog.");
            const root = MediaObject.Deserialize(json);
            if(!root)
                throw new Error("Invalid search result catalog.");
            const target = await this.FindByPath(root, result.path);
            if(!target)
                throw new Error("The search result is no longer present in its catalog.");

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
            this.GetMediaManager()?.ShowAlertPopupError(GetCurrentString("Unable to open search result."));
        }
    }

    private async FindByPath(node: IMediaObject, path: string): Promise<IMediaObject | null> {
        if(node.GetPath() === path)
            return node;
        if(node instanceof MediaObject && node.HasUnloadedCatalogChildren())
        {
            if(!path.startsWith(node.GetPath() + "/"))
                return null;
            await node.LoadCatalogChildren();
        }
        for(let index = 0; index < node.GetChildrenLength(); index++)
        {
            const child = node.GetChildWithIndex(index);
            if(child)
            {
                const found = await this.FindByPath(child, path);
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
