class MediaObject {
    constructor(name, description, contentUrl, imageUrl, previewContentUrl, previewImageUrl) {
        this._type = this.getType();
        this._title = name;
        this._mediaChildList = new List();
        this._path = "/" + this._title;
        this._description = description;
        this._mainContentUrl = contentUrl;
        this._mainContentImageUrl = imageUrl;
        this._previewContentUrl = previewContentUrl;
        this._previewContentImageUrl = previewImageUrl;
    }
    static GetParentButtonId() {
        return MediaObject._parentButtonId;
    }
    static GetChildButtonId() {
        return MediaObject._childButtonId;
    }
    static GetPreviousButtonId() {
        return MediaObject._previousButtonId;
    }
    static GetNextButtonId() {
        return MediaObject._nextButtonId;
    }
    SetRoot() {
        MediaObject._stack = new List();
        return MediaObject._root = this;
    }
    GetRoot() {
        return MediaObject._root;
    }
    static SetId(id) {
        return MediaObject._id = id;
    }
    GetCurrentMediaObject() {
        return MediaObject._current;
    }
    SetCurrentMediaObject() {
        MediaObject._current = this;
    }
    getType() {
        let comp = this.constructor;
        return comp.name;
    }
    GetType() {
        return this._type;
    }
    GetName() {
        return this._title;
    }
    GetDescription() {
        return this._description;
    }
    GetContentUrl() {
        return this._mainContentUrl;
    }
    GetImageUrl() {
        return this._mainContentImageUrl;
    }
    GetPreviewContentUrl() {
        return this._previewContentUrl;
    }
    GetPreviewImageUrl() {
        return this._previewContentImageUrl;
    }
    GetId() {
        return MediaObject._id;
    }
    SetId(id) {
        MediaObject._id = id;
    }
    GetIndex() {
        return this._index;
    }
    SetIndex(index) {
        this._index = index;
    }
    GetSubfolderPath(title) {
        return title.replace("/", "_");
    }
    SetAbsolutePath(parentPath) {
        this._path = parentPath + "/" + this.GetSubfolderPath(this._title);
    }
    GetChildWithName(name) {
        if ((this._mediaChildList != null) && (this._mediaChildList.size() > 0)) {
            for (var i = 0; i < this._mediaChildList.size(); i++) {
                var m = this._mediaChildList.get(i);
                if (m.GetName() === name)
                    return m;
            }
        }
        return null;
    }
    GetPath() {
        return this._path;
    }
    GetParent() {
        if (this == MediaObject._current) {
            if ((!isNullOrUndefined(MediaObject._stack)) && (MediaObject._stack.size() > 0))
                return MediaObject._stack.peek();
        }
        return null;
    }
    AddChild(child) {
        this._mediaChildList.add(child);
        child.SetAbsolutePath(this._path);
        child.SetIndex(this._mediaChildList.size() - 1);
    }
    RemoveChild(child) {
        return this._mediaChildList.add(child);
    }
    GetChildList() {
        return this._mediaChildList;
    }
    GetChildListLength() {
        return this._mediaChildList.size();
    }
    GetChildWithIndex(index) {
        if ((this._mediaChildList != null) && (index < this._mediaChildList.size()))
            return this._mediaChildList.get(index);
        return null;
    }
    GetPrevious() {
        if (this.GetParent() != null) {
            if (this._index > 0)
                return this.GetParent().GetChildWithIndex(this._index - 1);
        }
        return null;
    }
    GetNext() {
        if (this.GetParent() != null) {
            if (this._index + 1 < this.GetParent().GetChildListLength())
                return this.GetParent().GetChildWithIndex(this._index + 1);
        }
        return null;
    }
    NavigateToParent(ev) {
        var mediaPointer = MediaObject._current;
        if (isNullOrUndefined(mediaPointer)) {
            return;
        }
        var newPointer = mediaPointer.GetParent();
        if (isNullOrUndefined(newPointer))
            return;
        if (isNullOrUndefined(MediaObject._stack))
            MediaObject._stack = new List();
        if (!isNullOrUndefined(MediaObject._stack))
            MediaObject._stack.pop();
        newPointer.RenderMedia();
        return;
    }
    NavigateToChild(ev) {
        var mediaPointer = MediaObject._current;
        if (isNullOrUndefined(mediaPointer)) {
            return;
        }
        var newPointer = mediaPointer.GetChildWithIndex(0);
        if (isNullOrUndefined(newPointer))
            return;
        // Add parent into the stack
        if (isNullOrUndefined(MediaObject._stack))
            MediaObject._stack = new List();
        if (!isNullOrUndefined(MediaObject._stack))
            MediaObject._stack.push(mediaPointer);
        newPointer.RenderMedia();
        return;
    }
    NavigateToPrevious(ev) {
        var mediaPointer = MediaObject._current;
        if (isNullOrUndefined(mediaPointer)) {
            return;
        }
        var newPointer = mediaPointer.GetPrevious();
        if (isNullOrUndefined(newPointer))
            return;
        newPointer.RenderMedia();
        return;
    }
    NavigateToNext(ev) {
        var mediaPointer = MediaObject._current;
        if (isNullOrUndefined(mediaPointer)) {
            return;
        }
        var newPointer = mediaPointer.GetNext();
        if (isNullOrUndefined(newPointer))
            return;
        newPointer.RenderMedia();
        return;
    }
    RenderMedia() {
        var div = document.getElementById(this.GetId());
        if (isNullOrUndefined(div))
            return;
        this.SetCurrentMediaObject();
        div.innerHTML = this.CreateView();
        var button = document.getElementById(MediaObject.GetParentButtonId());
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", this.NavigateToParent);
        }
        button = document.getElementById(MediaObject.GetChildButtonId());
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", this.NavigateToChild);
        }
        button = document.getElementById(MediaObject.GetPreviousButtonId());
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", this.NavigateToPrevious);
        }
        button = document.getElementById(MediaObject.GetNextButtonId());
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", this.NavigateToNext);
        }
    }
    Deserialize(content) {
        return JSON.parse(content);
    }
    Serialize(object) {
        return JSON.stringify(object);
    }
}
MediaObject._parentButtonId = "_parentButtonId";
MediaObject._childButtonId = "_childButtonId";
MediaObject._previousButtonId = "_previousButtonId";
MediaObject._nextButtonId = "_nextButtonId";
//# sourceMappingURL=MediaObject.js.map