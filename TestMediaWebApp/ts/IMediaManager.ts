/*
import {IMediaObject} from "./IMediaObject";
*/

/**
 * IMediaManger
 */
interface IMediaManager{
    // Methods to get MediaView attributes
    GetId(): string;
    GetRoot():  IMediaObject;
    SetRoot(IMediaObject);
    IsOneItemNavigation(): boolean;
    SetOneItemNavigation(boolean);
    GetPlaybackMode(): MediaPlaybackMode;
    SetPlaybackMode(MediaObjectPlaybackMode);

    GetCurrentMediaObject(): IMediaObject;
    SetCurrentMediaObject(IMediaObject);
    GetCurrentViewParentMediaObject(): IMediaObject;
    SetCurrentViewParentMediaObject(IMediaObject);
    GetIndexActiveMediaMediaObject(): number;
    SetIndexActiveMediaMediaObject(number);

    // Naviagation  methods
    NavigateToParent(IMediaObject);
    NavigateToChild(IMediaObject);
    NavigateToPrevious(IMediaObject);
    NavigateToNext(IMediaObject);
    NavigateToPage(IMediaObject);

    // Pagination Method
    SetPaginationSize(number);
    GetPaginationSize():number;
    SetPaginationIndex(number);
    GetPaginationIndex():number;    

    CreateMediaView(IMediaObject):IMediaView;
    RenderMediaView():boolean;

}
