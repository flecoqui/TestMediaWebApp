/*
import { isNullOrUndefined, GetCurrentString, GetTimeString, ActivateCarousel } from "./Common";
import {IMediaView, MediaPlaybackMode} from "./IMediaView";
import {IMediaObject} from "./IMediaObject";
*/
/**
 * Media view
 */

 class MediaManager implements IMediaManager {
    // static attributes
    public static internalBack:boolean = false;
    public static lastURL:string;
    public static initialized:boolean = false;
    
    
    // Navigation attributes
    private  _id: string;
    private  _root: IMediaObject;
    private  _current: IMediaObject; 
    private  _stack:  Array<IMediaObject>;
    private  _indexActiveMediaObject: number = -1;
    private  _playbackMode: MediaPlaybackMode = MediaPlaybackMode.NoLoop;
    private  _paginationSize: number = 0;
    private  _paginationIndex: number = 0;
    private  _canClose: boolean = true;
    private  _title: string = "";

    SetDocumentTitle(title: string){
        this._title = title;
        document.title = title;
    }
    AddDocumentTitle(information: string){
        document.title = this._title + information;
    }
    // Methods to get MediaView attributes
    GetId(): string { 
        return this._id;
    }
    GetRoot(): IMediaObject {
         return this._root; 
    }
    SetRoot(value: IMediaObject) { 
        this._root = value;
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
            case "Home":
                object = new HomeView(current,this);
                break;
            case "Setting":
                object = new SettingView(current,this);
                break;
                    default:
                object = new MusicView(current,this);
                break;                                                                                        
        }
        return object;
    }


    protected constructor(id: string = "",paginationSize: number = 0, playbackMode: MediaPlaybackMode = MediaPlaybackMode.NoLoop){
        this._id = id;
        this._root = null;
        this._current = null; 
        this._stack = null;
        this._paginationSize = paginationSize;
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

    public NavigateToParent(cur: IMediaObject):boolean  {
        var result:boolean = false;
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
        if(this.RenderView(newPointer)==true)
        {
            this.RestoreNavigationState();
            setTimeout((function (manager: IMediaManager, object: IMediaObject) {
                return function () {
                    manager.MakeViewControlVisible(object);
                };
            })(this, newPointer),200);
            //this.MakeViewControlVisible(newPointer);
            //this.RestoreNavigationState();
            result = true; 
        
        }
        else
            this.SetCurrentMediaObject(current);
 
        return result;
    }
    public CreateCurrentUrl(cur: IMediaObject):string {
        return window.location.pathname + "?path=" + cur.GetPath(); 
    }
    public SaveNavigationState(cur: IMediaObject)
    {
        // update browser history
        history.pushState(cur.GetPath(), null, this.CreateCurrentUrl(cur));
    }
    public ReplaceNavigationState(cur: IMediaObject)
    {
        // update browser history
        history.replaceState(cur.GetPath(), null, this.CreateCurrentUrl(cur));
    }
    public RestoreNavigationState()
    {
        // update browser history
        history.back();
        MediaManager.internalBack = true;
    }
    public CanCloseApplication():boolean
    {
        return this._canClose;
    }
    public ApplicationBusy(busy:boolean){
        this._canClose = !busy;
    }

    public NavigateToChild(cur: IMediaObject,bSaveNavigation:boolean) :boolean {
        var result: boolean = false;
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

        // Save Parent in Navigation history
        if(bSaveNavigation)
            this.ReplaceNavigationState(current); 

        this.SetCurrentMediaObject(newPointer);
        if(this.RenderView(newPointer)==true)
        {
            this.MakeViewControlVisible(newPointer);
            this.SetCurrentMediaObject(newPointer);
            if(bSaveNavigation)
                this.SaveNavigationState(newPointer); 
            result = true; 
        }
        else
            this.SetCurrentMediaObject(current);        
        return result ;
    }
    public NavigateToPrevious(cur: IMediaObject):boolean  {
        var result: boolean = false;
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
            if(this.RenderView(newPointer)==true)
            {
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
    public NavigateToNext(cur: IMediaObject) :boolean {
        var result: boolean = false;
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
            if(this.RenderView(newPointer)==true)
            {
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
    public NavigateToPage(cur: IMediaObject):boolean  {
        var result: boolean = false;
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
            if(this.RenderView(newPointer)==true)
            {
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
    public RenderView(cur: IMediaObject):boolean  {
        var view:IMediaView = this.CreateMediaView(cur);
        if(!isNullOrUndefined(view))
        {
            view.CreateChildView(cur);
            return true;
        }
        return false;
    }
    public MakeViewControlVisible(cur: IMediaObject):boolean  {
        var view:IMediaView = this.CreateMediaView(cur);
        if(!isNullOrUndefined(view))
        {
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
    public RenderMediaView(bSaveNavigation):boolean  {
        this.HideAlertPopup();
        this.SetIndexActiveMediaMediaObject(-1);
        let result:boolean = this.RenderView(this.GetCurrentMediaObject());
        if((result==true)&&(bSaveNavigation==true))
            this.SaveNavigationState(this.GetCurrentMediaObject());
        return result;
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

    public ShowPopupBox(msg:string):boolean {
        let result:boolean = false;
        var div:HTMLDivElement = <HTMLDivElement>document.getElementById('modalpopup');
        if(!isNullOrUndefined(div)){
            this.DisplayBox('modalpopup');
            var label = <HTMLLabelElement>document.getElementById('modalmessage');
            if(!isNullOrUndefined(label)){
                label.innerHTML = msg;
            }
        }        
        return result;
    }
    public HidePopupBox() {
        this.HideBox('modalpopup');

    }
    public HideAlertPopupAsync() {
        window.setTimeout((function (manager:IMediaManager) {
            return function() {manager.HideAlertPopup();}
        }) (this), 500);
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
    public HideModalBoxAsync() {
        window.setTimeout((function (manager:IMediaManager) {
            return function() {manager.HideModalBox();}
        }) (this), 500);
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

    async ShowModalPopupAsync (msg:string):Promise<boolean> {
        return new Promise<boolean>( resolve => {
            let result:boolean = false;

            try
            {
                var div:HTMLDivElement = <HTMLDivElement>document.getElementById('modalpopup');
                if(!isNullOrUndefined(div)){
                    this.DisplayBox('modalpopup');
                    var label = <HTMLLabelElement>document.getElementById('modalpopupmessage');
                    if(!isNullOrUndefined(label)){
                        label.innerHTML = msg;
                        resolve(true);
                    }
                }
            }
            catch(error)
            {
                resolve(false);
            }        
        });
    }    
    public ShowModalPopup(msg:string):boolean {
        let result:boolean = false;
        var div:HTMLDivElement = <HTMLDivElement>document.getElementById('modalpopup');
        if(!isNullOrUndefined(div)){
            this.DisplayBox('modalpopup');
            var label = <HTMLLabelElement>document.getElementById('modalpopupmessage');
            if(!isNullOrUndefined(label)){
                label.innerHTML = msg;
                result = true;
            }
        }        
        return result;
    }
    public HideModalPopupAsync() {
        window.setTimeout((function (manager:IMediaManager) {
            return function() {manager.HideModalPopup();}
        }) (this), 500);
    }
    public HideModalPopup() {
        this.HideBox('modalpopup');
    }

}

