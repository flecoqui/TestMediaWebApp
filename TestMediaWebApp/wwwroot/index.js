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
import {IMediaObject} from "./IMediaObject";
*/
/**
 * Media playback mode
 */
var MediaModelBoxType;
(function (MediaModelBoxType) {
    MediaModelBoxType[MediaModelBoxType["NoButton"] = 0] = "NoButton";
    MediaModelBoxType[MediaModelBoxType["Ok"] = 1] = "Ok";
    MediaModelBoxType[MediaModelBoxType["OkCancel"] = 2] = "OkCancel";
    MediaModelBoxType[MediaModelBoxType["YesNo"] = 3] = "YesNo";
    MediaModelBoxType[MediaModelBoxType["YesNoCancel"] = 4] = "YesNoCancel";
})(MediaModelBoxType || (MediaModelBoxType = {}));
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
    static GetGlobalVersion() {
        return this.globalVersion;
    }
    static ClearData() {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("mediawebapp-favoritestring");
            localStorage.removeItem("mediawebapp-currentfavoriteplaylistname");
            localStorage.removeItem("mediawebapp-pagination");
            localStorage.removeItem("mediawebapp-slideshowperiod");
            localStorage.removeItem("mediawebapp-language");
            localStorage.removeItem("mediawebapp-color");
            localStorage.removeItem("mediawebapp-account");
            localStorage.removeItem("mediawebapp-sas");
            localStorage.removeItem("mediawebapp-container");
            localStorage.removeItem("mediawebapp-folder");
            localStorage.removeItem("mediawebapp-menutype");
        }
    }
    static GetGlobalFavoritePlaylists() {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem("mediawebapp-favoritestring");
            if (!isNullOrUndefinedOrEmpty(value)) {
                var list = MediaObject.Deserialize(value);
                if (isNullOrUndefined(list)) {
                    list = new Playlist("Favorite", "Favorites Playlists", "", "assets/img/Playlist.png", "", "");
                    list.AddChild(new Playlist("Default", "Default Favorites Playlist", "", "", "", ""));
                    GlobalVars.SetGlobalCurrentFavoritePlaylistName("Default");
                }
                GlobalVars.SetGlobalFavoritePlaylists(list);
            }
            else {
                var list = new Playlist("Favorite", "Favorites Playlists", "", "assets/img/Playlist.png", "", "");
                list.AddChild(new Playlist("Default", "Default Favorites Playlist", "", "", "", ""));
                GlobalVars.SetGlobalCurrentFavoritePlaylistName("Default");
                GlobalVars.SetGlobalFavoritePlaylists(list);
            }
        }
        return this.globalFavoritePlaylists;
    }
    ;
    static GetGlobalCurrentFavoritePlaylistName() {
        if (typeof (Storage) !== "undefined") {
            let value = localStorage.getItem("mediawebapp-currentfavoriteplaylistname");
            if (!isNullOrUndefinedOrEmpty(value))
                GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
        }
        return this.globalCurrentFavoritePlaylistName;
    }
    ;
    static GetGlobalPlaybackLoop() {
        var mode = "Loop";
        var result = MediaPlaybackMode.Loop;
        if (typeof (Storage) !== "undefined")
            mode = localStorage.getItem("mediawebapp-mode");
        if (mode == "Loop")
            result = MediaPlaybackMode.Loop;
        if (mode == "NoLoop")
            result = MediaPlaybackMode.NoLoop;
        if (mode == "PlaylistLoop")
            result = MediaPlaybackMode.PlaylistLoop;
        this.globalPlaybackLoop = result;
        return this.globalPlaybackLoop;
    }
    ;
    static GetGlobalPagination() {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem("mediawebapp-pagination");
            if (!isNullOrUndefined(value)) {
                GlobalVars.SetGlobalPagination(parseInt(value));
            }
        }
        return this.globalElementPerPage;
    }
    ;
    static GetGlobalSlideShowPeriod() {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem("mediawebapp-slideshowperiod");
            if (!isNullOrUndefined(value)) {
                GlobalVars.SetGlobalSlideShowPeriod(parseInt(value));
            }
        }
        return this.globalSlideShowPeriod;
    }
    ;
    static GetGlobalLanguage() {
        if (typeof (Storage) !== "undefined")
            GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-language"));
        return this.globalLanguage;
    }
    ;
    static GetGlobalColor() {
        if (typeof (Storage) !== "undefined")
            GlobalVars.SetGlobalColor(localStorage.getItem("mediawebapp-color"));
        return this.globalColor;
    }
    ;
    static GetGlobalAccount() {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem("mediawebapp-account");
            if (!isNullOrUndefined(value)) {
                GlobalVars.SetGlobalAccount(value);
            }
        }
        return this.globalAccount;
    }
    ;
    static GetGlobalSAS() {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem("mediawebapp-sas");
            if (!isNullOrUndefined(value)) {
                GlobalVars.SetGlobalSAS(value);
            }
        }
        return this.globalSAS;
    }
    ;
    static GetGlobalContainer() {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem("mediawebapp-container");
            if (!isNullOrUndefined(value)) {
                GlobalVars.SetGlobalContainer(value);
            }
        }
        return this.globalContainer;
    }
    ;
    static GetGlobalFolder() {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem("mediawebapp-folder");
            if (!isNullOrUndefined(value)) {
                GlobalVars.SetGlobalFolder(value);
            }
        }
        return this.globalFolder;
    }
    ;
    static GetGlobalMenuType() {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem("mediawebapp-menutype");
            if (!isNullOrUndefined(value)) {
                GlobalVars.SetGlobalMenuType(value);
            }
        }
        return this.globalMenuType;
    }
    ;
    static GetCancellationToken() {
        return this.globalCancellationToken;
    }
    ;
    static SetGlobalFavoritePlaylists(value) {
        if (typeof (Storage) !== "undefined") {
            if (isNullOrUndefined(value)) {
                value = new Playlist("Favorite", "Favorites Playlists", "", "assets/img/Playlist.png", "", "");
                value.AddChild(new Playlist("Default", "Default Favorites Playlist", "", "", "", ""));
                GlobalVars.SetGlobalCurrentFavoritePlaylistName("Default");
            }
            localStorage.setItem("mediawebapp-favoritestring", MediaObject.Serialize(value));
        }
        if (!isNullOrUndefined(value)) {
            var defaultvalue = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
            var found = false;
            for (var i = 0; i < value.GetChildrenLength(); i++) {
                if (value.GetChildWithIndex(i).GetName() == defaultvalue) {
                    found = true;
                    break;
                }
            }
            if (found == false) {
                if (value.GetChildrenLength() > 0)
                    GlobalVars.SetGlobalCurrentFavoritePlaylistName(value.GetChildWithIndex(0).GetName());
                else
                    GlobalVars.SetGlobalCurrentFavoritePlaylistName("");
            }
        }
        this.globalFavoritePlaylists = value;
    }
    ;
    static SetGlobalCurrentFavoritePlaylistName(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-currentfavoriteplaylistname", value);
        this.globalCurrentFavoritePlaylistName = value;
    }
    ;
    static SetGlobalPlaybackLoop(value) {
        var mode = "Loop";
        if (value == MediaPlaybackMode.Loop)
            mode = "Loop";
        if (value == MediaPlaybackMode.NoLoop)
            mode = "NoLoop";
        if (value == MediaPlaybackMode.PlaylistLoop)
            mode = "PlaylistLoop";
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-mode", mode);
        this.globalPlaybackLoop = value;
    }
    ;
    static SetGlobalPagination(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-pagination", value.toString());
        this.globalElementPerPage = value;
    }
    ;
    static SetGlobalSlideShowPeriod(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-slideshowperiod", value.toString());
        this.globalSlideShowPeriod = value;
    }
    ;
    static SetGlobalLanguage(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-language", value);
        this.globalLanguage = value;
    }
    ;
    static SetGlobalColor(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-color", value);
        this.globalColor = value;
    }
    ;
    static SetGlobalAccount(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-account", value);
        this.globalAccount = value;
    }
    ;
    static SetGlobalSAS(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-sas", value);
        this.globalSAS = value;
    }
    ;
    static SetGlobalContainer(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-container", value);
        this.globalContainer = value;
    }
    ;
    static SetGlobalFolder(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-folder", value);
        this.globalFolder = value;
    }
    ;
    static SetGlobalMenuType(value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-menutype", value);
        this.globalMenuType = value;
    }
    ;
    static SetCancellationToken(value) {
        this.globalCancellationToken = value;
    }
    ;
}
GlobalVars.globalPlaybackLoop = MediaPlaybackMode.Loop;
GlobalVars.globalLanguage = "en";
GlobalVars.globalColor = "blue";
GlobalVars.globalAccount = "mediacloud";
GlobalVars.globalSAS = "sv=2019-10-10&ss=b to becompleted";
GlobalVars.globalContainer = "music";
GlobalVars.globalFolder = "";
GlobalVars.globalMenuType = "Music";
GlobalVars.globalCancellationToken = false;
GlobalVars.globalElementPerPage = 12;
GlobalVars.globalSlideShowPeriod = 3000;
GlobalVars.globalFavoritePlaylists = null;
GlobalVars.globalCurrentFavoritePlaylistName = "default";
GlobalVars.globalVersion = "2020-05-20";
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
        this._index = 0;
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
        return MediaObject.GetValue(this._description, "Album");
    }
    GetArtist() {
        return MediaObject.GetValue(this._description, "Artist");
    }
    GetTrack() {
        return MediaObject.GetValue(this._description, "Track");
    }
    GetTitle() {
        return MediaObject.GetValue(this._description, "Title");
    }
    static GetValue(source, field) {
        let result = "";
        let pos = 0;
        if (!isNullOrUndefinedOrEmpty(source)) {
            while (pos >= 0) {
                pos = source.indexOf("{{", pos);
                if (pos >= 0) {
                    let endtagpos = source.indexOf(":", pos + 2);
                    if (endtagpos > 0) {
                        let tag = source.substr(pos + 2, endtagpos - pos - 2);
                        if (tag.trim().toLowerCase() == field.toLowerCase()) {
                            pos = source.indexOf("}}", endtagpos + 1);
                            if (pos > 0)
                                result = source.substr(endtagpos + 1, pos - endtagpos - 1);
                            break;
                        }
                    }
                    pos += 2;
                }
            }
        }
        return result;
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
        if (this.HasChild()) {
            for (var i = 0; i < this.GetChildrenLength(); i++)
                this.GetChildWithIndex(i).SetAbsolutePath(this._path);
        }
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
    GetRoot() {
        var parent = null;
        for (parent = this; !isNullOrUndefined(parent.GetParent()); parent = parent.GetParent())
            ;
        return parent;
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
        for (var i = 0; i < this._mediaChildList.length; i++) {
            if (this._mediaChildList[i] == child) {
                this._mediaChildList.splice(i, 1);
                break;
            }
        }
    }
    RemoveChildWithIndex(index) {
        return this._mediaChildList.splice(index, 1);
    }
    RemoveChildWithName(name) {
        for (var i = 0; i < this._mediaChildList.length; i++) {
            if (this._mediaChildList[i].GetName() == name) {
                this._mediaChildList.splice(i, 1);
                break;
            }
        }
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
    GetPreviousPage(pagesize) {
        if (pagesize == 0)
            return null;
        if (this.GetParent() != null) {
            if (this._index - pagesize >= 0)
                return this.GetParent().GetChildWithIndex(this._index - pagesize);
        }
        return null;
    }
    GetNextPage(pagesize) {
        if (pagesize == 0)
            return null;
        if (this.GetParent() != null) {
            if (this._index + pagesize < this.GetParent().GetChildrenLength())
                return this.GetParent().GetChildWithIndex(this._index + pagesize);
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
    static CheckTree(cur) {
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
    static UnCheckTree(cur) {
        if (!isNullOrUndefined(cur)) {
            if (cur.HasChild()) {
                for (let i = 0; i < cur.GetChildrenLength(); i++) {
                    let child = cur.GetChildWithIndex(i);
                    child.SetParent(null);
                    this.UnCheckTree(child);
                }
            }
        }
    }
    static Deserialize(content) {
        var result = this.fromJSON(JSON.parse(content));
        if (!isNullOrUndefined(result)) {
            MediaObject.CheckTree(result);
        }
        return result;
    }
    static Serialize(input) {
        if (!isNullOrUndefined(input)) {
            MediaObject.UnCheckTree(input);
            var object = Object.assign(new MediaObject("", "", "", "", "", ""), input);
            var result = JSON.stringify(object);
            MediaObject.CheckTree(input);
            return result;
        }
        return null;
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
    constructor(current, manager) {
        // prefix for HTML Element id
        this._controlViewId = "_controlViewId";
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
        this._addFavoriteButtonId = "_addfavoriteButtonId";
        this._removeFavoriteButtonId = "_removeFavoriteButtonId";
        this._downloadButtonId = "_downloadButtonId";
        this._audioId = "_audioId";
        this._videoId = "_videoId";
        this._audioSourceId = "_audioSourceId";
        this._videoSourceId = "_videoSourceId";
        this._durationId = "_durationId";
        this._positionId = "_positionId";
        this._sliderId = "_sliderId";
        this._mediaManager = manager;
        this._mediaObject = current;
    }
    GetMediaManager() {
        return this._mediaManager;
    }
    // View Methods
    CreateView(current) {
        return "";
    }
    CreatePreview(current) {
        return "";
    }
    CreateChildView(current) {
        return this.InternalCreateChildView(current);
    }
    RegisterViewEvents(current) {
        return this.internalRegisterVieWEvents(current);
    }
    InitializeViewControls(current) {
        return true;
    }
    MakeViewControlVisible(current) {
        return this.InternalMakeViewControlVisible(current);
    }
    /************************************************/
    /* control id methods                           */
    /************************************************/
    GetControlViewId(index) {
        return this._controlViewId + index;
    }
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
    GetAddFavoriteButtonId(index) {
        return this._addFavoriteButtonId + index;
    }
    GetRemoveFavoriteButtonId(index) {
        return this._removeFavoriteButtonId + index;
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
    GetDownloadButtonId(index) {
        return this._downloadButtonId + index;
    }
    /****************************************************************************/
    /* EVents associated with the controls on the page                          */
    /****************************************************************************/
    NavigateToChildEvent(control, mo, v) {
        var _a;
        if (!isNullOrUndefined(v)) {
            (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.NavigateToChild(mo, true);
        }
    }
    NavigateToParentEvent(control, mo, v) {
        var _a;
        if (!isNullOrUndefined(v)) {
            (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.NavigateToParent(mo);
        }
    }
    NavigateToNextEvent(control, mo, v) {
        var _a;
        if (!isNullOrUndefined(v))
            (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.NavigateToNext(mo);
    }
    NavigateToPreviousEvent(control, mo, v) {
        var _a;
        if (!isNullOrUndefined(v))
            (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.NavigateToPrevious(mo);
    }
    EventStopMedia(button, mo, v) {
        v.StopMedia(mo);
    }
    StopMedia(mo) {
        var _a;
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
        control = document.getElementById(this.GetStopButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        control = document.getElementById(this.GetPlayButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        control = document.getElementById(this.GetPauseButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        control = document.getElementById(this.GetMuteButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        control = document.getElementById(this.GetUnmuteButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        control = document.getElementById(this.GetVolumeUpButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        control = document.getElementById(this.GetVolumeDownButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "none";
            control.disabled = true;
        }
        (_a = this.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.SetIndexActiveMediaMediaObject(-1);
    }
    StartMedia(mo) {
        var _a, _b, _c;
        let parent = mo.GetParent();
        let muted = false;
        if (((_a = this.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.GetIndexActiveMediaMediaObject()) >= 0) {
            if (!isNullOrUndefined(parent)) {
                let mostop = parent.GetChildWithIndex((_b = this.GetMediaManager()) === null || _b === void 0 ? void 0 : _b.GetIndexActiveMediaMediaObject());
                if (!isNullOrUndefined(mostop)) {
                    var audio = document.getElementById(this.GetAudioId(mostop.GetIndex()));
                    if (!isNullOrUndefined(audio))
                        muted = audio.muted;
                    else {
                        var video = document.getElementById(this.GetAudioId(mostop.GetIndex()));
                        if (!isNullOrUndefined(video))
                            muted = video.muted;
                    }
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
                audio.muted = muted;
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
                    video.muted = muted;
                }
            }
        }
        (_c = this.GetMediaManager()) === null || _c === void 0 ? void 0 : _c.SetIndexActiveMediaMediaObject(mo.GetIndex());
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
        var _a, _b, _c;
        if (((_a = this.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.GetPlaybackMode()) == MediaPlaybackMode.NoLoop) {
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
        if (((_b = this.GetMediaManager()) === null || _b === void 0 ? void 0 : _b.GetPlaybackMode()) == MediaPlaybackMode.Loop) {
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
        if (((_c = this.GetMediaManager()) === null || _c === void 0 ? void 0 : _c.GetPlaybackMode()) == MediaPlaybackMode.PlaylistLoop) {
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
    UpdateFavoriteButton(mo) {
        if (this.IsFavoriteList(mo)) {
            var control = document.getElementById(this.GetAddFavoriteButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "none";
            var control = document.getElementById(this.GetRemoveFavoriteButtonId(mo.GetIndex()));
            if (!isNullOrUndefined(control))
                control.style.display = "block";
        }
        else {
            if (this.IsFavoriteMedia(mo)) {
                var control = document.getElementById(this.GetAddFavoriteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control))
                    control.style.display = "none";
                var control = document.getElementById(this.GetRemoveFavoriteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control))
                    control.style.display = "block";
            }
            else {
                var control = document.getElementById(this.GetAddFavoriteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control))
                    control.style.display = "block";
                var control = document.getElementById(this.GetRemoveFavoriteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control))
                    control.style.display = "none";
            }
        }
    }
    LoopMedia(button, mo, v) {
        var _a;
        (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.SetPlaybackMode(MediaPlaybackMode.Loop);
        v.UpdateAllLoopButtons(mo);
    }
    PlaylistLoopMedia(button, mo, v) {
        var _a;
        (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.SetPlaybackMode(MediaPlaybackMode.PlaylistLoop);
        v.UpdateAllLoopButtons(mo);
    }
    NoLoopMedia(button, mo, v) {
        var _a;
        (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.SetPlaybackMode(MediaPlaybackMode.NoLoop);
        v.UpdateAllLoopButtons(mo);
    }
    AddFavoriteMedia(button, mo, v) {
        var _a;
        var currentplaylist = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var playlists = GlobalVars.GetGlobalFavoritePlaylists();
        if (!isNullOrUndefinedOrEmpty(currentplaylist) && !isNullOrUndefined(playlists)) {
            var playlist = playlists.GetChildWithName(currentplaylist);
            if (!isNullOrUndefined(playlist)) {
                if (isNullOrUndefined(playlist.GetChildWithName(mo.GetName()))) {
                    var object = null;
                    switch (mo.GetType()) {
                        case "Music":
                            object = Object.assign(new Music(), mo);
                            break;
                        case "Radio":
                            object = Object.assign(new Radio(), mo);
                            break;
                        case "Playlist":
                            object = Object.assign(new Playlist(), mo);
                            break;
                        case "TV":
                            object = Object.assign(new TV(), mo);
                            break;
                        case "Photo":
                            object = Object.assign(new Photo(), mo);
                            break;
                        case "Video":
                            object = Object.assign(new Video(), mo);
                            break;
                        default:
                            object = Object.assign(new MediaObject(), mo);
                            break;
                    }
                    playlist.AddChild(object);
                    (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.ShowAlertPopupInformation(GetCurrentString("Media <strong>") + object.GetName() + GetCurrentString("</strong> added in the favorite list <strong>") + currentplaylist + "</strong>");
                    GlobalVars.SetGlobalFavoritePlaylists(playlists);
                    let control = document.getElementById(v.GetAddFavoriteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.style.display = "none";
                        control.disabled = true;
                    }
                    control = document.getElementById(v.GetRemoveFavoriteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.style.display = "block";
                        control.disabled = false;
                    }
                }
            }
        }
    }
    RemoveFavoriteMedia(button, mo, v) {
        var _a, _b, _c, _d;
        var currentplaylist = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var playlists = GlobalVars.GetGlobalFavoritePlaylists();
        if (mo.GetRoot().GetName() == playlists.GetName()) {
            // If in Favorite Playlist remove the item from the list
            var parent = mo.GetParent();
            if (!isNullOrUndefined(parent)) {
                parent.RemoveChildWithIndex(mo.GetIndex());
                (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.ShowAlertPopupInformation(GetCurrentString("Media <strong>") + mo.GetName() + GetCurrentString("</strong> removed from the favorite list <strong>") + parent.GetName() + "</strong>");
                if (parent.GetChildrenLength() > 0) {
                    for (var i = 0; i < parent.GetChildrenLength(); i++) {
                        // Reindex
                        parent.GetChildWithIndex(i).SetIndex(i);
                    }
                    // Remove the MediaObject from Storage
                    GlobalVars.SetGlobalFavoritePlaylists(mo.GetRoot());
                    (_b = v.GetMediaManager()) === null || _b === void 0 ? void 0 : _b.NavigateToChild(parent, true);
                    //                    v.GetMediaManager()?.SaveNavigationState(parent.GetChildWithIndex(0));
                }
                else {
                    // Remove the MediaObject from Storage
                    GlobalVars.SetGlobalFavoritePlaylists(mo.GetRoot());
                    (_c = v.GetMediaManager()) === null || _c === void 0 ? void 0 : _c.NavigateToChild(parent.GetParent(), true);
                    //                    v.GetMediaManager()?.SaveNavigationState(parent);
                }
            }
        }
        else {
            if (!isNullOrUndefinedOrEmpty(currentplaylist) && !isNullOrUndefined(playlists)) {
                var playlist = playlists.GetChildWithName(currentplaylist);
                if (!isNullOrUndefined(playlist)) {
                    if (!isNullOrUndefined(playlist.GetChildWithName(mo.GetName()))) {
                        playlist.RemoveChildWithName(mo.GetName());
                        (_d = v.GetMediaManager()) === null || _d === void 0 ? void 0 : _d.ShowAlertPopupInformation(GetCurrentString("Media <strong>") + mo.GetName() + GetCurrentString("</strong> removed from the favorite list <strong>") + currentplaylist + "</strong>");
                        GlobalVars.SetGlobalFavoritePlaylists(playlists);
                        let control = document.getElementById(v.GetAddFavoriteButtonId(mo.GetIndex()));
                        if (!isNullOrUndefined(control)) {
                            control.style.display = "block";
                            control.disabled = false;
                        }
                        control = document.getElementById(v.GetRemoveFavoriteButtonId(mo.GetIndex()));
                        if (!isNullOrUndefined(control)) {
                            control.style.display = "none";
                            control.disabled = true;
                        }
                    }
                }
            }
        }
    }
    IsFavoriteList(mo) {
        var playlists = GlobalVars.GetGlobalFavoritePlaylists();
        if (mo.GetRoot().GetName() == playlists.GetName())
            return true;
        return false;
    }
    IsFavoriteMedia(mo) {
        var currentplaylist = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var playlists = GlobalVars.GetGlobalFavoritePlaylists();
        if (!isNullOrUndefinedOrEmpty(currentplaylist) && !isNullOrUndefined(playlists)) {
            var playlist = playlists.GetChildWithName(currentplaylist);
            if (!isNullOrUndefined(playlist)) {
                if (!isNullOrUndefined(playlist.GetChildWithName(mo.GetName())))
                    return true;
            }
        }
        return false;
    }
    DownloadMedia(button, mo, v) {
        if (!isNullOrUndefined(mo)) {
            //var bb = new Blob([fileContent ], { type: 'application/json' });
            var a = document.createElement('a');
            a.download = 'download';
            a.href = mo.GetContentUrl();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            /*
           var hiddenIFrameID = 'hiddenDownloader';
           var iframe:HTMLIFrameElement = <HTMLIFrameElement>document.getElementById(hiddenIFrameID);
            if (iframe === null) {
                iframe = document.createElement('iframe');
                iframe.id = hiddenIFrameID;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
            }
            iframe.src = mo.GetContentUrl();
            */
        }
    }
    InternalCreateChildView(current) {
        var _a, _b, _c;
        if (isNullOrUndefined(current))
            return false;
        var div = document.getElementById((_a = this.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.GetId());
        if (isNullOrUndefined(div))
            return false;
        var parent = current.GetParent();
        var button = null;
        if ((!isNullOrUndefined(parent)) /*&& (this.IsOneItemNavigation() === false)*/) {
            div.innerHTML = "";
            var pagesize = (_b = this.GetMediaManager()) === null || _b === void 0 ? void 0 : _b.GetPaginationSize();
            var min = 0;
            var max = parent.GetChildrenLength();
            if (pagesize > 0) {
                var q = Math.floor(current.GetIndex() / pagesize);
                var r = current.GetIndex() % pagesize;
                min = q * pagesize;
                max = (min + pagesize < parent.GetChildrenLength() ? min + pagesize : parent.GetChildrenLength());
            }
            (_c = this.GetMediaManager()) === null || _c === void 0 ? void 0 : _c.SetPaginationIndex(min);
            for (var i = min; i < max; i++) {
                // Get View associated with current MediaObject
                var view = this.GetMediaManager().CreateMediaView(parent.GetChildWithIndex(i));
                if (!isNullOrUndefined(view)) {
                    div.innerHTML += view.CreateView(parent.GetChildWithIndex(i));
                }
            }
            for (var i = min; i < max; i++) {
                this.RegisterViewEvents(parent.GetChildWithIndex(i));
                this.InitializeViewControls(parent.GetChildWithIndex(i));
            }
        }
        else {
            // Display Media Object if no parent  
            if (!isNullOrUndefined(current)) {
                //current.SetParent(parent);
                div.innerHTML = this.CreateView(current);
                this.RegisterViewEvents(current);
                this.InitializeViewControls(current);
            }
        }
        // If carousel created activate it
        ActivateCarousel();
        return true;
    }
    InternalMakeViewControlVisible(current) {
        // Check if current MediaObject is not displayed on the current page
        var index = this.GetMediaManager().GetPaginationIndex();
        var size = this.GetMediaManager().GetPaginationSize();
        if ((size > 0) && ((current.GetIndex() < index) || (current.GetIndex() >= (index + size)))) {
            this.GetMediaManager().NavigateToPage(current);
        }
        var div = document.getElementById(this.GetControlViewId(current.GetIndex()));
        if (!isNullOrUndefined(div)) {
            div.scrollIntoView(true);
            div.scrollIntoView({ block: 'center' });
            return true;
        }
        return false;
    }
    internalRegisterVieWEvents(cur) {
        let Index = cur.GetIndex();
        this.registerEvent("click", this.GetParentButtonId(Index), cur, this.NavigateToParentEvent);
        this.registerEvent("click", this.GetChildButtonId(Index), cur, this.NavigateToChildEvent);
        this.registerEvent("click", this.GetNextButtonId(Index), cur, this.NavigateToNextEvent);
        this.registerEvent("click", this.GetPreviousButtonId(Index), cur, this.NavigateToPreviousEvent);
        this.registerEvent("click", this.GetStartButtonId(Index), cur, this.EventStartMedia);
        this.registerEvent("click", this.GetStopButtonId(Index), cur, this.EventStopMedia);
        this.registerEvent("click", this.GetPauseButtonId(Index), cur, this.PauseMedia);
        this.registerEvent("click", this.GetPlayButtonId(Index), cur, this.PlayMedia);
        this.registerEvent("click", this.GetMuteButtonId(Index), cur, this.MuteMedia);
        this.registerEvent("click", this.GetUnmuteButtonId(Index), cur, this.UnmuteMedia);
        this.registerEvent("click", this.GetLoopButtonId(Index), cur, this.LoopMedia);
        this.registerEvent("click", this.GetNoLoopButtonId(Index), cur, this.NoLoopMedia);
        this.registerEvent("click", this.GetPlayListLoopButtonId(Index), cur, this.PlaylistLoopMedia);
        this.registerEvent("click", this.GetAddFavoriteButtonId(Index), cur, this.AddFavoriteMedia);
        this.registerEvent("click", this.GetRemoveFavoriteButtonId(Index), cur, this.RemoveFavoriteMedia);
        this.registerEvent("click", this.GetVolumeUpButtonId(Index), cur, this.VolumeUpMedia);
        this.registerEvent("click", this.GetVolumeDownButtonId(Index), cur, this.VolumeDownMedia);
        this.registerEvent("click", this.GetDownloadButtonId(Index), cur, this.DownloadMedia);
        this.registerEvent("playing", this.GetAudioId(Index), cur, this.EventPlayingMedia);
        this.registerEvent("play", this.GetAudioId(Index), cur, this.EventPlayMedia);
        this.registerEvent("pause", this.GetAudioId(Index), cur, this.EventPauseMedia);
        this.registerEvent("volumechange", this.GetAudioId(Index), cur, this.EventVolumeChangeMedia);
        this.registerEvent("timeupdate", this.GetAudioId(Index), cur, this.EventTimeUpdateMedia);
        this.registerEvent("ended", this.GetAudioId(Index), cur, this.EventEndedMedia);
        this.registerEvent("input", this.GetSliderId(Index), cur, this.InputSliderMedia);
        return true;
    }
    internalInitializeVieWControls(cur) {
        var Index = cur.GetIndex();
        this.displayButton(this.GetStartButtonId(Index));
        this.hideButton(this.GetStopButtonId(Index));
        this.hideButton(this.GetPauseButtonId(Index));
        this.hideButton(this.GetPlayButtonId(Index));
        this.hideButton(this.GetMuteButtonId(Index));
        this.hideButton(this.GetUnmuteButtonId(Index));
        /* Update Loop button status */
        this.UpdateLoopButton(cur);
        /* Update Favorite button status */
        this.UpdateFavoriteButton(cur);
        return true;
    }
    VolumeUpMedia(button, mo, v) {
        var _a;
        (_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.SetPlaybackMode(MediaPlaybackMode.NoLoop);
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
        var _a, _b, _c;
        var audio = document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (((_a = v.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.GetPlaybackMode()) == MediaPlaybackMode.NoLoop) {
                audio.currentTime = 0;
                audio.pause();
                return;
            }
            if (((_b = v.GetMediaManager()) === null || _b === void 0 ? void 0 : _b.GetPlaybackMode()) == MediaPlaybackMode.Loop) {
                audio.currentTime = 0;
                audio.play();
                return;
            }
            if (((_c = v.GetMediaManager()) === null || _c === void 0 ? void 0 : _c.GetPlaybackMode()) == MediaPlaybackMode.PlaylistLoop) {
                var parent = mo.GetParent();
                if (!isNullOrUndefined(parent)) {
                    var n = mo.GetIndex() + 1;
                    if (n >= parent.GetChildrenLength())
                        n = 0;
                    v.MakeViewControlVisible(parent.GetChildWithIndex(n));
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
    DisplayNextButton(cur) {
        var _a, _b, _c, _d;
        if (!isNullOrUndefined(cur.GetParent())) {
            if ((((_a = this.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.GetPaginationIndex()) + ((_b = this.GetMediaManager()) === null || _b === void 0 ? void 0 : _b.GetPaginationSize())) < cur.GetParent().GetChildrenLength()) {
                if (cur.GetIndex() == (((_c = this.GetMediaManager()) === null || _c === void 0 ? void 0 : _c.GetPaginationIndex()) + ((_d = this.GetMediaManager()) === null || _d === void 0 ? void 0 : _d.GetPaginationSize()) - 1))
                    return true;
            }
        }
        return false;
    }
    DisplayPreviousButton(cur) {
        var _a, _b;
        if (((_a = this.GetMediaManager()) === null || _a === void 0 ? void 0 : _a.GetPaginationIndex()) !== 0) {
            if (cur.GetIndex() == ((_b = this.GetMediaManager()) === null || _b === void 0 ? void 0 : _b.GetPaginationIndex()))
                return true;
        }
        return false;
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
class MediaManager {
    constructor(id = "", paginationSize = 0, playbackMode = MediaPlaybackMode.NoLoop) {
        this._indexActiveMediaObject = -1;
        this._playbackMode = MediaPlaybackMode.NoLoop;
        this._paginationSize = 0;
        this._paginationIndex = 0;
        this._canClose = true;
        this._id = id;
        this._root = null;
        this._current = null;
        this._stack = null;
        this._paginationSize = paginationSize;
        this._indexActiveMediaObject = -1;
        this._playbackMode = playbackMode;
    }
    // Methods to get MediaView attributes
    GetId() {
        return this._id;
    }
    GetRoot() {
        return this._root;
    }
    SetRoot(value) {
        this._root = value;
        this._current = value;
        MediaObject.CheckTree(this._root);
    }
    IsOneItemNavigation() { return (this._paginationSize == 1); }
    SetOneItemNavigation(value) { this._paginationSize = 1; }
    GetPlaybackMode() { return this._playbackMode; }
    SetPlaybackMode(value) {
        this._playbackMode = value;
        GlobalVars.SetGlobalPlaybackLoop(value);
    }
    GetCurrentMediaObject() { return this._current; }
    SetCurrentMediaObject(value) { this._current = value; }
    GetIndexActiveMediaMediaObject() { return this._indexActiveMediaObject; }
    SetIndexActiveMediaMediaObject(value) { this._indexActiveMediaObject = value; }
    CreateMediaView(current) {
        var object = null;
        switch (current.GetType()) {
            case "Music":
                object = new MusicView(current, this);
                break;
            case "Radio":
                object = new RadioView(current, this);
                break;
            case "Playlist":
                object = new PlaylistView(current, this);
                break;
            case "TV":
                object = new TVView(current, this);
                break;
            case "Photo":
                object = new PhotoView(current, this);
                break;
            case "Video":
                object = new VideoView(current, this);
                break;
            case "Home":
                object = new HomeView(current, this);
                break;
            case "Setting":
                object = new SettingView(current, this);
                break;
            default:
                object = new MusicView(current, this);
                break;
        }
        return object;
    }
    static CreateMediaManager(id = "", paginationSize = 0, playbackMode = MediaPlaybackMode.NoLoop) {
        return new MediaManager(id, paginationSize, playbackMode);
    }
    ;
    // Pagination Method
    SetPaginationSize(size) {
        this._paginationSize = size;
    }
    GetPaginationSize() {
        return this._paginationSize;
    }
    SetPaginationIndex(index) {
        this._paginationIndex = index;
    }
    GetPaginationIndex() {
        return this._paginationIndex;
    }
    NavigateToParent(cur) {
        var result = false;
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
        if (this.RenderView(newPointer) == true) {
            this.MakeViewControlVisible(newPointer);
            this.RestoreNavigationState();
            result = true;
        }
        else
            this.SetCurrentMediaObject(current);
        return result;
    }
    CreateCurrentUrl(cur) {
        return window.location.pathname + "?path=" + cur.GetPath();
    }
    SaveNavigationState(cur) {
        // update browser history
        history.pushState(cur.GetPath(), null, this.CreateCurrentUrl(cur));
    }
    ReplaceNavigationState(cur) {
        // update browser history
        history.replaceState(cur.GetPath(), null, this.CreateCurrentUrl(cur));
    }
    RestoreNavigationState() {
        // update browser history
        history.back();
        MediaManager.internalBack = true;
    }
    CanCloseApplication() {
        return this._canClose;
    }
    ApplicationBusy(busy) {
        this._canClose = !busy;
    }
    NavigateToChild(cur, bSaveNavigation) {
        var result = false;
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
        // Save Parent in Navigation history
        if (bSaveNavigation)
            this.ReplaceNavigationState(current);
        this.SetCurrentMediaObject(newPointer);
        if (this.RenderView(newPointer) == true) {
            this.MakeViewControlVisible(newPointer);
            this.SetCurrentMediaObject(newPointer);
            if (bSaveNavigation)
                this.SaveNavigationState(newPointer);
            result = true;
        }
        else
            this.SetCurrentMediaObject(current);
        return result;
    }
    NavigateToPrevious(cur) {
        var result = false;
        var current = this.GetCurrentMediaObject();
        if (isNullOrUndefined(current)) {
            return;
        }
        var startPage = current.GetParent().GetChildWithIndex(this.GetPaginationIndex());
        if (!isNullOrUndefined(startPage)) {
            var newPointer = startPage.GetPreviousPage(this.GetPaginationSize());
            if (isNullOrUndefined(newPointer))
                return;
            this.SetCurrentMediaObject(newPointer);
            if (this.RenderView(newPointer) == true) {
                this.MakeViewControlVisible(newPointer);
                this.SetCurrentMediaObject(newPointer);
                this.ReplaceNavigationState(newPointer);
                result = true;
            }
            else
                this.SetCurrentMediaObject(current);
        }
        return result;
    }
    NavigateToNext(cur) {
        var result = false;
        var current = this.GetCurrentMediaObject();
        if (isNullOrUndefined(current)) {
            return;
        }
        var startPage = current.GetParent().GetChildWithIndex(this.GetPaginationIndex());
        if (!isNullOrUndefined(startPage)) {
            var newPointer = startPage.GetNextPage(this.GetPaginationSize());
            if (isNullOrUndefined(newPointer))
                return;
            this.SetCurrentMediaObject(newPointer);
            if (this.RenderView(newPointer) == true) {
                this.MakeViewControlVisible(newPointer);
                this.SetCurrentMediaObject(newPointer);
                this.ReplaceNavigationState(newPointer);
                result = true;
            }
            else
                this.SetCurrentMediaObject(current);
        }
        return result;
    }
    NavigateToPage(cur) {
        var result = false;
        if (isNullOrUndefined(cur)) {
            return;
        }
        var pagesize = this.GetPaginationSize();
        var parent = cur.GetParent();
        if ((pagesize > 0) && (!isNullOrUndefined(parent))) {
            var q = Math.floor(cur.GetIndex() / pagesize);
            var r = cur.GetIndex() % pagesize;
            var newPointer = parent.GetChildWithIndex(q * pagesize);
            if (isNullOrUndefined(newPointer))
                return;
            this.SetCurrentMediaObject(newPointer);
            if (this.RenderView(newPointer) == true) {
                this.MakeViewControlVisible(newPointer);
                this.SetCurrentMediaObject(newPointer);
                this.ReplaceNavigationState(newPointer);
                result = true;
            }
            else
                this.SetCurrentMediaObject(cur);
        }
        return result;
    }
    RenderView(cur) {
        var view = this.CreateMediaView(cur);
        if (!isNullOrUndefined(view)) {
            view.CreateChildView(cur);
            return true;
        }
        return false;
    }
    MakeViewControlVisible(cur) {
        var view = this.CreateMediaView(cur);
        if (!isNullOrUndefined(view)) {
            //            setTimeout( function (){
            //                var view:IMediaView = mediaManager.CreateMediaView(cur);
            return view.MakeViewControlVisible(cur);
            //           },1);
            //           view.MakeViewControlVisible(cur);
            //  this.SetCurrentMediaObject(cur);
            // update browser history
            //  if(this.GetCurrentMediaObject()!=cur)
            //  history.back();
            //  MediaManager.internalBack = true;
            //      history.pushState(cur.GetPath(), null, this.CreateCurrentUrl(cur));
            return true;
        }
        return false;
    }
    RenderMediaView(bSaveNavigation) {
        this.HideAlertPopup();
        this.SetIndexActiveMediaMediaObject(-1);
        let result = this.RenderView(this.GetCurrentMediaObject());
        if ((result == true) && (bSaveNavigation == true))
            this.SaveNavigationState(this.GetCurrentMediaObject());
        return result;
    }
    ShowAlertPopupError(msg) {
        var div = document.getElementById('alertbox');
        if (!isNullOrUndefined(div)) {
            div.classList.remove("media-alert-error");
            div.classList.remove("media-alert-information");
            div.classList.add("media-alert-error");
            var label = document.getElementById('alertmessage');
            if (!isNullOrUndefined(label)) {
                label.innerHTML = msg;
                $("#alertbox").fadeTo(2000, 500).animate({ opacity: 0 }, 1000).hide('slow');
            }
        }
    }
    ShowAlertPopupInformation(msg) {
        var div = document.getElementById('alertbox');
        if (!isNullOrUndefined(div)) {
            div.classList.remove("media-alert-error");
            div.classList.remove("media-alert-information");
            div.classList.add("media-alert-information");
            var label = document.getElementById('alertmessage');
            if (!isNullOrUndefined(label)) {
                label.innerHTML = msg;
                $("#alertbox").fadeTo(2000, 500).animate({ opacity: 0 }, 1000).hide('slow');
            }
        }
    }
    HideAlertPopup() {
        $("#alertbox").hide();
    }
    DisplayButton(id, text) {
        var button = document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.style.display = "block";
            button.innerHTML = text;
        }
    }
    HideButton(id) {
        var button = document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.style.display = "none";
            button.innerHTML = "";
        }
    }
    DisplayBox(id) {
        $('#' + id).modal('show');
        /*
        var div  = <HTMLDivElement>document.getElementById(id);
        if(!isNullOrUndefined(div)){
            div.style.display = "block";
        }
        */
    }
    HideBox(id) {
        $('#' + id).modal('hide');
        /*
        var div  = <HTMLDivElement>document.getElementById(id);
        if(!isNullOrUndefined(div)){
            div.style.display = "none";
        }*/
    }
    ShowPopupBox(msg) {
        let result = false;
        var div = document.getElementById('modalpopup');
        if (!isNullOrUndefined(div)) {
            this.DisplayBox('modalpopup');
            var label = document.getElementById('modalmessage');
            if (!isNullOrUndefined(label)) {
                label.innerHTML = msg;
            }
        }
        return result;
    }
    HidePopupBox() {
        this.HideBox('modalpopup');
    }
    HideAlertPopupAsync() {
        window.setTimeout((function (manager) {
            return function () { manager.HideAlertPopup(); };
        })(this), 500);
    }
    ShowModalBox(title, msg, type) {
        let result = false;
        var div = document.getElementById('modalbox');
        if (!isNullOrUndefined(div)) {
            this.DisplayBox('modalbox');
            var label = document.getElementById('modaltitle');
            if (!isNullOrUndefined(label)) {
                label.innerHTML = title;
            }
            label = document.getElementById('modalmessage');
            if (!isNullOrUndefined(label)) {
                label.innerHTML = msg;
            }
            switch (type) {
                case MediaModelBoxType.NoButton:
                    this.HideButton('modalok');
                    this.HideButton('modalcancel');
                    this.HideButton('modalyes');
                    this.HideButton('modalno');
                    break;
                case MediaModelBoxType.Ok:
                    this.HideButton('modalcancel');
                    this.HideButton('modalyes');
                    this.HideButton('modalno');
                    this.DisplayButton('modalok', GetCurrentString('Ok'));
                    break;
                case MediaModelBoxType.OkCancel:
                    this.HideButton('modalyes');
                    this.HideButton('modalno');
                    this.DisplayButton('modalok', GetCurrentString('Ok'));
                    this.DisplayButton('modalcancel', GetCurrentString('Cancel'));
                    break;
                case MediaModelBoxType.YesNo:
                    this.HideButton('modalok');
                    this.HideButton('modalcancel');
                    this.DisplayButton('modalyes', GetCurrentString('yes'));
                    this.DisplayButton('modalno', GetCurrentString('No'));
                    break;
                case MediaModelBoxType.YesNoCancel:
                    this.HideButton('modalok');
                    this.DisplayButton('modalyes', GetCurrentString('Yes'));
                    this.DisplayButton('modalno', GetCurrentString('No'));
                    this.DisplayButton('modalcancel', GetCurrentString('Cancel'));
                    break;
                default:
                    this.HideButton('modalok');
                    this.HideButton('modalcancel');
                    this.HideButton('modalyes');
                    this.HideButton('modalno');
                    break;
            }
        }
        return result;
    }
    HideModalBox() {
        //        $("#modalbox").modal('hide');
        this.HideBox('modalbox');
    }
    HideModalBoxAsync() {
        window.setTimeout((function (manager) {
            return function () { manager.HideModalBox(); };
        })(this), 500);
    }
    ShowModalBoxAsync(title, msg, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                let result = false;
                try {
                    var div = document.getElementById('modalbox');
                    if (!isNullOrUndefined(div)) {
                        this.DisplayBox('modalbox');
                        var label = document.getElementById('modaltitle');
                        if (!isNullOrUndefined(label)) {
                            label.innerHTML = title;
                        }
                        label = document.getElementById('modalmessage');
                        if (!isNullOrUndefined(label)) {
                            label.innerHTML = msg;
                        }
                        switch (type) {
                            case MediaModelBoxType.NoButton:
                                this.HideButton('modalok');
                                this.HideButton('modalcancel');
                                this.HideButton('modalyes');
                                this.HideButton('modalno');
                                break;
                            case MediaModelBoxType.Ok:
                                this.HideButton('modalcancel');
                                this.HideButton('modalyes');
                                this.HideButton('modalno');
                                this.DisplayButton('modalok', GetCurrentString('Ok'));
                                break;
                            case MediaModelBoxType.OkCancel:
                                this.HideButton('modalyes');
                                this.HideButton('modalno');
                                this.DisplayButton('modalok', GetCurrentString('Ok'));
                                this.DisplayButton('modalcancel', GetCurrentString('Cancel'));
                                break;
                            case MediaModelBoxType.YesNo:
                                this.HideButton('modalok');
                                this.HideButton('modalcancel');
                                this.DisplayButton('modalyes', GetCurrentString('yes'));
                                this.DisplayButton('modalno', GetCurrentString('No'));
                                break;
                            case MediaModelBoxType.YesNoCancel:
                                this.HideButton('modalok');
                                this.DisplayButton('modalyes', GetCurrentString('Yes'));
                                this.DisplayButton('modalno', GetCurrentString('No'));
                                this.DisplayButton('modalcancel', GetCurrentString('Cancel'));
                                break;
                            default:
                                this.HideButton('modalok');
                                this.HideButton('modalcancel');
                                this.HideButton('modalyes');
                                this.HideButton('modalno');
                                break;
                        }
                        var button = document.getElementById('modalok');
                        if (!isNullOrUndefined(button)) {
                            button.addEventListener('click', (function () {
                                return function () {
                                    resolve(true);
                                };
                            })(), false);
                        }
                        button = document.getElementById('modalcancel');
                        if (!isNullOrUndefined(button)) {
                            button.addEventListener('click', (function () {
                                return function () {
                                    resolve(false);
                                };
                            })(), false);
                        }
                        button = document.getElementById('modalyes');
                        if (!isNullOrUndefined(button)) {
                            button.addEventListener('click', (function () {
                                return function () {
                                    resolve(true);
                                };
                            })(), false);
                        }
                        button = document.getElementById('modalno');
                        if (!isNullOrUndefined(button)) {
                            button.addEventListener('click', (function () {
                                return function () {
                                    resolve(false);
                                };
                            })(), false);
                        }
                        button = document.getElementById('modalclose');
                        if (!isNullOrUndefined(button)) {
                            button.addEventListener('click', (function () {
                                return function () {
                                    resolve(false);
                                };
                            })(), false);
                        }
                    }
                }
                catch (error) {
                    resolve(false);
                }
            });
        });
    }
    ShowModalPopupAsync(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                let result = false;
                try {
                    var div = document.getElementById('modalpopup');
                    if (!isNullOrUndefined(div)) {
                        this.DisplayBox('modalpopup');
                        var label = document.getElementById('modalpopupmessage');
                        if (!isNullOrUndefined(label)) {
                            label.innerHTML = msg;
                            resolve(true);
                        }
                    }
                }
                catch (error) {
                    resolve(false);
                }
            });
        });
    }
    ShowModalPopup(msg) {
        let result = false;
        var div = document.getElementById('modalpopup');
        if (!isNullOrUndefined(div)) {
            this.DisplayBox('modalpopup');
            var label = document.getElementById('modalpopupmessage');
            if (!isNullOrUndefined(label)) {
                label.innerHTML = msg;
                result = true;
            }
        }
        return result;
    }
    HideModalPopupAsync() {
        window.setTimeout((function (manager) {
            return function () { manager.HideModalPopup(); };
        })(this), 500);
    }
    HideModalPopup() {
        this.HideBox('modalpopup');
    }
}
// static attributes
MediaManager.internalBack = false;
MediaManager.initialized = false;
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Home
 */
class Home extends MediaObject {
}
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * HomeView
 */
class HomeView extends MediaView {
    CreateChildView(current) {
        var div = document.getElementById(this.GetMediaManager().GetId());
        if (isNullOrUndefined(div))
            return false;
        let result = "<div id=\"home\" class=\"container\"><h3>" + GetCurrentString('Home Page') + "</h3><p>" + GetCurrentString('Explore your media') + "</p>";
        result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button></div></div>";
        result += "</div></div>";
        div.innerHTML = result;
        return true;
    }
    RegisterViewEvents(current) {
        return true;
    }
    InitializeViewControls(current) {
        return true;
    }
    MakeViewControlVisible(current) {
        return true;
    }
    CreateView(current) {
        var result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\"" + this.GetControlViewId(current.GetIndex()) + "\" ><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
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
        if (this.DisplayNextButton(current) || this.DisplayPreviousButton(current)) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (this.DisplayPreviousButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            if (this.DisplayNextButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            result += "</div>";
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
var RenderHomePage = function (id, bPush = true) {
    mediaPointer = new Home("Home", "Home main View", "", "", "", "");
    if (!isNullOrUndefined(mediaPointer)) {
        mediaManager.SetRoot(mediaPointer);
        mediaManager.RenderMediaView(bPush);
    }
    /*
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
        
    let result:string = "<div id=\"home\" class=\"container\"><h3>" + GetCurrentString('Home Page') + "</h3><p>" + GetCurrentString('Explore your media') + "</p>";
    result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button></div></div>";
    result += "</div></div>";
    div.innerHTML = result;
    */
    HideBurgerMenu();
    UpdateMenuBar("homeTitle");
    return;
};
// Export method:
window.RenderHomePage = RenderHomePage;
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Home
 */
class Setting extends MediaObject {
}
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
/*
var PaginationChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('paginationsize');
    var value = s.value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalPagination(parseInt(value));
    }
};
window.PaginationChanged = PaginationChanged;

var SlideShowPeriodChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('slideshowperiod');
    var value = s.value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalSlideShowPeriod(parseInt(value));
    }
};
window.SlideShowPeriodChanged = SlideShowPeriodChanged;

var LanguageSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('languageselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalLanguage(value);
        UpdateMainPageText();
    }
};
window.LanguageSelectionChanged = LanguageSelectionChanged;

var ChangeLanguageSelection = function(lang: string){
    var s = <HTMLSelectElement>document.getElementById('languageselection');
    if (!isNullOrUndefined(s)){
        for(var i=0; i<s.options.length;i++){
            if(s.options[i].value == lang ){
                s.options.selectedIndex = i;
                break;
            }
        }
    }
};

var ColorSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('colorselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalColor(value);
        document.documentElement.setAttribute('theme', value);
        UpdateMenuBar("settingsTitle");
    }
};
window.ColorSelectionChanged = ColorSelectionChanged;

var ChangeColorSelection = function(color: string){
    var s = <HTMLSelectElement>document.getElementById('colorselection');
    if (!isNullOrUndefined(s)){
        for(var i=0; i<s.options.length;i++){
            if(s.options[i].value == color ){
                s.options.selectedIndex = i;
                break;
            }
        }
    }
};

var PlaylistSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('playlistselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
    }
};
window.PlaylistSelectionChanged = PlaylistSelectionChanged;


var cancellationToken:boolean = false;

var UpdatePlaylistControls = function() {
    var defaultvalue:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
    var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
    var value:string = "";
    if((!isNullOrUndefined(defaultvalue))&&(!isNullOrUndefined(list))){
        var select:HTMLSelectElement = <HTMLSelectElement>document.getElementById("playlistselection");
        if(!isNullOrUndefined(select)){
            var i:number, L:number = select.options.length - 1;
            for(i = L; i >= 0; i--) {
               select.remove(i);
            }
            
            for(i=0;i<list.GetChildrenLength();i++){
                value = list.GetChildWithIndex(i).GetName();
                var option = document.createElement("option");
                option.text = value;
                option.value = value;
                if(value == defaultvalue)
                    option.selected = true;
                else
                    option.selected = false;
                select.options.add(option);
            }
        }
    }

}
var InitializeCloudControls = function (){
    var button = <HTMLButtonElement>document.getElementById("createmenu");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",async function()
        {
            var account: string = "";
            var sas: string = "";
            var container: string = "";
            var folder: string = "";
            var menutype: string = "";
            
            var input = <HTMLInputElement>document.getElementById("accountname");
            if(!isNullOrUndefined(input)){
                account = input.value;
            }
            input = <HTMLInputElement>document.getElementById("containername");
            if(!isNullOrUndefined(input)){
                container = input.value;
            }
            input = <HTMLInputElement>document.getElementById("sas");
            if(!isNullOrUndefined(input)){
                sas = input.value;
            }
            input = <HTMLInputElement>document.getElementById("foldername");
            if(!isNullOrUndefined(input)){
                folder = input.value;
            }
            var select = <HTMLSelectElement>document.getElementById("menutype");
            if(!isNullOrUndefined(select)){
                menutype = select.value;
            }
            GlobalVars.SetGlobalAccount(account);
            GlobalVars.SetGlobalContainer(container);
            GlobalVars.SetGlobalSAS(sas);
            GlobalVars.SetGlobalFolder(folder);
            GlobalVars.SetGlobalMenuType(menutype);

            cancellationToken = false;
            var button = <HTMLButtonElement>document.getElementById("createmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = true;
                button.style.display = "none";
            }
            button = <HTMLButtonElement>document.getElementById("cancelmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = false;
                button.style.display = "block";
            }
            GlobalVars.SetCancellationToken(false);

            await CreateMediaMenu(menutype,account,sas,container,folder,"status","result");
            button = <HTMLButtonElement>document.getElementById("createmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = false;
                button.style.display = "block";
            }
            button = <HTMLButtonElement>document.getElementById("cancelmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = true;
                button.style.display = "none";
            }
            var result = <HTMLElement>document.getElementById("result");
            if(!isNullOrUndefined(result)&&(!isNullOrUndefinedOrEmpty(result.innerHTML))){
                button = <HTMLButtonElement>document.getElementById("rendermenu");
                if(!isNullOrUndefined(button)){
                    button.disabled = false;
                    button.style.display = "block";
                }
            }
        });
    }
    button = <HTMLButtonElement>document.getElementById("cancelmenu");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            GlobalVars.SetCancellationToken(true);
            var button = <HTMLButtonElement>document.getElementById("createmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = false;
                button.style.display = "block";
            }
            button = <HTMLButtonElement>document.getElementById("cancelmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = true;
                button.style.display = "none";
            }
        });
    }
    button = <HTMLButtonElement>document.getElementById("rendermenu");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var result = <HTMLTextAreaElement>document.getElementById("result");
            if(!isNullOrUndefined(result)&&(!isNullOrUndefinedOrEmpty(result.innerHTML))){


                var object:IMediaObject = MediaObject.Deserialize(result.value);
                if(!isNullOrUndefined(object))
                {
                    mediaPointer = object;
                    mediaManager = MediaManager.CreateMediaManager("mainview",GlobalVars.GetGlobalPagination(),GlobalVars.GetGlobalPlaybackLoop());
                    mediaManager.SetRoot(mediaPointer)
                    mediaManager.SetCurrentMediaObject(mediaPointer)
                    mediaManager.SetIndexActiveMediaMediaObject(-1);
                    mediaManager.RenderMediaView(true);
                }
            }
       });
    }
    button = <HTMLButtonElement>document.getElementById("addplaylist");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var value:string = "";
            var defaultvalue:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
            var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
            var control:HTMLInputElement = <HTMLInputElement>document.getElementById("newfavoriteplaylist");
            if(!isNullOrUndefined(control)){
                value = control.value;
                if((!isNullOrUndefinedOrEmpty(value))){
                    if((!isNullOrUndefined(defaultvalue))&&(!isNullOrUndefined(list))){
                        // Check if already exists
                        if(!isNullOrUndefined(list.GetChildWithName(value)))
                            return;
                        list.AddChild(new Playlist(value,GetCurrentString("My Playlist: ") + value,"","","",""));
                        GlobalVars.SetGlobalFavoritePlaylists(list);
                        GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
                    }
                }
            }
            UpdatePlaylistControls();
       });
    }
    button = <HTMLButtonElement>document.getElementById("removeplaylist");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var select:HTMLSelectElement = <HTMLSelectElement>document.getElementById("playlistselection");
            if(!isNullOrUndefined(select)){
                for(var i:number=0;i<select.options.length;i++){
                    if(select.options[i].selected == true)
                    {
                        var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
                        if((!isNullOrUndefined(list))){
                            list.RemoveChildWithName(select.options[i].value);
                        }
                        GlobalVars.SetGlobalFavoritePlaylists(list);
                    }
                }
            }
            UpdatePlaylistControls();

       });
    }
    button = <HTMLButtonElement>document.getElementById("exportplaylists");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
            if((!isNullOrUndefined(list))){
                var jsontext = <HTMLElement>document.getElementById("jsontext");
                if(!isNullOrUndefined(jsontext)){
                    jsontext.innerHTML = MediaObject.Serialize(list);

                }
            }
       });
    }
    button = <HTMLButtonElement>document.getElementById("importplaylists");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var jsontext = <HTMLTextAreaElement>document.getElementById("jsontext");
            if((!isNullOrUndefined(jsontext))&&(!isNullOrUndefinedOrEmpty(jsontext.innerHTML))){
                var object:IMediaObject = MediaObject.Deserialize(jsontext.value);
                if(!isNullOrUndefined(object)){
                    GlobalVars.SetGlobalFavoritePlaylists(object);
                }
            }
       });
    }
    var input = <HTMLInputElement>document.getElementById("accountname");
    if(!isNullOrUndefined(input)){
        input.value = GlobalVars.GetGlobalAccount();
    }
    input = <HTMLInputElement>document.getElementById("containername");
    if(!isNullOrUndefined(input)){
        input.value = GlobalVars.GetGlobalContainer();
    }
    input = <HTMLInputElement>document.getElementById("sas");
    if(!isNullOrUndefined(input)){
        input.value = GlobalVars.GetGlobalSAS();
    }
    input = <HTMLInputElement>document.getElementById("foldername");
    if(!isNullOrUndefined(input)){
        input.value = GlobalVars.GetGlobalFolder();
    }
    var select = <HTMLSelectElement>document.getElementById("menutype");
    if(!isNullOrUndefined(select)){
        for(var i=0; i<select.options.length;i++){
            if(select.options[i].value == GlobalVars.GetGlobalFolder() ){
                select.options.selectedIndex = i;
                break;
            }
        }
    }
    var button = <HTMLButtonElement>document.getElementById("createmenu");
    if(!isNullOrUndefined(button)){
        button.disabled = false;
        button.style.display = "block";
    }
    button = <HTMLButtonElement>document.getElementById("cancelmenu");
    if(!isNullOrUndefined(button)){
        button.disabled = true;
        button.style.display = "none";
    }
    button = <HTMLButtonElement>document.getElementById("rendermenu");
    if(!isNullOrUndefined(button)){
        button.disabled = true;
        button.style.display = "none";
    }
    UpdatePlaylistControls();
    GlobalVars.SetCancellationToken(false);
}
*/
var RenderSettingPage = function (id, bPush = true) {
    mediaPointer = new Setting("Setting", "Setting main View", "", "", "", "");
    if (!isNullOrUndefined(mediaPointer)) {
        mediaManager.SetRoot(mediaPointer);
        mediaManager.RenderMediaView(bPush);
    }
    /*
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
        
    let result:string = "<div id=\"home\" class=\"container\"><h3>" + GetCurrentString('Home Page') + "</h3><p>" + GetCurrentString('Explore your media') + "</p>";
    result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button></div></div>";
    result += "</div></div>";
    div.innerHTML = result;
    */
    HideBurgerMenu();
    UpdateMenuBar("settingsTitle");
    return;
};
/*
var RenderSettingsPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    var result = "<div id='setting' class='container'><h3>" + GetCurrentString('Settings Page') + "</h3>";
    result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button></div></div>";
    result +="<p></p><p><strong>" + GetCurrentString('APPLICATION CONFIGURATION:') + "</strong></p><p></p>";
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
    </select></div></div>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Pagination size:') + "</strong></label><div class='col-sm-4'><input  type=\"number\" class=\"form-control\" id=\"paginationsize\" onchange='window.PaginationChanged();'  placeholder=\"" + GlobalVars.GetGlobalPagination().toString() + "\"></div></div>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Slide Show Period ms:') + "</strong></label><div class='col-sm-4'><input  type=\"number\" class=\"form-control\" id=\"slideshowperiod\" onchange='window.SlideShowPeriodChanged();'  placeholder=\"" + GlobalVars.GetGlobalSlideShowPeriod().toString() + "\"></div></div>";

    result += "<p></p><p><strong>" + GetCurrentString('CONFIGURE FAVORITE PLAYLISTS:') + "</strong></p><p></p>";
    result += "<div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('New favorite Playlist:') + "</strong></label><div class='col-sm-2'><input  type=\"text\" class=\"form-control \" id=\"newfavoriteplaylist\" placeholder=\"\"></div><div class='col-sm-1'></div><div class='col-sm-3'><button type=\"button\" id=\"addplaylist\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Add new playlist') + "</button></div></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Select the current playlist:') + "</strong></label><div class='col-sm-2'><select id='playlistselection'  class='selectpicker' onchange='window.PlaylistSelectionChanged();'  > ";
    var value:string = "";
    var defaultvalue:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
    var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();

    if((!isNullOrUndefined(defaultvalue))&&(!isNullOrUndefined(list))){
        for(var i:number=0;i<list.GetChildrenLength();i++){
            value = list.GetChildWithIndex(i).GetName();
            if(value == defaultvalue)
                result += "<option value=\"" + value + "\" selected >" + value + "</option>";
            else
                result += "<option value=\"" + value + "\" >" + value + "</option>";
        }
    }

    result += "</select></div><div class='col-sm-1'></div><div class='col-sm-3'><button type=\"button\" id=\"removeplaylist\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Remove playlist') + "</button></div></div>";
    result += "<div class=\"row\"><div class='col-sm-4'></div>";
    result += "<div class='col-sm-3'><button type=\"button\" id=\"exportplaylists\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Export all playlists') + "</button></div>";
    result += "<div class='col-sm-3'><button type=\"button\" id=\"importplaylists\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Import all playlists') + "</button></div>";
    result += "</div>";
    result += "<div class=\"row\"><label class=\"col-sm-4\" ><strong>" +  GetCurrentString('Favorite playlists content:') + "</strong></label><textarea id=\"jsontext\" class=\"col-sm-8\" style=\"height:100px;  overflow: scroll;\"></textarea></div>"

    result += "</div></div>";


    result += "<p></p><p><strong>" + GetCurrentString('CREATION OF NEW CLOUD PLAYLIST:') + "</strong></p><p></p>";
    result += "<div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Account Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"accountname\" placeholder=\"" + GlobalVars.GetGlobalAccount() + "\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud SAS:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"sas\" placeholder=\"" + GlobalVars.GetGlobalSAS() + "\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Container Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"containername\" placeholder=\"" + GlobalVars.GetGlobalContainer() + "\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Folder Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"foldername\" placeholder=\"" + GlobalVars.GetGlobalFolder() + "\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Menu Type:') + "</strong></label><select id=\"menutype\" class=\"selectpicker col-sm-2\" ><option value=\"Music\">Music</option><option value=\"Photo\">Photo</option><option value=\"Video\">Video</option><option value=\"Radio\">Radio</option><option value=\"TV\">TV</option><option value=\"Playlist\">Playlist</option></select></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Status:') + "</strong></label><div class=\"col-sm-8\"><p id=\"status\" style=\"height:60px; width: 600px;\"></p></div>";
    result += "<label class=\"col-sm-4\" ><strong>" +  GetCurrentString('Result:') + "</strong></label><textarea id=\"result\" class=\"col-sm-8\" style=\"height:100px;  overflow: scroll;\"></textarea></div>";
    result += "<div class=\"row\"><button type=\"button\" id=\"createmenu\" class=\"media-button  media-button-text\" style=\"display: block\">" +  GetCurrentString('Create Menu') + "</button>";
    result += "<button type=\"button\" id=\"cancelmenu\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Cancel creation') + "</button>";
    result += "<button type=\"button\" id=\"rendermenu\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Render Menu') + "</button>";
    result += "</div></div>";
    result += "</div>";

    div.innerHTML = result;

    HideBurgerMenu();
    ChangeColorSelection(GlobalVars.GetGlobalColor());
    ChangeLanguageSelection(GlobalVars.GetGlobalLanguage());
    InitializeCloudControls();
    UpdateMenuBar("settingsTitle");
    return;
};
window.RenderSettingPage = RenderSettingPage;

*/
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * HomeView
 */
class SettingView extends MediaView {
    CreateChildView(current) {
        return this.InternalCreateChildView(current);
    }
    CreateView(current) {
        var result = "<div id='setting' class='container'><h3>" + GetCurrentString('Settings Page') + "</h3>";
        result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button>";
        result += "</div></div>";
        result += "<div class='container'>";
        result += "<ul class='nav nav-pills'><li class='active'><a data-toggle='pill' class='media-tab-button' id='configurationtab' onclick=\"window.UpdateTabBar('configurationtab');\" href='#configuration'>" + GetCurrentString('Configuration') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='favoritetab' onclick=\"window.UpdateTabBar('favoritetab');\"  href='#favorite'>" + GetCurrentString('Favorite') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='cloudtab' onclick=\"window.UpdateTabBar('cloudtab');\"  href='#cloud'>" + GetCurrentString('Cloud') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='devicetab' onclick=\"window.UpdateTabBar('devicetab');\"  href='#device'>" + GetCurrentString('Device') + "</a></li></ul>";
        //  result += "<ul class='nav nav-tabs'><li class='media-menu-button active'><a data-toggle='tab' href='#configuration'>" + GetCurrentString('Configuration') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#favorite'>" + GetCurrentString('Favorites') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#cloud'>" + GetCurrentString('Cloud') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#device'>" + GetCurrentString('Device') + "</a></li></ul>";
        result += "<div class='tab-content'>";
        result += "<div id='configuration' class='tab-pane fade in active'><h3>" + GetCurrentString('Application Configuration') + "</h3>";
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
        </select></div></div>";
        result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Pagination size:') + "</strong></label><div class='col-sm-4'><input  type=\"number\" class=\"form-control\" id=\"paginationsize\" onchange='window.PaginationChanged();'  placeholder=\"" + GlobalVars.GetGlobalPagination().toString() + "\"></div></div>";
        result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Slide Show Period ms:') + "</strong></label><div class='col-sm-4'><input  type=\"number\" class=\"form-control\" id=\"slideshowperiod\" onchange='window.SlideShowPeriodChanged();'  placeholder=\"" + GlobalVars.GetGlobalSlideShowPeriod().toString() + "\"></div></div>";
        result += "<div class=\"row\"><button type=\"button\" id=\"reinitialize\" class=\"media-button  media-button-text\" style=\"display: block\" >" + GetCurrentString('Reinitialize') + "</button></div>";
        result += "</div>";
        result += "<div id='favorite' class='tab-pane fade'><h3>" + GetCurrentString('Favorite Configuration') + "</h3>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" + GetCurrentString('New favorite Playlist:') + "</strong></label><div class='col-sm-2'><input  type=\"text\" class=\"form-control \" id=\"newfavoriteplaylist\" placeholder=\"\"></div><div class='col-sm-1'></div><div class='col-sm-3'><button type=\"button\" id=\"addplaylist\" class=\"media-button  media-button-text\" style=\"display: block\" >" + GetCurrentString('Add new playlist') + "</button></div></div>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" + GetCurrentString('Select the current playlist:') + "</strong></label><div class='col-sm-2'><select id='playlistselection'  class='selectpicker' onchange='window.PlaylistSelectionChanged();'  > ";
        var value = "";
        var defaultvalue = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var list = GlobalVars.GetGlobalFavoritePlaylists();
        if ((!isNullOrUndefined(defaultvalue)) && (!isNullOrUndefined(list))) {
            for (var i = 0; i < list.GetChildrenLength(); i++) {
                value = list.GetChildWithIndex(i).GetName();
                if (value == defaultvalue)
                    result += "<option value=\"" + value + "\" selected >" + value + "</option>";
                else
                    result += "<option value=\"" + value + "\" >" + value + "</option>";
            }
        }
        result += "</select></div><div class='col-sm-1'></div><div class='col-sm-3'><button type=\"button\" id=\"removeplaylist\" class=\"media-button  media-button-text\" style=\"display: block\" >" + GetCurrentString('Remove playlist') + "</button></div></div>";
        result += "<div class=\"row\"><div class='col-sm-4'></div>";
        result += "<div class='col-sm-3'><button type=\"button\" id=\"exportplaylists\" class=\"media-button  media-button-text\" style=\"display: block\" >" + GetCurrentString('Export all playlists') + "</button></div>";
        result += "<div class='col-sm-3'><button type=\"button\" id=\"importplaylists\" class=\"media-button  media-button-text\" style=\"display: block\" >" + GetCurrentString('Import all playlists') + "</button></div>";
        result += "</div>";
        result += "<div class=\"row\"><label class=\"col-sm-4\" ><strong>" + GetCurrentString('Favorite playlists content:') + "</strong></label><textarea id=\"jsontext\" class=\"col-sm-8\" style=\"height:100px;  overflow: scroll;\"></textarea></div>";
        result += "</div>";
        result += "<div id='cloud' class='tab-pane fade'><h3>" + GetCurrentString('Cloud Configuration') + "</h3>";
        result += "<div>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" + GetCurrentString('Cloud Account Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"accountname\" placeholder=\"" + GlobalVars.GetGlobalAccount() + "\"></div>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" + GetCurrentString('Cloud SAS:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"sas\" placeholder=\"" + GlobalVars.GetGlobalSAS() + "\"></div>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" + GetCurrentString('Cloud Container Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"containername\" placeholder=\"" + GlobalVars.GetGlobalContainer() + "\"></div>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" + GetCurrentString('Cloud Folder Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"foldername\" placeholder=\"" + GlobalVars.GetGlobalFolder() + "\"></div>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" + GetCurrentString('Menu Type:') + "</strong></label><select id=\"menutype\" class=\"selectpicker col-sm-2\" ><option value=\"Music\">Music</option><option value=\"Photo\">Photo</option><option value=\"Video\">Video</option><option value=\"Radio\">Radio</option><option value=\"TV\">TV</option><option value=\"Playlist\">Playlist</option></select></div>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" + GetCurrentString('Status:') + "</strong></label><div class=\"col-sm-8\"><p id=\"status\" style=\"height:60px; width: 600px;\"></p></div>";
        result += "<label class=\"col-sm-4\" ><strong>" + GetCurrentString('Result:') + "</strong></label><textarea id=\"result\" class=\"col-sm-8\" style=\"height:100px;  overflow: scroll;\"></textarea></div>";
        result += "<div class=\"row\"><button type=\"button\" id=\"createmenu\" class=\"media-button  media-button-text\" style=\"display: block\">" + GetCurrentString('Create Menu') + "</button>";
        result += "<button type=\"button\" id=\"cancelmenu\" class=\"media-button  media-button-text\" style=\"display: block\" >" + GetCurrentString('Cancel creation') + "</button>";
        result += "<button type=\"button\" id=\"rendermenu\" class=\"media-button  media-button-text\" style=\"display: block\" >" + GetCurrentString('Render Menu') + "</button>";
        result += "</div></div>";
        result += "</div>";
        result += "<div id='device' class='tab-pane fade'><h3>" + GetCurrentString('Device Configuration') + "</h3>";
        result += "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>";
        result += "</div>";
        result += "</div>";
        result += "</div>";
        return result;
    }
    RegisterViewEvents(current) {
        return true;
    }
    InitializeViewControls(current) {
        this.InitializeCloudControls();
        return true;
    }
    MakeViewControlVisible(current) {
        return true;
    }
    CreatePreview() {
        return "<div><label>Home Preview</label></div>";
    }
    InitializeCloudControls() {
        var button = document.getElementById("createmenu");
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    var account = "";
                    var sas = "";
                    var container = "";
                    var folder = "";
                    var menutype = "";
                    var input = document.getElementById("accountname");
                    if (!isNullOrUndefined(input)) {
                        account = input.value;
                    }
                    input = document.getElementById("containername");
                    if (!isNullOrUndefined(input)) {
                        container = input.value;
                    }
                    input = document.getElementById("sas");
                    if (!isNullOrUndefined(input)) {
                        sas = input.value;
                    }
                    input = document.getElementById("foldername");
                    if (!isNullOrUndefined(input)) {
                        folder = input.value;
                    }
                    var select = document.getElementById("menutype");
                    if (!isNullOrUndefined(select)) {
                        menutype = select.value;
                    }
                    GlobalVars.SetGlobalAccount(account);
                    GlobalVars.SetGlobalContainer(container);
                    GlobalVars.SetGlobalSAS(sas);
                    GlobalVars.SetGlobalFolder(folder);
                    GlobalVars.SetGlobalMenuType(menutype);
                    cancellationToken = false;
                    var button = document.getElementById("createmenu");
                    if (!isNullOrUndefined(button)) {
                        button.disabled = true;
                        button.style.display = "none";
                    }
                    button = document.getElementById("cancelmenu");
                    if (!isNullOrUndefined(button)) {
                        button.disabled = false;
                        button.style.display = "block";
                    }
                    GlobalVars.SetCancellationToken(false);
                    yield CreateMediaMenu(menutype, account, sas, container, folder, "status", "result");
                    button = document.getElementById("createmenu");
                    if (!isNullOrUndefined(button)) {
                        button.disabled = false;
                        button.style.display = "block";
                    }
                    button = document.getElementById("cancelmenu");
                    if (!isNullOrUndefined(button)) {
                        button.disabled = true;
                        button.style.display = "none";
                    }
                    var result = document.getElementById("result");
                    if (!isNullOrUndefined(result) && (!isNullOrUndefinedOrEmpty(result.innerHTML))) {
                        button = document.getElementById("rendermenu");
                        if (!isNullOrUndefined(button)) {
                            button.disabled = false;
                            button.style.display = "block";
                        }
                    }
                });
            });
        }
        button = document.getElementById("cancelmenu");
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", function () {
                GlobalVars.SetCancellationToken(true);
                var button = document.getElementById("createmenu");
                if (!isNullOrUndefined(button)) {
                    button.disabled = false;
                    button.style.display = "block";
                }
                button = document.getElementById("cancelmenu");
                if (!isNullOrUndefined(button)) {
                    button.disabled = true;
                    button.style.display = "none";
                }
            });
        }
        button = document.getElementById("rendermenu");
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", function () {
                var result = document.getElementById("result");
                if (!isNullOrUndefined(result) && (!isNullOrUndefinedOrEmpty(result.innerHTML))) {
                    var object = MediaObject.Deserialize(result.value);
                    if (!isNullOrUndefined(object)) {
                        mediaPointer = object;
                        mediaManager.SetRoot(mediaPointer);
                        mediaManager.RenderMediaView(true);
                    }
                }
            });
        }
        button = document.getElementById("addplaylist");
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", function () {
                var value = "";
                var defaultvalue = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
                var list = GlobalVars.GetGlobalFavoritePlaylists();
                var control = document.getElementById("newfavoriteplaylist");
                if (!isNullOrUndefined(control)) {
                    value = control.value;
                    if ((!isNullOrUndefinedOrEmpty(value))) {
                        if ((!isNullOrUndefined(defaultvalue)) && (!isNullOrUndefined(list))) {
                            // Check if already exists
                            if (!isNullOrUndefined(list.GetChildWithName(value)))
                                return;
                            list.AddChild(new Playlist(value, GetCurrentString("My Playlist: ") + value, "", "", "", ""));
                            GlobalVars.SetGlobalFavoritePlaylists(list);
                            GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
                        }
                    }
                }
                UpdatePlaylistControls();
            });
        }
        button = document.getElementById("removeplaylist");
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", function () {
                var select = document.getElementById("playlistselection");
                if (!isNullOrUndefined(select)) {
                    for (var i = 0; i < select.options.length; i++) {
                        if (select.options[i].selected == true) {
                            var list = GlobalVars.GetGlobalFavoritePlaylists();
                            if ((!isNullOrUndefined(list))) {
                                list.RemoveChildWithName(select.options[i].value);
                            }
                            GlobalVars.SetGlobalFavoritePlaylists(list);
                        }
                    }
                }
                UpdatePlaylistControls();
            });
        }
        button = document.getElementById("exportplaylists");
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", function () {
                var list = GlobalVars.GetGlobalFavoritePlaylists();
                if ((!isNullOrUndefined(list))) {
                    var jsontext = document.getElementById("jsontext");
                    if (!isNullOrUndefined(jsontext)) {
                        jsontext.innerHTML = MediaObject.Serialize(list);
                        /*
                        var bb = new Blob([fileContent ], { type: 'application/json' });
                        var a = document.createElement('a');
                        a.download = 'favorite.json';
                        a.href = window.URL.createObjectURL(bb);
                        a.click();
                        */
                    }
                }
            });
        }
        button = document.getElementById("importplaylists");
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", function () {
                var jsontext = document.getElementById("jsontext");
                if ((!isNullOrUndefined(jsontext)) && (!isNullOrUndefinedOrEmpty(jsontext.innerHTML))) {
                    var object = MediaObject.Deserialize(jsontext.value);
                    if (!isNullOrUndefined(object)) {
                        GlobalVars.SetGlobalFavoritePlaylists(object);
                    }
                }
            });
        }
        var input = document.getElementById("accountname");
        if (!isNullOrUndefined(input)) {
            input.value = GlobalVars.GetGlobalAccount();
        }
        input = document.getElementById("containername");
        if (!isNullOrUndefined(input)) {
            input.value = GlobalVars.GetGlobalContainer();
        }
        input = document.getElementById("sas");
        if (!isNullOrUndefined(input)) {
            input.value = GlobalVars.GetGlobalSAS();
        }
        input = document.getElementById("foldername");
        if (!isNullOrUndefined(input)) {
            input.value = GlobalVars.GetGlobalFolder();
        }
        var select = document.getElementById("menutype");
        if (!isNullOrUndefined(select)) {
            for (var i = 0; i < select.options.length; i++) {
                if (select.options[i].value == GlobalVars.GetGlobalFolder()) {
                    select.options.selectedIndex = i;
                    break;
                }
            }
        }
        var button = document.getElementById("createmenu");
        if (!isNullOrUndefined(button)) {
            button.disabled = false;
            button.style.display = "block";
        }
        button = document.getElementById("cancelmenu");
        if (!isNullOrUndefined(button)) {
            button.disabled = true;
            button.style.display = "none";
        }
        button = document.getElementById("rendermenu");
        if (!isNullOrUndefined(button)) {
            button.disabled = true;
            button.style.display = "none";
        }
        UpdatePlaylistControls();
        GlobalVars.SetCancellationToken(false);
        // Emulate a click on Configuration Tab
        button = document.getElementById("configurationtab");
        if (!isNullOrUndefined(button)) {
            button.click();
        }
        var button = document.getElementById("reinitialize");
        if (!isNullOrUndefined(button)) {
            button.addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    var result = yield mediaManager.ShowModalBoxAsync(GetCurrentString("Reinitializing the local storage"), GetCurrentString("Are you sure you want to reinitialize the local storage? You will lose your configuration and your favorite playlists."), MediaModelBoxType.YesNo);
                    if (result == true) {
                        GlobalVars.ClearData();
                        window.location.reload(true);
                    }
                });
            });
        }
        ChangeColorSelection(GlobalVars.GetGlobalColor());
        ChangeLanguageSelection(GlobalVars.GetGlobalLanguage());
    }
}
var cancellationToken = false;
var UpdatePlaylistControls = function () {
    var defaultvalue = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
    var list = GlobalVars.GetGlobalFavoritePlaylists();
    var value = "";
    if ((!isNullOrUndefined(defaultvalue)) && (!isNullOrUndefined(list))) {
        var select = document.getElementById("playlistselection");
        if (!isNullOrUndefined(select)) {
            var i, L = select.options.length - 1;
            for (i = L; i >= 0; i--) {
                select.remove(i);
            }
            for (i = 0; i < list.GetChildrenLength(); i++) {
                value = list.GetChildWithIndex(i).GetName();
                var option = document.createElement("option");
                option.text = value;
                option.value = value;
                if (value == defaultvalue)
                    option.selected = true;
                else
                    option.selected = false;
                select.options.add(option);
            }
        }
    }
};
var UpdateTabBar = function (id) {
    var array = ["cloudtab", "favoritetab", "devicetab", "configurationtab"];
    for (var index = 0; index < array.length; index++) {
        var menu = document.getElementById(array[index]);
        if (!isNullOrUndefined(menu)) {
            if (id == array[index]) {
                menu.style.backgroundColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--media-button-bg-color'); // #999999
                menu.style.color = getComputedStyle(document.documentElement)
                    .getPropertyValue('--media-button-text-color'); // #999999
            }
            else {
                menu.style.backgroundColor = 'Transparent';
                menu.style.color = getComputedStyle(document.documentElement)
                    .getPropertyValue('--media-button-bg-color'); // #999999
            }
        }
        ;
    }
};
window.UpdateTabBar = UpdateTabBar;
var PaginationChanged = function () {
    var s = document.getElementById('paginationsize');
    var value = s.value;
    if (!isNullOrUndefined(value)) {
        GlobalVars.SetGlobalPagination(parseInt(value));
    }
};
window.PaginationChanged = PaginationChanged;
var SlideShowPeriodChanged = function () {
    var s = document.getElementById('slideshowperiod');
    var value = s.value;
    if (!isNullOrUndefined(value)) {
        GlobalVars.SetGlobalSlideShowPeriod(parseInt(value));
    }
};
window.SlideShowPeriodChanged = SlideShowPeriodChanged;
var LanguageSelectionChanged = function () {
    var s = document.getElementById('languageselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)) {
        GlobalVars.SetGlobalLanguage(value);
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
        GlobalVars.SetGlobalColor(value);
        document.documentElement.setAttribute('theme', value);
        UpdateMenuBar("settingsTitle");
        UpdateTabBar("configurationtab");
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
var PlaylistSelectionChanged = function () {
    var s = document.getElementById('playlistselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)) {
        GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
    }
};
window.PlaylistSelectionChanged = PlaylistSelectionChanged;
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
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * MenuView
 */
class MenuView extends MediaView {
    CreateChildView(current) {
        return this.InternalCreateChildView(current);
    }
    RegisterViewEvents(current) {
        return this.internalRegisterVieWEvents(current);
    }
    InitializeViewControls(current) {
        return this.internalInitializeVieWControls(current);
    }
    MakeViewControlVisible(current) {
        return this.InternalMakeViewControlVisible(current);
    }
    CreateView(current) {
        var result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\"" + this.GetControlViewId(current.GetIndex()) + "\" ><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
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
        if (this.DisplayNextButton(current) || this.DisplayPreviousButton(current)) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (this.DisplayPreviousButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            if (this.DisplayNextButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            result += "</div>";
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
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * PlaylistView
 */
class PlaylistView extends MediaView {
    CreateChildView(current) {
        return this.InternalCreateChildView(current);
    }
    RegisterViewEvents(current) {
        return this.internalRegisterVieWEvents(current);
    }
    InitializeViewControls(current) {
        return this.internalInitializeVieWControls(current);
    }
    MakeViewControlVisible(current) {
        return this.InternalMakeViewControlVisible(current);
    }
    /*
    public  CreateView(current: IMediaObject): string
    {
        var result =  "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result +=  "<strong>" + current.GetName() +"</strong></p>";
        result +=  current.GetDescription() +"</p>";
        result +=  "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">" ;
        if(!isNullOrUndefined(current.GetParent())){
            result +=  "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>" ;
        };
        if(!isNullOrUndefined(current.GetChildWithIndex(0))){
            result +=  "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if( this.DisplayNextButton(current)||this.DisplayPreviousButton(current))
        {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if(this.DisplayPreviousButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else{
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }

            if(this.DisplayNextButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";

            }
            result += "</div>";
        }
        result +=  "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    }
    public  CreatePreview(): string
    {
        return "<div><label>Playlist Preview</label><button id=\"parentButtonId\">Left</button><button id=\"upButtonId\">Up</button><button id=\"downButtonId\">Down</button><button id=\"playButtonId\">Play</button><button id=\"childButtonId\">Child</button></div>";
    }
    */
    CreateView(current) {
        var result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\"" + this.GetControlViewId(current.GetIndex()) + "\" ><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient  \" >";
        if (!isNullOrUndefinedOrEmpty(current.GetImageUrl())) {
            result += "<div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img></div>";
        }
        else {
            var count = 0;
            var urlArray = [];
            result += "<div class=\"carousel slide\" data-interval=\"" + GlobalVars.GetGlobalSlideShowPeriod() + "\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
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
                        result += "<div class=\"carousel-item  active\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item \"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                }
            }
            else {
                result += "<div class=\"carousel-item active\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"assets/img/Music.png\" ></div></div>";
            }
            result += "</div></div>";
        }
        result += "</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div class='media-playback-div'>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<audio  id=\"" + this.GetAudioId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";
            result += "<div class=\"media-slider-container\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        else {
            result += "<div class=\"media-slider-div media-button-hidden\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";
            result += "<div class=\"media-slider-container \"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() + "</strong></p></div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top  media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top  media-button-big\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top  media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top  media-button-big\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>";
        }
        let artist = current.GetArtist();
        let album = current.GetAlbum();
        let track = current.GetTrack();
        let title = current.GetTitle();
        if (!isNullOrUndefinedOrEmpty(artist)) {
            if (!isNullOrUndefinedOrEmpty(album)) {
                if (!isNullOrUndefinedOrEmpty(track) ||
                    !isNullOrUndefinedOrEmpty(title)) {
                    // Audio track                
                    result += "<p class=\"media-artist\" ><strong>" + artist + "</strong></p>";
                    if (!isNullOrUndefinedOrEmpty(track))
                        result += "<p class=\"media-album\" >" + album + " " + GetCurrentString('Track: ') + track + "</p>";
                    else
                        result += "<p class=\"media-album\" >" + album + "</p>";
                }
                else {
                    // Album
                    let num = current.GetChildrenLength().toString();
                    result += "<p class=\"media-artist\" ><strong>" + artist + "</strong></p>";
                    result += "<p class=\"media-album\" >" + num + " " + GetCurrentString('tracks') + "</p>";
                }
            }
            else {
                // Artist
                let num = current.GetChildrenLength().toString();
                let counter = 0;
                for (let i = 0; i < current.GetChildrenLength(); i++) {
                    counter += current.GetChildWithIndex(i).GetChildrenLength();
                }
                result += "<p class=\"media-artist\" ><strong>" + num + " " + GetCurrentString('albums') + "</strong></p>";
                result += "<p class=\"media-album\" >" + counter.toString() + " " + GetCurrentString('tracks') + "</p>";
            }
        }
        else {
            result += "<p class=\"media-artist\" ><strong>" + current.GetDescription() + "</strong></p>";
            result += "<p class=\"media-album\" ></p>";
        }
        result += "</div>";
        result += "</div>";
        result += "<div class=\"media-div\" >";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        else {
            result += "<div class=\"media-button-group-horizontal  media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if (current.HasChild() == true) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        else {
            result += "<div class=\"media-button-group-horizontal media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-refresh\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-rotate-right\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-circle-o-notch\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetAddFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star-o\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetRemoveFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star\"></i></strong></button>";
            result += "</div>";
        }
        if (this.DisplayNextButton(current) || this.DisplayPreviousButton(current)) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (this.DisplayPreviousButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            if (this.DisplayNextButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
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
/*
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * MusicView
 */
class MusicView extends MediaView {
    CreateChildView(current) {
        return this.InternalCreateChildView(current);
    }
    RegisterViewEvents(current) {
        return this.internalRegisterVieWEvents(current);
    }
    InitializeViewControls(current) {
        return this.internalInitializeVieWControls(current);
    }
    MakeViewControlVisible(current) {
        return this.InternalMakeViewControlVisible(current);
    }
    CreateView(current) {
        var result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\"" + this.GetControlViewId(current.GetIndex()) + "\" ><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\"  \" >";
        if (!isNullOrUndefinedOrEmpty(current.GetImageUrl())) {
            result += "<div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img></div>";
        }
        else {
            var count = 0;
            var urlArray = [];
            result += "<div class=\"carousel slide\" data-interval=\"" + GlobalVars.GetGlobalSlideShowPeriod() + "\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
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
                        result += "<div class=\"carousel-item  active\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item \"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                }
            }
            else {
                result += "<div class=\"carousel-item active\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"assets/img/Music.png\" ></div></div>";
            }
            result += "</div></div>";
        }
        result += "</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div class='media-playback-div'>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<audio  id=\"" + this.GetAudioId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";
            result += "<div class=\"media-slider-container\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        else {
            result += "<div class=\"media-slider-div media-button-hidden\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";
            result += "<div class=\"media-slider-container \"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() + "</strong></p></div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>";
        }
        let artist = current.GetArtist();
        let album = current.GetAlbum();
        let track = current.GetTrack();
        let title = current.GetTitle();
        if (!isNullOrUndefinedOrEmpty(artist)) {
            if (!isNullOrUndefinedOrEmpty(album)) {
                if (!isNullOrUndefinedOrEmpty(track) ||
                    !isNullOrUndefinedOrEmpty(title)) {
                    // Audio track                
                    result += "<p class=\"media-artist\" ><strong>" + artist + "</strong></p>";
                    if (!isNullOrUndefinedOrEmpty(track))
                        result += "<p class=\"media-album\" >" + album + " " + GetCurrentString('Track: ') + track + "</p>";
                    else
                        result += "<p class=\"media-album\" >" + album + "</p>";
                }
                else {
                    // Album
                    let num = current.GetChildrenLength().toString();
                    result += "<p class=\"media-artist\" ><strong>" + artist + "</strong></p>";
                    result += "<p class=\"media-album\" >" + num + " " + GetCurrentString('tracks') + "</p>";
                }
            }
            else {
                // Artist
                let num = current.GetChildrenLength().toString();
                let counter = 0;
                for (let i = 0; i < current.GetChildrenLength(); i++) {
                    counter += current.GetChildWithIndex(i).GetChildrenLength();
                }
                result += "<p class=\"media-artist\" ><strong>" + num + " " + GetCurrentString('albums') + "</strong></p>";
                result += "<p class=\"media-album\" >" + counter.toString() + " " + GetCurrentString('tracks') + "</p>";
            }
        }
        else {
            result += "<p class=\"media-artist\" ><strong>" + current.GetDescription() + "</strong></p>";
            result += "<p class=\"media-album\" ></p>";
        }
        result += "</div>";
        result += "</div>";
        result += "<div class=\"media-div\" >";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        else {
            result += "<div class=\"media-button-group-horizontal  media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if (current.HasChild() == true) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        else {
            result += "<div class=\"media-button-group-horizontal media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-refresh\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-rotate-right\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-circle-o-notch\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetAddFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star-o\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetRemoveFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetDownloadButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-cloud-download\"></i></strong></button>";
            result += "</div>";
        }
        if (this.DisplayNextButton(current) || this.DisplayPreviousButton(current)) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (this.DisplayPreviousButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            if (this.DisplayNextButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
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
/*
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
class RadioView extends MediaView {
    CreateChildView(current) {
        return this.InternalCreateChildView(current);
    }
    RegisterViewEvents(current) {
        return this.internalRegisterVieWEvents(current);
    }
    InitializeViewControls(current) {
        return this.internalInitializeVieWControls(current);
    }
    MakeViewControlVisible(current) {
        return this.InternalMakeViewControlVisible(current);
    }
    CreateView(current) {
        //        var result =  "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" ><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"></img></div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        //        result += "<div>"          
        var result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\"" + this.GetControlViewId(current.GetIndex()) + "\" ><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" >";
        if (!isNullOrUndefinedOrEmpty(current.GetImageUrl())) {
            result += "<div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img></div>";
        }
        else {
            var count = 0;
            var urlArray = [];
            result += "<div class=\"carousel slide\" data-interval=\"" + GlobalVars.GetGlobalSlideShowPeriod() + "\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
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
                        result += "<div class=\"carousel-item active\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                }
            }
            else {
                result += "<div class=\"carousel-item active\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"assets/img/Music.png\" ></div></div>";
            }
            result += "</div></div>";
        }
        result += "</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div class='media-playback-div'>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<audio  id=\"" + this.GetAudioId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00:00</label>";
            result += "<div class=\"media-slider-container\" style=\"display: none\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\" style=\"display: none\"  >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        else {
            result += "<div class=\"media-slider-div media-button-hidden\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00:00</label>";
            result += "<div class=\"media-slider-container\" style=\"display: none\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\" style=\"display: none\"  >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() + "</strong></p></div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>";
        }
        result += "<p class=\"media-artist\" ><strong>" + current.GetDescription() + "</strong></p>";
        result += "<p class=\"media-album\" > </p>";
        result += "</div>";
        result += "</div>";
        result += "<div class=\"media-div\" >";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        else {
            result += "<div class=\"media-button-group-horizontal media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if (current.HasChild() == true) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        else {
            result += "<div class=\"media-button-group-horizontal media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetAddFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star-o\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetRemoveFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star\"></i></strong></button>";
            result += "</div>";
        }
        if (this.DisplayNextButton(current) || this.DisplayPreviousButton(current)) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (this.DisplayPreviousButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            if (this.DisplayNextButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
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
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * TVView
 */
class TVView extends MediaView {
    CreateChildView(current) {
        var div = document.getElementById(this.GetMediaManager().GetId());
        if (isNullOrUndefined(div))
            return false;
        div.innerHTML = "<div class='media-template'><div id=\"tv\" class=\"tab-pane\"><h3>" + GetCurrentString('TV Page') + "</h3><p>" + GetCurrentString('Play your TV channels') + "</p></div></div>";
        return true;
    }
    RegisterViewEvents(current) {
        return true;
    }
    InitializeViewControls(current) {
        return true;
    }
    MakeViewControlVisible(current) {
        return true;
    }
    CreateView(current) {
        var result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\"" + this.GetControlViewId(current.GetIndex()) + "\" ><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
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
        if (this.DisplayNextButton(current) || this.DisplayPreviousButton(current)) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (this.DisplayPreviousButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            if (this.DisplayNextButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            result += "</div>";
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
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * PhotoView
 */
class PhotoView extends MediaView {
    CreateChildView(current) {
        return this.InternalCreateChildView(current);
    }
    RegisterViewEvents(current) {
        return this.internalRegisterVieWEvents(current);
    }
    InitializeViewControls(current) {
        return this.InitializeViewControls(current);
    }
    MakeViewControlVisible(current) {
        return this.InternalMakeViewControlVisible(current);
    }
    CreateView(current) {
        var result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\"" + this.GetControlViewId(current.GetIndex()) + "\" ><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
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
        if (this.DisplayNextButton(current) || this.DisplayPreviousButton(current)) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (this.DisplayPreviousButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            if (this.DisplayNextButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            result += "</div>";
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
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * VideoView
 */
class VideoView extends MediaView {
    CreateChildView(current) {
        var div = document.getElementById(this.GetMediaManager().GetId());
        if (isNullOrUndefined(div))
            return false;
        div.innerHTML = "<div class='media-template'><div id=\"video\" class=\"tab-pane\"><h3>" + GetCurrentString('Video Page') + "</h3><p>" + GetCurrentString('Play your video files') + "</p></div></div>";
        return true;
    }
    RegisterViewEvents(current) {
        return true;
    }
    InitializeViewControls(current) {
        return true;
    }
    MakeViewControlVisible(current) {
        return true;
    }
    CreateView(current) {
        var result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\"" + this.GetControlViewId(current.GetIndex()) + "\" ><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
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
        if (this.DisplayNextButton(current) || this.DisplayPreviousButton(current)) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (this.DisplayPreviousButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            if (this.DisplayNextButton(current)) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            result += "</div>";
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
class CloudMediaTree {
    constructor(menuType, account, sas, container, folder) {
        this._musicExtensions = ".m4a;.aac;.mp3;.flac";
        this._videoExtensions = ".mp4";
        this._radioExtensions = ".json";
        this._tvExtensions = ".json";
        this._photoExtensions = ".jpg;.png";
        this.unknownAlbum = "UnknownAlbum";
        this.unknownArtist = "UnknownArtist";
        this._root = null;
        this._account = account;
        this._sas = sas;
        this._container = container;
        this._folder = folder;
        this._menuType = menuType;
        if (this._menuType == 'Music') {
            this._root = new Music("Cloud Music", `Account: ${account} Container: ${container} Folder: ${folder}`, "", "assets/img/Music.png", "", "");
        }
        else if (this._menuType == 'Radio') {
            this._root = new Radio("Cloud Radio", `Account: ${account} Container: ${container} Folder: ${folder}`, "", "assets/img/Radio.png", "", "");
        }
        else if (this._menuType == 'Video') {
            this._root = new Video("Cloud Video", `Account: ${account} Container: ${container} Folder: ${folder}`, "", "assets/img/Videos.png", "", "");
        }
        else if (this._menuType == 'Photo') {
            this._root = new Photo("Cloud Photo", `Account: ${account} Container: ${container} Folder: ${folder}`, "", "assets/img/Pictures.png", "", "");
        }
        else if (this._menuType == 'TV') {
            this._root = new TV("Cloud TV", `Account: ${account} Container: ${container} Folder: ${folder}`, "", "assets/img/TV.png", "", "");
        }
    }
    static CreateMediaTree(menuType, account, sas, container, folder) {
        return new CloudMediaTree(menuType, account, sas, container, folder);
    }
    AddString(arrayPath, index) {
        if (this._menuType == 'Music') {
            return this.AddMusicString(arrayPath, index);
        }
        else if (this._menuType == 'Radio') {
            return this.AddRadioString(arrayPath, index);
        }
        else if (this._menuType == 'Video') {
            return this.AddVideoString(arrayPath, index);
        }
        else if (this._menuType == 'Photo') {
            return this.AddPhotoString(arrayPath, index);
        }
        else if (this._menuType == 'TV') {
            return this.AddTVString(arrayPath, index);
        }
        return false;
    }
    EndWithExtension(path, extension) {
        var splits = extension.split(";");
        for (var i = 0; i < splits.length; i++) {
            if (path.toLowerCase().endsWith(splits[i]))
                return true;
        }
        return false;
    }
    GetMusicTitle(path) {
        var splits = path.split("/");
        if (!isNullOrUndefined(splits) && (splits.length > 0)) {
            var filename = splits[splits.length - 1];
            if (!isNullOrUndefinedOrEmpty(filename)) {
                var descsplits = filename.split('-');
                if (!isNullOrUndefined(descsplits) && (descsplits.length > 0)) {
                    var title = descsplits[descsplits.length - 1];
                    var pos = title.lastIndexOf(".");
                    if (pos > 0) {
                        title = title.substr(0, pos);
                    }
                    return title;
                }
            }
        }
        return path;
    }
    GetMusicArtist(path) {
        var splits = path.split("/");
        if (!isNullOrUndefined(splits) && (splits.length > 2)) {
            var artist = splits[splits.length - 3];
            if (isNullOrUndefinedOrEmpty(artist)) {
                var description = splits[splits.length - 1];
                if (!isNullOrUndefinedOrEmpty(description)) {
                    var descsplits = description.split('-');
                    if (!isNullOrUndefined(descsplits) && (descsplits.length == 4)) {
                        artist = descsplits[descsplits.length - 3];
                    }
                }
            }
            return artist;
        }
        return this.unknownArtist;
    }
    GetMusicAlbum(path) {
        var splits = path.split("/");
        if (!isNullOrUndefined(splits) && (splits.length > 1)) {
            var album = splits[splits.length - 2];
            var description = splits[splits.length - 1];
            if (!isNullOrUndefinedOrEmpty(description)) {
                var descsplits = description.split('-');
                if (!isNullOrUndefined(descsplits) && (descsplits.length == 4)) {
                    album = descsplits[descsplits.length - 2];
                }
            }
            return album;
        }
        return this.unknownAlbum;
    }
    GetMusicTrack(path) {
        var splits = path.split("/");
        if (!isNullOrUndefined(splits)) {
            var filename = splits[splits.length - 1];
            if (!isNullOrUndefinedOrEmpty(filename)) {
                var pos = filename.indexOf("-");
                if (pos > 0) {
                    var trackstring = filename.substr(0, pos);
                    var track = -1;
                    try {
                        track = Number.parseInt(trackstring);
                    }
                    catch (Error) { }
                    if (track >= 0) {
                        return track.toString();
                    }
                }
            }
        }
        return "";
    }
    GetMusicContentUrl(path) {
        let contentUrl = "";
        var suffixUrl = "";
        if (isNullOrUndefinedOrEmpty(this._folder)) {
            //suffixUrl = encodeURI(`${path}`);
            suffixUrl = `${path}`;
        }
        else {
            //suffixUrl = encodeURI(`${this._folder}/${path}`);    
            suffixUrl = `${this._folder}/${path}`;
        }
        suffixUrl = encodeURIComponent(suffixUrl).
            // Note that although RFC3986 reserves "!", RFC5987 does not,
            // so we do not need to escape it
            replace(/['()]/g, escape). // i.e., %27 %28 %29
            replace(/\*/g, '%2A').
            // The following are not required for percent-encoding per RFC5987, 
            // so we can allow for a little better readability over the wire: |`^
            replace(/%(?:7C|60|5E)/g, unescape);
        contentUrl = `https://${this._account}.blob.core.windows.net/${this._container}/${suffixUrl}?${this._sas}`;
        /*
        if(isNullOrUndefinedOrEmpty(this._folder)){
            contentUrl = `https://${this._account}.blob.core.windows.net/${this._container}/${path}?${this._sas}`;
        }
        else{
            contentUrl = `https://${this._account}.blob.core.windows.net/${this._container}/${this._folder}/${path}?${this._sas}`;
        }
        */
        return contentUrl;
    }
    IsFilePresent(arrayPath, index, folder) {
        var min = (index - 100) >= 0 ? index - 100 : 0;
        var max = (index + 100) >= arrayPath.length ? arrayPath.length : index + 100;
        for (var i = min; i < max; i++) {
            if (folder == arrayPath[i])
                return true;
        }
        return false;
    }
    GetMusicAlbumUrl(arrayPath, index, path) {
        var contentUrl = "assets/img/Music.png";
        var pos = path.lastIndexOf("/");
        if (pos > 0) {
            var folder = path.substr(0, pos);
            folder += "/artwork.jpg";
            if (this.IsFilePresent(arrayPath, index, folder) == true) {
                var suffixUrl = "";
                if (isNullOrUndefinedOrEmpty(this._folder)) {
                    suffixUrl = `${folder}`;
                }
                else {
                    suffixUrl = `${this._folder}/${folder}`;
                }
                suffixUrl = encodeURIComponent(suffixUrl).
                    // Note that although RFC3986 reserves "!", RFC5987 does not,
                    // so we do not need to escape it
                    replace(/['()]/g, escape). // i.e., %27 %28 %29
                    replace(/\*/g, '%2A').
                    // The following are not required for percent-encoding per RFC5987, 
                    // so we can allow for a little better readability over the wire: |`^
                    replace(/%(?:7C|60|5E)/g, unescape);
                contentUrl = `https://${this._account}.blob.core.windows.net/${this._container}/${suffixUrl}?${this._sas}`;
            }
        }
        return contentUrl;
    }
    AddMusicItem(artist, album, media) {
        try {
            var artistMedia = this._root.GetChildWithName(artist);
            if (isNullOrUndefined(artistMedia)) {
                this._root.AddChild(new Music(artist, `{{Artist: ${artist}}}`, "", "", ""));
                artistMedia = this._root.GetChildWithName(artist);
            }
            var albumMedia = artistMedia.GetChildWithName(album);
            if (isNullOrUndefined(albumMedia)) {
                artistMedia.AddChild(new Music(album, `{{Artist: ${artist}}}{{Album: ${album}}}`, "", media.GetImageUrl(), ""));
                albumMedia = artistMedia.GetChildWithName(album);
            }
            albumMedia.AddChild(media);
        }
        catch (Error) {
            return false;
        }
        return true;
    }
    AddMusicString(arrayPath, index) {
        if (!isNullOrUndefined(arrayPath) && (index >= 0) && (index < arrayPath.length)) {
            let currentPath = arrayPath[index];
            if (!isNullOrUndefinedOrEmpty(currentPath)) {
                if (this.EndWithExtension(currentPath, this._musicExtensions)) {
                    var album = this.GetMusicAlbum(currentPath);
                    var artist = this.GetMusicArtist(currentPath);
                    this.AddMusicItem(artist, album, new Music(this.GetMusicTitle(currentPath), `{{Artist: ${artist}}}{{Album: ${album}}}{{Track: ${this.GetMusicTrack(currentPath)}}}{{Title: ${this.GetMusicTitle(currentPath)}}}`, this.GetMusicContentUrl(currentPath), this.GetMusicAlbumUrl(arrayPath, index, currentPath), "", ""));
                }
            }
        }
        return false;
    }
    AddRadioString(arrayPath, index) {
        return false;
    }
    AddPhotoString(arrayPath, index) {
        return false;
    }
    AddVideoString(arrayPath, index) {
        return false;
    }
    AddTVString(arrayPath, index) {
        return false;
    }
    GetMediaTree() {
        return this._root;
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
var menuCreationStatus;
var menuCreationResult;
const reportStatus = message => {
    menuCreationStatus.innerHTML = `${message}`;
};
const reportResult = message => {
    menuCreationResult.innerHTML += `${message}`;
    //    menuCreationResult.innerHTML += `${message}<br/>`;
    //  menuCreationResult.scrollTop = menuCreationResult.scrollHeight;
};
var analyzeFilesArray = function (array, menuType, account, sas, container, folder) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            try {
                var result = "";
                var mediaTree = CloudMediaTree.CreateMediaTree(menuType, account, sas, container, folder);
                var queueWork, i = -1, work = function () {
                    // do work for array[i]
                    // ...
                    mediaTree.AddString(array, i);
                    result += array[i] + "<br>";
                    queueWork();
                };
                queueWork = function () {
                    if ((++i < array.length) && (GlobalVars.GetCancellationToken() == false)) {
                        reportStatus(i + " files analyzed...");
                        setTimeout(work, 0); // yield to browser
                    }
                    else {
                        //reportResult(result);
                        if (i == array.length) {
                            resolve(mediaTree.GetMediaTree());
                        }
                        else
                            resolve(null);
                    }
                };
                queueWork();
            }
            catch (error) {
                resolve(null);
            }
        });
    });
};
var CreateMediaMenu = function (menuType, account, sas, container, folder, statusId, resultId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Initialize the controls to display the result
        menuCreationStatus = document.getElementById(statusId);
        menuCreationResult = document.getElementById(resultId);
        // Create the containerURL to browse the file
        var exploreUrl = null;
        if (isNullOrUndefinedOrEmpty(folder)) {
            exploreUrl = `https://${account}.blob.core.windows.net/${container}?${sas}`;
        }
        else {
            exploreUrl = `https://${account}.blob.core.windows.net/${container}/${folder}?${sas}`;
        }
        const containerURL = new azblob.ContainerURL(exploreUrl, azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));
        try {
            let counter = 0;
            let marker = undefined;
            reportStatus("Starting creation - Getting the list of files...");
            reportResult("");
            var itemsArray = [];
            do {
                const listBlobsResponse = yield containerURL.listBlobFlatSegment(azblob.Aborter.none, marker);
                marker = listBlobsResponse.nextMarker;
                var items = listBlobsResponse.segment.blobItems;
                counter += items.length;
                for (var i = 0; i < items.length; i++)
                    itemsArray.push(items[i].name);
                //Array.prototype.push.apply(itemsArray, items);
                reportStatus(counter + " files retrieved...");
            } while (marker && (GlobalVars.GetCancellationToken() == false));
            if (GlobalVars.GetCancellationToken() == false) {
                var rootMedia = yield analyzeFilesArray(itemsArray, menuType, account, sas, container, folder);
                if (!isNullOrUndefined(rootMedia)) {
                    reportStatus("Analyze cancelled...");
                    reportResult(MediaObject.Serialize(rootMedia));
                }
                else
                    reportStatus("Analyze cancelled...");
            }
            /*
                } while (marker&&(cancellationToken == false));
            */
            if (GlobalVars.GetCancellationToken() == true) {
                reportStatus("Creation cancelled and " + counter + " files partially analyzed");
            }
            else {
                if (counter > 0) {
                    reportStatus("Creation done for " + counter + " files");
                }
                else {
                    reportStatus("Creation done no files found...");
                }
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
    var localStrings = strings.get(GlobalVars.GetGlobalLanguage());
    if (!isNullOrUndefined(localStrings)) {
        var s = localStrings.get(id);
        if (!isNullOrUndefined(s)) {
            return s;
        }
    }
    return id;
};
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
    const music11 = new Music("Love Shack", "1The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music12 = new Music("Junebug", "2The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music13 = new Music("Roam", "3The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music14 = new Music("Love Shack", "4The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music15 = new Music("Junebug", "5The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music16 = new Music("Roam", "6The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music17 = new Music("Love Shack", "7The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music18 = new Music("Junebug", "8The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music19 = new Music("Roam", "9The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music20 = new Music("Love Shack", "10The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music21 = new Music("Love Shack", "11The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music22 = new Music("Junebug", "12The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music23 = new Music("Roam", "13The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music24 = new Music("Love Shack", "14The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music25 = new Music("Junebug", "15The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music26 = new Music("Roam", "16The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music27 = new Music("Love Shack", "17The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music28 = new Music("Junebug", "18The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    const music29 = new Music("Roam", "19The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
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
    menuRadio.AddChild(radio1);
    menuRadio.AddChild(radio2);
    menuRadio.AddChild(radio3);
    menuRadio.AddChild(radio4);
    menuRadio.AddChild(radioGroup);
    return menuRadio;
};
var RenderMediaObjects = function (id, bPush = true) {
    if (isNullOrUndefined(mediaManager))
        return;
    mediaPointer = BuildMediaObjects();
    if (!isNullOrUndefined(mediaPointer)) {
        mediaManager.SetRoot(mediaPointer);
        mediaManager.RenderMediaView(bPush);
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
var RenderMusicPage = function (id, bPush = true) {
    RenderMusicPageAsync(id, bPush).then(value => {
    });
};
window.RenderMusicPage = RenderMusicPage;
var RenderMusicPageAsync = function (id, bPush = true) {
    return __awaiter(this, void 0, void 0, function* () {
        var source = "{\"_type\":\"Music\",\"_title\":\"Music\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"The B-52's\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Play Loud\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Planet Claire\",\"_mediaChildList\":[],\"_path\":\"/Play Loud/Planet Claire\",\"_description\":\"The B-52's - Play Loud - Planet Claire\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Rock Lobster\",\"_mediaChildList\":[],\"_path\":\"/Play Loud/Rock Lobster\",\"_description\":\"The B-52's - Play Loud - Rock Lobster\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1}],\"_path\":\"/The B-52's/Play Loud\",\"_description\":\"The B-52's - Play Loud\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Cosmic Thing\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":2},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":3},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":4},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":5},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":6},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":7},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":8},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":9},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":10},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":11},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":12},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":13},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":14},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":15},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":16},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":17},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":18}],\"_path\":\"/The B-52's/Cosmic Thing\",\"_description\":\"The B-52's - Cosmic Thing\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1}],\"_path\":\"/Music/The B-52's\",\"_description\":\"Explore the albums\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0}],\"_path\":\"/Music\",\"_description\":\"Listen your music\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"assets/img/Music.png\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null}";
        var object;
        if (isNullOrUndefined(mediaManager))
            return;
        if (!isNullOrUndefined(mediaManager)) {
            mediaManager.ShowModalPopup(GetCurrentString("Loading Music data..."));
            mediaPointer = BuildMediaMusicObjects();
            if ((!isNullOrUndefined(mediaPointer)) && (!isNullOrUndefined(mediaManager))) {
                if (true) {
                    try {
                        //var source: string = MediaObject.Serialize(mediaPointer);
                        source = yield GetFileAsync("data/musicobject.json");
                        if (!isNullOrUndefined(source)) {
                            object = MediaObject.Deserialize(source);
                            if (!isNullOrUndefined(object)) {
                                mediaPointer = object;
                            }
                        }
                    }
                    catch (error) {
                    }
                }
                mediaManager.SetRoot(mediaPointer);
                //mediaManager.ApplicationBusy(false);
                mediaManager.RenderMediaView(bPush);
            }
            HideBurgerMenu();
            //Reinitialize last audio/video index */
            mediaManager.SetIndexActiveMediaMediaObject(-1);
            UpdateMenuBar("musicTitle");
            mediaManager.HideModalPopupAsync();
        }
        return;
    });
};
var RenderRadioPage = function (id, bPush = true) {
    RenderRadioPageAsync(id, bPush).then(value => {
    });
};
var RenderRadioPageAsync = function (id, bPush = true) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isNullOrUndefined(mediaManager))
            return;
        if (!isNullOrUndefined(mediaManager)) {
            yield mediaManager.ShowModalPopupAsync(GetCurrentString("Loading Radio data..."));
            mediaPointer = BuildMediaRadioObjects();
            if (!isNullOrUndefined(mediaPointer)) {
                mediaManager.SetRoot(mediaPointer);
                //  mediaManager.ApplicationBusy(true);
                mediaManager.RenderMediaView(bPush);
            }
            HideBurgerMenu();
            UpdateMenuBar("radioTitle");
            mediaManager.HideModalPopupAsync();
        }
        return;
    });
};
window.RenderRadioPage = RenderRadioPage;
var RenderFavoritePage = function (id, bPush = true) {
    var list = GlobalVars.GetGlobalFavoritePlaylists();
    var name = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
    if (isNullOrUndefined(mediaManager))
        return;
    if (!isNullOrUndefinedOrEmpty(name) && !isNullOrUndefined(list)) {
        mediaPointer = list;
        mediaManager.SetRoot(mediaPointer);
        mediaManager.RenderMediaView(bPush);
    }
    HideBurgerMenu();
    UpdateMenuBar("favoriteTitle");
    return;
};
window.RenderFavoritePage = RenderFavoritePage;
var RenderVideoPage = function (id, bPush = true) {
    if (isNullOrUndefined(mediaManager))
        return;
    mediaPointer = new Video("Video", "Video main View", "", "", "", "");
    if (!isNullOrUndefined(mediaPointer)) {
        mediaManager.SetRoot(mediaPointer);
        mediaManager.RenderMediaView(bPush);
    }
    /*
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"video\" class=\"tab-pane\"><h3>" + GetCurrentString('Video Page') + "</h3><p>" + GetCurrentString('Play your video files') + "</p></div></div>";
    */
    HideBurgerMenu();
    UpdateMenuBar("videoTitle");
    return;
};
window.RenderVideoPage = RenderVideoPage;
var RenderTVPage = function (id, bPush = true) {
    if (isNullOrUndefined(mediaManager))
        return;
    mediaPointer = new TV("TV", "TV main View", "", "", "", "");
    if (!isNullOrUndefined(mediaPointer)) {
        mediaManager.SetRoot(mediaPointer);
        mediaManager.RenderMediaView(bPush);
    }
    /*
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"tv\" class=\"tab-pane\"><h3>" + GetCurrentString('TV Page') + "</h3><p>" + GetCurrentString('Play your TV channels') + "</p></div></div>";
    */
    HideBurgerMenu();
    UpdateMenuBar("tvTitle");
    return;
};
window.RenderTVPage = RenderTVPage;
var RenderPhotoPage = function (id, bPush = true) {
    if (isNullOrUndefined(mediaManager))
        return;
    mediaPointer = new Photo("PHoto", "PHoto main View", "", "", "", "");
    if (!isNullOrUndefined(mediaPointer)) {
        mediaManager.SetRoot(mediaPointer);
        mediaManager.RenderMediaView(bPush);
    }
    /*
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"tv\" class=\"tab-pane\"><h3>" + GetCurrentString('TV Page') + "</h3><p>" + GetCurrentString('Play your TV channels') + "</p></div></div>";
    */
    HideBurgerMenu();
    UpdateMenuBar("photoTitle");
    return;
};
window.RenderPhotoPage = RenderPhotoPage;
var UpdateMenuBar = function (id) {
    var array = ["homeTitle", "musicTitle", "radioTitle", "tvTitle", "videoTitle", "favoriteTitle", "settingsTitle"];
    for (var index = 0; index < array.length; index++) {
        var menu = document.getElementById(array[index]);
        if (!isNullOrUndefined(menu)) {
            if (id == array[index]) {
                menu.style.backgroundColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--media-button-bg-active-color'); // #999999
            }
            else
                menu.style.backgroundColor = 'Transparent';
        }
        ;
    }
};
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
    s = document.getElementById('settingsTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("SETTINGS");
    }
    s = document.getElementById('favoriteTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("FAVORITE");
    }
};
var AddBoxes = function (id) {
    var div = document.getElementById(id);
    if ((isNullOrUndefined(div)) || (isNullOrUndefined(div.parentElement)))
        return;
    let divtext = "<div class='modal show' tabindex='-1' data-backdrop='true' data-keyboard='false' id='modalbox' role='dialog'><div class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-header'><h4 class='modal-title' id='modaltitle'>Modal Header</h4><button type='button' class='close' data-dismiss='modal' id='modalclose'>&times;</button></div><div class='modal-body' id='modalmessage'></div><div class='modal-footer'><button type='button' class='media-button media-button-text' data-dismiss='modal' id='modalok'>OK</button><button type='button' class='media-button media-button-text' data-dismiss='modal' id='modalcancel'>CANCEL</button><button type='button' class='media-button media-button-text' data-dismiss='modal' id='modalyes'>YES</button><button type='button' class='media-button media-button-text' data-dismiss='modal' id='modalno'>NO</button></div></div></div></div>";
    divtext += "<div class='modal show' tabindex='-1' data-backdrop='true' data-keyboard='false' id='modalpopup'  role='dialog'><div class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-body' id='modalpopupmessage'><p></p></div></div></div></div>";
    //"<div class='modal-footer'><button type='button' class='media-button media-button-text' data-dismiss='modal' id='modalok'>OK</button></div>";                
    divtext += "<div class='alert alert-danger media-alert-information media-alert-error' id='alertbox'><label id='alertmessage'></label></div>";
    div.parentElement.innerHTML += divtext;
};
var RenderViewFromPath = function (path, bPush = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isNullOrUndefinedOrEmpty(path)) {
            RenderHomePage(mediaId, bPush);
        }
        else {
            var array = path.split('/');
            if ((!isNullOrUndefined(array) && (array.length > 1))) {
                switch (array[1]) {
                    case "Music":
                    case "Cloud Music":
                        yield RenderMusicPageAsync(mediaId, bPush);
                        break;
                    case "Radio":
                    case "Cloud Radio":
                        yield RenderRadioPageAsync(mediaId, bPush);
                        break;
                    case "Playlist":
                    case "Cloud Playlist":
                        RenderFavoritePage(mediaId, bPush);
                        break;
                    case "TV":
                    case "Cloud TV":
                        RenderTVPage(mediaId, bPush);
                        break;
                    case "Photo":
                    case "Cloud Photo":
                        RenderPhotoPage(mediaId, bPush);
                        break;
                    case "Video":
                    case "Cloud Video":
                        RenderVideoPage(mediaId, bPush);
                        break;
                    case "Home":
                        RenderHomePage(mediaId, bPush);
                        break;
                    case "Favorite":
                        RenderFavoritePage(mediaId, bPush);
                        break;
                    case "Setting":
                        RenderSettingPage(mediaId, bPush);
                        break;
                    default:
                        RenderHomePage(mediaId, bPush);
                        break;
                }
                for (let i = 2; i < array.length; i++) {
                    var name = array[i];
                    if (!isNullOrUndefined(name)) {
                        let parent = mediaManager.GetCurrentMediaObject();
                        if (!isNullOrUndefined(parent)) {
                            let object = parent.GetChildWithName(name);
                            if (!isNullOrUndefined(object)) {
                                if (mediaManager.NavigateToChild(parent, bPush) == true) {
                                    mediaManager.MakeViewControlVisible(object);
                                    mediaManager.SetCurrentMediaObject(object);
                                    if (bPush)
                                        mediaManager.ReplaceNavigationState(object);
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    });
};
var mediaManager;
var mediaPointer;
var mediaId = "";
var innerDocClick;
var CreateCurrentUrl = function (cur) {
    return window.location.pathname + "?path=" + cur.GetPath();
};
var GetPathFromUrl = function (url) {
    let result = "";
    if (!isNullOrUndefined(url)) {
        let pos = url.indexOf("?path=");
        if (pos > 0) {
            result = url.substr(pos + 6);
            result = decodeURIComponent(result);
        }
    }
    return result;
};
var InitializeMediaApp = function (id, lang, col, mode) {
    InitializeMediaAppAsync(id, lang, col, mode).then(value => {
    });
};
var InitializeMediaAppAsync = function (id, lang, col, mode) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isNullOrUndefined(GlobalVars.GetGlobalLanguage())) {
            GlobalVars.SetGlobalLanguage(lang);
        }
        if (isNullOrUndefined(GlobalVars.GetGlobalColor())) {
            GlobalVars.SetGlobalColor(col);
        }
        mediaId = id;
        /*
        innerDocClick
        document.onmouseover = function() {
            //User's mouse is inside the page.
            innerDocClick = true;
        }
        
        document.onmouseleave = function() {
            //User's mouse has left the page.
            innerDocClick = false;
        }
        window.onhashchange = function() {
            if (innerDocClick) {
                //Your own in-page mechanism triggered the hash change
            } else {
                //Browser back button was clicked
                history.back();
            }
        }
        */
        window.addEventListener('popstate', function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                var path = event.state;
                if (MediaManager.internalBack == true) {
                    MediaManager.internalBack = false;
                    return;
                }
                if (isNullOrUndefined(path)) {
                    //  var result:boolean = await mediaManager.ShowModalBoxAsync(GetCurrentString("Leaving the application"),GetCurrentString("Are you sure to leave the application?"),MediaModelBoxType.YesNo);
                    //  if(result == true)
                    yield RenderViewFromPath("", false);
                    //  else
                    //      RenderHomePage(mediaId,true);
                }
                else {
                    yield RenderViewFromPath(path, false);
                }
                /*
                // The popstate event is fired each time when the current history entry changes.
                var navigated:boolean = false;
                // internalBack == false back button from Browser
                if( MediaManager.internalBack == false) {
                    var object:IMediaObject = mediaManager.GetCurrentMediaObject();
                    if(!isNullOrUndefined(object)){
                        if(!isNullOrUndefined(object.GetParent())){
                            mediaManager.NavigateToParent(mediaManager.GetCurrentMediaObject());
                            navigated = true;
                        }
                    }
                }
                else
                    MediaManager.internalBack = false;
                */
                /*
                if(history.length>0)
                {
                    if(!isNullOrUndefined(mediaManager)){
                        var object:IMediaObject = mediaManager.GetCurrentMediaObject();
                        if(!isNullOrUndefined(object)){
                            var backurl:string = this.window.location.pathname  ;
                            if(backurl == CreateCurrentUrl(object))
                            {
                                navigated = true;
                            }
                        
                        }
                    }
                }
                */
                /*
                if(navigated !== true){
                    // Call Back button programmatically as per user confirmation.
                    history.back();
                    // history.pushState(null, null, window.location.pathname);
                    // Uncomment below line to redirect to the previous page instead.
                    // window.location = document.referrer // Note: IE11 is not supporting this.
                } else {
                    // Stay on the current page.
                    history.pushState(null, null, window.location.pathname);
                }
            */
            });
        }, false);
        /*
    MediaManager.lastURL = document.URL;
    window.addEventListener('hashchange', function(){
        MediaManager.lastURL = document.URL;
    }, false);
    */
        /*
        window.onbeforeunload = function (e) {
        var e = e || window.event;
        var msg = GetCurrentString("Are you sure to leave the application?");
        $("#blueimp-gallery").hide();
        // For IE and Firefox
        if (e) {
            e.returnValue = msg;
        }
        // For Safari / chrome
        return msg;
        };
        */
        window.addEventListener('beforeunload', function (event) {
            let message = null;
            if ((isNullOrUndefined(mediaManager)) || (!isNullOrUndefined(mediaManager) && mediaManager.CanCloseApplication())) {
                message = "";
            }
            else {
                message = GetCurrentString("Are you sure to leave the application?");
                var e = e || window.event;
                if (e) {
                    e.preventDefault();
                    e.returnValue = message;
                }
            }
            return message;
        });
        /*
         var location = window.document.location;
     
         var preventNavigation = function () {
             var originalHashValue = location.hash;
     
             window.setTimeout(function () {
                 location.hash = 'preventNavigation' + ~~ (9999 * Math.random());
                 location.hash = originalHashValue;
             }, 0);
         };
     
         window.addEventListener('beforeunload', preventNavigation, false);
         window.addEventListener('unload', preventNavigation, false);
     */
        if (GlobalVars.GetGlobalPlaybackLoop() == MediaPlaybackMode.Loop) {
            var result = MediaPlaybackMode.Loop;
            if (mode == "Loop")
                result = MediaPlaybackMode.Loop;
            if (mode == "NoLoop")
                result = MediaPlaybackMode.NoLoop;
            if (mode == "PlaylistLoop")
                result = MediaPlaybackMode.PlaylistLoop;
            GlobalVars.SetGlobalPlaybackLoop(result);
        }
        // Update text
        UpdateMainPageText();
        // Add Alert Popup and Dialog Box
        AddBoxes(id);
        // Set Theme
        document.documentElement.setAttribute('theme', GlobalVars.GetGlobalColor());
        // Create MediaMAnager
        mediaManager = MediaManager.CreateMediaManager("mainview", GlobalVars.GetGlobalPagination(), GlobalVars.GetGlobalPlaybackLoop());
        let path = GetPathFromUrl(window.location.href);
        yield RenderViewFromPath(path, true);
        // Test Dialog Box 
        // await mediaManager.ShowModalBoxAsync(GetCurrentString("Leaving the application"),GetCurrentString("Are you sure to leave the application?"),MediaModelBoxType.YesNo);
    });
};
// Export method:
window.InitializeMediaApp = InitializeMediaApp;
// "noloop", "loop", "playlistloop"
//InitializeMediaApp("mainview", "en", "blue", "noloop");
//# sourceMappingURL=index.js.map