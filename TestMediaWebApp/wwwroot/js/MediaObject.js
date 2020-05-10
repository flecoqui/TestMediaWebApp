/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
*/
/**
 * MediaObject
 */
class MediaObject {
    constructor(name = "", description = "", contentUrl = "", imageUrl = "", previewContentUrl = "", previewImageUrl = "") {
        this._type = this.getType();
        this._title = name;
        this._mediaChildList = new Array();
        this._path = "/" + this._title;
        this._description = description;
        this._mainContentUrl = contentUrl;
        this._mainContentImageUrl = imageUrl;
        this._previewContentUrl = previewContentUrl;
        this._previewContentImageUrl = previewImageUrl;
        this._mediaParent = null;
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
    GetAlbum() {
        return this._description;
    }
    GetArtist() {
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
        if ((this._mediaChildList != null) && (this._mediaChildList.length > 0)) {
            for (var i = 0; i < this._mediaChildList.length; i++) {
                var m = this._mediaChildList[i];
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
        return this._mediaParent;
    }
    SetParent(parent) {
        this._mediaParent = parent;
    }
    AddChild(child) {
        this._mediaChildList.push(child);
        child.SetAbsolutePath(this._path);
        child.SetIndex(this._mediaChildList.length - 1);
    }
    RemoveChild(child) {
        return this._mediaChildList.push(child);
    }
    GetChildren() {
        return this._mediaChildList;
    }
    GetChildrenLength() {
        return this._mediaChildList.length;
    }
    HasChild() {
        if ((this._mediaChildList != null) && (this._mediaChildList.length > 0))
            return true;
        return false;
    }
    GetChildWithIndex(index) {
        if ((this._mediaChildList != null) && (index < this._mediaChildList.length))
            return this._mediaChildList[index];
        return null;
    }
    SetChildren(arr) {
        this._mediaChildList = arr;
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
            if (this._index + 1 < this.GetParent().GetChildrenLength())
                return this.GetParent().GetChildWithIndex(this._index + 1);
        }
        return null;
    }
    static fromJSON(d) {
        var object = Object.assign(new MediaObject("", "", "", "", "", ""), d);
        if (!isNullOrUndefined(object)) {
            let arr = new Array();
            for (var i = 0; i < object.GetChildrenLength(); i++) {
                arr.push(MediaObject.fromJSON(object.GetChildWithIndex(i)));
            }
            object.SetChildren(arr);
        }
        return object;
    }
    static Deserialize(content) {
        return this.fromJSON(JSON.parse(content));
    }
    static Serialize(input) {
        var object = Object.assign(new MediaObject("", "", "", "", "", ""), input);
        return JSON.stringify(object);
    }
}
//# sourceMappingURL=MediaObject.js.map