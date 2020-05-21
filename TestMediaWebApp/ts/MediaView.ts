/*
import { isNullOrUndefined, GetCurrentString, GetTimeString, ActivateCarousel } from "./Common";
import {IMediaView, MediaPlaybackMode} from "./IMediaView";
import {IMediaObject} from "./IMediaObject";
*/
/**
 * Media view
 */


class MediaView implements IMediaView {
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

    private  _audioId: string = "_audioId"; 
    private  _videoId: string = "_videoId"; 
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
        let parent: IMediaObject = mo.GetParent();
        let muted:boolean = false;
        if(this.GetMediaManager()?.GetIndexActiveMediaMediaObject() >= 0)
        {
            if(!isNullOrUndefined(parent)){
                let mostop: IMediaObject = parent.GetChildWithIndex(this.GetMediaManager()?.GetIndexActiveMediaMediaObject());
                if(!isNullOrUndefined(mostop)){
                    var audio = <HTMLAudioElement>document.getElementById(this.GetAudioId(mostop.GetIndex()));
                    if(!isNullOrUndefined(audio))                            
                        muted = audio.muted;
                    else{
                        var video = <HTMLVideoElement>document.getElementById(this.GetAudioId(mostop.GetIndex()));
                        if(!isNullOrUndefined(video))                            
                            muted = video.muted;    
                    }
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
                audio.muted = muted;
            }
        }
        else
        {
            var video = <HTMLVideoElement>document.getElementById(this.GetVideoId(mo.GetIndex()));
            if(!isNullOrUndefined(video)){                            
                var source = <HTMLSourceElement>document.getElementById(this.GetVideoSourceId(mo.GetIndex()));
                if(!isNullOrUndefined(source)){                            
                    source.src = mo.GetContentUrl();
                    video.load();
                    video.play();
                    video.muted = muted;
                }
            }
        }
        this.GetMediaManager()?.SetIndexActiveMediaMediaObject(mo.GetIndex());
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
    }
    public PlaylistLoopMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.GetMediaManager()?.SetPlaybackMode(MediaPlaybackMode.PlaylistLoop);
        v.UpdateAllLoopButtons(mo);
    }
    public NoLoopMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        v.GetMediaManager()?.SetPlaybackMode(MediaPlaybackMode.NoLoop);
        v.UpdateAllLoopButtons(mo);
    }
    public AddFavoriteMedia (button: any,mo: IMediaObject, v:IMediaView): void
    {
        var currentplaylist:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var playlists:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();

        if(!isNullOrUndefinedOrEmpty(currentplaylist)&&!isNullOrUndefined(playlists)){
            var playlist:IMediaObject = playlists.GetChildWithName(currentplaylist);
            if(!isNullOrUndefined(playlist)){
                if(isNullOrUndefined(playlist.GetChildWithName(mo.GetName())))
                {

                    var object:IMediaObject = null;
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
        var playlists:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();

        if(mo.GetRoot().GetName()==playlists.GetName())
        {
            // If in Favorite Playlist remove the item from the list
            var parent:IMediaObject = mo.GetParent();
            if(!isNullOrUndefined(parent)){
                parent.RemoveChildWithIndex(mo.GetIndex());
                v.GetMediaManager()?.ShowAlertPopupInformation(GetCurrentString("Media <strong>")+ mo.GetName()+ GetCurrentString("</strong> removed from the favorite list <strong>")+parent.GetName() +"</strong>");
                if(parent.GetChildrenLength() > 0){
                    for(var i:number = 0; i < parent.GetChildrenLength(); i++)
                    {
                        // Reindex
                        parent.GetChildWithIndex(i).SetIndex(i);
                    }
                    // Remove the MediaObject from Storage
                    GlobalVars.SetGlobalFavoritePlaylists(mo.GetRoot());
                    v.GetMediaManager()?.NavigateToChild(parent,true);
//                    v.GetMediaManager()?.SaveNavigationState(parent.GetChildWithIndex(0));
                }
                else{
                    // Remove the MediaObject from Storage
                    GlobalVars.SetGlobalFavoritePlaylists(mo.GetRoot());
                    v.GetMediaManager()?.NavigateToChild(parent.GetParent(),true);
//                    v.GetMediaManager()?.SaveNavigationState(parent);
                }
            }
        }
        else
        {
            if(!isNullOrUndefinedOrEmpty(currentplaylist)&&!isNullOrUndefined(playlists)){
                var playlist:IMediaObject = playlists.GetChildWithName(currentplaylist);
                if(!isNullOrUndefined(playlist)){
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
    public IsFavoriteList (mo: IMediaObject): boolean
    {
        var playlists:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();

        if(mo.GetRoot().GetName()==playlists.GetName())
            return true;
        return false;
    }
    public IsFavoriteMedia (mo: IMediaObject): boolean
    {
        var currentplaylist:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var playlists:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();

        if(!isNullOrUndefinedOrEmpty(currentplaylist)&&!isNullOrUndefined(playlists)){
            var playlist:IMediaObject = playlists.GetChildWithName(currentplaylist);
            if(!isNullOrUndefined(playlist)){
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
        if ((!isNullOrUndefined(parent)) /*&& (this.IsOneItemNavigation() === false)*/) {
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
                var view:IMediaView = this.GetMediaManager().CreateMediaView(parent.GetChildWithIndex(i));
                if(!isNullOrUndefined(view)){
                    div.innerHTML += view.CreateView(parent.GetChildWithIndex(i))
                }
            }
            for(var i = min; i < max; i++)
            {
                this.RegisterViewEvents(parent.GetChildWithIndex(i));
                this.InitializeViewControls(parent.GetChildWithIndex(i));
            }
        }
        else
        {        
            // Display Media Object if no parent  
            if(!isNullOrUndefined(current))
            {
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
            div.scrollIntoView(true);
            div.scrollIntoView({  block: 'center' });
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


        this.registerEvent("playing", this.GetAudioId(Index), cur, this.EventPlayingMedia); 
        this.registerEvent("play", this.GetAudioId(Index), cur, this.EventPlayMedia); 
        this.registerEvent("pause", this.GetAudioId(Index), cur, this.EventPauseMedia); 
        this.registerEvent("volumechange", this.GetAudioId(Index), cur, this.EventVolumeChangeMedia); 
        this.registerEvent("timeupdate", this.GetAudioId(Index), cur, this.EventTimeUpdateMedia); 
        this.registerEvent("ended", this.GetAudioId(Index), cur, this.EventEndedMedia); 
        this.registerEvent("input", this.GetSliderId(Index), cur, this.InputSliderMedia);
        return true; 
    }
    protected internalInitializeVieWControls(cur:IMediaObject): boolean
    {
        var Index:number = cur.GetIndex();
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
        /* Reinitialize document title */
        this.GetMediaManager()?.AddDocumentTitle("");
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
            v.GetMediaManager()?.AddDocumentTitle( GetCurrentString(" playing ")+ mo.GetTrack()  + "- '" + mo.GetTitle() + GetCurrentString("' - album '") +  mo.GetAlbum() +GetCurrentString("' - artist '")  + mo.GetArtist() +GetCurrentString("'"));
        else
        {
            if(!isNullOrUndefinedOrEmpty(mo.GetTitle()))
                v.GetMediaManager()?.AddDocumentTitle( GetCurrentString(" playing ") + mo.GetTitle()  );
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
            if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.NoLoop) {
                audio.currentTime = 0;
                audio.pause();
                return;
            }

            if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.Loop) {
                audio.currentTime = 0;
                audio.play();
                return;
            }
            if (v.GetMediaManager()?.GetPlaybackMode() == MediaPlaybackMode.PlaylistLoop) {
                var parent =  mo.GetParent();
                if (!isNullOrUndefined(parent)) {
                    var n = mo.GetIndex() + 1;
                    if (n >= parent.GetChildrenLength())
                        n = 0;
                    v.MakeViewControlVisible(parent.GetChildWithIndex(n));
                    v.StartMedia( parent.GetChildWithIndex(n))
                    return;
                }
            }
            v.GetMediaManager()?.AddDocumentTitle("");
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
    public DisplayNextButton(cur: IMediaObject):boolean
    {
        if(!isNullOrUndefined(cur.GetParent())){
            if((this.GetMediaManager()?.GetPaginationIndex()+this.GetMediaManager()?.GetPaginationSize())<cur.GetParent().GetChildrenLength()){
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
