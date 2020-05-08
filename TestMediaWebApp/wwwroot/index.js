var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
/*
import { isNullOrUndefined, GetCurrentString, GetTimeString, ActivateCarousel } from "./Common";
import {IMediaView, MediaPlaybackMode} from "./IMediaView";
import {IMediaObject} from "./IMediaObject";
*/
/**
 * Media view
 */
class MediaView {
    constructor(id = "", oneItemNavigation = false, playbackMode = MediaPlaybackMode.NoLoop) {
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
    GetId() { return this._id; }
    GetRoot() { return this._root; }
    SetRoot(value) {
        this._root = value;
        if (isNullOrUndefined(this._current))
            this._current = value;
        this.CheckTree(this._root);
    }
    IsOneItemNavigation() { return this._oneItemNavigation; }
    SetOneItemNavigation(value) { this._oneItemNavigation = value; }
    GetPlaybackMode() { return this._playbackMode; }
    SetPlaybackMode(value) { this._playbackMode = value; }
    GetCurrentMediaObject() { return this._current; }
    SetCurrentMediaObject(value) { this._current = value; }
    GetCurrentViewParentMediaObject() { return this._currentViewParentObject; }
    SetCurrentViewParentMediaObject(value) { this._currentViewParentObject = value; }
    GetIndexActiveMediaMediaObject() { return this._indexActiveMediaObject; }
    SetIndexActiveMediaMediaObject(value) { this._indexActiveMediaObject = value; }
    static CreateViewManager(id = "", oneItemNavigation = false, playbackMode = MediaPlaybackMode.NoLoop) {
        return new MediaView(id, oneItemNavigation, playbackMode);
    }
    ;
    GetParentButtonId(index) {
        return this._parentButtonId + index;
    }
    GetChildButtonId(index) {
        return this._childButtonId + index;
    }
    GetPreviousButtonId(index) {
        return this._previousButtonId + index;
    }
    GetNextButtonId(index) {
        return this._nextButtonId + index;
    }
    GetStartButtonId(index) {
        return this._startButtonId + index;
    }
    GetStopButtonId(index) {
        return this._stopButtonId + index;
    }
    GetPlayButtonId(index) {
        return this._playButtonId + index;
    }
    GetPauseButtonId(index) {
        return this._pauseButtonId + index;
    }
    GetMuteButtonId(index) {
        return this._muteButtonId + index;
    }
    GetUnmuteButtonId(index) {
        return this._unmuteButtonId + index;
    }
    GetVolumeUpButtonId(index) {
        return this._volumeUpButtonId + index;
    }
    GetVolumeDownButtonId(index) {
        return this._volumeDownButtonId + index;
    }
    GetLoopButtonId(index) {
        return this._loopButtonId + index;
    }
    GetPlayListLoopButtonId(index) {
        return this._playlistloopButtonId + index;
    }
    GetNoLoopButtonId(index) {
        return this._noloopButtonId + index;
    }
    GetAudioId(index) {
        return this._audioId + index;
    }
    GetVideoId(index) {
        return this._videoId + index;
    }
    GetAudioSourceId(index) {
        return this._audioSourceId + index;
    }
    GetVideoSourceId(index) {
        return this._videoSourceId + index;
    }
    GetDurationId(index) {
        return this._durationId + index;
    }
    GetSliderId(index) {
        return this._sliderId + index;
    }
    GetPositionId(index) {
        return this._positionId + index;
    }
    // View Methods
    CreateView(current) {
        return "";
    }
    CreatePreview(current) {
        return "";
    }
    RenderView() {
        return this.InternalRenderMedia();
    }
    NavigateToParent(cur) {
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
    }
    NavigateToChild(cur) {
        var current = cur;
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
    }
    NavigateToPrevious(cur) {
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
    }
    NavigateToNext(cur) {
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
    }
    CheckTree(cur) {
        if (!isNullOrUndefined(cur)) {
            if (cur.HasChild()) {
                for (let i = 0; i < cur.GetChildrenLength(); i++) {
                    let child = cur.GetChildWithIndex(i);
                    child.SetParent(cur);
                    this.CheckTree(child);
                }
            }
        }
    }
    /****************************************************************************/
    /* EVents associated with the controls on the page                          */
    /****************************************************************************/
    NavigateToChildEvent(control, mo, v) {
        if (!isNullOrUndefined(v))
            v.NavigateToChild(mo);
    }
    NavigateToParentEvent(control, mo, v) {
        if (!isNullOrUndefined(v))
            v.NavigateToParent(mo);
    }
    NavigateToNextEvent(control, mo, v) {
        if (!isNullOrUndefined(v))
            v.NavigateToNext(mo);
    }
    NavigateToPreviousEvent(control, mo, v) {
        if (!isNullOrUndefined(v))
            v.NavigateToPrevious(mo);
    }
    EventStopMedia(button, mo, v) {
        v.StopMedia(mo);
    }
    StopMedia(mo) {
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
    }
    StartMedia(mo) {
        let parent = mo.GetParent();
        if (this.GetIndexActiveMediaMediaObject() >= 0) {
            if (!isNullOrUndefined(parent)) {
                let mostop = parent.GetChildWithIndex(this.GetIndexActiveMediaMediaObject());
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
    }
    EventStartMedia(button, mo, v) {
        v.StartMedia(mo);
    }
    PauseMedia(button, mo, v) {
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
    }
    PlayMedia(button, mo, v) {
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
    }
    MuteMedia(button, mo, v) {
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
    }
    UnmuteMedia(button, mo, v) {
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
    }
    UpdateAllLoopButtons(mo) {
        let parent = mo.GetParent();
        if (!isNullOrUndefined(parent)) {
            for (var k = 0; k < parent.GetChildrenLength(); k++) {
                this.UpdateLoopButton(parent.GetChildWithIndex(k));
            }
        }
    }
    UpdateLoopButton(mo) {
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
    }
    LoopMedia(button, mo, v) {
        v.SetPlaybackMode(MediaPlaybackMode.Loop);
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-mode", "loop");
        v.UpdateAllLoopButtons(mo);
    }
    PlaylistLoopMedia(button, mo, v) {
        v.SetPlaybackMode(MediaPlaybackMode.PlaylistLoop);
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-mode", "playlistloop");
        v.UpdateAllLoopButtons(mo);
    }
    NoLoopMedia(button, mo, v) {
        v.SetPlaybackMode(MediaPlaybackMode.NoLoop);
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-mode", "noloop");
        v.UpdateAllLoopButtons(mo);
    }
    VolumeUpMedia(button, mo, v) {
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
    }
    VolumeDownMedia(button, mo, v) {
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
    }
    EventPlayingMedia(button, mo, v) {
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
    }
    EventPlayMedia(button, mo, v) {
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
    }
    EventPauseMedia(button, mo, v) {
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
    }
    EventVolumeChangeMedia(button, mo, v) {
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
    }
    EventTimeUpdateMedia(button, mo, v) {
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
    }
    EventEndedMedia(button, mo, v) {
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
    }
    InputSliderMedia(slider, mo, v) {
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
    }
    registerEvent(event, id, mo, callback) {
        var button = document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.addEventListener(event, (function (view, object) {
                return function () {
                    callback(this, object, view);
                };
            })(this, mo), false);
        }
    }
    displayButton(id) {
        var button = document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.disabled = false;
            button.style.display = "block";
        }
    }
    hideButton(id) {
        var button = document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.style.display = "none";
        }
    }
    InternalRenderMedia() {
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
                let Index = parent.GetChildWithIndex(i).GetIndex();
                this.registerEvent("click", this.GetParentButtonId(Index), parent.GetChildWithIndex(i), this.NavigateToParentEvent);
                this.registerEvent("click", this.GetChildButtonId(Index), parent.GetChildWithIndex(i), this.NavigateToChildEvent);
                this.registerEvent("click", this.GetNextButtonId(Index), parent.GetChildWithIndex(i), this.NavigateToNextEvent);
                this.registerEvent("click", this.GetPreviousButtonId(Index), parent.GetChildWithIndex(i), this.NavigateToPreviousEvent);
                this.registerEvent("click", this.GetStartButtonId(Index), parent.GetChildWithIndex(i), this.EventStartMedia);
                this.displayButton(this.GetStartButtonId(Index));
                this.registerEvent("click", this.GetStopButtonId(Index), parent.GetChildWithIndex(i), this.EventStopMedia);
                this.hideButton(this.GetStopButtonId(Index));
                this.registerEvent("click", this.GetPauseButtonId(Index), parent.GetChildWithIndex(i), this.PauseMedia);
                this.hideButton(this.GetPauseButtonId(Index));
                this.registerEvent("click", this.GetPlayButtonId(Index), parent.GetChildWithIndex(i), this.PlayMedia);
                this.hideButton(this.GetPlayButtonId(Index));
                this.registerEvent("click", this.GetMuteButtonId(Index), parent.GetChildWithIndex(i), this.MuteMedia);
                this.hideButton(this.GetMuteButtonId(Index));
                this.registerEvent("click", this.GetUnmuteButtonId(Index), parent.GetChildWithIndex(i), this.UnmuteMedia);
                this.hideButton(this.GetUnmuteButtonId(Index));
                /* Update Loop button status */
                this.UpdateLoopButton(parent.GetChildWithIndex(i));
                this.registerEvent("click", this.GetLoopButtonId(Index), parent.GetChildWithIndex(i), this.LoopMedia);
                this.registerEvent("click", this.GetNoLoopButtonId(Index), parent.GetChildWithIndex(i), this.NoLoopMedia);
                this.registerEvent("click", this.GetPlayListLoopButtonId(Index), parent.GetChildWithIndex(i), this.PlaylistLoopMedia);
                this.registerEvent("click", this.GetVolumeUpButtonId(Index), parent.GetChildWithIndex(i), this.VolumeUpMedia);
                this.registerEvent("click", this.GetVolumeDownButtonId(Index), parent.GetChildWithIndex(i), this.VolumeDownMedia);
                this.registerEvent("playing", this.GetAudioId(Index), parent.GetChildWithIndex(i), this.EventPlayingMedia);
                this.registerEvent("play", this.GetAudioId(Index), parent.GetChildWithIndex(i), this.EventPlayMedia);
                this.registerEvent("pause", this.GetAudioId(Index), parent.GetChildWithIndex(i), this.EventPauseMedia);
                this.registerEvent("volumechange", this.GetAudioId(Index), parent.GetChildWithIndex(i), this.EventVolumeChangeMedia);
                this.registerEvent("timeupdate", this.GetAudioId(Index), parent.GetChildWithIndex(i), this.EventTimeUpdateMedia);
                this.registerEvent("ended", this.GetAudioId(Index), parent.GetChildWithIndex(i), this.EventEndedMedia);
                this.registerEvent("input", this.GetSliderId(Index), parent.GetChildWithIndex(i), this.InputSliderMedia);
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
    }
}
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Photo
 */
class Home extends MediaObject {
}
/**
 * HomeView
 */
class HomeView extends MediaView {
    RenderView() {
        return this.InternalRenderMedia();
    }
    CreateView(current) {
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
    }
    CreatePreview() {
        return "<div><label>Home Preview</label></div>";
    }
}
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Menu
 */
class Menu extends MediaObject {
}
/**
 * MenuView
 */
class MenuView extends MediaView {
    RenderView() {
        return this.InternalRenderMedia();
    }
    CreateView(current) {
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
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Playlist
 */
class Playlist extends MediaObject {
}
/**
 * PlaylistView
 */
class PlaylistView extends MediaView {
    RenderView() {
        return this.InternalRenderMedia();
    }
    CreateView(current) {
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
    }
    CreatePreview() {
        return "<div><label>Playlist Preview</label><button id=\"parentButtonId\">Left</button><button id=\"upButtonId\">Up</button><button id=\"downButtonId\">Down</button><button id=\"playButtonId\">Play</button><button id=\"childButtonId\">Child</button></div>";
    }
}
/*
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Music
 */
class Music extends MediaObject {
}
/**
 * MusicView
 */
class MusicView extends MediaView {
    RenderView() {
        return this.InternalRenderMedia();
    }
    CreateView(current) {
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
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
/*
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
class Radio extends MediaObject {
}
class RadioView extends MediaView {
    RenderView() {
        return this.InternalRenderMedia();
    }
    CreateView(current) {
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
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * TV
 */
class TV extends MediaObject {
}
/**
 * TVView
 */
class TVView extends MediaView {
    RenderView() {
        return this.InternalRenderMedia();
    }
    CreateView(current) {
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
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Photo
 */
class Photo extends MediaObject {
}
/**
 * PhotoView
 */
class PhotoView extends MediaView {
    RenderView() {
        return this.InternalRenderMedia();
    }
    CreateView(current) {
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
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Video
 */
class Video extends MediaObject {
}
/**
 * VideoView
 */
class VideoView extends MediaView {
    RenderView() {
        return this.InternalRenderMedia();
    }
    CreateView(current) {
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
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
/*
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    BlobDownloadResponseModel
  } from "@azure/storage-blob";
import { MediaPlaybackMode} from "./IMediaView";
*/
/*
const { BlobServiceClient } = require("@azure/storage-blob");
*/
var TestAzureStorage = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const account = "mediacloud";
        const accountKey = "9y4eAbrgpCRtP72wXamkJcUOV8ph1NEPlHtQcBZlDOYh1gNI/g6Vz4JP3xFHMAlKqn4/2JX3c9FLILo5u7k5YA==";
        const sharedKeyCredential = "?sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
        const blobSasUrl = "https://mediacloud.blob.core.windows.net/?sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
        const containerName = "music";
        var sasString = "sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
        /*
        // Create a new BlobServiceClient
        const blobServiceClient = new BlobServiceClient(blobSasUrl);
        //const blobServiceClient = BlobServiceClient.fromConnectionString("BlobEndpoint=https://mediacloud.blob.core.windows.net/;SharedAccessSignature=sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D");
    
    
        const containerClient = blobServiceClient.getContainerClient(containerName);
    
        try {
            let iter = containerClient.listBlobsFlat();
            let blobItem = await iter.next();
            while (!blobItem.done) {
                blobItem = await iter.next();
            }
        } catch (error) {
        }
    */
        const containerURL = new azblob.ContainerURL(`https://${account}.blob.core.windows.net/${containerName}?${sasString}`, azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));
        try {
            let counter = 0;
            let marker = undefined;
            do {
                const listBlobsResponse = yield containerURL.listBlobFlatSegment(azblob.Aborter.none, marker);
                marker = listBlobsResponse.nextMarker;
                const items = listBlobsResponse.segment.blobItems;
                for (const blob of items) {
                    console.log(blob.name);
                    counter++;
                }
            } while (marker);
            if (counter > 0) {
                console.log("Done");
            }
            else {
                console.log("No file found");
            }
        }
        catch (error) {
        }
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
    const format = val => `0${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;
    return [hours, minutes, seconds % 60].map(format).join(':');
};
var GetFileAsync = function (path) {
    return __awaiter(this, void 0, void 0, function* () {
        const p = new Promise(resolve => GetFileAsyncFunction(resolve, path));
        const result = yield p;
        return result;
    });
};
var GetFileAsyncFunction = function (resolve, path) {
    let req = new XMLHttpRequest();
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
class GlobalVars {
}
GlobalVars.globalPlaybackLoop = MediaPlaybackMode.Loop;
GlobalVars.globalLanguage = "en";
GlobalVars.globalColor = "blue";
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { IMediaView } from "./IMediaView";
import { MediaView } from "./MediaView";
import { Menu } from "./Menu";
import { Music, MusicView } from "./Music";
import { Radio, RadioView } from "./Radio";
import { Playlist } from "./Playlist";
import { Home } from "./Home";
import { MediaPlaybackMode } from "./IMediaView";
import { GlobalVars, GetCurrentString, TestAzureStorage} from "./Common";
*/
var BuildMediaObjects = function () {
    const home = new Home("Home", "Main Menu", "", "assets/img/Home.png", "", "");
    const playlist = new Playlist("playlist1", "", "", "assets/img/Home.png", "", "");
    const menuTV = new Menu("TV", "Watch your TV program", "", "assets/img/TV.png", "", "");
    const menuVideos = new Menu("Videos", "Watch your videos", "", "assets/img/Videos.png", "", "");
    const menuMusic = new Menu("Music", "Listen your music", "", "assets/img/Music.png", "", "");
    const menuPhotos = new Menu("Photos", "Watch your photos", "", "assets/img/Pictures.png", "", "");
    const menuRadio = new Menu("Radio", "Listen radios", "", "assets/img/Radio.png", "", "");
    const menuPlaylist = new Menu("Playlist", "Listen your Playlist", "", "assets/img/Playlist.png", "", "");
    const music1 = new Music("Planet Claire", "The B-52's - Play Loud - Planet Claire", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music2 = new Music("Rock Lobster", "The B-52's - Play Loud - Rock Lobster", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const album1 = new Music("Play Loud", "The B-52's - Play Loud", "", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const artist1 = new Music("The B-52's", "The B-52's", "", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    album1.AddChild(music1);
    album1.AddChild(music2);
    artist1.AddChild(album1);
    menuMusic.AddChild(artist1);
    const radio1 = new Radio("France Inter", "Radio France - France Inter", "http://direct.franceinter.fr/live/franceinter-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/franceinter.png", "", "");
    const radio2 = new Radio("France Musique", "Radio France - France Musique", "http://direct.franceinter.fr/live/francemusique-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/francemusique.png", "", "");
    menuRadio.AddChild(radio1);
    menuRadio.AddChild(radio2);
    home.AddChild(menuRadio);
    menuPlaylist.AddChild(playlist);
    home.AddChild(menuTV);
    home.AddChild(menuVideos);
    home.AddChild(menuMusic);
    home.AddChild(menuPhotos);
    home.AddChild(menuPlaylist);
    return home;
};
var BuildMediaMusicObjects = function () {
    //    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    const menuMusic = new Music("Music", "Listen your music", "", "assets/img/Music.png", "", "");
    const music1 = new Music("Planet Claire", "The B-52's - Play Loud - Planet Claire", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg", "", "");
    const music2 = new Music("Rock Lobster", "The B-52's - Play Loud - Rock Lobster", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg", "", "");
    const album1 = new Music("Play Loud", "The B-52's - Play Loud", "", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg", "", "");
    const album2 = new Music("Cosmic Thing", "The B-52's - Cosmic Thing", "", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    //    const artist1 : MediaObject = new Music("The B-52's","Explore the albums","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const artist1 = new Music("The B-52's", "Explore the albums", "", "", "", "");
    const music11 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music12 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music13 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music14 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music15 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music16 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music17 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music18 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music19 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music20 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music21 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music22 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music23 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music24 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music25 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music26 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music27 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music28 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music29 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    album1.AddChild(music1);
    album1.AddChild(music2);
    album2.AddChild(music11);
    album2.AddChild(music12);
    album2.AddChild(music13);
    album2.AddChild(music14);
    album2.AddChild(music15);
    album2.AddChild(music16);
    album2.AddChild(music17);
    album2.AddChild(music18);
    album2.AddChild(music19);
    album2.AddChild(music20);
    album2.AddChild(music21);
    album2.AddChild(music22);
    album2.AddChild(music23);
    album2.AddChild(music24);
    album2.AddChild(music25);
    album2.AddChild(music26);
    album2.AddChild(music27);
    album2.AddChild(music28);
    album2.AddChild(music29);
    artist1.AddChild(album1);
    artist1.AddChild(album2);
    menuMusic.AddChild(artist1);
    return menuMusic;
};
var BuildMediaRadioObjects = function () {
    //    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    const menuRadio = new Radio("Radio", "Listen your favorite radios", "", "assets/img/Radio.png", "", "");
    const radio1 = new Radio("France Inter", "Radio France - France Inter", "http://direct.franceinter.fr/live/franceinter-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/franceinter.png", "", "");
    const radio2 = new Radio("RMC", "Radio Monte Carlo", "http://rmc.bfmtv.com/rmcinfo-mp3", "https://mediacloud.blob.core.windows.net/radio/rmc.png", "", "");
    const radio3 = new Radio("EUROPE1", "Europe 1", "http://ais-live.cloud-services.paris:8000/europe1.mp3", "https://mediacloud.blob.core.windows.net/radio/europe1.png", "", "");
    const radio4 = new Radio("RTL", "Radio Télévision Luxembourg", "http://streaming.radio.rtl.fr/rtl-1-44-96", "https://mediacloud.blob.core.windows.net/radio/rtl.png", "", "");
    const radio5 = new Radio("France Musique", "Radio France - France Musique", "http://direct.franceinter.fr/live/francemusique-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/francemusique.png", "", "");
    const radio6 = new Radio("France Culture", "Radio France - France Culture", "http://direct.franceculture.fr/live/franceculture-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/fc.png", "", "");
    const radio7 = new Radio("France Info", "Radio France - France Info", "http://direct.franceinfo.fr/live/franceinfo-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/franceinfo.png", "", "");
    const radio8 = new Radio("FIP", "Radio France - France Inter Paris", "http://direct.fipradio.fr/live/fip-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/fip.png", "", "");
    const radio9 = new Radio("France Bleu Armorique", "Radio France - France Bleu Armorique", "http://direct.francebleu.fr/live/fbarmorique-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/armorique.png", "", "");
    //    const radioGroup : MediaObject = new Radio("Radio France","Autres stations","","https://mediacloud.blob.core.windows.net/radio/fc.png","","");
    const radioGroup = new Radio("Radio France", "Autres stations", "", "", "", "");
    /*
        menuRadio.AddChild(radio5);
        
        menuRadio.AddChild(radio6);
        
        menuRadio.AddChild(radio7);
        menuRadio.AddChild(radio8);
        menuRadio.AddChild(radio9);
    
    */
    radioGroup.AddChild(radio5);
    radioGroup.AddChild(radio6);
    radioGroup.AddChild(radio7);
    radioGroup.AddChild(radio8);
    radioGroup.AddChild(radio9);
    menuRadio.AddChild(radioGroup);
    menuRadio.AddChild(radio1);
    menuRadio.AddChild(radio2);
    menuRadio.AddChild(radio3);
    menuRadio.AddChild(radio4);
    return menuRadio;
};
var RenderMediaObjects = function (id) {
    mediaPointer = BuildMediaObjects();
    if (!isNullOrUndefined(mediaPointer)) {
        mediaView = new MediaView("mainview", false, MediaPlaybackMode.NoLoop);
        mediaView.SetRoot(mediaPointer);
        mediaView.SetCurrentMediaObject(mediaPointer);
        mediaView.SetIndexActiveMediaMediaObject(-1);
        mediaView.RenderView();
    }
};
var HideBurgerMenu = function () {
    var button = document.getElementById("mediaburgerbutton");
    if (!isNullOrUndefined(button)) {
        button.classList.add("collapsed");
    }
    var nav = document.getElementById("navbarsExampleDefault");
    if (!isNullOrUndefined(nav)) {
        nav.classList.remove("show");
    }
};
var RenderMusicPage = function (id) {
    RenderMusicPageAsync(id).then(value => {
    });
};
window.RenderMusicPage = RenderMusicPage;
var RenderMusicPageAsync = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        var source = "{\"_type\":\"Music\",\"_title\":\"Music\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"The B-52's\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Play Loud\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Planet Claire\",\"_mediaChildList\":[],\"_path\":\"/Play Loud/Planet Claire\",\"_description\":\"The B-52's - Play Loud - Planet Claire\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Rock Lobster\",\"_mediaChildList\":[],\"_path\":\"/Play Loud/Rock Lobster\",\"_description\":\"The B-52's - Play Loud - Rock Lobster\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1}],\"_path\":\"/The B-52's/Play Loud\",\"_description\":\"The B-52's - Play Loud\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Cosmic Thing\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":2},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":3},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":4},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":5},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":6},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":7},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":8},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":9},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":10},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":11},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":12},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":13},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":14},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":15},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":16},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":17},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":18}],\"_path\":\"/The B-52's/Cosmic Thing\",\"_description\":\"The B-52's - Cosmic Thing\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1}],\"_path\":\"/Music/The B-52's\",\"_description\":\"Explore the albums\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0}],\"_path\":\"/Music\",\"_description\":\"Listen your music\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"assets/img/Music.png\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null}";
        var object;
        mediaPointer = BuildMediaMusicObjects();
        if (!isNullOrUndefined(mediaPointer)) {
            if (true) {
                //var source: string = MediaObject.Serialize(mediaPointer);
                //source = await GetFileAsync("musicobject.json");
                object = MediaObject.Deserialize(source);
                if (!isNullOrUndefined(object)) {
                    mediaPointer = object;
                }
            }
            mediaView = new MusicView("mainview", false, GlobalVars.globalPlaybackLoop);
            mediaView.SetRoot(mediaPointer);
            mediaView.SetCurrentMediaObject(mediaPointer);
            mediaView.SetIndexActiveMediaMediaObject(-1);
            mediaView.RenderView();
        }
        HideBurgerMenu();
        /* Reinitialize last audio/video index */
        mediaView.SetIndexActiveMediaMediaObject(-1);
        return;
    });
};
var RenderRadioPage = function (id) {
    TestAzureStorage();
    mediaPointer = BuildMediaRadioObjects();
    if (!isNullOrUndefined(mediaPointer)) {
        mediaView = new RadioView("mainview", false, GlobalVars.globalPlaybackLoop);
        mediaView.SetRoot(mediaPointer);
        mediaView.SetCurrentMediaObject(mediaPointer);
        mediaView.SetIndexActiveMediaMediaObject(-1);
        mediaView.RenderView();
    }
    HideBurgerMenu();
    return;
};
window.RenderRadioPage = RenderRadioPage;
var RenderVideoPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"video\" class=\"tab-pane\"><h3>" + GetCurrentString('Video Page') + "</h3><p>" + GetCurrentString('Play your video files') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
window.RenderVideoPage = RenderVideoPage;
var RenderTVPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"tv\" class=\"tab-pane\"><h3>" + GetCurrentString('TV Page') + "</h3><p>" + GetCurrentString('Play your TV channels') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
window.RenderTVPage = RenderTVPage;
var RenderDevicePage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"device\" class=\"tab-pane\"><h3>" + GetCurrentString('Device Page') + "</h3><p>" + GetCurrentString('Explore your local devices') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
window.RenderDevicePage = RenderDevicePage;
var LanguageSelectionChanged = function () {
    var s = document.getElementById('languageselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)) {
        GlobalVars.globalLanguage = value;
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-language", GlobalVars.globalLanguage);
        UpdateMainPageText();
    }
};
window.LanguageSelectionChanged = LanguageSelectionChanged;
var ChangeLanguageSelection = function (lang) {
    var s = document.getElementById('languageselection');
    if (!isNullOrUndefined(s)) {
        for (var i = 0; i < s.options.length; i++) {
            if (s.options[i].value == lang) {
                s.options.selectedIndex = i;
                break;
            }
        }
    }
};
var ColorSelectionChanged = function () {
    var s = document.getElementById('colorselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)) {
        GlobalVars.globalColor = value;
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-color", GlobalVars.globalColor);
        document.documentElement.setAttribute('theme', GlobalVars.globalColor);
    }
};
window.ColorSelectionChanged = ColorSelectionChanged;
var ChangeColorSelection = function (color) {
    var s = document.getElementById('colorselection');
    if (!isNullOrUndefined(s)) {
        for (var i = 0; i < s.options.length; i++) {
            if (s.options[i].value == color) {
                s.options.selectedIndex = i;
                break;
            }
        }
    }
};
var RenderSettingPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    var result = "<div class='media-template'><div id='setting' class='tab-pane'><h3>" + GetCurrentString('Settings Page') + "</h3><p>" + GetCurrentString('Configure your application: color, language') + "</p>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Color:') + "</strong></label><div class='col-sm-8'> \
    <select id='colorselection' class='selectpicker' onchange='window.ColorSelectionChanged();' > \
    <option value='red' style='background-color:var(--media-button-bg-red-color)'>" + GetCurrentString('Red') + "</option> \
    <option value='green' style='background-color:var(--media-button-bg-green-color)'>" + GetCurrentString('Green') + "</option> \
    <option value='blue' style='background-color:var(--media-button-bg-blue-color)'>" + GetCurrentString('Blue') + "</option> \
    <option value='yellow' style='background-color:var(--media-button-bg-yellow-color)'>" + GetCurrentString('Yellow') + "</option> \
    <option value='purple' style='background-color:var(--media-button-bg-purple-color)'>" + GetCurrentString('Purple') + "</option> \
    <option value='orange' style='background-color:var(--media-button-bg-orange-color)'>" + GetCurrentString('Orange') + "</option> \
    </select></div></div>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Language:') + "</strong></label><div class='col-sm-8'><select id='languageselection'  class='selectpicker' onchange='window.LanguageSelectionChanged();'  > \
    <option value='en' >" + GetCurrentString('English') + "</option> \
    <option value='fr' >" + GetCurrentString('French') + "</option> \
    <option value='de' >" + GetCurrentString('German') + "</option> \
    <option value='it' >" + GetCurrentString('Italian') + "</option> \
    <option value='pt' >" + GetCurrentString('Portuguese') + "</option> \
    </select></div></div></div></div>";
    div.innerHTML = result;
    HideBurgerMenu();
    ChangeColorSelection(GlobalVars.globalColor);
    ChangeLanguageSelection(GlobalVars.globalLanguage);
    return;
};
window.RenderSettingPage = RenderSettingPage;
var RenderHomePage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"home\" class=\"tab-pane\"><h3>" + GetCurrentString('Home Page') + "</h3><p>" + GetCurrentString('Explore your media') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
// Export method:
window.RenderHomePage = RenderHomePage;
var UpdateMainPageText = function () {
    var s = document.getElementById('backHomePage');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("Back to Home");
    }
    var d = document.getElementById('footerTitle');
    if (!isNullOrUndefined(d)) {
        d.innerHTML = GetCurrentString("Test Media Web Application &copy;");
    }
    var d = document.getElementById('footerMessage');
    if (!isNullOrUndefined(d)) {
        d.innerHTML = GetCurrentString("Feel free to download the code from:");
    }
    s = document.getElementById('appName');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("Web Media App");
    }
    s = document.getElementById('homeTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("HOME");
    }
    s = document.getElementById('musicTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("MUSIC");
    }
    s = document.getElementById('tvTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("TV");
    }
    s = document.getElementById('videoTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("VIDEO");
    }
    s = document.getElementById('radioTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("RADIO");
    }
    s = document.getElementById('deviceTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("DEVICE");
    }
    s = document.getElementById('settingsTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("SETTINGS");
    }
};
var mediaView;
var mediaPointer;
var InitializeMediaApp = function (id, lang, col, mode) {
    GlobalVars.globalLanguage = lang;
    GlobalVars.globalColor = col;
    var currentMode = mode;
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        var language = localStorage.getItem("mediawebapp-language");
        if (isNullOrUndefined(language)) {
            localStorage.setItem("mediawebapp-language", GlobalVars.globalLanguage);
        }
        else {
            GlobalVars.globalLanguage = language;
        }
        var color = localStorage.getItem("mediawebapp-color");
        if (isNullOrUndefined(color)) {
            localStorage.setItem("mediawebapp-color", GlobalVars.globalColor);
        }
        else {
            GlobalVars.globalColor = color;
        }
        var pmode = localStorage.getItem("mediawebapp-mode");
        if (isNullOrUndefined(pmode)) {
            localStorage.setItem("mediawebapp-mode", currentMode);
        }
        else {
            currentMode = pmode;
        }
    }
    UpdateMainPageText();
    document.documentElement.setAttribute('theme', GlobalVars.globalColor);
    GlobalVars.globalPlaybackLoop = MediaPlaybackMode.NoLoop;
    if (currentMode == "loop")
        GlobalVars.globalPlaybackLoop = MediaPlaybackMode.Loop;
    if (currentMode == "playlistloop")
        GlobalVars.globalPlaybackLoop = MediaPlaybackMode.PlaylistLoop;
    RenderHomePage(id);
};
// Export method:
window.InitializeMediaApp = InitializeMediaApp;
// "noloop", "loop", "playlistloop"
//InitializeMediaApp("mainview", "en", "blue", "noloop");
//# sourceMappingURL=index.js.map