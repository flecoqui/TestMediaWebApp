/*
import { isNullOrUndefined, GetCurrentString, GetTimeString, ActivateCarousel } from "./Common";
import {IMediaView, MediaPlaybackMode} from "./IMediaView";
import {IMediaObject} from "./IMediaObject";
*/
/**
 * Media view
 */
 class MediaView implements IMediaView {
    // Navigation attributes
    private  _id: string;
    private  _root: IMediaObject;
    private  _current: IMediaObject; 
    private  _stack:  Array<IMediaObject>;
    private  _oneItemNavigation:  boolean;
    private  _currentViewParentObject: IMediaObject;
    private  _indexActiveMediaObject: number = -1;
    private  _playbackMode: MediaPlaybackMode = MediaPlaybackMode.NoLoop;



    // Methods to get MediaView attributes
    GetId(): string { return this._id;}
    GetRoot(): IMediaObject { return this._root; }
    SetRoot(value: IMediaObject) { 
        this._root = value;
        if(isNullOrUndefined(this._current))
            this._current = value;
        this.CheckTree(this._root);
    }
    IsOneItemNavigation(): boolean { return this._oneItemNavigation; }
    SetOneItemNavigation(value: boolean) { this._oneItemNavigation = value; }
    GetPlaybackMode(): MediaPlaybackMode { return this._playbackMode; }
    SetPlaybackMode(value: MediaPlaybackMode) { this._playbackMode = value; }

    GetCurrentMediaObject(): IMediaObject { return this._current; }
    SetCurrentMediaObject(value: IMediaObject) { this._current = value; }
    GetCurrentViewParentMediaObject(): IMediaObject { return this._currentViewParentObject; }
    SetCurrentViewParentMediaObject(value: IMediaObject) { this._currentViewParentObject = value; }
    GetIndexActiveMediaMediaObject(): number { return this._indexActiveMediaObject; }
    SetIndexActiveMediaMediaObject(value: number) { this._indexActiveMediaObject = value }


    // prefix for HTML Element id
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
    private  _audioId: string = "_audioId"; 
    private  _videoId: string = "_videoId"; 
    private  _audioSourceId: string = "_audioSourceId"; 
    private  _videoSourceId: string = "_videoSourceId"; 
    private  _durationId: string = "_durationId"; 
    private  _positionId: string = "_positionId"; 
    private  _sliderId: string = "_sliderId"; 


    constructor(id: string = "",oneItemNavigation: boolean = false, playbackMode: MediaPlaybackMode = MediaPlaybackMode.NoLoop){
        this._id = id;
        this._root = null;
        this._current = null; 
        this._stack = null;
        this._oneItemNavigation = oneItemNavigation;
        this._currentViewParentObject = null;
        this._indexActiveMediaObject = -1;
        this._playbackMode = playbackMode;
    }

    public static  CreateViewManager(id: string = "", oneItemNavigation: boolean = false, playbackMode: MediaPlaybackMode = MediaPlaybackMode.NoLoop):IMediaView 
    {
        return new MediaView(id, oneItemNavigation,playbackMode);
    };

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
    public  GetAudioId(index: number): string {
        return this._audioId + index;
    }
    public  GetVideoId(index: number): string {
        return this._videoId + index;
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
    // View Methods
    public CreateView(current: IMediaObject): string
    {
        return "";
    }
    public CreatePreview(current: IMediaObject): string
    {
        return "";
    }

    public RenderView():boolean
    {
        return this.InternalRenderMedia();
    }
    public NavigateToParent(cur: IMediaObject)  {
        var current = this.GetCurrentMediaObject();
        if(isNullOrUndefined(current)){
            return;
        }
        var newPointer = current.GetParent();
        if(isNullOrUndefined(newPointer))
            return;
        
        if(isNullOrUndefined(this._stack))
            this._stack = new Array<IMediaObject>();
        if(!isNullOrUndefined(this._stack))
            this._stack.pop();

        this.SetCurrentMediaObject(newPointer);
        this.RenderView();        
        return;
    }
    public NavigateToChild(cur: IMediaObject)  {
        var current = cur;
        if(isNullOrUndefined(current)){
            return;
        }
        var newPointer:IMediaObject = current.GetChildWithIndex(0);
        if(isNullOrUndefined(newPointer))
            return;
        // Add parent into the stack
        if(isNullOrUndefined(this._stack))
            this._stack = new Array<IMediaObject>()
        if(!isNullOrUndefined(this._stack))
            this._stack.push(current)
        this.SetCurrentMediaObject(newPointer);
        this.RenderView();
        return ;
    }
    public NavigateToPrevious(cur: IMediaObject)  {
        var current = this.GetCurrentMediaObject();
        if(isNullOrUndefined(current)){
            return;
        }
        var newPointer:IMediaObject = current.GetPrevious();
        if(isNullOrUndefined(newPointer))
            return;
        this.SetCurrentMediaObject(newPointer);
        this.RenderView();
        return ;
    }
    public NavigateToNext(cur: IMediaObject)  {
        var current = this.GetCurrentMediaObject();
        if(isNullOrUndefined(current)){
            return;
        }
        var newPointer:IMediaObject = current.GetNext();
        if(isNullOrUndefined(newPointer))
            return;
        this.SetCurrentMediaObject(newPointer);
        this.RenderView();
        return ;
    }

    public CheckTree(cur: IMediaObject): void
    {
        if(!isNullOrUndefined(cur)){
            if(cur.HasChild())
            {
                for(let i = 0; i < cur.GetChildrenLength() ; i++)
                {
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

    public NavigateToChildEvent(control: any,mo: IMediaObject, v:IMediaView): void {
        if(!isNullOrUndefined(v))
            v.NavigateToChild(mo);
    }
    public NavigateToParentEvent(control: any,mo: IMediaObject, v:IMediaView): void {
        if(!isNullOrUndefined(v))
            v.NavigateToParent(mo);
    }
    public NavigateToNextEvent(control: any,mo: IMediaObject, v:IMediaView): void {
        if(!isNullOrUndefined(v))
            v.NavigateToNext(mo);
    }
    public NavigateToPreviousEvent(control: any,mo: IMediaObject, v:IMediaView): void {
        if(!isNullOrUndefined(v))
            v.NavigateToPrevious(mo);
    }
    public EventStopMedia(button: any,mo: IMediaObject, v:IMediaView): void {
        v.StopMedia(mo);    
    }
    public StopMedia(mo: IMediaObject): void {
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
            }
        }
        var control = <HTMLButtonElement>document.getElementById(this.GetStartButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "block"
            control.disabled = false;
        }                            
        var control = <HTMLButtonElement>document.getElementById(this.GetStopButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        var control = <HTMLButtonElement>document.getElementById(this.GetPlayButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        var control = <HTMLButtonElement>document.getElementById(this.GetPauseButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        var control = <HTMLButtonElement>document.getElementById(this.GetMuteButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        var control = <HTMLButtonElement>document.getElementById(this.GetVolumeUpButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                            
        var control = <HTMLButtonElement>document.getElementById(this.GetVolumeDownButtonId(mo.GetIndex()));
        if(!isNullOrUndefined(control)){
            control.style.display = "none"
            control.disabled = true;
        }                   
        this.SetIndexActiveMediaMediaObject(-1);
    
    }
    public StartMedia(mo: IMediaObject): void {
        let parent: IMediaObject = mo.GetParent();
        if(this.GetIndexActiveMediaMediaObject() >= 0)
        {
            if(!isNullOrUndefined(parent)){
                let mostop: IMediaObject = parent.GetChildWithIndex(this.GetIndexActiveMediaMediaObject());
                if(!isNullOrUndefined(mostop)){
                    this.StopMedia(mostop); 
                }             
            }             
        }
        var audio = <HTMLAudioElement>document.getElementById(this.GetAudioId(mo.GetIndex()));
        if(!isNullOrUndefined(audio)){                            
            var source = <HTMLSourceElement>document.getElementById(this.GetAudioSourceId(mo.GetIndex()));
            if(!isNullOrUndefined(source)){                            
                source.src = mo.GetContentUrl();
                audio.load();
                audio.play();
            }
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(this.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                var source = <HTMLSourceElement>document.getElementById(this.GetVideoSourceId(mo.GetIndex()));
                if(!isNullOrUndefined(source)){                            
                    source.src = mo.GetContentUrl();
                    video.load();
                    video.play();
                }
            }
        }
        this.SetIndexActiveMediaMediaObject(mo.GetIndex());
    }

    public EventStartMedia(button: any,mo: IMediaObject, v:IMediaView): void {
        v.StartMedia(mo);
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
            audio.play();
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                video.play();
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
        let parent: IMediaObject = mo.GetParent();
        if(!isNullOrUndefined(parent))
        {
            for(var k = 0; k < parent.GetChildrenLength(); k++)
            {
                this.UpdateLoopButton(parent.GetChildWithIndex(k));
            }
        }
    }
    public  UpdateLoopButton (mo: IMediaObject): void
    {
        if(this.GetPlaybackMode() == MediaPlaybackMode.NoLoop)
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
        if(this.GetPlaybackMode() == MediaPlaybackMode.Loop)
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
        if(this.GetPlaybackMode() == MediaPlaybackMode.PlaylistLoop)
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
    public LoopMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.SetPlaybackMode(MediaPlaybackMode.Loop);
        if (typeof(Storage) !== "undefined") 
            localStorage.setItem("mediawebapp-mode","loop");

        v.UpdateAllLoopButtons(mo);
    }
    public PlaylistLoopMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.SetPlaybackMode(MediaPlaybackMode.PlaylistLoop);
        if (typeof(Storage) !== "undefined") 
            localStorage.setItem("mediawebapp-mode","playlistloop");

        v.UpdateAllLoopButtons(mo);
    }
    public NoLoopMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.SetPlaybackMode(MediaPlaybackMode.NoLoop);
        if (typeof(Storage) !== "undefined") 
            localStorage.setItem("mediawebapp-mode","noloop");

        v.UpdateAllLoopButtons(mo);
    }

    public VolumeUpMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.SetPlaybackMode(MediaPlaybackMode.NoLoop);
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
    }
    public EventEndedMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var audio = <HTMLAudioElement>document.getElementById(v.GetAudioId(mo.GetIndex()));
        if (!isNullOrUndefined(audio)) {
            if (v.GetPlaybackMode() == MediaPlaybackMode.NoLoop) {
                audio.currentTime = 0;
                audio.pause();
                return;
            }

            if (v.GetPlaybackMode() == MediaPlaybackMode.Loop) {
                audio.currentTime = 0;
                audio.play();
                return;
            }
            if (v.GetPlaybackMode() == MediaPlaybackMode.PlaylistLoop) {
                var parent =  mo.GetParent();
                if (!isNullOrUndefined(parent)) {
                    var n = mo.GetIndex() + 1;
                    if (n >= parent.GetChildrenLength())
                        n = 0;
                    v.StartMedia( parent.GetChildWithIndex(n))
                    return;
                }
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
        }
        else
        {
            var video = <HTMLAudioElement>document.getElementById(v.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){
                if(!isNullOrUndefined(video.duration)&&!isNaN(video.duration)&&video.duration!=Infinity)
                if((slider.value>=0)&&(slider.value<=100))
                {
                    video.currentTime = (video.duration*slider.value)/100;
                }
            }
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

    protected InternalRenderMedia (): boolean
    {
        var current = this.GetCurrentMediaObject();
        var parent = null;
        if(!isNullOrUndefined(current))
            parent  = current.GetParent();
        var div = <HTMLDivElement>document.getElementById(this.GetId());
        var button = null;
        if(isNullOrUndefined(div))
            return;
        if ((!isNullOrUndefined(parent)) && (this.IsOneItemNavigation() === false)) {
            div.innerHTML = "";
            this.SetCurrentViewParentMediaObject(parent);
            for(var i = 0; i < parent.GetChildrenLength(); i++)
            {
                var o = parent.GetChildWithIndex(i);
                div.innerHTML += this.CreateView(o);
            }
            for(var i = 0; i < parent.GetChildrenLength(); i++)
            {
                let Index: number = parent.GetChildWithIndex(i).GetIndex();
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
        else
        {
        
            if(!isNullOrUndefined(current))
            {
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
