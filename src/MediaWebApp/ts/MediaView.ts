import { isNullOrUndefined,isNullOrUndefinedOrEmpty, GetCurrentString, GetTimeString, ActivateCarousel } from "./Common";
import {IMediaView} from "./IMediaView";
import {MediaPlaybackMode,GlobalVars} from "./GlobalVars";
import {IMediaObject} from "./IMediaObject";
import {IMediaManager} from "./IMediaManager";
import {TV} from "./TV";
import {Music} from "./Music";
import {Radio} from "./Radio";
import {Video} from "./Video";
import {Photo} from "./Photo";
import {Playlist} from "./Playlist";
import {MediaObject} from "./MediaObject";

export function PlayMediaElement(media: HTMLMediaElement, view: IMediaView): void
{
    try
    {
        const result = media.play();
        if(!isNullOrUndefined(result))
        {
            result.catch(error => {
                console.error("Unable to start media playback.", error);
                view.GetMediaManager()?.ShowAlertPopupError(GetCurrentString("Unable to start media playback. Please tap play again."));
            });
        }
    }
    catch(error)
    {
        console.error("Unable to start media playback.", error);
        view.GetMediaManager()?.ShowAlertPopupError(GetCurrentString("Unable to start media playback. Please tap play again."));
    }
}

/**
 * Media view
 */


export class MediaView implements IMediaView {
    private static PrepareArtwork(markup: string): string
    {
        const template = document.createElement("template");
        template.innerHTML = markup;
        const categories: Record<string, [string, string]> = {
            "Music.png": ["music", "MUSIC"],
            "Pictures.png": ["images", "PHOTO"],
            "Playlist.png": ["star", "FAVORITE"],
            "Radio.png": ["radio", "RADIO"],
            "TV.png": ["tv", "TV"],
            "Videos.png": ["file-video", "VIDEO"],
            "Home.png": ["house", "HOME"]
        };
        for(const image of template.content.querySelectorAll<HTMLImageElement>("img"))
        {
            const source = image.getAttribute("src") ?? "";
            const category = categories[source.replace(/^assets\/img\//, "")];
            if(!source.startsWith("assets/img/") || !category)
                continue;
            const artwork = document.createElement("div");
            artwork.className = image.className + " media-category-artwork";
            const icon = document.createElement("i");
            icon.className = "fa-solid fa-" + category[0];
            icon.setAttribute("aria-hidden", "true");
            const caption = document.createElement("span");
            caption.textContent = GetCurrentString(category[1]);
            artwork.append(icon, caption);
            image.replaceWith(artwork);
        }
        for(const video of template.content.querySelectorAll<HTMLVideoElement>("video[poster]"))
        {
            const poster = video.getAttribute("poster") ?? "";
            if(poster.startsWith("assets/img/") && categories[poster.replace(/^assets\/img\//, "")])
                video.removeAttribute("poster");
        }
        return template.innerHTML;
    }

    private static miniPlayerDisplayTimer: number | null = null;
    // prefix for HTML Element id
    private  _controlViewId: string = "_controlViewId"; 
    private  _parentButtonId: string = "_parentButtonId"; 
    private  _childButtonId: string = "_childButtonId"; 
    private  _previousButtonId: string = "_previousButtonId"; 
    private  _nextButtonId: string = "_nextButtonId"; 
    private  _startButtonId: string = "_startButtonId"; 
    private  _stopButtonId: string = "_stopButtonId"; 
    private  _playButtonId: string = "_playButtonId"; 
    private  _pauseButtonId: string = "_pauseButtonId"; 
    private  _muteButtonId: string = "_muteButtonId"; 
    private  _unmuteButtonId: string = "_unmuteButtonId"; 
    private  _volumeUpButtonId: string = "_volumeUpButtonId"; 
    private  _volumeDownButtonId: string = "_volumeDownButtonId"; 
    private  _loopButtonId: string = "_loopButtonId"; 
    private  _playlistloopButtonId: string = "_playlistloopButtonId"; 
    private  _noloopButtonId: string = "_noloopButtonId"; 
    private  _addFavoriteButtonId: string = "_addfavoriteButtonId"; 
    private  _removeFavoriteButtonId: string = "_removeFavoriteButtonId"; 
    private  _downloadButtonId: string = "_downloadButtonId"; 
    private  _fullscreenContainerId: string = "_fullscreenContainerId";
    private  _fullscreenButtonId: string = "_fullscreenButtonId";
    private  _fullscreenToggleButtonId: string = "_fullscreenToggleButtonId";
    private  _fullscreenMuteButtonId: string = "_fullscreenMuteButtonId";
    private  _fullscreenStopButtonId: string = "_fullscreenStopButtonId";
    private  _fullscreenExitButtonId: string = "_fullscreenExitButtonId";
    private  _fullscreenSliderId: string = "_fullscreenSliderId";
    private  _fullscreenPreviousButtonId: string = "_fullscreenPreviousButtonId";
    private  _fullscreenNextButtonId: string = "_fullscreenNextButtonId";
    private  _loadingButtonId: string = "_loadingButtonId";
    private  _fullscreenLoadingButtonId: string = "_fullscreenLoadingButtonId";
    private  _fullscreenSlideshowButtonId: string = "_fullscreenSlideshowButtonId";
    private fullscreenControlTimers: Record<number, number> = {};
    private fullscreenViewportCleanup: (() => void) | null = null;
    private scrollingFields = new Set<HTMLElement>();
    private scrollingObserver: ResizeObserver | null = null;

    private  _audioId: string = "_audioId"; 
    private  _videoId: string = "_videoId"; 
    private  _videoBackgroundId: string = "_videoBackgroundId";
    private  _audioSourceId: string = "_audioSourceId"; 
    private  _videoSourceId: string = "_videoSourceId"; 
    private  _durationId: string = "_durationId"; 
    private  _positionId: string = "_positionId"; 
    private  _sliderId: string = "_sliderId"; 
    private  _mediaObject: IMediaObject;
    private  _mediaManager: IMediaManager;
    

    constructor(current: IMediaObject, manager: IMediaManager){
        this._mediaManager = manager;
        this._mediaObject = current;
    }
    public GetMediaManager():IMediaManager
    {
        return this._mediaManager;
    }
    // View Methods
    public CreateView(current: IMediaObject): string
    {
        return "";
    }
    public CreatePreview(current: IMediaObject): string
    {
        return "";
    }
    public CreateChildView(current: IMediaObject):boolean
    {
        return this.InternalCreateChildView(current);
    }
    public RegisterViewEvents(current: IMediaObject): boolean
    {
        return this.internalRegisterViewEvents(current);
    }
    public InitializeViewControls(current: IMediaObject): boolean
    {
        return true;
    }
    public MakeViewControlVisible(current: IMediaObject): boolean
    {
        return this.InternalMakeViewControlVisible(current);
    }
    /************************************************/
    /* control id methods                           */ 
    /************************************************/

    public  GetControlViewId(index: number): string {
        return this._controlViewId + index;
    }
    public  GetParentButtonId(index: number): string {
        return this._parentButtonId + index;
    }
    public  GetChildButtonId(index: number): string {
        return this._childButtonId + index;
    }
    public  GetPreviousButtonId(index: number): string {
        return this._previousButtonId + index;
    }
    public  GetNextButtonId(index: number): string {
        return this._nextButtonId + index;
    }
    public  GetStartButtonId(index: number): string {
        return this._startButtonId + index;
    }
    public  GetStopButtonId(index: number): string {
        return this._stopButtonId + index;
    }
    public  GetPlayButtonId(index: number): string {
        return this._playButtonId + index;
    }
    public  GetPauseButtonId(index: number): string {
        return this._pauseButtonId + index;
    }
    public GetLoadingButtonId(index: number): string {
        return this._loadingButtonId + index;
    }
    public GetFullscreenLoadingButtonId(index: number): string {
        return this._fullscreenLoadingButtonId + index;
    }
    public GetFullscreenSlideshowButtonId(index: number): string {
        return this._fullscreenSlideshowButtonId + index;
    }
    public  GetMuteButtonId(index: number): string {
        return this._muteButtonId + index;
    }
    public  GetUnmuteButtonId(index: number): string {
        return this._unmuteButtonId + index;
    }
    public  GetVolumeUpButtonId(index: number): string {
        return this._volumeUpButtonId + index;
    }    
    public  GetVolumeDownButtonId(index: number): string {
        return this._volumeDownButtonId + index;
    }    
    public  GetLoopButtonId(index: number): string {
        return this._loopButtonId + index;
    }
    public  GetPlayListLoopButtonId(index: number): string {
        return this._playlistloopButtonId + index;
    }
    public  GetNoLoopButtonId(index: number): string {
        return this._noloopButtonId + index;        
    }
    public  GetAddFavoriteButtonId(index: number): string {
        return this._addFavoriteButtonId + index;        
    }
    public  GetRemoveFavoriteButtonId(index: number): string {
        return this._removeFavoriteButtonId + index;        
    }
    public  GetAudioId(index: number): string {
        return this._audioId + index;
    }
    public  GetVideoId(index: number): string {
        return this._videoId + index;
    }
    public  GetVideoBackgroundId(index: number): string {
        return this._videoBackgroundId + index;
    }
    public  GetAudioSourceId(index: number): string {
        return this._audioSourceId + index;
    }
    public  GetVideoSourceId(index: number): string {
        return this._videoSourceId + index;
    }
    public  GetDurationId(index: number): string {
        return this._durationId + index;
    }
    public  GetSliderId(index: number): string {
        return this._sliderId + index;
    }
    public  GetPositionId(index: number): string {
        return this._positionId + index;
    }
    public  GetDownloadButtonId(index: number): string {
        return this._downloadButtonId + index;
    }
    public GetFullscreenContainerId(index: number): string {
        return this._fullscreenContainerId + index;
    }
    public GetFullscreenButtonId(index: number): string {
        return this._fullscreenButtonId + index;
    }
    public GetFullscreenToggleButtonId(index: number): string {
        return this._fullscreenToggleButtonId + index;
    }
    public GetFullscreenMuteButtonId(index: number): string {
        return this._fullscreenMuteButtonId + index;
    }
    public GetFullscreenStopButtonId(index: number): string {
        return this._fullscreenStopButtonId + index;
    }
    public GetFullscreenExitButtonId(index: number): string {
        return this._fullscreenExitButtonId + index;
    }
    public GetFullscreenSliderId(index: number): string {
        return this._fullscreenSliderId + index;
    }
    public GetFullscreenPreviousButtonId(index: number): string {
        return this._fullscreenPreviousButtonId + index;
    }
    public GetFullscreenNextButtonId(index: number): string {
        return this._fullscreenNextButtonId + index;
    }
    protected GetAppWindowButtonId(index: number): string {
        return "_appWindowButtonId" + index;
    }
    protected CreateAppWindowButtonMarkup(cur: IMediaObject): string
    {
        const label = GetCurrentString("App window");
        return "<div class=\"media-button-group-horizontal media-desktop-display-control\"><button type=\"button\" id=\"" + this.GetAppWindowButtonId(cur.GetIndex()) + "\" class=\"media-button\" aria-label=\"" + label + "\" title=\"" + label + "\"><strong><i class=\"fa-solid fa-window-maximize\"></i></strong></button></div>";
    }
    protected CreateExpandedDisplayModeControlsMarkup(cur: IMediaObject): string
    {
        const index = cur.GetIndex();
        const fullscreenLabel = GetCurrentString("Full screen");
        const miniLabel = GetCurrentString("Return to mini window");
        return "<div class=\"media-display-mode-controls\"><button type=\"button\" id=\"_fullscreenNativeButtonId" + index + "\" class=\"media-button media-fullscreen-control-button media-desktop-display-control\" aria-label=\"" + fullscreenLabel + "\" title=\"" + fullscreenLabel + "\"><strong><i class=\"fa-solid fa-expand\"></i></strong></button><button type=\"button\" id=\"" + this.GetFullscreenExitButtonId(index) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + miniLabel + "\" title=\"" + miniLabel + "\"><strong><i class=\"fa-solid fa-compress\"></i></strong></button></div>";
    }
    protected CreateFullscreenControlsMarkup(cur: IMediaObject, seekable: boolean, slideshow: boolean = false): string
    {
        const index = cur.GetIndex();
        const sliderDisabled = seekable ? "" : " disabled";
        const sliderLabel = seekable ? GetCurrentString("Video progress") : GetCurrentString("Live progress");
        const slideshowButton = slideshow
            ? "<button type=\"button\" id=\"" + this.GetFullscreenSlideshowButtonId(index) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + GetCurrentString("Start slide show") + "\"><strong><i class=\"fa-solid fa-photo-film\"></i></strong></button>"
            : "";
        return "<div class=\"media-fullscreen-controls\"><div class=\"media-fullscreen-timeline\"><label class=\"media-time\" id=\"" + this.GetFullscreenPositionId(index) + "\">00:00</label><input type=\"range\" min=\"0\" max=\"100\" value=\"" + (seekable ? "0" : "100") + "\" class=\"media-slider media-fullscreen-progress\" id=\"" + this.GetFullscreenSliderId(index) + "\" aria-label=\"" + sliderLabel + "\"" + sliderDisabled + "><label class=\"media-time\" id=\"" + this.GetFullscreenDurationId(index) + "\">" + (seekable ? "00:00" : "LIVE") + "</label></div><div class=\"media-fullscreen-control-buttons\"><button type=\"button\" id=\"" + this.GetFullscreenLoadingButtonId(index) + "\" class=\"media-button media-fullscreen-control-button media-loading-button\" aria-label=\"" + GetCurrentString("Loading") + "\" disabled><strong><i class=\"fa-solid fa-spinner fa-spin\"></i></strong></button><button type=\"button\" id=\"" + this.GetFullscreenToggleButtonId(index) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + GetCurrentString("Pause") + "\"><strong><i class=\"fa-solid fa-pause\"></i></strong></button><button type=\"button\" id=\"" + this.GetFullscreenMuteButtonId(index) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + GetCurrentString("Mute") + "\"><strong><i class=\"fa-solid fa-volume-high\"></i></strong></button><button type=\"button\" id=\"" + this.GetFullscreenStopButtonId(index) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + GetCurrentString("Stop") + "\"><strong><i class=\"fa-solid fa-stop\"></i></strong></button>" + slideshowButton + this.CreateExpandedDisplayModeControlsMarkup(cur) + "</div></div>";
    }
    public GetFullscreenPositionId(index: number): string {
        return "_fullscreenPositionId" + index;
    }
    public GetFullscreenDurationId(index: number): string {
        return "_fullscreenDurationId" + index;
    }

    protected GetAudioMimeType(contentUrl: string): string
    {
        const url = contentUrl.split(/[?#]/)[0].toLowerCase();
        if(/\.(m4a|mp4)$/.test(url))
            return "audio/mp4";
        if(/\.mp3$/.test(url))
            return "audio/mpeg";
        if(/\.aac$/.test(url))
            return "audio/aac";
        if(/\.(ogg|oga)$/.test(url))
            return "audio/ogg";
        if(/\.wav$/.test(url))
            return "audio/wav";
        return "";
    }

    protected GetVideoMimeType(contentUrl: string): string
    {
        const url = contentUrl.split(/[?#]/)[0].toLowerCase();
        if(/\.(m4v|mp4|mov)$/.test(url))
            return "video/mp4";
        if(/\.webm$/.test(url))
            return "video/webm";
        if(/\.(ogg|ogv)$/.test(url))
            return "video/ogg";
        if(/\.m3u8$/.test(url))
            return "application/x-mpegURL";
        if(/\.mpd$/.test(url))
            return "application/dash+xml";
        return "";
    }

    /****************************************************************************/
    /* EVents associated with the controls on the page                          */
    /****************************************************************************/

    public NavigateToChildEvent(control: any,mo: IMediaObject, v:IMediaView): void {
        if(!isNullOrUndefined(v)){
            v.GetMediaManager()?.NavigateToChild(mo,true);
               /* Reinitialize document title */
            v.GetMediaManager()?.AddDocumentTitle("");
        }
    }
    public NavigateToParentEvent(control: any,mo: IMediaObject, v:IMediaView): void {
        if(!isNullOrUndefined(v))
        {
            v.GetMediaManager()?.NavigateToParent(mo);
            /* Reinitialize document title */
            v.GetMediaManager()?.AddDocumentTitle("");
        }
    }
    public NavigateToNextEvent(control: any,mo: IMediaObject, v:IMediaView): void {
        if(!isNullOrUndefined(v)){
            v.GetMediaManager()?.NavigateToNext(mo);
               /* Reinitialize document title */
            v.GetMediaManager()?.AddDocumentTitle("");
        }
    }
    public NavigateToPreviousEvent(control: any,mo: IMediaObject, v:IMediaView): void {
        if(!isNullOrUndefined(v)){
            v.GetMediaManager()?.NavigateToPrevious(mo);
            /* Reinitialize document title */
            v.GetMediaManager()?.AddDocumentTitle("");
        }
    }
    public EventLoadingMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        const video = document.getElementById(v.GetVideoId(mo.GetIndex())) as HTMLVideoElement | null;
        if(!video || video.paused)
            return;

        if(v instanceof MediaView)
            v.UpdateVideoLoadingState(mo, v, true);
    }
    private UpdateVideoLoadingState(mo: IMediaObject, v: IMediaView, loading: boolean): void
    {
        const standardButton = document.getElementById(v.GetLoadingButtonId(mo.GetIndex())) as HTMLButtonElement | null;
        if(standardButton)
            standardButton.style.display = loading ? "inline-flex" : "none";

        const fullscreenButton = document.getElementById(v.GetFullscreenLoadingButtonId(mo.GetIndex())) as HTMLButtonElement | null;
        if(fullscreenButton)
            fullscreenButton.style.display = loading ? "inline-flex" : "none";

        if(loading)
        {
            const startButton = document.getElementById(v.GetStartButtonId(mo.GetIndex())) as HTMLButtonElement | null;
            if(startButton)
                startButton.style.display = "none";
            const playButton = document.getElementById(v.GetPlayButtonId(mo.GetIndex())) as HTMLButtonElement | null;
            if(playButton)
                playButton.style.display = "none";
        }
    }
    public EventReadyMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        if(v instanceof MediaView)
            v.UpdateVideoLoadingState(mo, v, false);
        else
            return;

        const video = document.getElementById(v.GetVideoId(mo.GetIndex())) as HTMLVideoElement | null;
        if(video?.paused)
        {
            const buttonId = video.currentTime > 0
                ? v.GetPlayButtonId(mo.GetIndex())
                : v.GetStartButtonId(mo.GetIndex());
            const control = document.getElementById(buttonId) as HTMLButtonElement | null;
            if(control)
            {
                control.disabled = false;
                control.style.display = "block";
            }
        }
    }
    public EventStopMedia(button: any,mo: IMediaObject, v:IMediaView): void {
            v.StopMedia(mo);    
    }
    public StopMedia(mo: IMediaObject): void {
        this.StopMiniPlayer();
        this.ExitFullscreen(mo);
        this.hideButton(this.GetFullscreenButtonId(mo.GetIndex()));
        this.hideButton(this.GetLoadingButtonId(mo.GetIndex()));
        this.hideButton(this.GetFullscreenLoadingButtonId(mo.GetIndex()));
        var audio = <HTMLAudioElement>document.getElementById(this.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){                            
           audio.pause();
           audio.currentTime = 0;
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(this.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                video.pause();
                video.currentTime = 0;
                var videobackground = <HTMLAudioElement>document.getElementById(this.GetVideoBackgroundId(mo.GetIndex()));
                if(!isNullOrUndefined(videobackground)){                            
                    videobackground.style.visibility = 'hidden';                         
                }
            }
        }
        var control = <HTMLButtonElement>document.getElementById(this.GetStartButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "block"
            control.disabled = false;
        }                            
        control = <HTMLButtonElement>document.getElementById(this.GetStopButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        control = <HTMLButtonElement>document.getElementById(this.GetPlayButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        control = <HTMLButtonElement>document.getElementById(this.GetPauseButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        control = <HTMLButtonElement>document.getElementById(this.GetMuteButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        control = <HTMLButtonElement>document.getElementById(this.GetUnmuteButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        control = <HTMLButtonElement>document.getElementById(this.GetVolumeUpButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        control = <HTMLButtonElement>document.getElementById(this.GetVolumeDownButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                   
        this.GetMediaManager()?.SetIndexActiveMediaMediaObject(-1);
    
    }
    public StartMedia(mo: IMediaObject): void {
        let parent: IMediaObject|null = mo.GetParent();
        let muted:boolean = false;
        if(this.GetMediaManager()?.GetIndexActiveMediaMediaObject() >= 0)
        {
            if(parent){
                let mostop: IMediaObject|null = parent.GetChildWithIndex(this.GetMediaManager()?.GetIndexActiveMediaMediaObject());
                if(mostop){
                    var audio = <HTMLAudioElement>document.getElementById(this.GetAudioId(mostop.GetIndex()));
                    if(!isNullOrUndefined(audio))                            
                        muted = audio.muted;
                    else{
                        var video = <HTMLVideoElement>document.getElementById(this.GetVideoId(mostop.GetIndex()));
                        if(!isNullOrUndefined(video))                            
                            muted = video.muted;    
                    }
                    this.StopMedia(mostop); 
                }             
            }             
        }
        var audio = <HTMLAudioElement>document.getElementById(this.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){                            
            audio.pause();
            audio.currentTime = 0;
            this.StartMiniPlayer(mo, muted);
        }
        else
        {
            this.StopMiniPlayer();
            var video = <HTMLVideoElement>document.getElementById(this.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                var source = <HTMLSourceElement>document.getElementById(this.GetVideoSourceId(mo.GetIndex()));
                if(!isNullOrUndefined(source)){                            
                    source.src = mo.GetContentUrl();
                    video.muted = muted;
                    this.UpdateVideoLoadingState(mo, this, true);
                    video.load();
                    PlayMediaElement(video, this);
                    var videobackground = <HTMLAudioElement>document.getElementById(this.GetVideoBackgroundId(mo.GetIndex()));
                    if(!isNullOrUndefined(videobackground)){                            
                        videobackground.style.visibility = 'visible';                         
                    }
    
                }
            }
        }
        this.GetMediaManager()?.SetIndexActiveMediaMediaObject(mo.GetIndex());
    }

    public EventStartMedia(button: any,mo: IMediaObject, v:IMediaView): void {
        v.StartMedia(mo);
    }
    protected StartMiniPlayer(mo: IMediaObject, muted: boolean = false): void
    {
        const panel = document.getElementById("media-mini-player") as HTMLDivElement | null;
        const audio = document.getElementById("media-mini-audio") as HTMLAudioElement | null;
        const artist = document.getElementById("media-mini-artist");
        const album = document.getElementById("media-mini-album");
        const title = document.getElementById("media-mini-title");
        const station = document.getElementById("media-mini-station");
        const artwork = document.getElementById("media-mini-artwork") as HTMLImageElement | null;
        if(!panel || !audio)
            return;

        if(artwork)
        {
            const imageUrl = mo.GetImageUrl();
            const placeholder = isNullOrUndefinedOrEmpty(imageUrl) || ["assets/img/Music.png", "assets/img/Radio.png", "assets/img/Playlist.png"].includes(imageUrl);
            const artworkIcon = document.getElementById("media-mini-artwork-icon");
            if(artworkIcon)
            {
                artworkIcon.hidden = !placeholder;
                artworkIcon.className = "media-mini-artwork media-mini-artwork-icon fa-solid fa-" + (mo.GetType() === "Radio" ? "radio" : "music");
            }
            if(!placeholder)
            {
                artwork.src = imageUrl;
                artwork.hidden = false;
            }
            else
            {
                artwork.removeAttribute("src");
                artwork.hidden = true;
            }
            artwork.alt = mo.GetName();
        }

        if(mo.GetType() === "Radio")
        {
            if(artist) artist.hidden = true;
            if(album) album.hidden = true;
            if(title) title.hidden = true;
            if(station)
            {
                station.hidden = false;
                station.textContent = mo.GetName();
            }
        }
        else
        {
            if(artist)
            {
                artist.hidden = false;
                artist.textContent = mo.GetArtist() || GetCurrentString("Unknown");
            }
            if(album)
            {
                album.hidden = false;
                album.textContent = mo.GetAlbum() || GetCurrentString("Unknown");
            }
            if(title)
            {
                title.hidden = false;
                title.textContent = mo.GetTitle() || mo.GetName();
            }
            if(station) station.hidden = true;
        }
        audio.src = mo.GetContentUrl();
        audio.muted = muted;
        this.GetMediaManager()?.SetIndexActiveMediaMediaObject(mo.GetIndex());
        const menuButton = document.getElementById("media-mini-player-button") as HTMLButtonElement | null;
        if(menuButton)
            menuButton.onclick = () => this.ShowMiniPlayer();
        panel.onpointerdown = () => this.ShowMiniPlayer();
        panel.onkeydown = () => this.ShowMiniPlayer();
        this.ShowMiniPlayer();
        audio.load();
        PlayMediaElement(audio, this);

        const toggle = document.getElementById("media-mini-toggle") as HTMLButtonElement | null;
        const mute = document.getElementById("media-mini-mute") as HTMLButtonElement | null;
        const stop = document.getElementById("media-mini-stop") as HTMLButtonElement | null;
        const slider = document.getElementById("media-mini-slider") as HTMLInputElement | null;
        const loop = document.getElementById("media-mini-loop") as HTMLButtonElement | null;

        for(const direction of [-1, 1])
        {
            const button = document.getElementById(direction < 0 ? "media-mini-previous" : "media-mini-next") as HTMLButtonElement | null;
            const adjacent = mo.GetType() === "Radio" ? null : this.GetAdjacentMiniPlayerMedia(mo, direction);
            if(button)
            {
                button.hidden = mo.GetType() === "Radio";
                button.disabled = !adjacent;
                button.onclick = adjacent ? () => this.StartMiniPlayer(adjacent, audio.muted) : null;
            }
        }

        if(toggle)
            toggle.onclick = () => {
                if(audio.paused)
                    PlayMediaElement(audio, this);
                else
                    audio.pause();
            };
        if(mute)
            mute.onclick = () => {
                audio.muted = !audio.muted;
                mute.innerHTML = "<strong><i class=\"fa " + (audio.muted ? "fa-volume-xmark" : "fa-volume-high") + "\"></i></strong>";
                mute.setAttribute("aria-label", audio.muted ? GetCurrentString("Unmute") : GetCurrentString("Mute"));
            };
        if(stop)
            stop.onclick = () => this.StopMiniPlayer();
        if(loop)
        {
            loop.hidden = mo.GetType() === "Radio";
            loop.onclick = loop.hidden ? null : () => this.CycleMiniPlaybackMode();
            this.UpdateMiniLoopButton();
        }
        if(slider)
            slider.oninput = () => {
                if(Number.isFinite(audio.duration) && audio.duration > 0)
                    audio.currentTime = (audio.duration * Number(slider.value)) / 100;
            };

        audio.onplaying = () => this.UpdateMiniPlayer(audio, true);
        audio.onpause = () => this.UpdateMiniPlayer(audio, false);
        audio.ontimeupdate = () => this.UpdateMiniPlayerTimeline(audio);
        audio.onvolumechange = () => this.UpdateMiniPlayerMute(audio);
        audio.onended = () => this.EndMiniPlayer(mo);
        this.UpdateMiniPlayerMute(audio);
        this.UpdateMiniPlayerTimeline(audio);
    }
    private ShowMiniPlayer(): void
    {
        const panel = document.getElementById("media-mini-player") as HTMLDivElement | null;
        const audio = document.getElementById("media-mini-audio") as HTMLAudioElement | null;
        const menuButton = document.getElementById("media-mini-player-button") as HTMLButtonElement | null;
        if(!panel || !audio?.getAttribute("src"))
            return;
        panel.hidden = false;
        if(menuButton)
        {
            const label = GetCurrentString("Show mini player");
            menuButton.hidden = false;
            menuButton.title = label;
            menuButton.setAttribute("aria-label", label);
            menuButton.setAttribute("aria-expanded", "true");
        }
        if(MediaView.miniPlayerDisplayTimer !== null)
            window.clearTimeout(MediaView.miniPlayerDisplayTimer);
        MediaView.miniPlayerDisplayTimer = window.setTimeout(() => {
            MediaView.miniPlayerDisplayTimer = null;
            panel.hidden = true;
            menuButton?.setAttribute("aria-expanded", "false");
            if(panel.contains(document.activeElement))
                menuButton?.focus({ preventScroll: true });
        }, GlobalVars.GetGlobalMiniPlayerDisplayPeriod());
    }
    private GetAdjacentMiniPlayerMedia(current: IMediaObject, direction: number): IMediaObject | null
    {
        const parent = current.GetParent();
        if(!parent)
            return null;
        for(let index = current.GetIndex() + direction; index >= 0 && index < parent.GetChildrenLength(); index += direction)
        {
            const adjacent = parent.GetChildWithIndex(index);
            if(adjacent && !isNullOrUndefinedOrEmpty(adjacent.GetContentUrl()))
                return adjacent;
        }
        return null;
    }
    protected StopMiniPlayer(): void
    {
        if(MediaView.miniPlayerDisplayTimer !== null)
            window.clearTimeout(MediaView.miniPlayerDisplayTimer);
        MediaView.miniPlayerDisplayTimer = null;
        const panel = document.getElementById("media-mini-player") as HTMLDivElement | null;
        const audio = document.getElementById("media-mini-audio") as HTMLAudioElement | null;
        const menuButton = document.getElementById("media-mini-player-button") as HTMLButtonElement | null;
        if(menuButton)
        {
            menuButton.hidden = true;
            menuButton.onclick = null;
            menuButton.setAttribute("aria-expanded", "false");
        }
        if(audio)
        {
            audio.pause();
            audio.currentTime = 0;
            audio.removeAttribute("src");
            audio.load();
        }
        if(panel)
            panel.hidden = true;
        this.GetMediaManager()?.SetIndexActiveMediaMediaObject(-1);
    }
    private UpdateMiniPlayer(audio: HTMLAudioElement, playing: boolean): void
    {
        const toggle = document.getElementById("media-mini-toggle") as HTMLButtonElement | null;
        if(toggle)
        {
            toggle.innerHTML = "<strong><i class=\"fa " + (playing ? "fa-pause" : "fa-play") + "\"></i></strong>";
            toggle.setAttribute("aria-label", playing ? GetCurrentString("Pause") : GetCurrentString("Play"));
        }
    }
    private UpdateMiniPlayerTimeline(audio: HTMLAudioElement): void
    {
        const position = document.getElementById("media-mini-position");
        const duration = document.getElementById("media-mini-duration");
        const slider = document.getElementById("media-mini-slider") as HTMLInputElement | null;
        if(position)
            position.textContent = Number.isFinite(audio.currentTime)
                ? (audio.currentTime < 3600 ? GetTimeString(audio.currentTime).substring(3) : GetTimeString(audio.currentTime))
                : "00:00";
        if(duration)
            duration.textContent = Number.isFinite(audio.duration) && audio.duration > 0
                ? (audio.duration < 3600 ? GetTimeString(audio.duration).substring(3) : GetTimeString(audio.duration))
                : "00:00";
        if(slider && Number.isFinite(audio.duration) && audio.duration > 0)
            slider.value = ((audio.currentTime * 100) / audio.duration).toString();
    }
    private CycleMiniPlaybackMode(): void
    {
        const mode = this.GetMediaManager()?.GetPlaybackMode();
        let next = MediaPlaybackMode.NoLoop;
        if(mode === MediaPlaybackMode.NoLoop)
            next = MediaPlaybackMode.Loop;
        else if(mode === MediaPlaybackMode.Loop)
            next = MediaPlaybackMode.PlaylistLoop;
        this.GetMediaManager()?.SetPlaybackMode(next);
        this.UpdateMiniLoopButton();
    }
    private UpdateMiniLoopButton(): void
    {
        const loop = document.getElementById("media-mini-loop") as HTMLButtonElement | null;
        if(!loop)
            return;
        const mode = this.GetMediaManager()?.GetPlaybackMode();
        if(mode === MediaPlaybackMode.Loop)
        {
            loop.innerHTML = "<strong><i class=\"fa-solid fa-rotate-right\"></i></strong>";
            loop.setAttribute("aria-label", GetCurrentString("Play all items and loop"));
        }
        else if(mode === MediaPlaybackMode.PlaylistLoop)
        {
            loop.innerHTML = "<strong><i class=\"fa-solid fa-circle-notch\"></i></strong>";
            loop.setAttribute("aria-label", GetCurrentString("Play one item"));
        }
        else
        {
            loop.innerHTML = "<strong><i class=\"fa-solid fa-arrows-rotate\"></i></strong>";
            loop.setAttribute("aria-label", GetCurrentString("Loop one item"));
        }
    }
    private UpdateMiniPlayerMute(audio: HTMLAudioElement): void
    {
        const mute = document.getElementById("media-mini-mute") as HTMLButtonElement | null;
        if(mute)
        {
            mute.innerHTML = "<strong><i class=\"fa " + (audio.muted ? "fa-volume-xmark" : "fa-volume-high") + "\"></i></strong>";
            mute.setAttribute("aria-label", audio.muted ? GetCurrentString("Unmute") : GetCurrentString("Mute"));
        }
    }
    private EndMiniPlayer(mo: IMediaObject): void
    {
        const mode = this.GetMediaManager()?.GetPlaybackMode();
        if(mode === MediaPlaybackMode.Loop)
        {
            const audio = document.getElementById("media-mini-audio") as HTMLAudioElement | null;
            if(audio)
            {
                audio.currentTime = 0;
                PlayMediaElement(audio, this);
            }
            return;
        }
        if(mode === MediaPlaybackMode.PlaylistLoop)
        {
            const parent = mo.GetParent();
            if(parent)
            {
                let nextIndex = mo.GetIndex() + 1;
                if(nextIndex >= parent.GetChildrenLength())
                    nextIndex = 0;
                const next = parent.GetChildWithIndex(nextIndex);
                if(next)
                {
                    this.StartMiniPlayer(next);
                    return;
                }
            }
        }
        if(mode === MediaPlaybackMode.PlaylistOnce)
        {
            const parent = mo.GetParent();
            if(parent)
            {
                const nextIndex = mo.GetIndex() + 1;
                if(nextIndex < parent.GetChildrenLength())
                {
                    const next = parent.GetChildWithIndex(nextIndex);
                    if(next)
                    {
                        this.StartMiniPlayer(next);
                        return;
                    }
                }
            }
        }
        this.StopMiniPlayer();
    }
    public PauseMedia(button: any,mo: IMediaObject, v:IMediaView): void {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){                            
            audio.pause();
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                video.pause();
            }
        }
    }
    public PlayMedia(button: any,mo: IMediaObject, v:IMediaView): void {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){                            
            PlayMediaElement(audio, v);
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){       
                var videobackground = <HTMLAudioElement>document.getElementById(v.GetVideoBackgroundId(mo.GetIndex()));
                if(!isNullOrUndefined(videobackground)){                            
                    videobackground.style.visibility = 'visible';                         
                }

                PlayMediaElement(video, v);
            }
        }
    }
    public MuteMedia(button: any,mo: IMediaObject, v:IMediaView): void {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){                            
            audio.muted = true; 
            var control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control)){
                control.disabled = false;
                control.style.display = "block";                           
            }
            control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control)){
                control.disabled = true;
                control.style.display = "none";                           
            }                                    
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                video.muted = true; 
                var control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if(!isNullOrUndefined(control)){
                    control.disabled = false;
                    control.style.display = "block";                           
                }
                control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if(!isNullOrUndefined(control)){
                    control.disabled = true;
                    control.style.display = "none";                           
                }                                    
            }
        }
    }

    public UnmuteMedia(button: any,mo: IMediaObject, v:IMediaView): void {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){                            
            audio.muted = false; 
            var control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control)){
                control.disabled = false;
                control.style.display = "block";                           
            }
            control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control)){
                control.disabled = true;
                control.style.display = "none";                           
            }                                    

        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                video.muted = false; 
                var control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if(!isNullOrUndefined(control)){
                    control.disabled = false;
                    control.style.display = "block";                           
                }
                control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if(!isNullOrUndefined(control)){
                    control.disabled = true;
                    control.style.display = "none";                           
                }                                    
            }
        }
    }


    public UpdateAllLoopButtons (mo: IMediaObject): void
    {
        let parent: IMediaObject|null = mo.GetParent();
        if(parent)
        {
            for(var k = 0; k < parent.GetChildrenLength(); k++)
            {
                let co = parent.GetChildWithIndex(k)
                if(co)
                    this.UpdateLoopButton(co);
            }
        }
    }
    public  UpdateLoopButton (mo: IMediaObject): void
    {
        if(this.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.NoLoop)
        {
            var control = <HTMLAudioElement>document.getElementById(this.GetPlayListLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "none";
            control = <HTMLAudioElement>document.getElementById(this.GetLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "block";
            control = <HTMLAudioElement>document.getElementById(this.GetNoLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "none";  
        }
        if(this.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.Loop)
        {
            var control = <HTMLAudioElement>document.getElementById(this.GetPlayListLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "block";
            control = <HTMLAudioElement>document.getElementById(this.GetLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "none";
            control = <HTMLAudioElement>document.getElementById(this.GetNoLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "none";
        }    
        if(this.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.PlaylistLoop)
        {
            var control = <HTMLAudioElement>document.getElementById(this.GetPlayListLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "none";
            control = <HTMLAudioElement>document.getElementById(this.GetLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "none";
            control = <HTMLAudioElement>document.getElementById(this.GetNoLoopButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "block";    
        }
    }
    public  UpdateFavoriteButton (mo: IMediaObject): void
    {
        if(this.IsFavoriteList(mo))
        {
            var control = <HTMLButtonElement>document.getElementById(this.GetAddFavoriteButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "none";
            var control = <HTMLButtonElement>document.getElementById(this.GetRemoveFavoriteButtonId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
                control.style.display = "block";

        }
        else
        {
            if(this.IsFavoriteMedia(mo))
            {
                var control = <HTMLButtonElement>document.getElementById(this.GetAddFavoriteButtonId(mo.GetIndex()));
                if(!isNullOrUndefined(control))
                    control.style.display = "none";
                var control = <HTMLButtonElement>document.getElementById(this.GetRemoveFavoriteButtonId(mo.GetIndex()));
                if(!isNullOrUndefined(control))
                    control.style.display = "block";

            }
            else
            {
                var control = <HTMLButtonElement>document.getElementById(this.GetAddFavoriteButtonId(mo.GetIndex()));
                if(!isNullOrUndefined(control))
                    control.style.display = "block";
                var control = <HTMLButtonElement>document.getElementById(this.GetRemoveFavoriteButtonId(mo.GetIndex()));
                if(!isNullOrUndefined(control))
                    control.style.display = "none";

            }
        }
    }
    public LoopMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.GetMediaManager()?.SetPlaybackMode(MediaPlaybackMode.Loop);
        v.UpdateAllLoopButtons(mo);
        if(v instanceof MediaView)
            v.UpdateMiniLoopButton();
    }
    public PlaylistLoopMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.GetMediaManager()?.SetPlaybackMode(MediaPlaybackMode.PlaylistLoop);
        v.UpdateAllLoopButtons(mo);
        if(v instanceof MediaView)
            v.UpdateMiniLoopButton();
    }
    public NoLoopMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.GetMediaManager()?.SetPlaybackMode(MediaPlaybackMode.NoLoop);
        v.UpdateAllLoopButtons(mo);
        if(v instanceof MediaView)
            v.UpdateMiniLoopButton();
    }
    public AddFavoriteMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var currentplaylist:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var playlists:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();

        if(!isNullOrUndefinedOrEmpty(currentplaylist)&&(playlists)){
            var playlist:IMediaObject|null = playlists.GetChildWithName(currentplaylist);
            if(playlist){
                if(isNullOrUndefined(playlist.GetChildWithName(mo.GetName())))
                {

                    var object:IMediaObject;
                    switch(mo.GetType())
                    {
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
                    v.GetMediaManager()?.ShowAlertPopupInformation(GetCurrentString("Media <strong>")+ object.GetName()+ GetCurrentString("</strong> added in the favorite list <strong>")+currentplaylist +"</strong>");
                    GlobalVars.SetGlobalFavoritePlaylists(playlists);
                    let control:HTMLButtonElement = <HTMLButtonElement>document.getElementById(v.GetAddFavoriteButtonId(mo.GetIndex()));
                    if(!isNullOrUndefined(control)){
                        control.style.display = "none";
                        control.disabled = true;
                    }
                    control = <HTMLButtonElement>document.getElementById(v.GetRemoveFavoriteButtonId(mo.GetIndex()));
                    if(!isNullOrUndefined(control)){
                        control.style.display = "block";
                        control.disabled = false;
                    }
                }  
            }            
        }
    }
    public RemoveFavoriteMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var currentplaylist:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var playlists:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
        let root = mo.GetRoot()
        if((root)&&(playlists)){
            if(root.GetName()==playlists.GetName())
            {
                // If in Favorite Playlist remove the item from the list
                var parent:IMediaObject|null = mo.GetParent();
                if(parent){
                    parent.RemoveChildWithIndex(mo.GetIndex());
                    v.GetMediaManager()?.ShowAlertPopupInformation(GetCurrentString("Media <strong>")+ mo.GetName()+ GetCurrentString("</strong> removed from the favorite list <strong>")+parent.GetName() +"</strong>");
                    if(parent.GetChildrenLength() > 0){
                        for(var i:number = 0; i < parent.GetChildrenLength(); i++)
                        {
                            // Reindex
                            let co = parent.GetChildWithIndex(i)
                            if(co)
                                co.SetIndex(i);
                        }
                        // Remove the MediaObject from Storage
                        let co = mo.GetRoot()
                        if(co)
                            GlobalVars.SetGlobalFavoritePlaylists(co);
                        v.GetMediaManager()?.NavigateToChild(parent,true);
    //                    v.GetMediaManager()?.SaveNavigationState(parent.GetChildWithIndex(0));
                    }
                    else{
                        // Remove the MediaObject from Storage
                        let co = mo.GetRoot()
                        if(co)
                            GlobalVars.SetGlobalFavoritePlaylists(co);
                        let p = parent.GetParent()    
                        if(p)
                            v.GetMediaManager()?.NavigateToChild(p,true);
    //                    v.GetMediaManager()?.SaveNavigationState(parent);
                    }
                }
            }
            else
            {
                if(!isNullOrUndefinedOrEmpty(currentplaylist)&&!isNullOrUndefined(playlists)){
                    var playlist:IMediaObject|null = playlists.GetChildWithName(currentplaylist);
                    if(playlist){
                        if(!isNullOrUndefined(playlist.GetChildWithName(mo.GetName())))
                        {
                            playlist.RemoveChildWithName(mo.GetName());
                            v.GetMediaManager()?.ShowAlertPopupInformation(GetCurrentString("Media <strong>")+ mo.GetName()+ GetCurrentString("</strong> removed from the favorite list <strong>")+currentplaylist +"</strong>");
                            GlobalVars.SetGlobalFavoritePlaylists(playlists);
                            let control:HTMLButtonElement = <HTMLButtonElement>document.getElementById(v.GetAddFavoriteButtonId(mo.GetIndex()));
                            if(!isNullOrUndefined(control)){
                                control.style.display = "block";
                                control.disabled = false;
                            }
                            control = <HTMLButtonElement>document.getElementById(v.GetRemoveFavoriteButtonId(mo.GetIndex()));
                            if(!isNullOrUndefined(control)){
                                control.style.display = "none";
                                control.disabled = true;
                            }
                        }  
                    }            
                }
            }
        }
    }
    public IsFavoriteList (mo: IMediaObject): boolean
    {
        var playlists:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
        let co = mo.GetRoot()
        if((co)&&(playlists))
            if(co.GetName()==playlists.GetName())
                return true;
        return false;
    }
    public IsFavoriteMedia (mo: IMediaObject): boolean
    {
        var currentplaylist:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var playlists:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();

        if(!isNullOrUndefinedOrEmpty(currentplaylist)&&(playlists)){
            var playlist:IMediaObject|null = playlists.GetChildWithName(currentplaylist);
            if(playlist){
                if(!isNullOrUndefined(playlist.GetChildWithName(mo.GetName())))
                    return true;                
            }            
        }
        return false;
    }


    public DownloadMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        if(!isNullOrUndefined(mo)){
            
            //var bb = new Blob([fileContent ], { type: 'application/json' });
            
            var a = document.createElement('a');
            a.download = 'download' ;
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

    protected InternalCreateChildView (current:IMediaObject): boolean
    {
        if(isNullOrUndefined(current))
            return false;
        var div = <HTMLDivElement>document.getElementById(this.GetMediaManager()?.GetId());
        if(isNullOrUndefined(div))
            return false;
        var parent = current.GetParent();
        var button = null;
        if (parent) /*&& (this.IsOneItemNavigation() === false)*/ {
            div.innerHTML = "";

            var pagesize:number =  this.GetMediaManager()?.GetPaginationSize();
            var min:number = 0;
            var max:number = parent.GetChildrenLength();
            if(pagesize>0){
                var q:number = Math.floor(current.GetIndex()/pagesize);
                var r:number = current.GetIndex() % pagesize;
                min = q*pagesize;
                max = (min + pagesize < parent.GetChildrenLength() ? min + pagesize: parent.GetChildrenLength());  
            }
            this.GetMediaManager()?.SetPaginationIndex(min);
            for(var i = min; i < max; i++)
            {
                // Get View associated with current MediaObject
                let mo = parent.GetChildWithIndex(i)
                if(mo){
                    var view:IMediaView = this.GetMediaManager().CreateMediaView(mo);
                    if(!isNullOrUndefined(view)){
                        let co = parent.GetChildWithIndex(i)
                        if(co)
                            div.innerHTML += MediaView.PrepareArtwork(view.CreateView(co))
                    }
                }
            }
            for(var i = min; i < max; i++)
            {
                let co = parent.GetChildWithIndex(i)
                if(co){
                    this.RegisterViewEvents(co);
                    this.InitializeViewControls(co);
                }
            }
        }
        else
        {        
            // Display Media Object if no parent  
            if(!isNullOrUndefined(current))
            {
                //current.SetParent(parent);
                div.innerHTML = MediaView.PrepareArtwork(this.CreateView(current));
                this.RegisterViewEvents(current);
                this.InitializeViewControls(current);
            }
        }
        // If carousel created activate it
        ActivateCarousel();
    
        return true;
    }
    protected InternalMakeViewControlVisible(current: IMediaObject): boolean
    {
        // Check if current MediaObject is not displayed on the current page
        var index:number = this.GetMediaManager().GetPaginationIndex();
        var size:number = this.GetMediaManager().GetPaginationSize();
        if((size>0) && ((current.GetIndex()<index)|| ( current.GetIndex()>=(index + size)))){
            this.GetMediaManager().NavigateToPage(current);
        }

        var div = document.getElementById(this.GetControlViewId(current.GetIndex()));
        if(!isNullOrUndefined(div)){
            if(div){
                div.scrollIntoView(true);
                div.scrollIntoView({  block: 'center' });
            }
            return true;        
        }
        return false;
    }
    protected internalRegisterViewEvents(cur:IMediaObject): boolean
    {
        let Index: number = cur.GetIndex();
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

        var audio = <HTMLAudioElement>document.getElementById(this.GetAudioId(Index));
        if(!isNullOrUndefined(audio)){  
            this.registerEvent("playing", this.GetAudioId(Index), cur, this.EventPlayingMedia); 
            this.registerEvent("play", this.GetAudioId(Index), cur, this.EventPlayMedia); 
            this.registerEvent("pause", this.GetAudioId(Index), cur, this.EventPauseMedia); 
            this.registerEvent("volumechange", this.GetAudioId(Index), cur, this.EventVolumeChangeMedia); 
            this.registerEvent("timeupdate", this.GetAudioId(Index), cur, this.EventTimeUpdateMedia); 
            this.registerEvent("ended", this.GetAudioId(Index), cur, this.EventEndedMedia); 
            this.registerEvent("input", this.GetSliderId(Index), cur, this.InputSliderMedia);
        }
        var video = <HTMLAudioElement>document.getElementById(this.GetVideoId(Index));
        if(!isNullOrUndefined(video)){  
            video.removeAttribute("controls");
            video.setAttribute("controlsList", "nodownload noplaybackrate");
            video.setAttribute("disablePictureInPicture", "");
            this.registerEvent("loadstart", this.GetVideoId(Index), cur, this.EventLoadingMedia);
            this.registerEvent("waiting", this.GetVideoId(Index), cur, this.EventLoadingMedia);
            this.registerEvent("stalled", this.GetVideoId(Index), cur, this.EventLoadingMedia);
            this.registerEvent("seeking", this.GetVideoId(Index), cur, this.EventLoadingMedia);
            this.registerEvent("canplay", this.GetVideoId(Index), cur, this.EventReadyMedia);
            this.registerEvent("canplaythrough", this.GetVideoId(Index), cur, this.EventReadyMedia);
            this.registerEvent("playing", this.GetVideoId(Index), cur, this.EventReadyMedia);
            this.registerEvent("seeked", this.GetVideoId(Index), cur, this.EventReadyMedia);
            this.registerEvent("error", this.GetVideoId(Index), cur, this.EventReadyMedia);
            this.registerEvent("abort", this.GetVideoId(Index), cur, this.EventReadyMedia);
            this.registerEvent("emptied", this.GetVideoId(Index), cur, this.EventReadyMedia);
            this.registerEvent("playing", this.GetVideoId(Index), cur, this.EventPlayingMedia); 
            this.registerEvent("play", this.GetVideoId(Index), cur, this.EventPlayMedia); 
            this.registerEvent("pause", this.GetVideoId(Index), cur, this.EventPauseMedia); 
            this.registerEvent("volumechange", this.GetVideoId(Index), cur, this.EventVolumeChangeMedia); 
            this.registerEvent("timeupdate", this.GetVideoId(Index), cur, this.EventTimeUpdateMedia); 
            this.registerEvent("ended", this.GetVideoId(Index), cur, this.EventEndedMedia); 
            this.registerEvent("input", this.GetSliderId(Index), cur, this.InputSliderMedia);
        }
        return true; 
    }
    protected RegisterFullscreenViewEvents(cur: IMediaObject, allowWithoutVideo: boolean = false): boolean
    {
        const index = cur.GetIndex();
        const container = document.getElementById(this.GetFullscreenContainerId(index));
        const fullscreenButton = document.getElementById(this.GetFullscreenButtonId(index));
        const toggleButton = document.getElementById(this.GetFullscreenToggleButtonId(index));
        const muteButton = document.getElementById(this.GetFullscreenMuteButtonId(index));
        const fullscreenSlider = document.getElementById(this.GetFullscreenSliderId(index));
        const stopButton = document.getElementById(this.GetFullscreenStopButtonId(index));
        const exitButton = document.getElementById(this.GetFullscreenExitButtonId(index));
        const appWindowButton = document.getElementById(this.GetAppWindowButtonId(index));
        const nativeButton = document.getElementById("_fullscreenNativeButtonId" + index);

        if(!container)
            return false;

        const enterFullscreen = (event: Event) => {
            if(event.type === "dblclick" && event.target instanceof Element &&
                event.target.closest(".media-fullscreen-controls"))
                return;
            event.stopPropagation();
            if(event.type === "dblclick" && this.SupportsAppWindow() &&
                (!this.IsFullscreen(cur) || document.fullscreenElement === container))
                this.EnterAppWindow(cur, allowWithoutVideo);
            else
                this.EnterFullscreen(cur, allowWithoutVideo);
        };
        container.addEventListener("dblclick", enterFullscreen);
        container.parentElement?.addEventListener("dblclick", enterFullscreen);
        fullscreenButton?.addEventListener("click", enterFullscreen);
        appWindowButton?.addEventListener("click", () => this.EnterAppWindow(cur, allowWithoutVideo));
        nativeButton?.addEventListener("click", () => {
            const doc = document as Document & { webkitFullscreenElement?: Element };
            if(document.fullscreenElement === container || doc.webkitFullscreenElement === container ||
                container.classList.contains("media-fullscreen-fallback"))
                this.EnterAppWindow(cur, allowWithoutVideo);
            else
                this.EnterFullscreen(cur, allowWithoutVideo);
        });
        toggleButton?.addEventListener("click", () => this.ToggleFullscreenPlayback(cur));
        muteButton?.addEventListener("click", () => this.ToggleFullscreenMute(cur));
        fullscreenSlider?.addEventListener("input", event => this.InputFullscreenSlider(cur, event.currentTarget as HTMLInputElement));
        stopButton?.addEventListener("click", () => this.StopMedia(cur));
        exitButton?.addEventListener("click", () => this.ExitFullscreen(cur));
        container.addEventListener("pointermove", () => this.ShowFullscreenControls(cur, true));
        container.addEventListener("touchstart", () => this.ShowFullscreenControls(cur, true), { passive: true });
        container.addEventListener("keydown", () => this.ShowFullscreenControls(cur, true));
        document.addEventListener("keydown", event => {
            const doc = document as Document & { webkitFullscreenElement?: Element };
            if(event.key === "Escape" && container.isConnected && container.classList.contains("media-app-window") &&
                document.fullscreenElement !== container && doc.webkitFullscreenElement !== container)
            {
                event.preventDefault();
                exitButton?.click();
            }
        });
        document.addEventListener("fullscreenchange", () => this.UpdateFullscreenState(cur));
        document.addEventListener("webkitfullscreenchange", () => this.UpdateFullscreenState(cur));
        window.addEventListener("resize", () => {
            if(container.isConnected)
                this.UpdateDisplayModeButtons(cur);
        });
        this.UpdateDisplayModeButtons(cur);
        return true;
    }
    protected SupportsAppWindow(): boolean
    {
        const mobile = /Android|iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        return !mobile && window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches;
    }
    protected EnterAppWindow(cur: IMediaObject, allowWithoutVideo: boolean = false): void
    {
        const container = document.getElementById(this.GetFullscreenContainerId(cur.GetIndex()));
        const video = document.getElementById(this.GetVideoId(cur.GetIndex()));
        if(!this.SupportsAppWindow() || !container || (!allowWithoutVideo && !video))
            return;

        this.fullscreenViewportCleanup?.();
        container.classList.remove("media-fullscreen-fallback");
        container.classList.add("media-app-window", "media-fullscreen-active");
        document.body.classList.add("media-fullscreen-open");
        const doc = document as Document & {
            webkitFullscreenElement?: Element;
            webkitExitFullscreen?: () => void | Promise<void>;
        };
        if(document.fullscreenElement === container || doc.webkitFullscreenElement === container)
        {
            const result = document.exitFullscreen ? document.exitFullscreen() : doc.webkitExitFullscreen?.();
            result?.catch(error => console.error("Unable to exit fullscreen.", error));
        }
        this.UpdateFullscreenToggle(cur);
        this.UpdateFullscreenMute(cur);
        this.UpdateDisplayModeButtons(cur);
        this.ShowFullscreenControls(cur);
        container.tabIndex = -1;
        container.focus({ preventScroll: true });
    }
    protected EnterFullscreen(cur: IMediaObject, allowWithoutVideo: boolean = false): void
    {
        const container = document.getElementById(this.GetFullscreenContainerId(cur.GetIndex()));
        const video = document.getElementById(this.GetVideoId(cur.GetIndex())) as HTMLVideoElement | null;
        if(!container || (!allowWithoutVideo && !video))
            return;
        const doc = document as Document & { webkitFullscreenElement?: Element };
        if(document.fullscreenElement === container || doc.webkitFullscreenElement === container)
            return;

        const fullscreenContainer = container as HTMLElement & {
            webkitRequestFullscreen?: () => void | Promise<void>;
        };
        try
        {
            if(container.requestFullscreen && document.fullscreenEnabled !== false)
            {
                const result = container.requestFullscreen();
                result?.catch(error => {
                    console.error("Unable to enter fullscreen.", error);
                    if(container.isConnected)
                        this.EnterFullscreenFallback(cur, container);
                });
            }
            else if(fullscreenContainer.webkitRequestFullscreen)
            {
                const result = fullscreenContainer.webkitRequestFullscreen();
                if(result instanceof Promise)
                    result.catch(error => {
                        console.error("Unable to enter fullscreen.", error);
                        if(container.isConnected)
                            this.EnterFullscreenFallback(cur, container);
                    });
            }
            else
            {
                this.EnterFullscreenFallback(cur, container);
            }
        }
        catch(error)
        {
            console.error("Unable to enter fullscreen.", error);
            this.EnterFullscreenFallback(cur, container);
        }
    }
    private EnterFullscreenFallback(cur: IMediaObject, container: HTMLElement): void
    {
        this.fullscreenViewportCleanup?.();
        container.classList.add("media-fullscreen-active", "media-fullscreen-fallback");
        document.body.classList.add("media-fullscreen-open");
        const viewport = window.visualViewport;
        const updateViewport = () => {
            if(!container.isConnected || !container.classList.contains("media-fullscreen-fallback"))
            {
                this.fullscreenViewportCleanup?.();
                return;
            }
            container.style.setProperty("--media-fullscreen-left", (viewport?.offsetLeft ?? 0) + "px");
            container.style.setProperty("--media-fullscreen-top", (viewport?.offsetTop ?? 0) + "px");
            container.style.setProperty("--media-fullscreen-width", (viewport?.width ?? window.innerWidth) + "px");
            container.style.setProperty("--media-fullscreen-height", (viewport?.height ?? window.innerHeight) + "px");
        };
        const cleanup = () => {
            window.removeEventListener("resize", updateViewport);
            viewport?.removeEventListener("resize", updateViewport);
            viewport?.removeEventListener("scroll", updateViewport);
            for(const property of ["left", "top", "width", "height"])
                container.style.removeProperty("--media-fullscreen-" + property);
            if(this.fullscreenViewportCleanup === cleanup)
                this.fullscreenViewportCleanup = null;
        };
        this.fullscreenViewportCleanup = cleanup;
        window.addEventListener("resize", updateViewport);
        viewport?.addEventListener("resize", updateViewport);
        viewport?.addEventListener("scroll", updateViewport);
        updateViewport();
        this.UpdateFullscreenToggle(cur);
        this.UpdateFullscreenMute(cur);
        this.UpdateDisplayModeButtons(cur);
        this.ShowFullscreenControls(cur);
    }
    protected ExitFullscreen(cur: IMediaObject): void
    {
        const container = document.getElementById(this.GetFullscreenContainerId(cur.GetIndex()));
        if(!container)
            return;

        const doc = document as Document & {
            webkitFullscreenElement?: Element;
            webkitExitFullscreen?: () => void | Promise<void>;
        };
        try
        {
            this.fullscreenViewportCleanup?.();
            container.classList.remove("media-app-window", "media-fullscreen-fallback");
            if(document.fullscreenElement === container || doc.webkitFullscreenElement === container)
            {
                const result = document.exitFullscreen
                    ? document.exitFullscreen()
                    : doc.webkitExitFullscreen?.();
                result?.catch(error => console.error("Unable to exit fullscreen.", error));
            }
            container.classList.remove("media-fullscreen-active");
            container.classList.remove("media-fullscreen-controls-visible");
            document.body.classList.toggle("media-fullscreen-open", !!document.querySelector(".media-fullscreen-container.media-fullscreen-active"));
            this.ClearFullscreenControlTimer(cur.GetIndex());
            this.UpdateDisplayModeButtons(cur);
            if(this.SupportsAppWindow())
                (document.getElementById(this.GetAppWindowButtonId(cur.GetIndex())) ||
                    document.getElementById(this.GetStartButtonId(cur.GetIndex())))?.focus({ preventScroll: true });
        }
        catch(error)
        {
            console.error("Unable to exit fullscreen.", error);
        }
    }
    protected ToggleFullscreenPlayback(cur: IMediaObject): void
    {
        const video = document.getElementById(this.GetVideoId(cur.GetIndex())) as HTMLVideoElement | null;
        if(!video)
            return;

        if(video.paused)
            PlayMediaElement(video, this);
        else
            video.pause();
        this.UpdateFullscreenToggle(cur);
    }
    protected ToggleFullscreenMute(cur: IMediaObject): void
    {
        const video = document.getElementById(this.GetVideoId(cur.GetIndex())) as HTMLVideoElement | null;
        if(!video)
            return;
        video.muted = !video.muted;
        this.UpdateFullscreenMute(cur);
        this.ShowFullscreenControls(cur);
    }
    protected UpdateFullscreenState(cur: IMediaObject): void
    {
        const container = document.getElementById(this.GetFullscreenContainerId(cur.GetIndex()));
        if(!container)
            return;
        const doc = document as Document & { webkitFullscreenElement?: Element };
        const active = document.fullscreenElement === container || doc.webkitFullscreenElement === container ||
            container.classList.contains("media-app-window") || container.classList.contains("media-fullscreen-fallback");
        container.classList.toggle("media-fullscreen-active", active);
        document.body.classList.toggle("media-fullscreen-open", !!document.querySelector(".media-fullscreen-container.media-fullscreen-active"));
        this.UpdateFullscreenToggle(cur);
        this.UpdateFullscreenMute(cur);
        this.UpdateDisplayModeButtons(cur);
        if(active)
            this.ShowFullscreenControls(cur);
        else
        {
            container.classList.remove("media-fullscreen-controls-visible");
            this.ClearFullscreenControlTimer(cur.GetIndex());
        }
    }
    private UpdateDisplayModeButtons(cur: IMediaObject): void
    {
        const index = cur.GetIndex();
        const container = document.getElementById(this.GetFullscreenContainerId(index));
        const doc = document as Document & { webkitFullscreenElement?: Element };
        const native = !!container && (document.fullscreenElement === container || doc.webkitFullscreenElement === container ||
            container.classList.contains("media-fullscreen-fallback"));
        const nativeButton = document.getElementById("_fullscreenNativeButtonId" + index) as HTMLButtonElement | null;
        const desktop = this.SupportsAppWindow();
        const cardButton = document.getElementById(this.GetAppWindowButtonId(index));
        if(cardButton?.parentElement)
            cardButton.parentElement.hidden = !desktop;
        if(cur.GetType() === "Photo")
        {
            const photoButton = document.getElementById(this.GetStartButtonId(index));
            if(photoButton)
            {
                const label = GetCurrentString(desktop ? "App window" : "Full screen");
                photoButton.setAttribute("aria-label", GetCurrentString("Play"));
                photoButton.title = label;
                photoButton.innerHTML = "<strong><i class=\"fa-solid fa-play\"></i></strong>";
            }
        }
        const fullscreenCardButton = document.getElementById(this.GetFullscreenButtonId(index));
        if(fullscreenCardButton?.parentElement)
            fullscreenCardButton.parentElement.hidden = desktop;
        if(nativeButton)
        {
            nativeButton.hidden = !desktop;
            nativeButton.disabled = false;
            const label = GetCurrentString(native ? "App window" : "Full screen");
            nativeButton.setAttribute("aria-label", label);
            nativeButton.title = label;
            nativeButton.innerHTML = "<strong><i class=\"fa " + (native ? "fa-window-maximize" : "fa-expand") + "\"></i></strong>";
        }
    }
    protected IsFullscreen(cur: IMediaObject): boolean
    {
        const container = document.getElementById(this.GetFullscreenContainerId(cur.GetIndex()));
        if(!container)
            return false;
        const doc = document as Document & { webkitFullscreenElement?: Element };
        return container.classList.contains("media-fullscreen-active") ||
            document.fullscreenElement === container ||
            doc.webkitFullscreenElement === container;
    }
    protected ShowFullscreenControls(cur: IMediaObject, userRequested: boolean = false): void
    {
        if(!this.IsFullscreen(cur))
            return;
        const container = document.getElementById(this.GetFullscreenContainerId(cur.GetIndex()));
        if(!container)
            return;
        if(container.classList.contains("media-slideshow-running") && !userRequested)
        {
            container.classList.remove("media-fullscreen-controls-visible");
            this.ClearFullscreenControlTimer(cur.GetIndex());
            return;
        }
        container.classList.add("media-fullscreen-controls-visible");
        this.ClearFullscreenControlTimer(cur.GetIndex());
        const inactivityPeriod = GlobalVars.GetGlobalFullscreenInactivityPeriod();
        const delay = Number.isFinite(inactivityPeriod) && inactivityPeriod >= 100
            ? inactivityPeriod
            : 2000;
        this.fullscreenControlTimers[cur.GetIndex()] = window.setTimeout(() => {
            container.classList.remove("media-fullscreen-controls-visible");
            delete this.fullscreenControlTimers[cur.GetIndex()];
        }, delay);
    }
    protected HideFullscreenControls(cur: IMediaObject): void
    {
        const container = document.getElementById(this.GetFullscreenContainerId(cur.GetIndex()));
        if(container)
            container.classList.remove("media-fullscreen-controls-visible");
        this.ClearFullscreenControlTimer(cur.GetIndex());
    }
    private ClearFullscreenControlTimer(index: number): void
    {
        const timer = this.fullscreenControlTimers[index];
        if(timer !== undefined)
        {
            window.clearTimeout(timer);
            delete this.fullscreenControlTimers[index];
        }
    }
    protected UpdateFullscreenToggle(cur: IMediaObject): void
    {
        const button = document.getElementById(this.GetFullscreenToggleButtonId(cur.GetIndex()));
        const video = document.getElementById(this.GetVideoId(cur.GetIndex())) as HTMLVideoElement | null;
        if(!button || !video)
            return;
        button.innerHTML = "<strong><i class=\"fa " + (video.paused ? "fa-play" : "fa-pause") + "\"></i></strong>";
        button.setAttribute("aria-label", video.paused ? GetCurrentString("Play") : GetCurrentString("Pause"));
    }
    protected UpdateFullscreenMute(cur: IMediaObject): void
    {
        const button = document.getElementById(this.GetFullscreenMuteButtonId(cur.GetIndex()));
        const video = document.getElementById(this.GetVideoId(cur.GetIndex())) as HTMLVideoElement | null;
        if(!button || !video)
            return;
        button.innerHTML = "<strong><i class=\"fa " + (video.muted ? "fa-volume-xmark" : "fa-volume-high") + "\"></i></strong>";
        button.setAttribute("aria-label", video.muted ? GetCurrentString("Unmute") : GetCurrentString("Mute"));
    }
    protected UpdateFullscreenTimeline(cur: IMediaObject): void
    {
        const video = document.getElementById(this.GetVideoId(cur.GetIndex())) as HTMLVideoElement | null;
        const slider = document.getElementById(this.GetFullscreenSliderId(cur.GetIndex())) as HTMLInputElement | null;
        const position = document.getElementById(this.GetFullscreenPositionId(cur.GetIndex()));
        const duration = document.getElementById(this.GetFullscreenDurationId(cur.GetIndex()));
        if(!video || !slider || !position || !duration)
            return;
        if(Number.isFinite(video.duration) && video.duration > 0)
        {
            slider.value = ((video.currentTime * 100) / video.duration).toString();
            duration.textContent = video.duration < 3600 ? GetTimeString(video.duration).substring(3) : GetTimeString(video.duration);
        }
        position.textContent = Number.isFinite(video.currentTime)
            ? (video.currentTime < 3600 ? GetTimeString(video.currentTime).substring(3) : GetTimeString(video.currentTime))
            : "00:00";
    }
    protected InputFullscreenSlider(cur: IMediaObject, slider: HTMLInputElement): void
    {
        const video = document.getElementById(this.GetVideoId(cur.GetIndex())) as HTMLVideoElement | null;
        if(video && Number.isFinite(video.duration) && video.duration > 0)
            video.currentTime = (video.duration * Number(slider.value)) / 100;
        this.UpdateFullscreenTimeline(cur);
        this.ShowFullscreenControls(cur);
    }
    private InitializeScrollingText(current: IMediaObject): void
    {
        const type = current.GetType();
        if(!["Music", "Video", "Radio", "Photo", "TV"].includes(type))
            return;
        if(!this.scrollingObserver)
            this.scrollingObserver = new ResizeObserver(entries => {
                for(const entry of entries)
                {
                    const field = entry.target.classList.contains("media-scrolling-content")
                        ? entry.target.parentElement : entry.target as HTMLElement;
                    const content = field?.firstElementChild as HTMLElement | null;
                    if(!field || !content)
                        continue;
                    const distance = Math.max(0, content.scrollWidth - field.clientWidth);
                    field.classList.toggle("media-text-overflow", distance > 0);
                    field.style.setProperty("--media-text-scroll-distance", "-" + distance + "px");
                    field.style.setProperty("--media-text-scroll-duration", Math.max(6, distance / 30 + 2) + "s");
                }
            });
        for(const field of this.scrollingFields)
        {
            if(!field.isConnected)
            {
                this.scrollingObserver.unobserve(field);
                if(field.firstElementChild)
                    this.scrollingObserver.unobserve(field.firstElementChild);
                this.scrollingFields.delete(field);
            }
        }
        const view = document.getElementById(this.GetControlViewId(current.GetIndex()));
        const selector = type === "Music" ? ".media-title, .media-artist, .media-album" : ".media-title";
        view?.querySelectorAll<HTMLElement>(selector).forEach(field => {
            if(this.scrollingFields.has(field))
                return;
            const content = document.createElement("span");
            content.className = "media-scrolling-content";
            content.append(...Array.from(field.childNodes));
            field.append(content);
            field.classList.add("media-scrolling-text");
            field.title = field.textContent || "";
            this.scrollingFields.add(field);
            this.scrollingObserver?.observe(field);
            this.scrollingObserver?.observe(content);
        });
    }
    protected internalInitializeVieWControls(cur:IMediaObject): boolean
    {
        var Index:number = cur.GetIndex();
        this.displayButton(this.GetStartButtonId(Index));                 
        this.hideButton(this.GetStopButtonId(Index));                 
        this.hideButton(this.GetPauseButtonId(Index));                 
        this.hideButton(this.GetPlayButtonId(Index));                 
        this.hideButton(this.GetLoadingButtonId(Index));
        this.hideButton(this.GetFullscreenLoadingButtonId(Index));
        this.hideButton(this.GetMuteButtonId(Index));                 
        this.hideButton(this.GetUnmuteButtonId(Index));                 
        /* Update Loop button status */
        this.UpdateLoopButton(cur);
        /* Update Favorite button status */
        this.UpdateFavoriteButton(cur);
        /* Reinitialize document title */
        this.GetMediaManager()?.AddDocumentTitle("");
        this.InitializeScrollingText(cur);
        return true;
    }

    public VolumeUpMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.GetMediaManager()?.SetPlaybackMode(MediaPlaybackMode.NoLoop);
        if (typeof(Storage) !== "undefined") 
            localStorage.setItem("mediawebapp-mode","noloop");

        v.UpdateAllLoopButtons(mo);

        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){
            if(audio.muted == true)
                audio.muted = false;
            if(audio.volume<= 0.8)                            
                audio.volume += 0.2;
            else 
                audio.volume = 1;
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                if(video.muted == true)
                    video.muted = false;
                if(video.volume<= 0.8)                            
                    video.volume += 0.2;
                else 
                    video.volume = 1;
            }
        }

    }
    public VolumeDownMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){
            if(audio.muted == true)
                audio.muted = false;
            if(audio.volume>= 0.2)                            
                audio.volume -= 0.2;
            else 
                audio.volume = 0;
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                if(video.muted == true)
                    video.muted = false;
                if(video.volume>= 0.2)                            
                    video.volume -= 0.2;
                else 
                    video.volume = 0;
            }
        }
    }



    public EventPlayingMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var control = <HTMLButtonElement>document.getElementById(v.GetStartButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control))
            control.style.display = "none";
        control = <HTMLButtonElement>document.getElementById(v.GetStopButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.style.display = "block";
            control.disabled = false;
        }
        control = <HTMLButtonElement>document.getElementById(v.GetPauseButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = false;
            control.style.display = "block";
        }
        control = <HTMLButtonElement>document.getElementById(v.GetPlayButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = true;
            control.style.display = "block";
        }
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (audio.muted == true) {
                control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
                control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
            }
            else {
                control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
                control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
        }
        else {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                if (video.muted == true) {
                    control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = true;
                        control.style.display = "none";
                    }
                    control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = false;
                        control.style.display = "block";
                    }
                }
                else {
                    control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = false;
                        control.style.display = "block";
                    }
                    control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = true;
                        control.style.display = "none";
                    }
                }
            }    

        }
        control = <HTMLButtonElement>document.getElementById(v.GetVolumeUpButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = false;
            control.style.display = "block";
        }
        control = <HTMLButtonElement>document.getElementById(v.GetVolumeDownButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = false;
            control.style.display = "block";
        }
        if(!isNullOrUndefinedOrEmpty(mo.GetTitle()) &&
        !isNullOrUndefinedOrEmpty(mo.GetTrack()) &&
        !isNullOrUndefinedOrEmpty(mo.GetAlbum()) &&
        !isNullOrUndefinedOrEmpty(mo.GetArtist()))
            v.GetMediaManager()?.AddDocumentTitle( GetCurrentString(": ")+ mo.GetTrack()  + "-'" + mo.GetTitle() + GetCurrentString("'-'") +  mo.GetAlbum() +GetCurrentString("'-'")  + mo.GetArtist() +GetCurrentString("'"));
        else
        {
            if(!isNullOrUndefinedOrEmpty(mo.GetTitle()))
                v.GetMediaManager()?.AddDocumentTitle( GetCurrentString(": '") + mo.GetTitle()+GetCurrentString("'")  );
        }
    }
    public EventPlayMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var control = <HTMLButtonElement>document.getElementById(v.GetPlayButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = true;
            control.style.display = "none";
        }
        var control = <HTMLButtonElement>document.getElementById(v.GetPauseButtonId(mo.GetIndex()));
        if (!isNullOrUndefined(control)) {
            control.disabled = false;
            control.style.display = "block";
        }             

    }
    public EventPauseMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (audio.currentTime != 0) {
                var control = <HTMLButtonElement>document.getElementById(v.GetPlayButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
                var control = <HTMLButtonElement>document.getElementById(v.GetPauseButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }            
        } 
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                if (video.currentTime != 0) {
                    var control = <HTMLButtonElement>document.getElementById(v.GetPlayButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = false;
                        control.style.display = "block";
                    }
                    var control = <HTMLButtonElement>document.getElementById(v.GetPauseButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = true;
                        control.style.display = "none";
                    }
                }            
            } 
    
        }   
    }
    public EventVolumeChangeMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (audio.muted == true) {
                var control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
                control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
            }
            else {
                var control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
                control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
            if (audio.volume == 1) {
                control = <HTMLButtonElement>document.getElementById(v.GetVolumeUpButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "block";
                }

            }
            else {
                control = <HTMLButtonElement>document.getElementById(v.GetVolumeUpButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
            }

            if (audio.volume == 0) {
                control = <HTMLButtonElement>document.getElementById(v.GetVolumeDownButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = true;
                    control.style.display = "none";
                }
            }
            else {
                control = <HTMLButtonElement>document.getElementById(v.GetVolumeDownButtonId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    control.disabled = false;
                    control.style.display = "block";
                }
            }
        }
        else{
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                if (video.muted == true) {
                    var control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = true;
                        control.style.display = "none";
                    }
                    control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = false;
                        control.style.display = "block";
                    }
                }
                else {
                    var control = <HTMLButtonElement>document.getElementById(v.GetMuteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = false;
                        control.style.display = "block";
                    }
                    control = <HTMLButtonElement>document.getElementById(v.GetUnmuteButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = true;
                        control.style.display = "none";
                    }
                }
                if (video.volume == 1) {
                    control = <HTMLButtonElement>document.getElementById(v.GetVolumeUpButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = true;
                        control.style.display = "block";
                    }
    
                }
                else {
                    control = <HTMLButtonElement>document.getElementById(v.GetVolumeUpButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = false;
                        control.style.display = "block";
                    }
                }
    
                if (video.volume == 0) {
                    control = <HTMLButtonElement>document.getElementById(v.GetVolumeDownButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = true;
                        control.style.display = "none";
                    }
                }
                else {
                    control = <HTMLButtonElement>document.getElementById(v.GetVolumeDownButtonId(mo.GetIndex()));
                    if (!isNullOrUndefined(control)) {
                        control.disabled = false;
                        control.style.display = "block";
                    }
                }
            }
    
        }
        
    }
    public EventTimeUpdateMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            var control = <HTMLElement>document.getElementById(v.GetPositionId(mo.GetIndex()));
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
            control = <HTMLElement>document.getElementById(v.GetDurationId(mo.GetIndex()));
            if (!isNullOrUndefined(control)) {
                if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && audio.duration != Infinity)
                    control.innerHTML = audio.duration < 3600 ? GetTimeString(audio.duration).substring(3) : GetTimeString(audio.duration);
                else
                    control.innerHTML = "00:00";
            }
            var slider = <HTMLInputElement>document.getElementById(v.GetSliderId(mo.GetIndex()));
            if (!isNullOrUndefined(slider)) {
                if (!isNullOrUndefined(audio.duration) && !isNaN(audio.duration) && audio.duration != Infinity) {
                    slider.value = ((audio.currentTime * 100) / audio.duration).toString();
                }
            }
        }
        else{
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                var control = <HTMLElement>document.getElementById(v.GetPositionId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    if (!isNullOrUndefined(video.duration) && !isNaN(video.duration) && video.duration != Infinity)
                        control.innerHTML = video.currentTime < 3600 ? GetTimeString(video.currentTime).substring(3) : GetTimeString(video.currentTime);
                    else {
                        if (!isNullOrUndefined(video.currentTime) && !isNaN(video.currentTime)) {
                            if (isNaN(video.duration)) {
                                if (mo.GetType() == "TV")
                                    control.innerHTML = GetTimeString(video.currentTime);
                                else
                                    control.innerHTML = video.currentTime < 3600 ? GetTimeString(video.currentTime).substring(3) : GetTimeString(video.currentTime);
                            }
                            else
                                control.innerHTML = GetTimeString(video.currentTime);
                        }
                    }
                }
                control = <HTMLElement>document.getElementById(v.GetDurationId(mo.GetIndex()));
                if (!isNullOrUndefined(control)) {
                    if (!isNullOrUndefined(video.duration) && !isNaN(video.duration) && video.duration != Infinity)
                        control.innerHTML = video.duration < 3600 ? GetTimeString(video.duration).substring(3) : GetTimeString(video.duration);
                    else
                        control.innerHTML = "00:00";
                }
                var slider = <HTMLInputElement>document.getElementById(v.GetSliderId(mo.GetIndex()));
                if (!isNullOrUndefined(slider)) {
                    if (!isNullOrUndefined(video.duration) && !isNaN(video.duration) && video.duration != Infinity) {
                        slider.value = ((video.currentTime * 100) / video.duration).toString();
                    }
                }
            }         
    

        }         
    }
    public EventEndedMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.NoLoop) {
                audio.currentTime = 0;
                audio.pause();
                return;
            }

            if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.Loop) {
                audio.currentTime = 0;
                PlayMediaElement(audio, v);
                return;
            }
            if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.PlaylistLoop) {
                var parent =  mo.GetParent();
                if (parent) {
                    var n = mo.GetIndex() + 1;
                    if (n >= parent.GetChildrenLength())
                        n = 0;
                    let co = parent.GetChildWithIndex(n)
                    if(co){
                        v.MakeViewControlVisible(co);
                        v.StartMedia(co)
                    }
                    return;
                }
            }
            v.GetMediaManager()?.AddDocumentTitle("");
        }        
        else {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if (!isNullOrUndefined(video)) {
                if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.NoLoop) {
                    video.currentTime = 0;
                    video.pause();
                    var videobackground = <HTMLAudioElement>document.getElementById(v.GetVideoBackgroundId(mo.GetIndex()));
                    if(!isNullOrUndefined(videobackground)){                            
                        videobackground.style.visibility = 'hidden';                         
                    }    
                    return;
                }
    
                if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.Loop) {
                    video.currentTime = 0;
                    PlayMediaElement(video, v);
                    return;
                }
                if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.PlaylistLoop) {
                    var parent =  mo.GetParent();
                    if(parent){
                        if (!isNullOrUndefined(parent)) {
                            var n = mo.GetIndex() + 1;
                            if (n >= parent.GetChildrenLength())
                                n = 0;
                            let co = parent.GetChildWithIndex(n);
                            if(co) {
                                v.MakeViewControlVisible(co);
                                v.StartMedia( co)
                            }
                            return;
                        }
                    }
                }
                v.GetMediaManager()?.AddDocumentTitle("");
            }        
    
        }
    }

    public InputSliderMedia (slider: any,mo: IMediaObject, v:IMediaView): void
    {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){
            
            if(!isNullOrUndefined(audio.duration)&&!isNaN(audio.duration)&&audio.duration!=Infinity)
            if((slider.value>=0)&&(slider.value<=100))
            {
                audio.currentTime = (audio.duration*slider.value)/100;
            }
            var control = <HTMLElement>document.getElementById(v.GetPositionId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
            {
                if(!isNullOrUndefined(audio.duration)&&!isNaN(audio.duration)&&audio.duration!=Infinity)
                    control.innerHTML = audio.duration<3600? GetTimeString(audio.currentTime).substring(3):GetTimeString(audio.currentTime);
                else
                {
                    if(!isNullOrUndefined(audio.currentTime)&&!isNaN(audio.currentTime))
                        control.innerHTML = audio.currentTime<3600? GetTimeString(audio.currentTime).substring(3):GetTimeString(audio.currentTime);
                }
            } 
            control = <HTMLElement>document.getElementById(v.GetDurationId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
            {
                if(!isNullOrUndefined(audio.duration)&&!isNaN(audio.duration)&&audio.duration!=Infinity)
                    control.innerHTML = audio.duration<3600? GetTimeString(audio.duration).substring(3):GetTimeString(audio.duration);
                else
                    control.innerHTML = "00:00";
            } 

        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){
                if(!isNullOrUndefined(video.duration)&&!isNaN(video.duration)&&video.duration!=Infinity)
                if((slider.value>=0)&&(slider.value<=100))
                {
                    //video.pause();
                    video.currentTime = (video.duration*slider.value)/100;
                    //video.play();
                }
            }

            var control = <HTMLElement>document.getElementById(v.GetPositionId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
            {
                if(!isNullOrUndefined(video.duration)&&!isNaN(video.duration)&&video.duration!=Infinity)
                    control.innerHTML = video.duration<3600? GetTimeString(video.currentTime).substring(3):GetTimeString(video.currentTime);
                else
                {
                    if(!isNullOrUndefined(video.currentTime)&&!isNaN(video.currentTime))
                        control.innerHTML = video.currentTime<3600? GetTimeString(video.currentTime).substring(3):GetTimeString(video.currentTime);
                }
            } 
            control = <HTMLElement>document.getElementById(v.GetDurationId(mo.GetIndex()));
            if(!isNullOrUndefined(control))
            {
                if(!isNullOrUndefined(video.duration)&&!isNaN(video.duration)&&video.duration!=Infinity)
                    control.innerHTML = video.duration<3600? GetTimeString(video.duration).substring(3):GetTimeString(video.duration);
                else
                    control.innerHTML = "00:00";
            } 
        }
    }

    public registerEvent(event: string, id: string, mo: IMediaObject, callback: (control: any, o: IMediaObject, v:IMediaView) => any) {
        var button = <HTMLElement>document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.addEventListener(event, (function (view: IMediaView, object: IMediaObject) {
                return function () {
                    callback(this, object, view);
                };
            })(this, mo), false);
        }
    }
    public displayButton(id: string) {
        var button = <HTMLButtonElement>document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.disabled = false;
            button.style.display = "block";
        }
    }
    public hideButton(id: string) {
        var button = <HTMLButtonElement>document.getElementById(id);
        if (!isNullOrUndefined(button)) {
            button.style.display = "none";
        }
    }   
    public DisplayNextButton(cur: IMediaObject):boolean
    {
        let mo = cur.GetParent();
        if(mo){
            if((this.GetMediaManager()?.GetPaginationIndex()+this.GetMediaManager()?.GetPaginationSize())<mo.GetChildrenLength()){
                if(cur.GetIndex()==(this.GetMediaManager()?.GetPaginationIndex()+this.GetMediaManager()?.GetPaginationSize()-1))
                    return true;
            }
        }
        return false;
    }
    public DisplayPreviousButton(cur: IMediaObject):boolean
    {
        if(this.GetMediaManager()?.GetPaginationIndex()!==0){
            if(cur.GetIndex()==this.GetMediaManager()?.GetPaginationIndex())
                return true;
        }
        return false;        
    }
 
}
