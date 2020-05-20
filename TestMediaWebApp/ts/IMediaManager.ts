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
    GetIndexActiveMediaMediaObject(): number;
    SetIndexActiveMediaMediaObject(number);

    // Naviagation  methods
    NavigateToParent(IMediaObject):boolean;
    NavigateToChild(IMediaObject,boolean):boolean;
    NavigateToPrevious(IMediaObject):boolean;
    NavigateToNext(IMediaObject):boolean;
    NavigateToPage(IMediaObject):boolean;
    MakeViewControlVisible(IMediaObject):boolean;
    SaveNavigationState(IMediaObject);
    ReplaceNavigationState(IMediaObject)
    RestoreNavigationState();
    CanCloseApplication():boolean;
    ApplicationBusy(boolean);
    
    // Pagination Method
    SetPaginationSize(number);
    GetPaginationSize():number;
    SetPaginationIndex(number);
    GetPaginationIndex():number;    

    CreateMediaView(IMediaObject):IMediaView;
    RenderMediaView(bSaveNavigation:boolean):boolean;

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
