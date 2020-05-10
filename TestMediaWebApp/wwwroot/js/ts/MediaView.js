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
//# sourceMappingURL=MediaView.js.map