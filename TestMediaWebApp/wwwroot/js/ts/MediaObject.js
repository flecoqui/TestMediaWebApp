/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
*/
/**
 * MediaObject
 */
var MediaObject = /** @class */ (function () {
    function MediaObject(name, description, contentUrl, imageUrl, previewContentUrl, previewImageUrl) {
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        if (contentUrl === void 0) { contentUrl = ""; }
        if (imageUrl === void 0) { imageUrl = ""; }
        if (previewContentUrl === void 0) { previewContentUrl = ""; }
        if (previewImageUrl === void 0) { previewImageUrl = ""; }
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
    MediaObject.prototype.getType = function () {
        var comp = this.constructor;
        return comp.name;
    };
    MediaObject.prototype.GetType = function () {
        return this._type;
    };
    MediaObject.prototype.GetName = function () {
        return this._title;
    };
    MediaObject.prototype.GetDescription = function () {
        return this._description;
    };
    MediaObject.prototype.GetAlbum = function () {
        return this._description;
    };
    MediaObject.prototype.GetArtist = function () {
        return this._description;
    };
    MediaObject.prototype.GetContentUrl = function () {
        return this._mainContentUrl;
    };
    MediaObject.prototype.GetImageUrl = function () {
        return this._mainContentImageUrl;
    };
    MediaObject.prototype.GetPreviewContentUrl = function () {
        return this._previewContentUrl;
    };
    MediaObject.prototype.GetPreviewImageUrl = function () {
        return this._previewContentImageUrl;
    };
    MediaObject.prototype.GetIndex = function () {
        return this._index;
    };
    MediaObject.prototype.SetIndex = function (index) {
        this._index = index;
    };
    MediaObject.prototype.GetSubfolderPath = function (title) {
        return title.replace("/", "_");
    };
    MediaObject.prototype.SetAbsolutePath = function (parentPath) {
        this._path = parentPath + "/" + this.GetSubfolderPath(this._title);
    };
    MediaObject.prototype.GetChildWithName = function (name) {
        if ((this._mediaChildList != null) && (this._mediaChildList.length > 0)) {
            for (var i = 0; i < this._mediaChildList.length; i++) {
                var m = this._mediaChildList[i];
                if (m.GetName() === name)
                    return m;
            }
        }
        return null;
    };
    MediaObject.prototype.GetPath = function () {
        return this._path;
    };
    MediaObject.prototype.GetParent = function () {
        return this._mediaParent;
    };
    MediaObject.prototype.SetParent = function (parent) {
        this._mediaParent = parent;
    };
    MediaObject.prototype.AddChild = function (child) {
        this._mediaChildList.push(child);
        child.SetAbsolutePath(this._path);
        child.SetIndex(this._mediaChildList.length - 1);
    };
    MediaObject.prototype.RemoveChild = function (child) {
        return this._mediaChildList.push(child);
    };
    MediaObject.prototype.GetChildren = function () {
        return this._mediaChildList;
    };
    MediaObject.prototype.GetChildrenLength = function () {
        return this._mediaChildList.length;
    };
    MediaObject.prototype.HasChild = function () {
        if ((this._mediaChildList != null) && (this._mediaChildList.length > 0))
            return true;
        return false;
    };
    MediaObject.prototype.GetChildWithIndex = function (index) {
        if ((this._mediaChildList != null) && (index < this._mediaChildList.length))
            return this._mediaChildList[index];
        return null;
    };
    MediaObject.prototype.SetChildren = function (arr) {
        this._mediaChildList = arr;
    };
    MediaObject.prototype.GetPrevious = function () {
        if (this.GetParent() != null) {
            if (this._index > 0)
                return this.GetParent().GetChildWithIndex(this._index - 1);
        }
        return null;
    };
    MediaObject.prototype.GetNext = function () {
        if (this.GetParent() != null) {
            if (this._index + 1 < this.GetParent().GetChildrenLength())
                return this.GetParent().GetChildWithIndex(this._index + 1);
        }
        return null;
    };
    MediaObject.fromJSON = function (d) {
        var object = Object.assign(new MediaObject("", "", "", "", "", ""), d);
        if (!isNullOrUndefined(object)) {
            var arr = new Array();
            for (var i = 0; i < object.GetChildrenLength(); i++) {
                arr.push(MediaObject.fromJSON(object.GetChildWithIndex(i)));
            }
            object.SetChildren(arr);
        }
        return object;
    };
    MediaObject.Deserialize = function (content) {
        return this.fromJSON(JSON.parse(content));
    };
    MediaObject.Serialize = function (input) {
        var object = Object.assign(new MediaObject("", "", "", "", "", ""), input);
        return JSON.stringify(object);
    };
    return MediaObject;
}());
//# sourceMappingURL=MediaObject.js.map