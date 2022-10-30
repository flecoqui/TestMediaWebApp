import {IMediaObject} from "./IMediaObject";
import { MediaPlaybackMode} from "./GlobalVars";
import { IMediaView} from "./IMediaView";
/**
 * Media playback mode
 */
export enum MediaModelBoxType {
    NoButton,
    Ok,
    OkCancel,
    YesNo,
    YesNoCancel
}
/**
 * IMediaManger
 */
export interface IMediaManager{
    // Methods to get MediaView attributes
    GetId(): string;
    GetRoot():  IMediaObject|null;
    SetRoot(mo:IMediaObject):void;
    IsOneItemNavigation(): boolean;
    SetOneItemNavigation(b:boolean):void;
    GetPlaybackMode(): MediaPlaybackMode;
    SetPlaybackMode(mode:MediaPlaybackMode):void;

    GetCurrentMediaObject(): IMediaObject | null;
    SetCurrentMediaObject(mo:IMediaObject):void;
    GetIndexActiveMediaMediaObject(): number;
    SetIndexActiveMediaMediaObject(n:number):void;

    SetDocumentTitle(t:string):void;
    AddDocumentTitle(t:string):void;

    // Naviagation  methods
    NavigateToParent(mo:IMediaObject):boolean;
    NavigateToChild(mo:IMediaObject,b:boolean):boolean;
    NavigateToPrevious(mo:IMediaObject):boolean;
    NavigateToNext(mo:IMediaObject):boolean;
    NavigateToPage(mo:IMediaObject):boolean;
    MakeViewControlVisible(mo:IMediaObject):boolean;
    SaveNavigationState(mo:IMediaObject):void;
    ReplaceNavigationState(mo:IMediaObject):void;
    RestoreNavigationState():void;
    CanCloseApplication():boolean;
    ApplicationBusy(b:boolean):void;
    
    // Pagination Method
    SetPaginationSize(n:number):void;
    GetPaginationSize():number;
    SetPaginationIndex(n:number):void;
    GetPaginationIndex():number;    

    CreateMediaView(mo:IMediaObject):IMediaView;
    RenderMediaView(bSaveNavigation:boolean):boolean;

    // Alert Messages
    ShowAlertPopupInformation(s:string):void;
    ShowAlertPopupError(s:string):void;
    HideAlertPopup():void;
    HideAlertPopupAsync():void;
    ShowModalBox(title:string,message:string,m:MediaModelBoxType):boolean;
    ShowModalBoxAsync (title:string, msg:string, type:MediaModelBoxType):Promise<boolean>;
    HideModalBox():void;
    HideModalBoxAsync():void;
    ShowModalPopup(message:string):boolean;
    ShowModalPopupAsync(message:string):Promise<boolean>;
    HideModalPopup():void;
    HideModalPopupAsync():void;
}
