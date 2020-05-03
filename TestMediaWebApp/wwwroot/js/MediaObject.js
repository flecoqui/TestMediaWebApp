var MediaObjectPlaybackMode;
(function (MediaObjectPlaybackMode) {
    MediaObjectPlaybackMode[MediaObjectPlaybackMode["NoLoop"] = 0] = "NoLoop";
    MediaObjectPlaybackMode[MediaObjectPlaybackMode["Loop"] = 1] = "Loop";
    MediaObjectPlaybackMode[MediaObjectPlaybackMode["PlaylistLoop"] = 2] = "PlaylistLoop";
})(MediaObjectPlaybackMode || (MediaObjectPlaybackMode = {}));
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
        this._mediaParent = null;
    }
    GetParentButtonId() {
        return MediaObject._parentButtonId + this._index;
    }
    GetChildButtonId() {
        return MediaObject._childButtonId + this._index;
    }
    GetPreviousButtonId() {
        return MediaObject._previousButtonId + this._index;
    }
    GetNextButtonId() {
        return MediaObject._nextButtonId + this._index;
    }
    GetStartButtonId() {
        return MediaObject._startButtonId + this._index;
    }
    GetStopButtonId() {
        return MediaObject._stopButtonId + this._index;
    }
    GetPlayButtonId() {
        return MediaObject._playButtonId + this._index;
    }
    GetPauseButtonId() {
        return MediaObject._pauseButtonId + this._index;
    }
    GetMuteButtonId() {
        return MediaObject._muteButtonId + this._index;
    }
    GetUnmuteButtonId() {
        return MediaObject._unmuteButtonId + this._index;
    }
    GetVolumeUpButtonId() {
        return MediaObject._volumeUpButtonId + this._index;
    }
    GetVolumeDownButtonId() {
        return MediaObject._volumeDownButtonId + this._index;
    }
    GetLoopButtonId() {
        return MediaObject._loopButtonId + this._index;
    }
    GetPlayListLoopButtonId() {
        return MediaObject._playlistloopButtonId + this._index;
    }
    GetNoLoopButtonId() {
        return MediaObject._noloopButtonId + this._index;
    }
    GetAudioId() {
        return MediaObject._audioId + this._index;
    }
    GetVideoId() {
        return MediaObject._videoId + this._index;
    }
    GetAudioSourceId() {
        return MediaObject._audioSourceId + this._index;
    }
    GetVideoSourceId() {
        return MediaObject._videoSourceId + this._index;
    }
    GetDurationId() {
        return MediaObject._durationId + this._index;
    }
    GetSliderId() {
        return MediaObject._sliderId + this._index;
    }
    GetPositionId() {
        return MediaObject._positionId + this._index;
    }
    static SetMediaPlaybackMode(mode) {
        MediaObject.gPlaybackMode = mode;
    }
    SetOneItemNavigation(bOneItem) {
        MediaObject._oneItemNavigation = bOneItem;
    }
    GetOneItemNavigation() {
        return MediaObject._oneItemNavigation;
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
        /*
        if(this == MediaObject._current)
        {
            if((!isNullOrUndefined(MediaObject._stack))&&(MediaObject._stack.size()>0))
                return MediaObject._stack.peek();
        }
        return null;
        */
        return this._mediaParent;
    }
    SetParent(parent) {
        /*
        if(this == MediaObject._current)
        {
            if((!isNullOrUndefined(MediaObject._stack))&&(MediaObject._stack.size()>0))
                return MediaObject._stack.peek();
        }
        return null;
        */
        this._mediaParent = parent;
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
    NavigateToParent() {
        var mediaPointer = this;
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
        newPointer.RenderMedia(newPointer.GetParent());
        return;
    }
    NavigateToChild() {
        var mediaPointer = this;
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
        newPointer.RenderMedia(this);
        return;
    }
    NavigateToPrevious() {
        var mediaPointer = this;
        if (isNullOrUndefined(mediaPointer)) {
            return;
        }
        var newPointer = mediaPointer.GetPrevious();
        if (isNullOrUndefined(newPointer))
            return;
        newPointer.RenderMedia(this.GetParent());
        return;
    }
    NavigateToNext() {
        var mediaPointer = this;
        if (isNullOrUndefined(mediaPointer)) {
            return;
        }
        var newPointer = mediaPointer.GetNext();
        if (isNullOrUndefined(newPointer))
            return;
        newPointer.RenderMedia(this.GetParent());
        return;
    }
    /* Method associated with Event */
    static NavigateToParentWithIndex(k) {
        MediaObject.gParent.GetChildWithIndex(k).NavigateToParent();
    }
    static StartMediaWithIndex(k) {
        if (MediaObject.gActiveMediaObjectIndex >= 0) {
            MediaObject.StopMediaWithIndex(MediaObject.gActiveMediaObjectIndex);
        }
        var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
        if (!isNullOrUndefined(audio)) {
            var source = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioSourceId());
            if (!isNullOrUndefined(source)) {
                source.src = MediaObject.gParent.GetChildWithIndex(k).GetContentUrl();
                audio.load();
                audio.play();
            }
        }
        else {
            var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
            if (!isNullOrUndefined(video)) {
                var source = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoSourceId());
                if (!isNullOrUndefined(source)) {
                    source.src = MediaObject.gParent.GetChildWithIndex(k).GetContentUrl();
                    video.load();
                    video.play();
                }
            }
        }
        MediaObject.gActiveMediaObjectIndex = k;
    }
    static UpdateLoopButtonWithIndex(i) {
        for (var k = 0; k < MediaObject.gParent.GetChildListLength(); k++) {
            if (MediaObject.gPlaybackMode == MediaObjectPlaybackMode.NoLoop) {
                var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayListLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "none";
                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "block";
                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetNoLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "none";
            }
            if (MediaObject.gPlaybackMode == MediaObjectPlaybackMode.Loop) {
                var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayListLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "block";
                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "none";
                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetNoLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "none";
            }
            if (MediaObject.gPlaybackMode == MediaObjectPlaybackMode.PlaylistLoop) {
                var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayListLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "none";
                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "none";
                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetNoLoopButtonId());
                if (!isNullOrUndefined(control))
                    control.style.display = "block";
            }
        }
    }
    static StopMediaWithIndex(k) {
        var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
        if (!isNullOrUndefined(audio)) {
            audio.pause();
            audio.currentTime = 0;
        }
        else {
            var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
            if (!isNullOrUndefined(video)) {
                video.pause();
                video.currentTime = 0;
            }
        }
        var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetStartButtonId());
        if (!isNullOrUndefined(control)) {
            control.style.display = "block";
            control.disabled = false;
        }
        var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetStopButtonId());
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayButtonId());
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPauseButtonId());
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeUpButtonId());
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeDownButtonId());
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        MediaObject.gActiveMediaObjectIndex = -1;
    }
    RenderMedia(parent) {
        var div = document.getElementById(this.GetId());
        var button = null;
        if (isNullOrUndefined(div))
            return;
        if ((!isNullOrUndefined(parent)) && (this.GetOneItemNavigation() === false)) {
            div.innerHTML = "";
            MediaObject.gParent = parent;
            for (var i = 0; i < parent.GetChildListLength(); i++) {
                var o = parent.GetChildWithIndex(i);
                o.SetParent(parent);
                o.SetCurrentMediaObject();
                div.innerHTML += o.CreateView();
            }
            for (var i = 0; i < parent.GetChildListLength(); i++) {
                button = document.getElementById(parent.GetChildWithIndex(i).GetParentButtonId());
                if (!isNullOrUndefined(button)) {
                    button.addEventListener("click", (function (k) {
                        return function () {
                            return MediaObject.NavigateToParentWithIndex(k);
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetChildButtonId());
                if (!isNullOrUndefined(button)) {
                    button.addEventListener("click", (function (k) {
                        return function () {
                            MediaObject.gParent.GetChildWithIndex(k).NavigateToChild();
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetPreviousButtonId());
                if (!isNullOrUndefined(button)) {
                    button.addEventListener("click", (function (k) {
                        return function () {
                            MediaObject.gParent.GetChildWithIndex(k).NavigateToPrevious();
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetNextButtonId());
                if (!isNullOrUndefined(button)) {
                    button.addEventListener("click", (function (k) {
                        return function () {
                            MediaObject.gParent.GetChildWithIndex(k).NavigateToNext();
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetStartButtonId());
                if (!isNullOrUndefined(button)) {
                    button.disabled = false;
                    button.style.display = "block";
                    button.addEventListener("click", (function (k) {
                        return function () {
                            return MediaObject.StartMediaWithIndex(k);
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetStopButtonId());
                if (!isNullOrUndefined(button)) {
                    button.style.display = "none";
                    button.addEventListener("click", (function (k) {
                        return function () {
                            return MediaObject.StopMediaWithIndex(k);
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetPauseButtonId());
                if (!isNullOrUndefined(button)) {
                    button.style.display = "none";
                    button.addEventListener("click", (function (k) {
                        return function () {
                            var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if (!isNullOrUndefined(audio)) {
                                audio.pause();
                            }
                            else {
                                var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if (!isNullOrUndefined(video)) {
                                    video.pause();
                                }
                            }
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetPlayButtonId());
                if (!isNullOrUndefined(button)) {
                    button.style.display = "none";
                    button.addEventListener("click", (function (k) {
                        return function () {
                            var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if (!isNullOrUndefined(audio)) {
                                audio.play();
                            }
                            else {
                                var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if (!isNullOrUndefined(video)) {
                                    video.play();
                                }
                            }
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetMuteButtonId());
                if (!isNullOrUndefined(button)) {
                    button.style.display = "none";
                    button.addEventListener("click", (function (k) {
                        return function () {
                            var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if (!isNullOrUndefined(audio)) {
                                audio.muted = true;
                                var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = false;
                                    control.style.display = "block";
                                }
                                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = true;
                                    control.style.display = "none";
                                }
                            }
                            else {
                                var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if (!isNullOrUndefined(video)) {
                                    video.muted = true;
                                    var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = false;
                                        control.style.display = "block";
                                    }
                                    control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = true;
                                        control.style.display = "none";
                                    }
                                }
                            }
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetUnmuteButtonId());
                if (!isNullOrUndefined(button)) {
                    button.style.display = "none";
                    button.addEventListener("click", (function (k) {
                        return function () {
                            var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if (!isNullOrUndefined(audio)) {
                                audio.muted = false;
                                var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = false;
                                    control.style.display = "block";
                                }
                                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = true;
                                    control.style.display = "none";
                                }
                            }
                            else {
                                var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if (!isNullOrUndefined(video)) {
                                    video.muted = false;
                                    var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = false;
                                        control.style.display = "block";
                                    }
                                    control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = true;
                                        control.style.display = "none";
                                    }
                                }
                            }
                        };
                    })(i), false);
                }
                /* Update Loop button status */
                MediaObject.UpdateLoopButtonWithIndex(i);
                button = document.getElementById(parent.GetChildWithIndex(i).GetLoopButtonId());
                if (!isNullOrUndefined(button)) {
                    button.addEventListener("click", (function (k) {
                        return function () {
                            MediaObject.gPlaybackMode = MediaObjectPlaybackMode.Loop;
                            if (typeof (Storage) !== "undefined")
                                localStorage.setItem("mediawebapp-mode", "loop");
                            MediaObject.UpdateLoopButtonWithIndex(k);
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetNoLoopButtonId());
                if (!isNullOrUndefined(button)) {
                    button.addEventListener("click", (function (k) {
                        return function () {
                            MediaObject.gPlaybackMode = MediaObjectPlaybackMode.NoLoop;
                            if (typeof (Storage) !== "undefined")
                                localStorage.setItem("mediawebapp-mode", "noloop");
                            MediaObject.UpdateLoopButtonWithIndex(k);
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetPlayListLoopButtonId());
                if (!isNullOrUndefined(button)) {
                    button.addEventListener("click", (function (k) {
                        return function () {
                            MediaObject.gPlaybackMode = MediaObjectPlaybackMode.PlaylistLoop;
                            if (typeof (Storage) !== "undefined")
                                localStorage.setItem("mediawebapp-mode", "playlistloop");
                            MediaObject.UpdateLoopButtonWithIndex(k);
                        };
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetVolumeUpButtonId());
                if (!isNullOrUndefined(button)) {
                    button.style.display = "none";
                    button.addEventListener("click", (function (k) {
                        return function () {
                            var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if (!isNullOrUndefined(audio)) {
                                if (audio.muted == true)
                                    audio.muted = false;
                                if (audio.volume <= 0.8)
                                    audio.volume += 0.2;
                                else
                                    audio.volume = 1;
                            }
                            else {
                                var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
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
                    })(i), false);
                }
                button = document.getElementById(parent.GetChildWithIndex(i).GetVolumeDownButtonId());
                if (!isNullOrUndefined(button)) {
                    button.style.display = "none";
                    button.addEventListener("click", (function (k) {
                        return function () {
                            var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if (!isNullOrUndefined(audio)) {
                                if (audio.muted == true)
                                    audio.muted = false;
                                if (audio.volume >= 0.2)
                                    audio.volume -= 0.2;
                                else
                                    audio.volume = 0;
                            }
                            else {
                                var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
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
                    })(i), false);
                }
                var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(i).GetAudioId());
                if (!isNullOrUndefined(audio)) {
                    audio.addEventListener("playing", (function (k) {
                        return function () {
                            var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetStartButtonId());
                            if (!isNullOrUndefined(control))
                                control.style.display = "none";
                            control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetStopButtonId());
                            if (!isNullOrUndefined(control)) {
                                control.style.display = "block";
                                control.disabled = false;
                            }
                            control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPauseButtonId());
                            if (!isNullOrUndefined(control)) {
                                control.disabled = false;
                                control.style.display = "block";
                            }
                            control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayButtonId());
                            if (!isNullOrUndefined(control)) {
                                control.disabled = true;
                                control.style.display = "block";
                            }
                            if (this.muted == true) {
                                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = true;
                                    control.style.display = "none";
                                }
                                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = false;
                                    control.style.display = "block";
                                }
                            }
                            else {
                                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = false;
                                    control.style.display = "block";
                                }
                                control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = true;
                                    control.style.display = "none";
                                }
                            }
                            control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeUpButtonId());
                            if (!isNullOrUndefined(control)) {
                                control.disabled = false;
                                control.style.display = "block";
                            }
                            control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeDownButtonId());
                            if (!isNullOrUndefined(control)) {
                                control.disabled = false;
                                control.style.display = "block";
                            }
                            /*
                            if(this.loop == true){
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetLoopButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.style.display = "none";
                                }
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetNoLoopButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.style.display = "block";
                                }

                            }
                            else{
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetLoopButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.style.display = "block";
                                }

                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetNoLoopButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.style.display = "none";
                                }
                            }
                            */
                        };
                    })(i), false);
                    audio.addEventListener("play", (function (k) {
                        return function () {
                            var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayButtonId());
                            if (!isNullOrUndefined(control)) {
                                control.disabled = true;
                                control.style.display = "none";
                            }
                            var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPauseButtonId());
                            if (!isNullOrUndefined(control)) {
                                control.disabled = false;
                                control.style.display = "block";
                            }
                        };
                    })(i), false);
                    audio.addEventListener("pause", (function (k) {
                        return function () {
                            if (this.currentTime != 0) {
                                var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = false;
                                    control.style.display = "block";
                                }
                                var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPauseButtonId());
                                if (!isNullOrUndefined(control)) {
                                    control.disabled = true;
                                    control.style.display = "none";
                                }
                            }
                        };
                    })(i), false);
                    audio.addEventListener("volumechange", (function (k) {
                        return function () {
                            var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if (!isNullOrUndefined(audio)) {
                                if (audio.muted == true) {
                                    var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = true;
                                        control.style.display = "none";
                                    }
                                    control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = false;
                                        control.style.display = "block";
                                    }
                                }
                                else {
                                    var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = false;
                                        control.style.display = "block";
                                    }
                                    control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = true;
                                        control.style.display = "none";
                                    }
                                }
                                if (audio.volume == 1) {
                                    control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeUpButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = true;
                                        control.style.display = "block";
                                    }
                                }
                                else {
                                    control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeUpButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = false;
                                        control.style.display = "block";
                                    }
                                }
                                if (audio.volume == 0) {
                                    control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeDownButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = true;
                                        control.style.display = "none";
                                    }
                                }
                                else {
                                    control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeDownButtonId());
                                    if (!isNullOrUndefined(control)) {
                                        control.disabled = false;
                                        control.style.display = "block";
                                    }
                                }
                            }
                        };
                    })(i), false);
                    audio.addEventListener("timeupdate", (function (k) {
                        return function () {
                            var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPositionId());
                            if (!isNullOrUndefined(control)) {
                                if (!isNullOrUndefined(this.duration) && !isNaN(this.duration) && this.duration != Infinity)
                                    control.innerHTML = this.currentTime < 3600 ? GetTimeString(this.currentTime).substring(3) : GetTimeString(this.currentTime);
                                else {
                                    if (!isNullOrUndefined(this.currentTime) && !isNaN(this.currentTime)) {
                                        if (isNaN(this.duration))
                                            control.innerHTML = this.currentTime < 3600 ? GetTimeString(this.currentTime).substring(3) : GetTimeString(this.currentTime);
                                        else
                                            control.innerHTML = GetTimeString(this.currentTime);
                                    }
                                }
                            }
                            control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetDurationId());
                            if (!isNullOrUndefined(control)) {
                                if (!isNullOrUndefined(this.duration) && !isNaN(this.duration) && this.duration != Infinity)
                                    control.innerHTML = this.duration < 3600 ? GetTimeString(this.duration).substring(3) : GetTimeString(this.duration);
                                else
                                    control.innerHTML = "00:00";
                            }
                            var slider = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetSliderId());
                            if (!isNullOrUndefined(slider)) {
                                if (!isNullOrUndefined(this.duration) && !isNaN(this.duration) && this.duration != Infinity) {
                                    slider.value = ((this.currentTime * 100) / this.duration).toString();
                                }
                            }
                        };
                    })(i), false);
                    audio.addEventListener("ended", (function (k) {
                        return function () {
                            if (MediaObject.gPlaybackMode == MediaObjectPlaybackMode.NoLoop) {
                                this.currentTime = 0;
                                this.pause();
                                return;
                            }
                            if (MediaObject.gPlaybackMode == MediaObjectPlaybackMode.Loop) {
                                this.currentTime = 0;
                                this.play();
                                return;
                            }
                            if (MediaObject.gPlaybackMode == MediaObjectPlaybackMode.PlaylistLoop) {
                                var n = k + 1;
                                if (n >= MediaObject.gParent.GetChildListLength())
                                    n = 0;
                                MediaObject.StartMediaWithIndex(n);
                                return;
                            }
                        };
                    })(i), false);
                    var slider = document.getElementById(MediaObject.gParent.GetChildWithIndex(i).GetSliderId());
                    slider.addEventListener("input", (function (k) {
                        return function () {
                            var audio = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if (!isNullOrUndefined(audio)) {
                                if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && this.duration != Infinity)
                                    if ((this.value >= 0) && (this.value <= 100)) {
                                        audio.currentTime = (audio.duration * this.value) / 100;
                                    }
                            }
                            else {
                                var video = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if (!isNullOrUndefined(video)) {
                                    if (!isNullOrUndefined(video.duration) && !isNaN(video.duration) && this.duration != Infinity)
                                        if ((this.value >= 0) && (this.value <= 100)) {
                                            video.currentTime = (video.duration * this.value) / 100;
                                        }
                                }
                            }
                            var control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPositionId());
                            if (!isNullOrUndefined(control)) {
                                if (!isNullOrUndefined(this.duration) && !isNaN(this.duration) && this.duration != Infinity)
                                    control.innerHTML = this.duration < 3600 ? GetTimeString(this.currentTime).substring(3) : GetTimeString(this.currentTime);
                                else {
                                    if (!isNullOrUndefined(this.currentTime) && !isNaN(this.currentTime))
                                        control.innerHTML = this.currentTime < 3600 ? GetTimeString(this.currentTime).substring(3) : GetTimeString(this.currentTime);
                                }
                            }
                            control = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetDurationId());
                            if (!isNullOrUndefined(control)) {
                                if (!isNullOrUndefined(this.duration) && !isNaN(this.duration) && this.duration != Infinity)
                                    control.innerHTML = this.duration < 3600 ? GetTimeString(this.duration).substring(3) : GetTimeString(this.duration);
                                else
                                    control.innerHTML = "00:00";
                            }
                            var slider = document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetSliderId());
                            if (!isNullOrUndefined(slider)) {
                                if (!isNullOrUndefined(this.duration) && !isNaN(this.duration) && this.duration != Infinity) {
                                    slider.value = ((this.currentTime * 100) / this.duration).toString();
                                }
                            }
                        };
                    })(i), false);
                }
            }
        }
        else {
            this.SetParent(parent);
            this.SetCurrentMediaObject();
            div.innerHTML = this.CreateView();
            var mo = this;
            button = document.getElementById(this.GetParentButtonId());
            if (!isNullOrUndefined(button)) {
                button.addEventListener("click", function () {
                    mo.NavigateToParent();
                });
            }
            button = document.getElementById(this.GetChildButtonId());
            if (!isNullOrUndefined(button)) {
                button.addEventListener("click", function () {
                    mo.NavigateToChild();
                });
            }
            button = document.getElementById(this.GetPreviousButtonId());
            if (!isNullOrUndefined(button)) {
                button.addEventListener("click", function () {
                    mo.NavigateToPrevious();
                });
            }
            button = document.getElementById(this.GetNextButtonId());
            if (!isNullOrUndefined(button)) {
                button.addEventListener("click", function () {
                    mo.NavigateToNext();
                });
            }
        }
        // If carousel created activate it
        $('.carousel').carousel();
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
MediaObject._startButtonId = "_startButtonId";
MediaObject._stopButtonId = "_stopButtonId";
MediaObject._playButtonId = "_playButtonId";
MediaObject._pauseButtonId = "_pauseButtonId";
MediaObject._muteButtonId = "_muteButtonId";
MediaObject._unmuteButtonId = "_unmuteButtonId";
MediaObject._volumeUpButtonId = "_volumeUpButtonId";
MediaObject._volumeDownButtonId = "_volumeDownButtonId";
MediaObject._loopButtonId = "_loopButtonId";
MediaObject._playlistloopButtonId = "_playlistloopButtonId";
MediaObject._noloopButtonId = "_noloopButtonId";
MediaObject._audioId = "_audioId";
MediaObject._videoId = "_videoId";
MediaObject._audioSourceId = "_audioSourceId";
MediaObject._videoSourceId = "_videoSourceId";
MediaObject._durationId = "_durationId";
MediaObject._positionId = "_positionId";
MediaObject._sliderId = "_sliderId";
/* Global Static variable */
MediaObject.gParent = null;
MediaObject.gActiveMediaObjectIndex = -1;
MediaObject.gPlaybackMode = MediaObjectPlaybackMode.NoLoop;
//# sourceMappingURL=MediaObject.js.map