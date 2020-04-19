
abstract class MediaObject {
    private _type: string;
    private _title: string;
    private _description: string;
    private _mainContentUrl: string;
    private _mainContentImageUrl: string;
    private _previewContentUrl: string;
    private _previewContentImageUrl: string;
    private _path: string;
    private _index: number; 
    private _mediaParent: MediaObject;
    private _mediaChildList:  List<MediaObject>;

    // Navigation attributes
    private static _id: string;
    private static _root: MediaObject;
    private static _current: MediaObject; 
    private static _stack:  List<MediaObject>;
    private static _oneItemNavigation:  boolean;
    
    private static _parentButtonId: string = "_parentButtonId"; 
    private static _childButtonId: string = "_childButtonId"; 
    private static _previousButtonId: string = "_previousButtonId"; 
    private static _nextButtonId: string = "_nextButtonId"; 
    private static _startButtonId: string = "_startButtonId"; 
    private static _stopButtonId: string = "_stopButtonId"; 
    private static _playButtonId: string = "_playButtonId"; 
    private static _pauseButtonId: string = "_pauseButtonId"; 
    private static _muteButtonId: string = "_muteButtonId"; 
    private static _unmuteButtonId: string = "_unmuteButtonId"; 
    private static _volumeUpButtonId: string = "_volumeUpButtonId"; 
    private static _volumeDownButtonId: string = "_volumeDownButtonId"; 
    private static _repeatButtonId: string = "_repeatButtonId"; 
    private static _unrepeatButtonId: string = "_unrepeatButtonId"; 
    private static _audioId: string = "_audioId"; 
    private static _videoId: string = "_videoId"; 
    private static _audioSourceId: string = "_audioSourceId"; 
    private static _videoSourceId: string = "_videoSourceId"; 
    private static _durationId: string = "_durationId"; 
    private static _positionId: string = "_positionId"; 
    public  GetParentButtonId(): string {
        return MediaObject._parentButtonId + this._index;
    }
    public  GetChildButtonId(): string {
        return MediaObject._childButtonId + this._index;
    }
    public  GetPreviousButtonId(): string {
        return MediaObject._previousButtonId + this._index;
    }
    public  GetNextButtonId(): string {
        return MediaObject._nextButtonId + this._index;
    }
    public  GetStartButtonId(): string {
        return MediaObject._startButtonId + this._index;
    }
    public  GetStopButtonId(): string {
        return MediaObject._stopButtonId + this._index;
    }
    public  GetPlayButtonId(): string {
        return MediaObject._playButtonId + this._index;
    }
    public  GetPauseButtonId(): string {
        return MediaObject._pauseButtonId + this._index;
    }
    public  GetMuteButtonId(): string {
        return MediaObject._muteButtonId + this._index;
    }
    public  GetUnmuteButtonId(): string {
        return MediaObject._unmuteButtonId + this._index;
    }
    public  GetVolumeUpButtonId(): string {
        return MediaObject._volumeUpButtonId + this._index;
    }    
    public  GetVolumeDownButtonId(): string {
        return MediaObject._volumeDownButtonId + this._index;
    }    
    public  GetRepeatButtonId(): string {
        return MediaObject._repeatButtonId + this._index;
    }
    public  GetUnrepeatButtonId(): string {
        return MediaObject._unrepeatButtonId + this._index;
    }
    public  GetAudioId(): string {
        return MediaObject._audioId + this._index;
    }
    public  GetVideoId(): string {
        return MediaObject._videoId + this._index;
    }
    public  GetAudioSourceId(): string {
        return MediaObject._audioSourceId + this._index;
    }
    public  GetVideoSourceId(): string {
        return MediaObject._videoSourceId + this._index;
    }
    public  GetDurationId(): string {
        return MediaObject._durationId + this._index;
    }
    public  GetPositionId(): string {
        return MediaObject._positionId + this._index;
    }
    constructor(name: string,description: string, contentUrl: string, imageUrl: string, previewContentUrl: string, previewImageUrl: string ){
        this._type = this.getType();
        this._title = name;
        this._mediaChildList = new List<MediaObject>();
        this._path = "/" + this._title;
        this._description = description;
        this._mainContentUrl = contentUrl;
        this._mainContentImageUrl = imageUrl;
        this._previewContentUrl = previewContentUrl;
        this._previewContentImageUrl = previewImageUrl;
        this._mediaParent = null;
    }
    public SetOneItemNavigation(bOneItem: boolean)
    {
        MediaObject._oneItemNavigation = bOneItem;
    }
    public GetOneItemNavigation() : boolean
    {
        return MediaObject._oneItemNavigation;
    }
    
    public SetRoot() {
        MediaObject._stack = new List<MediaObject>();
        return MediaObject._root = this;
    }
    public GetRoot(): MediaObject {
        return MediaObject._root;
    }
    public static SetId(id: string) {
        return MediaObject._id = id;
    }
    public GetCurrentMediaObject(): MediaObject {
        return MediaObject._current;
    }
    public  SetCurrentMediaObject() {
        MediaObject._current = this;
    }
    private getType(): string {
        let comp:any = this.constructor;
        return comp.name;
    }
    public GetType(): string {
        return this._type;
    }
    public GetName(): string {
        return this._title;
    }
    public GetDescription(): string {
        return this._description;
    }
    public GetContentUrl(): string {
        return this._mainContentUrl;
    }
    public GetImageUrl(): string {
        return this._mainContentImageUrl;
    }
    public GetPreviewContentUrl(): string {
        return this._previewContentUrl;
    }
    public GetPreviewImageUrl(): string {
        return this._previewContentImageUrl;
    }

    public GetId(): string {
        return MediaObject._id;
    }
    public SetId(id: string) {
        MediaObject._id = id;
    }
    public GetIndex(): number {
        return this._index;
    }
    public SetIndex(index: number): void {
        this._index = index;
    }

    public GetSubfolderPath(title: string): string {
        return title.replace("/","_");
    }
    public SetAbsolutePath(parentPath: string): void {
        this._path = parentPath + "/" + this.GetSubfolderPath(this._title);
    }
    public GetChildWithName(name: string): MediaObject {
        if((this._mediaChildList != null)&&( this._mediaChildList.size()>0))
        {
            for (var i:number = 0; i<this._mediaChildList.size() ;i++)
            {
                var m = this._mediaChildList.get(i);
                if(m.GetName() === name)
                    return m;
            }
        }
        return null;        
        

    }
    public GetPath(): string
    {
        return this._path;
    }
    public GetParent(): MediaObject
    {
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
    public SetParent(parent: MediaObject)
    {
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
    public AddChild(child: MediaObject)
    {
        this._mediaChildList.add(child);
        child.SetAbsolutePath(this._path);  
        child.SetIndex(this._mediaChildList.size()-1);

    }
    public RemoveChild(child: MediaObject)
    {
        return this._mediaChildList.add(child);        
    }

    public GetChildList():List<MediaObject>
    {
        return this._mediaChildList;        
    }
    public GetChildListLength(): number
    {
        return this._mediaChildList.size();        
    }
    public GetChildWithIndex(index: number): MediaObject
    {
        if((this._mediaChildList != null)&&( index < this._mediaChildList.size()))
            return this._mediaChildList.get(index);
        return null;        
    }
    public GetPrevious(): MediaObject
    {
        if(this.GetParent()!=null)
        {
            if(this._index>0)
                return this.GetParent().GetChildWithIndex(this._index-1);
        }
        return null;
    }
    public GetNext(): MediaObject
    {
        if(this.GetParent()!=null)
        {
            if(this._index+1<this.GetParent().GetChildListLength())
                return this.GetParent().GetChildWithIndex(this._index+1);
        }
        return null;
    }
    public NavigateToParent()  {
        var mediaPointer = this;
        if(isNullOrUndefined(mediaPointer)){
            return;
        }
        var newPointer = mediaPointer.GetParent();
        if(isNullOrUndefined(newPointer))
            return;
        
        if(isNullOrUndefined(MediaObject._stack))
            MediaObject._stack = new List<MediaObject>();
        if(!isNullOrUndefined(MediaObject._stack))
            MediaObject._stack.pop();

        newPointer.RenderMedia(newPointer.GetParent());        
        return;
    }
    public NavigateToChild()  {
        var mediaPointer = this;
        if(isNullOrUndefined(mediaPointer)){
            return;
        }
        var newPointer = mediaPointer.GetChildWithIndex(0);
        if(isNullOrUndefined(newPointer))
            return;
        // Add parent into the stack
        if(isNullOrUndefined(MediaObject._stack))
            MediaObject._stack = new List<MediaObject>()
        if(!isNullOrUndefined(MediaObject._stack))
            MediaObject._stack.push(mediaPointer)
        newPointer.RenderMedia(this);
        return ;
    }
    public NavigateToPrevious()  {
        var mediaPointer = this;
        if(isNullOrUndefined(mediaPointer)){
            return;
        }
        var newPointer = mediaPointer.GetPrevious();
        if(isNullOrUndefined(newPointer))
            return;
        newPointer.RenderMedia(this.GetParent());
        return ;
    }
    public NavigateToNext()  {
        var mediaPointer = this;
        if(isNullOrUndefined(mediaPointer)){
            return;
        }
        var newPointer = mediaPointer.GetNext();
        if(isNullOrUndefined(newPointer))
            return;
        newPointer.RenderMedia(this.GetParent());
        return ;
    }
    static gParent: MediaObject = null;

    public RenderMedia (parent: MediaObject)
    {
        var div = <HTMLDivElement>document.getElementById(this.GetId());
        var button = null;
        if(isNullOrUndefined(div))
            return;
        if((!isNullOrUndefined(parent))&&(this.GetOneItemNavigation() === false)){
            div.innerHTML = "";
            MediaObject.gParent = parent;
            for(var i = 0; i < parent.GetChildListLength(); i++)
            {
                var o = parent.GetChildWithIndex(i);
                o.SetParent(parent);
                o.SetCurrentMediaObject(); 
                div.innerHTML += o.CreateView();
            }
            for(var i = 0; i < parent.GetChildListLength(); i++)
            {
                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetParentButtonId());
                if(!isNullOrUndefined(button)){
                    button.addEventListener("click",(function(k){return function()
                        {
                            MediaObject.gParent.GetChildWithIndex(k).NavigateToParent();
                        };
                    })(i),false);
                }
                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetChildButtonId());
                if(!isNullOrUndefined(button)){
                    button.addEventListener("click",(function(k){return function()
                        {
                            MediaObject.gParent.GetChildWithIndex(k).NavigateToChild();
                        };
                    })(i),false);
                }
                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetPreviousButtonId());
                if(!isNullOrUndefined(button)){
                    button.addEventListener("click",(function(k){return function()
                        {
                            MediaObject.gParent.GetChildWithIndex(k).NavigateToPrevious();
                        };
                    })(i),false);
                }
                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetNextButtonId());
                if(!isNullOrUndefined(button)){
                    button.addEventListener("click",(function(k){return function()
                        {
                            MediaObject.gParent.GetChildWithIndex(k).NavigateToNext();
                        };
                    })(i),false);
                }
                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetStartButtonId());
                if(!isNullOrUndefined(button)){
                    button.disabled = false;
                    button.style.display = "block";
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio)){                            
                                var source = <HTMLSourceElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioSourceId());
                                if(!isNullOrUndefined(source)){                            
                                    source.src = MediaObject.gParent.GetChildWithIndex(k).GetContentUrl();
                                    audio.load();
                                    audio.play();
                                }
                            }
                            else
                            {
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    var source = <HTMLSourceElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoSourceId());
                                    if(!isNullOrUndefined(source)){                            
                                        source.src = MediaObject.gParent.GetChildWithIndex(k).GetContentUrl();
                                        video.load();
                                        video.play();
                                    }
                                }
                            }
                        };
                    })(i),false);
                }

                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetStopButtonId());
                if(!isNullOrUndefined(button)){
                    button.style.display = "none";
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio)){                            
                               // audio.pause();
                                var source = <HTMLSourceElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioSourceId());
                                if(!isNullOrUndefined(source)){                            
                                    source.src = "";
                                }
                            }
                            else
                            {
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    //video.pause();
                                    var source = <HTMLSourceElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoSourceId());
                                    if(!isNullOrUndefined(source)){                            
                                        source.src = "";
                                    }
                                }
                            }
                            var control = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(k).GetStartButtonId());
                            if(!isNullOrUndefined(control)){
                                control.style.display = "block"
                                control.disabled = false;
                            }                            
                            var control = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(k).GetStopButtonId());
                            if(!isNullOrUndefined(control)){
                                control.style.display = "none"
                                control.disabled = true;
                            }                            
                            var control = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(k).GetPlayButtonId());
                            if(!isNullOrUndefined(control)){
                                control.style.display = "none"
                                control.disabled = true;
                            }                            
                            var control = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(k).GetPauseButtonId());
                            if(!isNullOrUndefined(control)){
                                control.style.display = "none"
                                control.disabled = true;
                            }                            
                            var control = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(k).GetMuteButtonId());
                            if(!isNullOrUndefined(control)){
                                control.style.display = "none"
                                control.disabled = true;
                            }                            
                            var control = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(k).GetVolumeUpButtonId());
                            if(!isNullOrUndefined(control)){
                                control.style.display = "none"
                                control.disabled = true;
                            }                            
                            var control = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(k).GetVolumeDownButtonId());
                            if(!isNullOrUndefined(control)){
                                control.style.display = "none"
                                control.disabled = true;
                            }                            

                        };
                    })(i),false);
                }

                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetPauseButtonId());
                if(!isNullOrUndefined(button)){
                    button.style.display = "none";
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio)){                            
                                audio.pause();
                            }
                            else
                            {
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    video.pause();
                                }
                            }
                        };
                    })(i),false);
                }
                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetPlayButtonId());
                if(!isNullOrUndefined(button)){
                    button.style.display = "none";
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio)){                            
                                audio.play();
                            }
                            else
                            {
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    video.play();
                                }
                            }
                        };
                    })(i),false);
                }

                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetMuteButtonId());
                if(!isNullOrUndefined(button)){
                    button.style.display = "none";
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio)){                            
                                audio.muted = true; 
                                var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.disabled = false;
                                    control.style.display = "block";                           
                                }
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.disabled = true;
                                    control.style.display = "none";                           
                                }                                    
                            }
                            else
                            {
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    video.muted = true; 
                                    var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = false;
                                        control.style.display = "block";                           
                                    }
                                    control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = true;
                                        control.style.display = "none";                           
                                    }                                    
                                }
                            }
                        };
                    })(i),false);
                }
                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetUnmuteButtonId());
                if(!isNullOrUndefined(button)){
                    button.style.display = "none";
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio)){                            
                                audio.muted = false;
                                var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.disabled = false;
                                    control.style.display = "block";                           
                                }
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.disabled = true;
                                    control.style.display = "none";                           
                                }                                    
                            }
                            else
                            {
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    video.muted = false; 
                                    var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = false;
                                        control.style.display = "block";                           
                                    }
                                    control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = true;
                                        control.style.display = "none";                           
                                    }                                    
                                }
                            }
                        };
                    })(i),false);
                }

                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetRepeatButtonId());
                if(!isNullOrUndefined(button)){
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio)){                            
                                audio.loop = true; 
                                var control = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnrepeatButtonId());
                                if(!isNullOrUndefined(control))
                                    control.style.display = "block";
                                control = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetRepeatButtonId());
                                if(!isNullOrUndefined(control))
                                    control.style.display = "none";
                            }
                            else
                            {
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    video.loop = true; 
                                    var control = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnrepeatButtonId());
                                    if(!isNullOrUndefined(control))
                                        control.style.display = "block";
                                    control = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetRepeatButtonId());
                                    if(!isNullOrUndefined(control))
                                        control.style.display = "none";
                                }
                            }
                        };
                    })(i),false);
                    var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(i).GetAudioId());
                    if(!isNullOrUndefined(audio)) {
                        if(audio.loop == true)
                            button.style.display = "none";
                        else
                            button.style.display = "block";
                    }
                    var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(i).GetVideoId());
                    if(!isNullOrUndefined(video)) {
                        if(video.loop == true)
                            button.style.display = "none";
                        else
                            button.style.display = "block";
                    }
                }

                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetUnrepeatButtonId());
                if(!isNullOrUndefined(button)){
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio)){                            
                                audio.loop = false; 
                                var control = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnrepeatButtonId());
                                if(!isNullOrUndefined(control))
                                    control.style.display = "none";
                                control = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetRepeatButtonId());
                                if(!isNullOrUndefined(control))
                                    control.style.display = "block";
                                

                            }
                            else
                            {
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    video.loop = false; 
                                    var control = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnrepeatButtonId());
                                    if(!isNullOrUndefined(control))
                                        control.style.display = "none";
                                    control = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetRepeatButtonId());
                                    if(!isNullOrUndefined(control))
                                        control.style.display = "block";
                                }
                            }
                        };
                    })(i),false);
                    var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(i).GetAudioId());
                    if(!isNullOrUndefined(audio)) {
                        if(audio.loop == true)
                            button.style.display = "block";
                        else
                            button.style.display = "none";
                    }
                    var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(i).GetVideoId());
                    if(!isNullOrUndefined(video)) {
                        if(video.loop == true)
                            button.style.display = "block";
                        else
                            button.style.display = "none";
                    }
                }

                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetVolumeUpButtonId());
                if(!isNullOrUndefined(button)){
                    button.style.display = "none";
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
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
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    if(video.muted == true)
                                        video.muted = false;
                                    if(video.volume<= 0.8)                            
                                        video.volume += 0.2;
                                    else 
                                        video.volume = 1;
                                }
                            }
                        };
                    })(i),false);
                }

                button = <HTMLButtonElement>document.getElementById(parent.GetChildWithIndex(i).GetVolumeDownButtonId());
                if(!isNullOrUndefined(button)){
                    button.style.display = "none";
                    button.addEventListener("click",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
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
                                var video = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVideoId());
                                if(!isNullOrUndefined(video)){                            
                                    if(video.muted == true)
                                        video.muted = false;
                                    if(video.volume>= 0.2)                            
                                        video.volume -= 0.2;
                                    else 
                                        video.volume = 0;
                                }
                            }
                        };
                    })(i),false);
                }


                var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(i).GetAudioId());
                if(!isNullOrUndefined(audio)){
                    audio.addEventListener("playing",(function(k){return function()
                        {
                            var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetStartButtonId());
                            if(!isNullOrUndefined(control))
                                control.style.display = "none";                            
                            control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetStopButtonId());
                            if(!isNullOrUndefined(control)){
                                control.style.display = "block";
                                control.disabled = false;
                            }                            
                            control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPauseButtonId());
                            if(!isNullOrUndefined(control))
                            {
                                control.disabled = false;
                                control.style.display = "block";                           
                            } 
                            control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayButtonId());
                            if(!isNullOrUndefined(control))
                            {
                                control.disabled = true;
                                control.style.display = "block";                           
                            } 
                            if(this.muted == true){
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.disabled = true;
                                    control.style.display = "none";                           
                                }
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.disabled = false;
                                    control.style.display = "block";                           
                                }
                            }
                            else{
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.disabled = false;
                                    control.style.display = "block";                           
                                }
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.disabled = true;
                                    control.style.display = "none";                           
                                }
                            }
                            control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeUpButtonId());
                            if(!isNullOrUndefined(control)){
                                control.disabled = false;
                                control.style.display = "block";                           
                            }
                            control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeDownButtonId());
                            if(!isNullOrUndefined(control)){
                                control.disabled = false;
                                control.style.display = "block";                           
                            }
                            if(this.loop == true){
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetRepeatButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.style.display = "none";                           
                                }
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnrepeatButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.style.display = "block";                           
                                }

                            }
                            else{
                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetRepeatButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.style.display = "block";                           
                                }

                                control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnrepeatButtonId());
                                if(!isNullOrUndefined(control)){
                                    control.style.display = "none";                           
                                }
                            }

                            control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayButtonId());
                            if(!isNullOrUndefined(control))
                            {
                                control.disabled = true;
                                control.style.display = "block";                           
                            } 
            
                        };
                    })(i),false);



                    audio.addEventListener("play",(function(k){return function()
                        {
                            var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayButtonId());
                            if(!isNullOrUndefined(control))
                            {
                                control.disabled = true;
                                control.style.display = "block";                           
                            } 
                            var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPauseButtonId());
                            if(!isNullOrUndefined(control))
                            {
                                control.disabled = false;
                                control.style.display = "block";                           
                            }             
                        };
                    })(i),false);


                    audio.addEventListener("pause",(function(k){return function()
                        {
                            var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPlayButtonId());
                            if(!isNullOrUndefined(control))
                            {
                                control.disabled = false;
                                control.style.display = "block";                           
                            } 
                            var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetPauseButtonId());
                            if(!isNullOrUndefined(control))
                            {
                                control.disabled = true;
                                control.style.display = "block";                           
                            }            
                        };
                    })(i),false);

                    audio.addEventListener("volumechange",(function(k){return function()
                        {
                            var audio = <HTMLAudioElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetAudioId());
                            if(!isNullOrUndefined(audio))
                            {
                                if(audio.muted == true){
                                    var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = true;
                                        control.style.display = "none";                           
                                    }
                                    control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = false;
                                        control.style.display = "block";                           
                                    }
                                }
                                else{
                                    var control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetMuteButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = false;
                                        control.style.display = "block";                           
                                    }
                                    control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetUnmuteButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = true;
                                        control.style.display = "none";                           
                                    }
                                }
                                if(audio.volume == 1)
                                {
                                    control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeUpButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = true;
                                        control.style.display = "block";                           
                                    }

                                }
                                else
                                {
                                    control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeUpButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = false;
                                        control.style.display = "block";                           
                                    }                                
                                }

                                if(audio.volume == 0)
                                {
                                    control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeDownButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = true;
                                        control.style.display = "none";                           
                                    }                                
                                }
                                else
                                {
                                    control = <HTMLButtonElement>document.getElementById(MediaObject.gParent.GetChildWithIndex(k).GetVolumeDownButtonId());
                                    if(!isNullOrUndefined(control)){
                                        control.disabled = false;
                                        control.style.display = "block";                           
                                    }                                
                                }
                            }
                        };
                    })(i),false);

                }

            }

        }
        else
        {
        
            this.SetParent(parent);
            this.SetCurrentMediaObject(); 
            div.innerHTML = this.CreateView();
            var mo: MediaObject = this;
            button = document.getElementById(this.GetParentButtonId());
            if(!isNullOrUndefined(button)){
                button.addEventListener("click",function()
                {
                    mo.NavigateToParent();
                });
            }
            button = <HTMLButtonElement>document.getElementById(this.GetChildButtonId());
            if(!isNullOrUndefined(button)){
                button.addEventListener("click",function()
                {
                    mo.NavigateToChild()
                });
            }
            button = <HTMLButtonElement>document.getElementById(this.GetPreviousButtonId());
            if(!isNullOrUndefined(button)){
                button.addEventListener("click",function()
                {
                    mo.NavigateToPrevious()
                });
            }
            button = <HTMLButtonElement>document.getElementById(this.GetNextButtonId());
            if(!isNullOrUndefined(button)){
                button.addEventListener("click",function()
                {
                    mo.NavigateToNext()
                });
            }
        }
    }
    public abstract CreateView(): string;
    public abstract CreatePreview(): string;
    public  Deserialize(content: string): MediaObject
    {
        return JSON.parse(content);
    }
    public Serialize(object: MediaObject): string
    {
        return JSON.stringify(object);
    }
}
