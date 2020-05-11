/*
import {IMediaObject} from "./IMediaObject";
*/

/**
 * IMediaView
 */
 interface IMediaView{
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

    // View Methods
    CreateView(IMediaObject): string;
    CreatePreview(IMediaObject): string;
    RenderView():boolean;

    // Naviagation  methods
    NavigateToParent(IMediaObject);
    NavigateToChild(IMediaObject);
    NavigateToPrevious(IMediaObject);
    NavigateToNext(IMediaObject);

    // Pagination Method
    SetPaginationSize(number);
    GetPaginationSize():number;
    SetPaginationIndex(number);
    GetPaginationIndex():number;    

    // Methods used to get id of HTML Elements
    GetParentButtonId(index: number): string;
    GetChildButtonId(index: number): string;
    GetPreviousButtonId(index: number): string;
    GetNextButtonId(index: number): string;
    GetStartButtonId(index: number): string;
    GetStopButtonId(index: number): string;
    GetPlayButtonId(index: number): string;
    GetPauseButtonId(index: number): string;
    GetMuteButtonId(index: number): string;
    GetUnmuteButtonId(index: number): string;
    GetVolumeUpButtonId(index: number): string;
    GetVolumeDownButtonId(index: number): string;
    GetLoopButtonId(index: number): string;
    GetPlayListLoopButtonId(index: number): string;
    GetNoLoopButtonId(index: number): string;
    GetAudioId(index: number): string;
    GetVideoId(index: number): string;
    GetAudioSourceId(index: number): string;
    GetVideoSourceId(index: number): string;
    GetDurationId(index: number): string;
    GetSliderId(index: number): string;
    GetPositionId(index: number): string;

    // Media Method
    StopMedia(mo: IMediaObject): void;
    StartMedia(mo: IMediaObject): void;
    
    // Update Loop Buttons
    UpdateAllLoopButtons (mo: IMediaObject): void;

}
