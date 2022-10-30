/**
 * IMediaObject
 */
 export interface  IMediaObject{
    //  Attributes access methods
    GetType(): string;
    GetName(): string;
    GetDescription(): string;
    GetAlbum(): string;
    GetArtist(): string;
    GetTrack(): string;
    GetTitle(): string;
    GetFileDate(): string;
    GetFileSize(): string;
    GetFolder(): string;
    GetContentUrl(): string;
    GetImageUrl(): string;
    GetPreviewContentUrl(): string;
    GetPreviewImageUrl(): string;

    GetIndex(): number;
    SetIndex(num:number):void;
    GetSubfolderPath(path:string): string;
    SetAbsolutePath(path:string):void;
    GetChildWithName(path:string): IMediaObject|null;
    GetPath(): string;

    // Media Tree methods
    GetParent(): IMediaObject|null;
    SetParent(mo:IMediaObject|null): void;
    AddChild(mo:IMediaObject): void;
    RemoveChild(mo:IMediaObject): void;
    RemoveChildWithIndex(index:number): void;
    RemoveChildWithName(name:string): void;
    GetChildren():Array<IMediaObject>;
    GetChildrenLength(): number;
    HasChild(): boolean;
    GetChildWithIndex(index:number): IMediaObject|null;
    SetChildren(c :Array<IMediaObject>):void ;
    GetPrevious(): IMediaObject|null;
    GetNext(): IMediaObject|null;
    GetPreviousPage(page:number): IMediaObject|null;
    GetNextPage(page:number): IMediaObject|null;
    GetRoot():IMediaObject|null;
}
