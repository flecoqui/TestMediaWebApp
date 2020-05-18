/*
import {IMediaObject} from "./IMediaObject";
*/
/**
 * Media playback mode
 */
enum MediaModelBoxType {
    NoButton,
    Ok,
    OkCancel,
    YesNo,
    YesNoCancel
}
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
    NavigateToChild(IMediaObject,boolean);
    NavigateToPrevious(IMediaObject);
    NavigateToNext(IMediaObject);
    NavigateToPage(IMediaObject);
    MakeViewControlVisible(IMediaObject):boolean;

    // Pagination Method
    SetPaginationSize(number);
    GetPaginationSize():number;
    SetPaginationIndex(number);
    GetPaginationIndex():number;    

    CreateMediaView(IMediaObject):IMediaView;
    RenderMediaView(bPush:boolean):boolean;

    // Alert Messages
    ShowAlertPopupInformation(string);
    ShowAlertPopupError(string);
    HideAlertPopup();
    HideAlertPopupAsync();
    ShowModalBox(title:string,message:string,MediaModelBoxType):boolean;
    ShowModalBoxAsync (title:string, msg:string, type:MediaModelBoxType):Promise<boolean>;
    HideModalBox();
    HideModalBoxAsync();
    ShowModalPopup(message:string):boolean;
    ShowModalPopupAsync(message:string):Promise<boolean>;
    HideModalPopup();
    HideModalPopupAsync();
}
