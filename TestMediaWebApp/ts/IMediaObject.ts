/**
 * IMediaObject
 */
 interface  IMediaObject{
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
    SetIndex(number);
    GetSubfolderPath(string): string;
    SetAbsolutePath(string);
    GetChildWithName(string): IMediaObject;
    GetPath(): string;

    // Media Tree methods
    GetParent(): IMediaObject;
    SetParent(IMediaObject): void;
    AddChild(IMediaObject): void;
    RemoveChild(IMediaObject): void;
    RemoveChildWithIndex(number): void;
    RemoveChildWithName(string): void;
    GetChildren():Array<IMediaObject>;
    GetChildrenLength(): number;
    HasChild(): boolean;
    GetChildWithIndex(number): IMediaObject;
    SetChildren(c :Array<IMediaObject>) ;
    GetPrevious(): IMediaObject;
    GetNext(): IMediaObject;
    GetPreviousPage(number): IMediaObject;
    GetNextPage(number): IMediaObject;
    GetRoot():IMediaObject;
}
