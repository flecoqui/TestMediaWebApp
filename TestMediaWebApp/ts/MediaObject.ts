
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
