/*
import { isNullOrUndefined, GetCurrentString, GetTimeString, ActivateCarousel } from "./Common";
import {IMediaView, MediaPlaybackMode} from "./IMediaView";
import {IMediaObject} from "./IMediaObject";
*/
/**
 * Media view
 */

 class MediaManager implements IMediaManager {
    // Navigation attributes
    private  _id: string;
    private  _root: IMediaObject;
    private  _current: IMediaObject; 
    private  _stack:  Array<IMediaObject>;
    private  _currentViewParentObject: IMediaObject;
    private  _indexActiveMediaObject: number = -1;
    private  _playbackMode: MediaPlaybackMode = MediaPlaybackMode.NoLoop;
    private  _paginationSize: number = 0;
    private  _paginationIndex: number = 0;

    // Methods to get MediaView attributes
    GetId(): string { 
        return this._id;
    }
    GetRoot(): IMediaObject {
         return this._root; 
    }
    SetRoot(value: IMediaObject) { 
        this._root = value;
        if(isNullOrUndefined(this._current))
            this._current = value;
        MediaObject.CheckTree(this._root);
    }
    IsOneItemNavigation(): boolean { return (this._paginationSize == 1); }
    SetOneItemNavigation(value: boolean) { this._paginationSize = 1; }
    
    GetPlaybackMode(): MediaPlaybackMode { return this._playbackMode; }
    SetPlaybackMode(value: MediaPlaybackMode) { this._playbackMode = value; }

    GetCurrentMediaObject(): IMediaObject { return this._current; }
    SetCurrentMediaObject(value: IMediaObject) { this._current = value; }
    
    GetCurrentViewParentMediaObject(): IMediaObject { return this._currentViewParentObject; }
    SetCurrentViewParentMediaObject(value: IMediaObject) { this._currentViewParentObject = value; }
    
    GetIndexActiveMediaMediaObject(): number { return this._indexActiveMediaObject; }
    SetIndexActiveMediaMediaObject(value: number) { this._indexActiveMediaObject = value }

    public CreateMediaView(current: IMediaObject): IMediaView
    {
        var object:IMediaView = null;
        switch(current.GetType())
        {
            case "Music":
                object = new MusicView(current,this);
                break;
            case "Radio":
                object = new RadioView(current,this);
                break;
            case "Playlist":
                object = new PlaylistView(current,this);
                break;
            case "TV":
                object = new TVView(current,this);
                break;
            case "Photo":
                object = new PhotoView(current,this);
                break;
            case "Video":
                object = new VideoView(current,this);
                break;
            default:
                object = new MusicView(current,this);
                break;                                                                                        
        }
        return object;
    }


    constructor(id: string = "",paginationSize: number = 0, playbackMode: MediaPlaybackMode = MediaPlaybackMode.NoLoop){
        this._id = id;
        this._root = null;
        this._current = null; 
        this._stack = null;
        this._paginationSize = paginationSize;
        this._currentViewParentObject = null;
        this._indexActiveMediaObject = -1;
        this._playbackMode = playbackMode;
    }

    public static  CreateMediaManager(id: string = "", paginationSize: number = 0, playbackMode: MediaPlaybackMode = MediaPlaybackMode.NoLoop):IMediaManager 
    {
        return new MediaManager(id, paginationSize ,playbackMode);
    };


        // Pagination Method
    public SetPaginationSize(size:number)
    {
        this._paginationSize = size;
    }
    public GetPaginationSize():number
    {
        return this._paginationSize;
    }
    public SetPaginationIndex(index:number)
    {
        this._paginationIndex = index;
    }
    public GetPaginationIndex():number
    {
        return this._paginationIndex;
    }
    public NavigateToParent(cur: IMediaObject)  {
        var current = this.GetCurrentMediaObject();
        if(isNullOrUndefined(current)){
            return;
        }
        var newPointer = current.GetParent();
        if(isNullOrUndefined(newPointer))
            return;
        var pagesize:number =  this.GetPaginationSize();
        var parent:IMediaObject = newPointer.GetParent();
        if((pagesize > 0)&&(!isNullOrUndefined(parent))){
            var q:number = Math.floor(newPointer.GetIndex()/pagesize);
            var r:number = newPointer.GetIndex() % pagesize;
            newPointer = parent.GetChildWithIndex(q*pagesize);
            if(isNullOrUndefined(newPointer))
                return;
        }
        if(isNullOrUndefined(this._stack))
            this._stack = new Array<IMediaObject>();
        if(!isNullOrUndefined(this._stack))
            this._stack.pop();

        this.SetCurrentMediaObject(newPointer);
        this.RenderView(newPointer);     
        // update browser history
        //history.back();
   
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
        this.RenderView(newPointer);
        // update browser history
        //history.pushState(null, null, window.location.pathname);

        return ;
    }
    public NavigateToPrevious(cur: IMediaObject)  {
        var current = this.GetCurrentMediaObject();
        if(isNullOrUndefined(current)){
            return;
        }
        var startPage:IMediaObject = current.GetParent().GetChildWithIndex(this.GetPaginationIndex());
        if(!isNullOrUndefined(startPage)){ 
            var newPointer:IMediaObject = startPage.GetPreviousPage(this.GetPaginationSize());
            if(isNullOrUndefined(newPointer))
                return;
            this.SetCurrentMediaObject(newPointer);
            this.RenderView(newPointer);
        }
        return ;
    }
    public NavigateToNext(cur: IMediaObject)  {
        var current = this.GetCurrentMediaObject();
        if(isNullOrUndefined(current)){
            return;
        }
        var startPage:IMediaObject = current.GetParent().GetChildWithIndex(this.GetPaginationIndex());
        if(!isNullOrUndefined(startPage)){ 
            var newPointer:IMediaObject = startPage.GetNextPage(this.GetPaginationSize());
            if(isNullOrUndefined(newPointer))
                return;
            this.SetCurrentMediaObject(newPointer);
            this.RenderView(newPointer);
        }
        return ;
    }

    public RenderView(cur: IMediaObject):boolean  {
        var view:IMediaView = this.CreateMediaView(cur);
        if(!isNullOrUndefined(view))
        {
            view.CreateChildView(cur);
            return true;
        }
        return false;
    }
    public RenderMediaView():boolean  {
        return this.RenderView(this.GetCurrentMediaObject());
    }


}
