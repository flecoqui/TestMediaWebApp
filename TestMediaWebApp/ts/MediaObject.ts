/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
*/
/**
 * MediaObject
 */
 class MediaObject implements IMediaObject {
    private _type: string;
    private _title: string;
    private _description: string;
    private _mainContentUrl: string;
    private _mainContentImageUrl: string;
    private _previewContentUrl: string;
    private _previewContentImageUrl: string;
    private _path: string;
    private _index: number; 
    private _mediaParent: IMediaObject;
    private _mediaChildList:  Array<IMediaObject>;

    constructor(name: string = "",description: string = "", contentUrl: string = "", imageUrl: string = "", previewContentUrl: string = "", previewImageUrl: string = ""){
        this._type = this.getType();
        this._title = name;
        this._mediaChildList = new Array<IMediaObject>();
        this._path = "/" + this._title;
        this._description = description;
        this._mainContentUrl = contentUrl;
        this._mainContentImageUrl = imageUrl;
        this._previewContentUrl = previewContentUrl;
        this._previewContentImageUrl = previewImageUrl;
        this._mediaParent = null;
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
    public GetAlbum(): string {
        return MediaObject.GetValue(this._description,"Album")
    }
    public GetArtist(): string {
        return MediaObject.GetValue(this._description,"Artist")
    }
    public GetTrack(): string {
        return MediaObject.GetValue(this._description,"Track")
    }
    public GetTitle(): string {
        return MediaObject.GetValue(this._description,"Title")
    }
    private static GetValue(source: string, field: string):string
    {
        let result:string = "";
        let pos:number = 0;

        if(!isNullOrUndefinedOrEmpty(source)){
            while (pos>=0){
                pos = source.indexOf("{{",pos);
                if(pos>=0){
                    let endtagpos:number = source.indexOf(":",pos+2);
                    if(endtagpos>0){
                        let tag:string = source.substr(pos+2,endtagpos-pos-2);
                        if(tag.trim().toLowerCase() == field.toLowerCase())
                        {
                            pos = source.indexOf("}}",endtagpos+1);
                            if(pos>0)
                                result = source.substr(endtagpos+1,pos-endtagpos-1);
                            break;
                        }
                    }
                    pos += 2;
                }
            }
        }
        return result;
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
    public GetChildWithName(name: string): IMediaObject {
        if((this._mediaChildList != null)&&( this._mediaChildList.length>0))
        {
            for (var i:number = 0; i<this._mediaChildList.length ;i++)
            {
                var m = this._mediaChildList[i];
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
    public GetParent(): IMediaObject
    {
        return this._mediaParent;
    }
    public SetParent(parent: IMediaObject)
    {
        this._mediaParent = parent;
    }
    public AddChild(child: IMediaObject)
    {
        this._mediaChildList.push(child);
        child.SetAbsolutePath(this._path);  
        child.SetIndex(this._mediaChildList.length-1);
    }
    public RemoveChild(child: IMediaObject)
    {
        return this._mediaChildList.push(child);        
    }

    public GetChildren():Array<IMediaObject>
    {
        return this._mediaChildList;        
    }
    public GetChildrenLength(): number
    {
        return this._mediaChildList.length;        
    }
    public HasChild(): boolean
    {
        if((this._mediaChildList != null)&&( this._mediaChildList.length>0))
            return true;
        return false;        
    }
    public GetChildWithIndex(index: number): IMediaObject
    {
        if((this._mediaChildList != null)&&( index < this._mediaChildList.length))
            return this._mediaChildList[index];
        return null;        
    }
    public SetChildren(arr: Array<IMediaObject>)
    {
        this._mediaChildList = arr;
    }
    public GetPrevious(): IMediaObject
    {
        if(this.GetParent()!=null)
        {
            if(this._index>0)
                return this.GetParent().GetChildWithIndex(this._index-1);
        }
        return null;
    }
    public GetNext(): IMediaObject
    {
        if(this.GetParent()!=null)
        {
            if(this._index+1<this.GetParent().GetChildrenLength())
                return this.GetParent().GetChildWithIndex(this._index+1);
        }
        return null;
    }
    public GetPreviousPage(pagesize:number): IMediaObject
    {
        if(pagesize == 0)
            return null;
        if(this.GetParent()!=null)
        {
            if(this._index-pagesize>=0)
                return this.GetParent().GetChildWithIndex(this._index-pagesize);
        }
        return null;
    }
    public GetNextPage(pagesize:number): IMediaObject
    {
        if(pagesize == 0)
            return null;
        if(this.GetParent()!=null)
        {
            if(this._index+pagesize<this.GetParent().GetChildrenLength())
                return this.GetParent().GetChildWithIndex(this._index+pagesize);
        }
        return null;
    }

    public static fromJSON(d: Object): MediaObject
    {
        var object: MediaObject = Object.assign(new MediaObject("","","","","",""), d);
        if(!isNullOrUndefined(object))
        {
            let arr: Array<IMediaObject>  = new Array<IMediaObject>(); 
            for(var i: number = 0 ; i < object.GetChildrenLength(); i++)
            {
                arr.push(MediaObject.fromJSON(object.GetChildWithIndex(i)));
            }
            object.SetChildren(arr);

        }
        return object;

    }
    public static Deserialize(content: string): MediaObject
    {
        return this.fromJSON(JSON.parse(content));
    }
    public static Serialize(input: IMediaObject): string
    {
        var object: MediaObject = Object.assign(new MediaObject("","","","","",""), input);
        return JSON.stringify(object);
    }
}
