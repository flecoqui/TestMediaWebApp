var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
/*
import {IMediaObject} from "./IMediaObject";
*/
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
/*
import { isNullOrUndefined, GetCurrentString, GetTimeString, ActivateCarousel } from "./Common";
import {IMediaView, MediaPlaybackMode} from "./IMediaView";
import {IMediaObject} from "./IMediaObject";
*/
/**
 * Media view
 */
var MediaView = /** @class */ (function () {
    function MediaView(id, oneItemNavigation, playbackMode) {
        if (id === void 0) { id = ""; }
        if (oneItemNavigation === void 0) { oneItemNavigation = false; }
        if (playbackMode === void 0) { playbackMode = MediaPlaybackMode.NoLoop; }
        this._indexActiveMediaObject = -1;
        this._playbackMode = MediaPlaybackMode.NoLoop;
        // prefix for HTML Element id
        this._parentButtonId = "_parentButtonId";
        this._childButtonId = "_childButtonId";
        this._previousButtonId = "_previousButtonId";
        this._nextButtonId = "_nextButtonId";
        this._startButtonId = "_startButtonId";
        this._stopButtonId = "_stopButtonId";
        this._playButtonId = "_playButtonId";
        this._pauseButtonId = "_pauseButtonId";
        this._muteButtonId = "_muteButtonId";
        this._unmuteButtonId = "_unmuteButtonId";
        this._volumeUpButtonId = "_volumeUpButtonId";
        this._volumeDownButtonId = "_volumeDownButtonId";
        this._loopButtonId = "_loopButtonId";
        this._playlistloopButtonId = "_playlistloopButtonId";
        this._noloopButtonId = "_noloopButtonId";
        this._audioId = "_audioId";
        this._videoId = "_videoId";
        this._audioSourceId = "_audioSourceId";
        this._videoSourceId = "_videoSourceId";
        this._durationId = "_durationId";
        this._positionId = "_positionId";
        this._sliderId = "_sliderId";
        this._id = id;
        this._root = null;
        this._current = null;
        this._stack = null;
        this._oneItemNavigation = oneItemNavigation;
        this._currentViewParentObject = null;
        this._indexActiveMediaObject = -1;
        this._playbackMode = playbackMode;
    }
    // Methods to get MediaView attributes
    MediaView.prototype.GetId = function () { return this._id; };
    MediaView.prototype.GetRoot = function () { return this._root; };
    MediaView.prototype.SetRoot = function (value) {
        this._root = value;
        if (isNullOrUndefined(this._current))
            this._current = value;
        this.CheckTree(this._root);
    };
    MediaView.prototype.IsOneItemNavigation = function () { return this._oneItemNavigation; };
    MediaView.prototype.SetOneItemNavigation = function (value) { this._oneItemNavigation = value; };
    MediaView.prototype.GetPlaybackMode = function () { return this._playbackMode; };
    MediaView.prototype.SetPlaybackMode = function (value) { this._playbackMode = value; };
    MediaView.prototype.GetCurrentMediaObject = function () { return this._current; };
    MediaView.prototype.SetCurrentMediaObject = function (value) { this._current = value; };
    MediaView.prototype.GetCurrentViewParentMediaObject = function () { return this._currentViewParentObject; };
    MediaView.prototype.SetCurrentViewParentMediaObject = function (value) { this._currentViewParentObject = value; };
    MediaView.prototype.GetIndexActiveMediaMediaObject = function () { return this._indexActiveMediaObject; };
    MediaView.prototype.SetIndexActiveMediaMediaObject = function (value) { this._indexActiveMediaObject = value; };
    MediaView.CreateViewManager = function (id, oneItemNavigation, playbackMode) {
        if (id === void 0) { id = ""; }
        if (oneItemNavigation === void 0) { oneItemNavigation = false; }
        if (playbackMode === void 0) { playbackMode = MediaPlaybackMode.NoLoop; }
        return new MediaView(id, oneItemNavigation, playbackMode);
    };
    ;
    MediaView.prototype.GetParentButtonId = function (index) {
        return this._parentButtonId + index;
    };
    MediaView.prototype.GetChildButtonId = function (index) {
        return this._childButtonId + index;
    };
    MediaView.prototype.GetPreviousButtonId = function (index) {
        return this._previousButtonId + index;
    };
    MediaView.prototype.GetNextButtonId = function (index) {
        return this._nextButtonId + index;
    };
    MediaView.prototype.GetStartButtonId = function (index) {
        return this._startButtonId + index;
    };
    MediaView.prototype.GetStopButtonId = function (index) {
        return this._stopButtonId + index;
    };
    MediaView.prototype.GetPlayButtonId = function (index) {
        return this._playButtonId + index;
    };
    MediaView.prototype.GetPauseButtonId = function (index) {
        return this._pauseButtonId + index;
    };
    MediaView.prototype.GetMuteButtonId = function (index) {
        return this._muteButtonId + index;
    };
    MediaView.prototype.GetUnmuteButtonId = function (index) {
        return this._unmuteButtonId + index;
    };
    MediaView.prototype.GetVolumeUpButtonId = function (index) {
        return this._volumeUpButtonId + index;
    };
    MediaView.prototype.GetVolumeDownButtonId = function (index) {
        return this._volumeDownButtonId + index;
    };
    MediaView.prototype.GetLoopButtonId = function (index) {
        return this._loopButtonId + index;
    };
    MediaView.prototype.GetPlayListLoopButtonId = function (index) {
        return this._playlistloopButtonId + index;
    };
    MediaView.prototype.GetNoLoopButtonId = function (index) {
        return this._noloopButtonId + index;
    };
    MediaView.prototype.GetAudioId = function (index) {
        return this._audioId + index;
    };
    MediaView.prototype.GetVideoId = function (index) {
        return this._videoId + index;
    };
    MediaView.prototype.GetAudioSourceId = function (index) {
        return this._audioSourceId + index;
    };
    MediaView.prototype.GetVideoSourceId = function (index) {
        return this._videoSourceId + index;
    };
    MediaView.prototype.GetDurationId = function (index) {
        return this._durationId + index;
    };
    MediaView.prototype.GetSliderId = function (index) {
        return this._sliderId + index;
    };
    MediaView.prototype.GetPositionId = function (index) {
        return this._positionId + index;
    };
    // View Methods
    MediaView.prototype.CreateView = function (current) {
        return "";
    };
    MediaView.prototype.CreatePreview = function (current) {
        return "";
    };
    MediaView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    MediaView.prototype.NavigateToParent = function (cur) {
        var current = this.GetCurrentMediaObject();
        if (isNullOrUndefined(current)) {
            return;
        }
        var newPointer = current.GetParent();
        if (isNullOrUndefined(newPointer))
            return;
        if (isNullOrUndefined(this._stack))
            this._stack = new Array();
        if (!isNullOrUndefined(this._stack))
            this._stack.pop();
        this.SetCurrentMediaObject(newPointer);
        this.RenderView();
        return;
    };
    MediaView.prototype.NavigateToChild = function (cur) {
        var current = this.GetCurrentMediaObject();
        if (isNullOrUndefined(current)) {
            return;
        }
        var newPointer = current.GetChildWithIndex(0);
        if (isNullOrUndefined(newPointer))
            return;
        // Add parent into the stack
        if (isNullOrUndefined(this._stack))
            this._stack = new Array();
        if (!isNullOrUndefined(this._stack))
            this._stack.push(current);
        this.SetCurrentMediaObject(newPointer);
        this.RenderView();
        return;
    };
    MediaView.prototype.NavigateToPrevious = function (cur) {
        var current = this.GetCurrentMediaObject();
        if (isNullOrUndefined(current)) {
            return;
        }
        var newPointer = current.GetPrevious();
        if (isNullOrUndefined(newPointer))
            return;
        this.SetCurrentMediaObject(newPointer);
        this.RenderView();
        return;
    };
    MediaView.prototype.NavigateToNext = function (cur) {
        var current = this.GetCurrentMediaObject();
        if (isNullOrUndefined(current)) {
            return;
        }
        var newPointer = current.GetNext();
        if (isNullOrUndefined(newPointer))
            return;
        this.SetCurrentMediaObject(newPointer);
        this.RenderView();
        return;
    };
    MediaView.prototype.CheckTree = function (cur) {
        if (!isNullOrUndefined(cur)) {
            if (cur.HasChild()) {
                for (var i = 0; i < cur.GetChildrenLength(); i++) {
                    var child = cur.GetChildWithIndex(i);
                    child.SetParent(cur);
                    this.CheckTree(child);
                }
            }
        }
    };
    /****************************************************************************/
    /* EVents associated with the controls on the page                          */
    /****************************************************************************/
    MediaView.prototype.NavigateToChildEvent = function (control, mo, v) {
        if (!isNullOrUndefined(v))
            v.NavigateToChild(mo);
    };
    MediaView.prototype.NavigateToParentEvent = function (control, mo, v) {
        if (!isNullOrUndefined(v))
            v.NavigateToParent(mo);
    };
    MediaView.prototype.NavigateToNextEvent = function (control, mo, v) {
        if (!isNullOrUndefined(v))
            v.NavigateToNext(mo);
    };
    MediaView.prototype.NavigateToPreviousEvent = function (control, mo, v) {
        if (!isNullOrUndefined(v))
            v.NavigateToPrevious(mo);
    };
    MediaView.prototype.EventStopMedia = function (button, mo, v) {
        v.StopMedia(mo);
    };
    MediaView.prototype.StopMedia = function (mo) {
        var audio = document.getElementById(this.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            audio.pause();
            audio.currentTime = 0;
        }
        else {
            var video = document.getElementById(this.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                video.pause();
                video.currentTime = 0;
            }
        }
        var control = document.getElementById(this.GetStartButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "block";
            control.disabled = false;
        }
        var control = document.getElementById(this.GetStopButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(this.GetPlayButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(this.GetPauseButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(this.GetMuteButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(this.GetVolumeUpButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(this.GetVolumeDownButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        this.SetIndexActiveMediaMediaObject(-1);
    };
    MediaView.prototype.StartMedia = function (mo) {
        var parent = mo.GetParent();
        if (this.GetIndexActiveMediaMediaObject() >= 0) {
            if (!isNullOrUndefined(parent)) {
                var mostop = parent.GetChildWithIndex(this.GetIndexActiveMediaMediaObject());
                if (!isNullOrUndefined(mostop)) {
                    this.StopMedia(mostop);
                }
            }
        }
        var audio = document.getElementById(this.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            var source = document.getElementById(this.GetAudioSourceId(mo.GetIndex()));
            if (!isNullOrUndefined(source)) {
                source.src = mo.GetContentUrl();
                audio.load();
                audio.play();
            }
        }
        else {
            var video = document.getElementById(this.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                var source = document.getElementById(this.GetVideoSourceId(mo.GetIndex()));
                if (!isNullOrUndefined(source)) {
                    source.src = mo.GetContentUrl();
                    video.load();
                    video.play();
                }
            }
        }
        this.SetIndexActiveMediaMediaObject(mo.GetIndex());
    };
    MediaView.prototype.EventStartMedia = function (button, mo, v) {
        v.StartMedia(mo);
    };
    MediaView.prototype.PauseMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            audio.pause();
        }
        else {
            var video = document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                video.pause();
            }
        }
    };
    MediaView.prototype.PlayMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            audio.play();
        }
        else {
            var video = document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                video.play();
            }
        }
    };
    MediaView.prototype.MuteMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            audio.muted = true;
            var control = document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control)) {
                control.disabled = false;
                control.style.display = "block";
            }
            control = document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control)) {
                control.disabled = true;
                control.style.display = "none";
            }
        }
        else {
            var video = document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                video.muted = true;
                var control = document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
                control = document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
        }
    };
    MediaView.prototype.UnmuteMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            audio.muted = false;
            var control = document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control)) {
                control.disabled = false;
                control.style.display = "block";
            }
            control = document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control)) {
                control.disabled = true;
                control.style.display = "none";
            }
        }
        else {
            var video = document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                video.muted = false;
                var control = document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
                control = document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
        }
    };
    MediaView.prototype.UpdateAllLoopButtons = function (mo) {
        var parent = mo.GetParent();
        if (!isNullOrUndefined(parent)) {
            for (var k = 0; k < parent.GetChildrenLength(); k++) {
                this.UpdateLoopButton(parent.GetChildWithIndex(k));
            }
        }
    };
    MediaView.prototype.UpdateLoopButton = function (mo) {
        if (this.GetPlaybackMode() == MediaPlaybackMode.NoLoop) {
            var control = document.getElementById(this.GetPlayListLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "none";
            control = document.getElementById(this.GetLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "block";
            control = document.getElementById(this.GetNoLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "none";
        }
        if (this.GetPlaybackMode() == MediaPlaybackMode.Loop) {
            var control = document.getElementById(this.GetPlayListLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "block";
            control = document.getElementById(this.GetLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "none";
            control = document.getElementById(this.GetNoLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "none";
        }
        if (this.GetPlaybackMode() == MediaPlaybackMode.PlaylistLoop) {
            var control = document.getElementById(this.GetPlayListLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "none";
            control = document.getElementById(this.GetLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "none";
            control = document.getElementById(this.GetNoLoopButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "block";
        }
    };
    MediaView.prototype.LoopMedia = function (button, mo, v) {
        v.SetPlaybackMode(MediaPlaybackMode.Loop);
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-mode", "loop");
        v.UpdateAllLoopButtons(mo);
    };
    MediaView.prototype.PlaylistLoopMedia = function (button, mo, v) {
        v.SetPlaybackMode(MediaPlaybackMode.PlaylistLoop);
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-mode", "playlistloop");
        v.UpdateAllLoopButtons(mo);
    };
    MediaView.prototype.NoLoopMedia = function (button, mo, v) {
        v.SetPlaybackMode(MediaPlaybackMode.NoLoop);
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-mode", "noloop");
        v.UpdateAllLoopButtons(mo);
    };
    MediaView.prototype.VolumeUpMedia = function (button, mo, v) {
        v.SetPlaybackMode(MediaPlaybackMode.NoLoop);
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-mode", "noloop");
        v.UpdateAllLoopButtons(mo);
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (audio.muted == true)
                audio.muted = false;
            if (audio.volume <= 0.8)
                audio.volume += 0.2;
            else
                audio.volume = 1;
        }
        else {
            var video = document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                if (video.muted == true)
                    video.muted = false;
                if (video.volume <= 0.8)
                    video.volume += 0.2;
                else
                    video.volume = 1;
            }
        }
    };
    MediaView.prototype.VolumeDownMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (audio.muted == true)
                audio.muted = false;
            if (audio.volume >= 0.2)
                audio.volume -= 0.2;
            else
                audio.volume = 0;
        }
        else {
            var video = document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                if (video.muted == true)
                    video.muted = false;
                if (video.volume >= 0.2)
                    video.volume -= 0.2;
                else
                    video.volume = 0;
            }
        }
    };
    MediaView.prototype.EventPlayingMedia = function (button, mo, v) {
        var control = document.getElementById(v.GetStartButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control))
            control.style.display = "none";
        control = document.getElementById(v.GetStopButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "block";
            control.disabled = false;
        }
        control = document.getElementById(v.GetPauseButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = false;
            control.style.display = "block";
        }
        control = document.getElementById(v.GetPlayButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = true;
            control.style.display = "block";
        }
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (audio.muted == true) {
                control = document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
                control = document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
            }
            else {
                control = document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
                control = document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
        }
        control = document.getElementById(v.GetVolumeUpButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = false;
            control.style.display = "block";
        }
        control = document.getElementById(v.GetVolumeDownButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = false;
            control.style.display = "block";
        }
    };
    MediaView.prototype.EventPlayMedia = function (button, mo, v) {
        var control = document.getElementById(v.GetPlayButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = true;
            control.style.display = "none";
        }
        var control = document.getElementById(v.GetPauseButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = false;
            control.style.display = "block";
        }
    };
    MediaView.prototype.EventPauseMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (audio.currentTime != 0) {
                var control = document.getElementById(v.GetPlayButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
                var control = document.getElementById(v.GetPauseButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
        }
    };
    MediaView.prototype.EventVolumeChangeMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (audio.muted == true) {
                var control = document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
                control = document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
            }
            else {
                var control = document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
                control = document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
            if (audio.volume == 1) {
                control = document.getElementById(v.GetVolumeUpButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "block";
                }
            }
            else {
                control = document.getElementById(v.GetVolumeUpButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
            }
            if (audio.volume == 0) {
                control = document.getElementById(v.GetVolumeDownButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
            else {
                control = document.getElementById(v.GetVolumeDownButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
            }
        }
    };
    MediaView.prototype.EventTimeUpdateMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            var control = document.getElementById(v.GetPositionId(mo.GetIndex()));
            if (!isNullOrUndefined(control)) {
                if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && audio.duration != Infinity)
                    control.innerHTML = audio.currentTime < 3600 ? GetTimeString(audio.currentTime).substring(3) : GetTimeString(audio.currentTime);
                else {
                    if (!isNullOrUndefined(audio.currentTime) && !isNaN(audio.currentTime)) {
                        if (isNaN(audio.duration)) {
                            if (mo.GetType() == "Radio")
                                control.innerHTML = GetTimeString(audio.currentTime);
                            else
                                control.innerHTML = audio.currentTime < 3600 ? GetTimeString(audio.currentTime).substring(3) : GetTimeString(audio.currentTime);
                        }
                        else
                            control.innerHTML = GetTimeString(audio.currentTime);
                    }
                }
            }
            control = document.getElementById(v.GetDurationId(mo.GetIndex()));
            if (!isNullOrUndefined(control)) {
                if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && audio.duration != Infinity)
                    control.innerHTML = audio.duration < 3600 ? GetTimeString(audio.duration).substring(3) : GetTimeString(audio.duration);
                else
                    control.innerHTML = "00:00";
            }
            var slider = document.getElementById(v.GetSliderId(mo.GetIndex()));
            if (!isNullOrUndefined(slider)) {
                if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && audio.duration != Infinity) {
                    slider.value = ((audio.currentTime * 100) / audio.duration).toString();
                }
            }
        }
    };
    MediaView.prototype.EventEndedMedia = function (button, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (this.GetPlaybackMode() == MediaPlaybackMode.NoLoop) {
                audio.currentTime = 0;
                audio.pause();
                return;
            }
            if (this.GetPlaybackMode() == MediaPlaybackMode.Loop) {
                audio.currentTime = 0;
                audio.play();
                return;
            }
            if (this.GetPlaybackMode() == MediaPlaybackMode.PlaylistLoop) {
                var parent = mo.GetParent();
                if (!isNullOrUndefined(parent)) {
                    var n = mo.GetIndex() + 1;
                    if (n >= parent.GetChildrenLength())
                        n = 0;
                    v.StartMedia(parent.GetChildWithIndex(n));
                    return;
                }
            }
        }
    };
    MediaView.prototype.InputSliderMedia = function (slider, mo, v) {
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && audio.duration != Infinity)
                if ((slider.value >= 0) && (slider.value <= 100)) {
                    audio.currentTime = (audio.duration * slider.value) / 100;
                }
        }
        else {
            var video = document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                if (!isNullOrUndefined(video.duration) && !isNaN(video.duration) && video.duration != Infinity)
                    if ((slider.value >= 0) && (slider.value <= 100)) {
                        video.currentTime = (video.duration * slider.value) / 100;
                    }
            }
        }
        var control = document.getElementById(v.GetPositionId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && audio.duration != Infinity)
                control.innerHTML = audio.duration < 3600 ? GetTimeString(audio.currentTime).substring(3) : GetTimeString(audio.currentTime);
            else {
                if (!isNullOrUndefined(audio.currentTime) && !isNaN(audio.currentTime))
                    control.innerHTML = audio.currentTime < 3600 ? GetTimeString(audio.currentTime).substring(3) : GetTimeString(audio.currentTime);
            }
        }
        control = document.getElementById(v.GetDurationId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && audio.duration != Infinity)
                control.innerHTML = audio.duration < 3600 ? GetTimeString(audio.duration).substring(3) : GetTimeString(audio.duration);
            else
                control.innerHTML = "00:00";
        }
    };
    MediaView.prototype.registerEvent = function (event, id, mo, callback) {
        var button = document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.addEventListener(event, (function (view, object) {
                return function () {
                    callback(this, object, view);
                };
            })(this, mo), false);
        }
    };
    MediaView.prototype.displayButton = function (id) {
        var button = document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.disabled = false;
            button.style.display = "block";
        }
    };
    MediaView.prototype.hideButton = function (id) {
        var button = document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.style.display = "none";
        }
    };
    MediaView.prototype.InternalRenderMedia = function () {
        var current = this.GetCurrentMediaObject();
        var parent = null;
        if (!isNullOrUndefined(current))
            parent = current.GetParent();
        var div = document.getElementById(this.GetId());
        var button = null;
        if (isNullOrUndefined(div))
            return;
        if ((!isNullOrUndefined(parent)) && (this.IsOneItemNavigation() === false)) {
            div.innerHTML = "";
            this.SetCurrentViewParentMediaObject(parent);
            for (var i = 0; i < parent.GetChildrenLength(); i++) {
                var o = parent.GetChildWithIndex(i);
                div.innerHTML += this.CreateView(o);
            }
            for (var i = 0; i < parent.GetChildrenLength(); i++) {
                var Index_1 = parent.GetChildWithIndex(i).GetIndex();
                this.registerEvent("click", this.GetParentButtonId(Index_1), parent.GetChildWithIndex(i), this.NavigateToParentEvent);
                this.registerEvent("click", this.GetChildButtonId(Index_1), parent.GetChildWithIndex(i), this.NavigateToChildEvent);
                this.registerEvent("click", this.GetNextButtonId(Index_1), parent.GetChildWithIndex(i), this.NavigateToNextEvent);
                this.registerEvent("click", this.GetPreviousButtonId(Index_1), parent.GetChildWithIndex(i), this.NavigateToPreviousEvent);
                this.registerEvent("click", this.GetStartButtonId(Index_1), parent.GetChildWithIndex(i), this.EventStartMedia);
                this.displayButton(this.GetStartButtonId(Index_1));
                this.registerEvent("click", this.GetStopButtonId(Index_1), parent.GetChildWithIndex(i), this.EventStopMedia);
                this.hideButton(this.GetStopButtonId(Index_1));
                this.registerEvent("click", this.GetPauseButtonId(Index_1), parent.GetChildWithIndex(i), this.PauseMedia);
                this.hideButton(this.GetPauseButtonId(Index_1));
                this.registerEvent("click", this.GetPlayButtonId(Index_1), parent.GetChildWithIndex(i), this.PlayMedia);
                this.hideButton(this.GetPlayButtonId(Index_1));
                this.registerEvent("click", this.GetMuteButtonId(Index_1), parent.GetChildWithIndex(i), this.MuteMedia);
                this.hideButton(this.GetMuteButtonId(Index_1));
                this.registerEvent("click", this.GetUnmuteButtonId(Index_1), parent.GetChildWithIndex(i), this.UnmuteMedia);
                this.hideButton(this.GetUnmuteButtonId(Index_1));
                /* Update Loop button status */
                this.UpdateLoopButton(parent.GetChildWithIndex(i));
                this.registerEvent("click", this.GetLoopButtonId(Index_1), parent.GetChildWithIndex(i), this.LoopMedia);
                this.registerEvent("click", this.GetNoLoopButtonId(Index_1), parent.GetChildWithIndex(i), this.NoLoopMedia);
                this.registerEvent("click", this.GetPlayListLoopButtonId(Index_1), parent.GetChildWithIndex(i), this.PlaylistLoopMedia);
                this.registerEvent("click", this.GetVolumeUpButtonId(Index_1), parent.GetChildWithIndex(i), this.VolumeUpMedia);
                this.registerEvent("click", this.GetVolumeDownButtonId(Index_1), parent.GetChildWithIndex(i), this.VolumeDownMedia);
                this.registerEvent("playing", this.GetAudioId(Index_1), parent.GetChildWithIndex(i), this.EventPlayingMedia);
                this.registerEvent("play", this.GetAudioId(Index_1), parent.GetChildWithIndex(i), this.EventPlayMedia);
                this.registerEvent("pause", this.GetAudioId(Index_1), parent.GetChildWithIndex(i), this.EventPauseMedia);
                this.registerEvent("volumechange", this.GetAudioId(Index_1), parent.GetChildWithIndex(i), this.EventVolumeChangeMedia);
                this.registerEvent("timeupdate", this.GetAudioId(Index_1), parent.GetChildWithIndex(i), this.EventTimeUpdateMedia);
                this.registerEvent("ended", this.GetAudioId(Index_1), parent.GetChildWithIndex(i), this.EventEndedMedia);
                this.registerEvent("input", this.GetSliderId(Index_1), parent.GetChildWithIndex(i), this.InputSliderMedia);
            }
        }
        else {
            if (!isNullOrUndefined(current)) {
                //current.SetParent(parent);
                div.innerHTML = this.CreateView(current);
                var Index = current.GetIndex();
                this.registerEvent("click", this.GetParentButtonId(Index), current, this.NavigateToParentEvent);
                this.registerEvent("click", this.GetChildButtonId(Index), current, this.NavigateToChildEvent);
                this.registerEvent("click", this.GetNextButtonId(Index), current, this.NavigateToNextEvent);
                this.registerEvent("click", this.GetPreviousButtonId(Index), current, this.NavigateToPreviousEvent);
                this.registerEvent("click", this.GetStartButtonId(Index), current, this.EventStartMedia);
                this.displayButton(this.GetStartButtonId(Index));
                this.registerEvent("click", this.GetStopButtonId(Index), current, this.EventStopMedia);
                this.hideButton(this.GetStopButtonId(Index));
                this.registerEvent("click", this.GetPauseButtonId(Index), current, this.PauseMedia);
                this.hideButton(this.GetPauseButtonId(Index));
                this.registerEvent("click", this.GetPlayButtonId(Index), current, this.PlayMedia);
                this.hideButton(this.GetPlayButtonId(Index));
                this.registerEvent("click", this.GetMuteButtonId(Index), current, this.MuteMedia);
                this.hideButton(this.GetMuteButtonId(Index));
                this.registerEvent("click", this.GetUnmuteButtonId(Index), current, this.UnmuteMedia);
                this.hideButton(this.GetUnmuteButtonId(Index));
                /* Update Loop button status */
                this.UpdateLoopButton(current);
                this.registerEvent("click", this.GetLoopButtonId(Index), current, this.LoopMedia);
                this.registerEvent("click", this.GetNoLoopButtonId(Index), current, this.NoLoopMedia);
                this.registerEvent("click", this.GetPlayListLoopButtonId(Index), current, this.NoLoopMedia);
                this.registerEvent("click", this.GetVolumeUpButtonId(Index), current, this.VolumeUpMedia);
                this.registerEvent("click", this.GetVolumeDownButtonId(Index), current, this.VolumeDownMedia);
                this.registerEvent("playing", this.GetAudioId(Index), current, this.EventPlayingMedia);
                this.registerEvent("play", this.GetAudioId(Index), current, this.EventPlayMedia);
                this.registerEvent("pause", this.GetAudioId(Index), current, this.EventPauseMedia);
                this.registerEvent("volumechange", this.GetAudioId(Index), current, this.EventVolumeChangeMedia);
                this.registerEvent("timeupdate", this.GetAudioId(Index), current, this.EventTimeUpdateMedia);
                this.registerEvent("ended", this.GetAudioId(Index), current, this.EventEndedMedia);
                this.registerEvent("input", this.GetSliderId(Index), current, this.InputSliderMedia);
                /*
                                button = document.getElementById(this.GetParentButtonId(currentMO.GetIndex()));
                                if(!isNullOrUndefined(button)){
                                    button.addEventListener("click",function()
                                    {
                                        this.NavigateToParent(currentMO);
                                    });
                                }
                                button = <HTMLButtonElement>document.getElementById(this.GetChildButtonId(currentMO.GetIndex()));
                                if(!isNullOrUndefined(button)){
                                    button.addEventListener("click",function()
                                    {
                                        this.NavigateToChild(currentMO)
                                    });
                                }
                                button = <HTMLButtonElement>document.getElementById(this.GetPreviousButtonId(currentMO.GetIndex()));
                                if(!isNullOrUndefined(button)){
                                    button.addEventListener("click",function()
                                    {
                                        this.NavigateToPrevious(currentMO)
                                    });
                                }
                                button = <HTMLButtonElement>document.getElementById(this.GetNextButtonId(currentMO.GetIndex()));
                                if(!isNullOrUndefined(button)){
                                    button.addEventListener("click",function()
                                    {
                                        this.NavigateToNext(currentMO)
                                    });
                                }
                                */
            }
        }
        // If carousel created activate it
        ActivateCarousel();
        return true;
    };
    return MediaView;
}());
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Photo
 */
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Home;
}(MediaObject));
/**
 * HomeView
 */
var HomeView = /** @class */ (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    HomeView.prototype.CreateView = function (current) {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + current.GetName() + "</strong></p>";
        result += current.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(current.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.IsOneItemNavigation() === true) {
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    };
    HomeView.prototype.CreatePreview = function () {
        return "<div><label>Home Preview</label></div>";
    };
    return HomeView;
}(MediaView));
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Menu
 */
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Menu;
}(MediaObject));
/**
 * MenuView
 */
var MenuView = /** @class */ (function (_super) {
    __extends(MenuView, _super);
    function MenuView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    MenuView.prototype.CreateView = function (current) {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + current.GetName() + "</strong></p>";
        result += current.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(current.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.IsOneItemNavigation() === true) {
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    };
    MenuView.prototype.CreatePreview = function () {
        return "<div><label>Menu Preview</label></div>";
    };
    return MenuView;
}(MediaView));
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Playlist
 */
var Playlist = /** @class */ (function (_super) {
    __extends(Playlist, _super);
    function Playlist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Playlist;
}(MediaObject));
/**
 * PlaylistView
 */
var PlaylistView = /** @class */ (function (_super) {
    __extends(PlaylistView, _super);
    function PlaylistView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaylistView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    PlaylistView.prototype.CreateView = function (current) {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + current.GetName() + "</strong></p>";
        result += current.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(current.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.IsOneItemNavigation() === true) {
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    };
    PlaylistView.prototype.CreatePreview = function () {
        return "<div><label>Playlist Preview</label><button id=\"parentButtonId\">Left</button><button id=\"upButtonId\">Up</button><button id=\"downButtonId\">Down</button><button id=\"playButtonId\">Play</button><button id=\"childButtonId\">Child</button></div>";
    };
    return PlaylistView;
}(MediaView));
/*
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Music
 */
var Music = /** @class */ (function (_super) {
    __extends(Music, _super);
    function Music() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Music;
}(MediaObject));
/**
 * MusicView
 */
var MusicView = /** @class */ (function (_super) {
    __extends(MusicView, _super);
    function MusicView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MusicView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    MusicView.prototype.CreateView = function (current) {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" >";
        if (!isNullOrUndefinedOrEmpty(current.GetImageUrl())) {
            result += "<img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img>";
        }
        else {
            var count = 0;
            var urlArray = [];
            result += "<div class=\"carousel slide\" data-interval=\"2000\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
            for (var i = 0; i < current.GetChildrenLength(); i++) {
                var obj = current.GetChildWithIndex(i);
                if (!isNullOrUndefined(obj)) {
                    var url = obj.GetImageUrl();
                    if (!isNullOrUndefinedOrEmpty(url)) {
                        if (urlArray.indexOf(url) <= 0) {
                            urlArray.push(url);
                        }
                    }
                }
            }
            if (urlArray.length > 0) {
                var active = true;
                for (var i = 0; i < urlArray.length; i++) {
                    if (active == true) {
                        result += "<div class=\"carousel-item active\"><img class=\"card-img-top\" src=\"" + urlArray[i] + "\" ></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item\"><img class=\"card-img-top\" src=\"" + urlArray[i] + "\" ></div>";
                }
            }
            else {
                result += "<div class=\"carousel-item active\"><img class=\"card-img-top\" src=\"assets/img/Music.png\" ></div>";
            }
            result += "</div></div>";
        }
        result += "</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<audio  id=\"" + this.GetAudioId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";
            result += "<div class=\"media-slider-container\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() + "</strong></p></div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>";
        }
        result += "<p class=\"media-artist\" ><strong>" + current.GetArtist() + "</strong></p>";
        result += "<p class=\"media-album\" >" + current.GetAlbum() + "</p>";
        result += "</div>";
        result += "</div>";
        result += "<div class=\"media-div\" >";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if (current.HasChild() == true) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-refresh\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-rotate-right\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-circle-o-notch\"></i></strong></button>";
            result += "</div>";
        }
        if (this.IsOneItemNavigation() === true) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-backward\"></i></strong></button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-forward\"></i></strong></button>";
            }
            result += "</div>";
        }
        result += "</div>";
        result += "</div></div></div></div>";
        /*
        result +=  "<strong>" + this.GetName() +"</strong></p>";
        result +=  this.GetDescription() +"</p>";
        result +=  "</p><div class=\"d-flex justify-content-between align-items-center\"><div>" ;
        result += "<div class=\"btn-group\">";
        if(!isNullOrUndefined(this.GetParent())){
            result +=  "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("BACK") + "</strong></button>" ;
        };
        if(!isNullOrUndefined(this.GetChildWithIndex(0))){
            result +=  "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("CHILD") + "</strong></button>";
        }
        if(this.GetOneItemNavigation()===true)
        {

            if(!isNullOrUndefined(this.GetPrevious())){
                result +=  "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"mediabutton\">" + GetCurrentString("PREVIOUS") + "</button>";
            }
            if(!isNullOrUndefined(this.GetNext())){
                result +=  "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"mediabutton\">" + GetCurrentString("NEXT") + "</button>";
            }
        }
        result += "</div>";
        if(!isNullOrUndefined(this.GetContentUrl()))
        {

            result +=  "<audio autoplay id=\"" + this.GetAudioId(current.GetIndex()) + "\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  /></audio>";
            result += "<div class=\"mediabutton-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("START") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("STOP") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("PLAY") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("PAUSE") + "</strong></button>";
            result += "</div>"
            result += "<div class=\"btn-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Mute") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Unmute") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetVolumeUpButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("VolumeUp") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetVolumeDownButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("VolumeDown") + "</strong></button>";
            result += "</div>"
            result += "<div class=\"btn-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetRepeatButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Repeat") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetUnrepeatButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Unrepeat") + "</strong></button>";
            result += "</div>"

        }
        
        if(!isNullOrUndefined(this.GetContentUrl()))
        {
            result += "<div>"
            result +=  "<small class=\"text-muted\"  id=\"" + this.GetPositionId(current.GetIndex()) + "\"   >00:00</small>";
            result +=  "<small class=\"text-muted\"  > / </small>";
            result +=  "<small class=\"text-muted\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</small>";
            result += "</div>"
        }
        //result +=  "</div>";

        result +=  "</div></div></div>";
        */
        return result;
    };
    MusicView.prototype.CreatePreview = function () {
        return "<div><label>Menu Preview</label></div>";
    };
    return MusicView;
}(MediaView));
/*
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
var Radio = /** @class */ (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Radio;
}(MediaObject));
var RadioView = /** @class */ (function (_super) {
    __extends(RadioView, _super);
    function RadioView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    RadioView.prototype.CreateView = function (current) {
        //        var result =  "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" ><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"></img></div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        //        result += "<div>"          
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" >";
        if (!isNullOrUndefinedOrEmpty(current.GetImageUrl())) {
            result += "<img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img>";
        }
        else {
            var count = 0;
            var urlArray = [];
            result += "<div class=\"carousel slide\" data-interval=\"2000\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
            for (var i = 0; i < current.GetChildrenLength(); i++) {
                var obj = current.GetChildWithIndex(i);
                if (!isNullOrUndefined(obj)) {
                    var url = obj.GetImageUrl();
                    if (!isNullOrUndefinedOrEmpty(url)) {
                        if (urlArray.indexOf(url) <= 0) {
                            urlArray.push(url);
                        }
                    }
                }
            }
            if (urlArray.length > 0) {
                var active = true;
                for (var i = 0; i < urlArray.length; i++) {
                    if (active == true) {
                        result += "<div class=\"carousel-item active\"><img class=\"card-img-top\" src=\"" + urlArray[i] + "\" ></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item\"><img class=\"card-img-top\" src=\"" + urlArray[i] + "\" ></div>";
                }
            }
            else {
                result += "<div class=\"carousel-item active\"><img class=\"card-img-top\" src=\"assets/img/Music.png\" ></div>";
            }
            result += "</div></div>";
        }
        result += "</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<audio  id=\"" + this.GetAudioId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00:00</label>";
            result += "<div class=\"media-slider-container\" style=\"display: none\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\" style=\"display: none\"  >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() + "</strong></p></div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>";
        }
        result += "<p class=\"media-artist\" ><strong>" + current.GetArtist() + "</strong></p>";
        result += "<p class=\"media-album\" >" + current.GetAlbum() + "</p>";
        result += "</div>";
        result += "</div>";
        result += "<div class=\"media-div\" >";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if (current.HasChild() == true) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        /*
                if(!isNullOrUndefinedOrEmpty(this.GetContentUrl())){
                    result += "<div class=\"media-button-group-horizontal\">";
                    result += "<button type=\"button\" id=\"" + this.GetLoopButtonId() + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-refresh\"></i></strong></button>";
                    result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId() + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-rotate-right\"></i></strong></button>";
                    result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId() + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-circle-o-notch\"></i></strong></button>";
                    result += "</div>";
                }
        */
        if (this.IsOneItemNavigation() === true) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-backward\"></i></strong></button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-forward\"></i></strong></button>";
            }
            result += "</div>";
        }
        result += "</div>";
        result += "</div></div></div></div>";
        return result;
    };
    RadioView.prototype.CreatePreview = function () {
        return "<div><label>Menu Preview</label></div>";
    };
    return RadioView;
}(MediaView));
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * TV
 */
var TV = /** @class */ (function (_super) {
    __extends(TV, _super);
    function TV() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TV;
}(MediaObject));
/**
 * TVView
 */
var TVView = /** @class */ (function (_super) {
    __extends(TVView, _super);
    function TVView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TVView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    TVView.prototype.CreateView = function (current) {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + current.GetName() + "</strong></p>";
        result += current.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(current.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.IsOneItemNavigation() === true) {
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        if (!isNullOrUndefined(current.GetContentUrl())) {
            result += "<audio autoplay loop id=\"" + this.GetVideoId(current.GetIndex()) + "\" ><source id=\"" + this.GetVideoSourceId(current.GetIndex()) + "\"  /></audio>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Start</button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Stop</button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Play</button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Pause</button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Mute</button>";
            result += "<button type=\"button\" id=\"" + this.GetVolumeUpButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">VolumeUp</button>";
            result += "<button type=\"button\" id=\"" + this.GetVolumeDownButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">VolumeDown</button>";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Repeat</button>";
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    };
    TVView.prototype.CreatePreview = function () {
        return "<div><label>Menu Preview</label></div>";
    };
    return TVView;
}(MediaView));
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Photo
 */
var Photo = /** @class */ (function (_super) {
    __extends(Photo, _super);
    function Photo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Photo;
}(MediaObject));
/**
 * PhotoView
 */
var PhotoView = /** @class */ (function (_super) {
    __extends(PhotoView, _super);
    function PhotoView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhotoView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    PhotoView.prototype.CreateView = function (current) {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + current.GetName() + "</strong></p>";
        result += current.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(current.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.IsOneItemNavigation() === true) {
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    };
    PhotoView.prototype.CreatePreview = function () {
        return "<div><label>Menu Preview</label></div>";
    };
    return PhotoView;
}(MediaView));
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Video
 */
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Video;
}(MediaObject));
/**
 * VideoView
 */
var VideoView = /** @class */ (function (_super) {
    __extends(VideoView, _super);
    function VideoView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VideoView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    VideoView.prototype.CreateView = function (current) {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + current.GetName() + "</strong></p>";
        result += current.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(current.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.IsOneItemNavigation() === true) {
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        if (!isNullOrUndefined(current.GetContentUrl())) {
            result += "<audio autoplay loop id=\"" + this.GetVideoId(current.GetIndex()) + "\" ><source id=\"" + this.GetVideoSourceId(current.GetIndex()) + "\"  /></audio>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Start</button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Stop</button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Play</button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Pause</button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Mute</button>";
            result += "<button type=\"button\" id=\"" + this.GetVolumeUpButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">VolumeUp</button>";
            result += "<button type=\"button\" id=\"" + this.GetVolumeDownButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">VolumeDown</button>";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Repeat</button>";
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    };
    VideoView.prototype.CreatePreview = function () {
        return "<div><label>Menu Preview</label></div>";
    };
    return VideoView;
}(MediaView));
/*
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    BlobDownloadResponseModel
  } from "@azure/storage-blob";
import { MediaPlaybackMode} from "./IMediaView";
*/
var BlobServiceClient;
/*
import {
    BlobServiceClient
  } from "@azure/storage-blob";
*/
var TestAzureStorage = function () {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var account, accountKey, sharedKeyCredential, blobServiceClient, i, _b, _c, container, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    account = "mediacloud";
                    accountKey = "9y4eAbrgpCRtP72wXamkJcUOV8ph1NEPlHtQcBZlDOYh1gNI/g6Vz4JP3xFHMAlKqn4/2JX3c9FLILo5u7k5YA==";
                    sharedKeyCredential = "?sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
                    blobServiceClient = new BlobServiceClient(
                    // When using AnonymousCredential, following url should include a valid SAS or support public access
                    "https://" + account + ".blob.core.windows.net", sharedKeyCredential);
                    i = 1;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _b = __asyncValues(blobServiceClient.listContainers());
                    _d.label = 2;
                case 2: return [4 /*yield*/, _b.next()];
                case 3:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                    container = _c.value;
                    console.log("Container " + i++ + ": " + container.name);
                    _d.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _d.trys.push([7, , 10, 11]);
                    if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_b)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
};
/**
 * Jquery
 */
/*
interface JQuery{
    carousel():void;
}
*/
var ActivateCarousel = function () {
    $('.carousel').carousel();
};
var isNullOrUndefined = function (value) {
    if ((value === null) || (value === undefined))
        return true;
    return false;
};
var isNullOrUndefinedOrEmpty = function (value) {
    if ((value === null) || (value === undefined))
        return true;
    if (value == "")
        return true;
    return false;
};
var GetTimeString = function (seconds) {
    var format = function (val) { return ("0" + Math.floor(val)).slice(-2); };
    var hours = seconds / 3600;
    var minutes = (seconds % 3600) / 60;
    return [hours, minutes, seconds % 60].map(format).join(':');
};
var GetFileAsync = function (path) {
    return __awaiter(this, void 0, void 0, function () {
        var p, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = new Promise(function (resolve) { return GetFileAsyncFunction(resolve, path); });
                    return [4 /*yield*/, p];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
var GetFileAsyncFunction = function (resolve, path) {
    var req = new XMLHttpRequest();
    req.open('GET', path, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200)
                resolve(req.responseText);
            else
                resolve(null);
        }
    };
    req.send(null);
};
var enStrings = new Map([
    ["Start", "Start"],
    ["Play", "Play"],
    ["Pause", "Pause"],
    ["Mute", "Mute"],
    ["VolumeUp", "+"],
    ["VolumeDown", "-"],
    ["Stop", "Stop"],
    ["Repeat", "Repeat"]
]);
var frStrings = new Map([
    ["Start", "Joue"],
    ["Play", "Joue"],
    ["Pause", "Pause"],
    ["Mute", "Silence"],
    ["VolumeUp", "+"],
    ["VolumeDown", "-"],
    ["Stop", "Arrêter"],
    ["Repeat", "Répéter"],
    ["Red", "Rouge"],
    ["Blue", "Bleu"],
    ["Green", "Vert"],
    ["Orange", "Orange"],
    ["Purple", "Violet"],
    ["Yellow", "Jaune"],
    ["English", "Anglais"],
    ["German", "Allemand"],
    ["Italian", "Italien"],
    ["French", "Français"],
    ["Portuguese", "Portugais"],
    ["Configure your application: color, language", "Configuration de votre application, couleur, langage"],
    ["Settings Page", "Page de Configuration"],
    ["Color:", "Couleur:"],
    ["Language:", "Langage:"],
    ["Music Page", "Page de musique"],
    ["TV Page", "Page de TV"],
    ["Home Page", "Page d'Accueil"],
    ["Video Page", "Page de Vidéos"],
    ["Device Page", "Page des dispositifs audio"],
    ["Back to Home", "Retour à l'acceuil"],
    ["Test Media Web Application &copy;", "Test Media Web Application &copy;"],
    ["Feel free to download the code from:", "N'hésitez pas à télécharger le code ici:"],
    ["Web Media App", "Web Media App"],
    ["HOME", "ACCUEIL"],
    ["MUSIC", "MUSIQUE"],
    ["VIDEO", "VIDEO"],
    ["RADIO", "RADIO"],
    ["TV", "TV"],
    ["DEVICE", "APPAREIL"],
    ["SETTINGS", "PARAMETRES"],
    ["Music Page", "Page de Musique"],
    ["Play your Music", "Jouer vos contenus musicaux"],
    ["Radio Page", "Page des radios"],
    ["Play your radio stations", "Ecouter vos stations de radios"],
    ["Video Page", "Page des vidéos"],
    ["Play your video files", "Visualiser vos vidéos"],
    ["TV Page", "Page Télévision"],
    ["Play your TV channels", "Regarder vos chaines de télévision"],
    ["Device Page", "Page des appareils"],
    ["Explore your local devices", "Explorer vos appareils sur le réseau"],
    ["Home Page", "Page d'acceuil"],
    ["Explore your media", "Explorer et jouer vos contenus multi-média"],
]);
var strings = new Map([
    ["en", enStrings],
    ["fr", frStrings]
]);
var GetCurrentString = function (id) {
    var localStrings = strings.get(GlobalVars.globalLanguage);
    if (!isNullOrUndefined(localStrings)) {
        var s = localStrings.get(id);
        if (!isNullOrUndefined(s)) {
            return s;
        }
    }
    return id;
};
/**
 * Media playback mode
 */
var MediaPlaybackMode;
(function (MediaPlaybackMode) {
    MediaPlaybackMode[MediaPlaybackMode["NoLoop"] = 0] = "NoLoop";
    MediaPlaybackMode[MediaPlaybackMode["Loop"] = 1] = "Loop";
    MediaPlaybackMode[MediaPlaybackMode["PlaylistLoop"] = 2] = "PlaylistLoop";
})(MediaPlaybackMode || (MediaPlaybackMode = {}));
var GlobalVars = /** @class */ (function () {
    function GlobalVars() {
    }
    GlobalVars.globalPlaybackLoop = MediaPlaybackMode.Loop;
    GlobalVars.globalLanguage = "en";
    GlobalVars.globalColor = "blue";
    return GlobalVars;
}());
//# sourceMappingURL=index.js.map