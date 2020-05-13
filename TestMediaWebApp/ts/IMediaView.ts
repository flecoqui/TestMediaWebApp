/*
import {IMediaObject} from "./IMediaObject";
*/


/**
 * IMediaView
 */
interface IMediaView{
    GetMediaManager():IMediaManager;

    CreateChildView(current: IMediaObject): boolean;
    CreateView(current: IMediaObject): string;
    CreatePreview(current: IMediaObject): string;
    RegisterViewEvents(current: IMediaObject): boolean;
    InitializeViewControls(current: IMediaObject): boolean;

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
    GetAddFavoriteButtonId(index: number): string;
    GetRemoveFavoriteButtonId(index: number): string;
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
