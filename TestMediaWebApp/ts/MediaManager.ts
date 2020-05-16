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
    SetPlaybackMode(value: MediaPlaybackMode) { this._playbackMode = value;
        GlobalVars.SetGlobalPlaybackLoop(value);    
    }

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
        var newParent = newPointer;
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
        this.RenderView(newPointer,true);
        this.MakeViewControlVisible(newParent);     
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
        this.RenderView(newPointer,true);
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
    public NavigateToPage(cur: IMediaObject)  {
        if(isNullOrUndefined(cur)){
            return;
        }
        var pagesize:number =  this.GetPaginationSize();
        var parent:IMediaObject = cur.GetParent();
        if((pagesize > 0)&&(!isNullOrUndefined(parent))){
            var q:number = Math.floor(cur.GetIndex()/pagesize);
            var r:number = cur.GetIndex() % pagesize;
            var newPointer:IMediaObject = parent.GetChildWithIndex(q*pagesize);
            if(isNullOrUndefined(newPointer))
                return;
            this.SetCurrentMediaObject(newPointer);
            this.RenderView(newPointer);
        }
        return ;
    }
    public RenderView(cur: IMediaObject, bMakeVisible: boolean = false):boolean  {
        var view:IMediaView = this.CreateMediaView(cur);
        if(!isNullOrUndefined(view))
        {
            view.CreateChildView(cur);
            if(bMakeVisible==true)
                view.MakeViewControlVisible(cur);
            return true;
        }
        return false;
    }
    public MakeViewControlVisible(cur: IMediaObject):boolean  {
        var view:IMediaView = this.CreateMediaView(cur);
        if(!isNullOrUndefined(view))
        {
            view.MakeViewControlVisible(cur);
            return true;
        }
        return false;
    }
    public RenderMediaView():boolean  {
        this.HideAlertPopup();
        return this.RenderView(this.GetCurrentMediaObject());
    }

    public ShowAlertPopupError(msg:string) {
        var div:HTMLDivElement = <HTMLDivElement>document.getElementById('alertbox');
        if(!isNullOrUndefined(div)){
            div.classList.remove("media-alert-error");
            div.classList.remove("media-alert-information");
            div.classList.add("media-alert-error");
            var label:HTMLLabelElement = <HTMLLabelElement>document.getElementById('alertmessage');
            if(!isNullOrUndefined(label)){
                label.innerHTML = msg;
                $("#alertbox").fadeTo(2000, 500).animate({opacity: 0}, 1000).hide('slow');
            }        
        }
    }
    public ShowAlertPopupInformation(msg:string) {
        var div:HTMLDivElement = <HTMLDivElement>document.getElementById('alertbox');
        if(!isNullOrUndefined(div)){
            div.classList.remove("media-alert-error");
            div.classList.remove("media-alert-information");
            div.classList.add("media-alert-information");
            var label:HTMLLabelElement = <HTMLLabelElement>document.getElementById('alertmessage');
            if(!isNullOrUndefined(label)){
                label.innerHTML = msg;
                $("#alertbox").fadeTo(2000, 500).animate({opacity: 0}, 1000).hide('slow');
            }
        }        
    }
    public HideAlertPopup() {
        $("#alertbox").hide();
    }
    private DisplayButton(id:string,text:string){
        var button  = <HTMLButtonElement>document.getElementById(id);
        if(!isNullOrUndefined(button)){
            button.style.display = "block";
            button.innerHTML = text;
        }
    }
    private HideButton(id:string){
        var button  = <HTMLButtonElement>document.getElementById(id);
        if(!isNullOrUndefined(button)){
            button.style.display = "none";
            button.innerHTML = "";
        }
    }
    private DisplayBox(id:string){
        (<any>$('#'+id)).modal('show');
        /*
        var div  = <HTMLDivElement>document.getElementById(id);
        if(!isNullOrUndefined(div)){
            div.style.display = "block";
        }
        */
    }
    private HideBox(id:string){
        (<any>$('#'+id)).modal('hide');
        /*
        var div  = <HTMLDivElement>document.getElementById(id);
        if(!isNullOrUndefined(div)){
            div.style.display = "none";
        }*/
    }
    public ShowModalBox(title:string, msg:string, type:MediaModelBoxType):boolean {
        let result:boolean = false;
        var div:HTMLDivElement = <HTMLDivElement>document.getElementById('modalbox');
        if(!isNullOrUndefined(div)){
            this.DisplayBox('modalbox');
            var label:HTMLLabelElement = <HTMLLabelElement>document.getElementById('modaltitle');
            if(!isNullOrUndefined(label)){
                label.innerHTML = title;
            }
            label = <HTMLLabelElement>document.getElementById('modalmessage');
            if(!isNullOrUndefined(label)){
                label.innerHTML = msg;
            }
            switch(type)
            {
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
                    this.DisplayButton('modalok',GetCurrentString('Ok'));
                break;
                case MediaModelBoxType.OkCancel:
                    this.HideButton('modalyes');
                    this.HideButton('modalno');
                    this.DisplayButton('modalok',GetCurrentString('Ok'));
                    this.DisplayButton('modalcancel',GetCurrentString('Cancel'));
                break;
                case MediaModelBoxType.YesNo:
                    this.HideButton('modalok');
                    this.HideButton('modalcancel');
                    this.DisplayButton('modalyes',GetCurrentString('yes'));
                    this.DisplayButton('modalno',GetCurrentString('No'));
                break;
                case MediaModelBoxType.YesNoCancel:
                    this.HideButton('modalok');
                    this.DisplayButton('modalyes',GetCurrentString('Yes'));
                    this.DisplayButton('modalno',GetCurrentString('No'));
                    this.DisplayButton('modalcancel',GetCurrentString('Cancel'));
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
    public HideModalBox() {
//        $("#modalbox").modal('hide');
        this.HideBox('modalbox');

    }

    async ShowModalBoxAsync (title:string, msg:string, type:MediaModelBoxType):Promise<boolean> {
        return new Promise<boolean>( resolve => {
            let result:boolean = false;

            try
            {
                var div:HTMLDivElement = <HTMLDivElement>document.getElementById('modalbox');
                if(!isNullOrUndefined(div)){
                    this.DisplayBox('modalbox');
                    var label:HTMLLabelElement = <HTMLLabelElement>document.getElementById('modaltitle');
                    if(!isNullOrUndefined(label)){
                        label.innerHTML = title;
                    }
                    label = <HTMLLabelElement>document.getElementById('modalmessage');
                    if(!isNullOrUndefined(label)){
                        label.innerHTML = msg;
                    }
                    switch(type)
                    {
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
                            this.DisplayButton('modalok',GetCurrentString('Ok'));
                        break;
                        case MediaModelBoxType.OkCancel:
                            this.HideButton('modalyes');
                            this.HideButton('modalno');
                            this.DisplayButton('modalok',GetCurrentString('Ok'));
                            this.DisplayButton('modalcancel',GetCurrentString('Cancel'));
                        break;
                        case MediaModelBoxType.YesNo:
                            this.HideButton('modalok');
                            this.HideButton('modalcancel');
                            this.DisplayButton('modalyes',GetCurrentString('yes'));
                            this.DisplayButton('modalno',GetCurrentString('No'));
                        break;
                        case MediaModelBoxType.YesNoCancel:
                            this.HideButton('modalok');
                            this.DisplayButton('modalyes',GetCurrentString('Yes'));
                            this.DisplayButton('modalno',GetCurrentString('No'));
                            this.DisplayButton('modalcancel',GetCurrentString('Cancel'));
                        break;
                        default:
                            this.HideButton('modalok');
                            this.HideButton('modalcancel');
                            this.HideButton('modalyes');
                            this.HideButton('modalno');
                        break;
                    }
                    var button = <HTMLElement>document.getElementById('modalok');
                    if (!isNullOrUndefined(button)) {
                        button.addEventListener('click', (function () {
                            return function () {
                                resolve(true);
                            };
                        })(), false);
                    }
                    button = <HTMLElement>document.getElementById('modalcancel');
                    if (!isNullOrUndefined(button)) {
                        button.addEventListener('click', (function () {
                            return function () {
                                resolve(false);
                            };
                        })(), false);
                    }
                    button = <HTMLElement>document.getElementById('modalyes');
                    if (!isNullOrUndefined(button)) {
                        button.addEventListener('click', (function () {
                            return function () {
                                resolve(true);
                            };
                        })(), false);
                    }
                    button = <HTMLElement>document.getElementById('modalno');
                    if (!isNullOrUndefined(button)) {
                        button.addEventListener('click', (function () {
                            return function () {
                                resolve(false);
                            };
                        })(), false);
                    }
                    button = <HTMLElement>document.getElementById('modalclose');
                    if (!isNullOrUndefined(button)) {
                        button.addEventListener('click', (function () {
                            return function () {
                                resolve(false);
                            };
                        })(), false);
                    }
                }
            }
            catch(error)
            {
                resolve(false);
            }        
        });
    }
}

