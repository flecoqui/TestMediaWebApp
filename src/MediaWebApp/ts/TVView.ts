import Hls from "hls.js";
import * as dashjs from "dashjs";
import { GetCurrentString, isNullOrUndefined, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { IMediaView } from "./IMediaView";
import { MediaView, PlayMediaElement } from "./MediaView";

export class TVView extends MediaView
{
    private hlsPlayers: Record<number, Hls> = {};
    private dashPlayers: Record<number, dashjs.MediaPlayerClass> = {};

    public CreateChildView(current: IMediaObject): boolean
    {
        return this.InternalCreateChildView(current);
    }

    public RegisterViewEvents(current: IMediaObject): boolean
    {
        const result = this.internalRegisterViewEvents(current);
        this.RegisterFullscreenViewEvents(current);
        return result;
    }

    public InitializeViewControls(current: IMediaObject): boolean
    {
        const result = this.internalInitializeVieWControls(current);
        this.hideButton(this.GetFullscreenButtonId(current.GetIndex()));
        return result;
    }

    public MakeViewControlVisible(current: IMediaObject): boolean
    {
        return this.InternalMakeViewControlVisible(current);
    }

    public CreateView(current: IMediaObject): string
    {
        const imageUrl = !isNullOrUndefinedOrEmpty(current.GetImageUrl()) ? current.GetImageUrl() : "assets/img/TV.png";
        let result = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\" id=\"" + this.GetControlViewId(current.GetIndex()) + "\"><div class=\"card mb-4 box-shadow media-tv-card\"><div class=\"img-gradient embed-responsive embed-responsive-16by9\">";

        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
        {
            result += "<div class=\"media-video-container media-fullscreen-container\" id=\"" + this.GetFullscreenContainerId(current.GetIndex()) + "\"><div id=\"" + this.GetVideoBackgroundId(current.GetIndex()) + "\" class=\"media-video-hidden media-video-background\"><video class=\"media-video\" id=\"" + this.GetVideoId(current.GetIndex()) + "\" preload=\"none\" playsinline webkit-playsinline x-webkit-airplay=\"allow\" disablepictureinpicture controlslist=\"nodownload noplaybackrate\" poster=\"" + imageUrl + "\"></video></div><img class=\"card-img-top embed-responsive-item\" src=\"" + imageUrl + "\" alt=\"" + current.GetName() + "\">";
            result += this.CreateFullscreenControlsMarkup(current, false) + "</div>";
        }
        else
        {
            result += "<div class=\"media-video-container\"><img class=\"card-img-top embed-responsive-item\" src=\"" + imageUrl + "\" alt=\"" + current.GetName() + "\"></div>";
        }

        result += "</div><div class=\"card-body media-gradientoverlap media-tv-panel\"><div class=\"media-playback-div\">";

        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
        {
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">LIVE</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"><strong><i class=\"fa-solid fa-volume-high\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"><strong><i class=\"fa-solid fa-volume-xmark\"></i></strong></button></div>";
        }

        result += "<div class=\"media-play-div\"><div><p class=\"media-title\"><strong>" + current.GetName() + "</strong></p></div>";
        result += "<p class=\"media-artist\"><strong>" + current.GetDescription() + "</strong></p>";

        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
        {
            result += "<p class=\"media-album\">" + GetCurrentString("Live stream") + "</p><div>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\" class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa-solid fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\" class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa-solid fa-stop\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\" class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa-solid fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\" class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa-solid fa-pause\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetLoadingButtonId(current.GetIndex()) + "\" class=\"media-button media-button-right media-button-top media-button-big media-loading-button\" aria-label=\"" + GetCurrentString("Loading") + "\" disabled><strong><i class=\"fa-solid fa-spinner fa-spin\"></i></strong></button></div>";
        }
        else
        {
            result += "<p class=\"media-album\">" + current.GetChildrenLength().toString() + " " + GetCurrentString("channels") + "</p>";
        }

        result += "</div></div><div class=\"media-div\">";
        result += "<div class=\"media-button-group-horizontal" + (isNullOrUndefined(current.GetParent()) ? " media-button-hidden" : "") + "\"><button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa-solid fa-arrow-left\"></i></strong></button></div>";
        result += "<div class=\"media-button-group-horizontal" + (current.HasChild() ? "" : " media-button-hidden") + "\"><button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa-solid fa-arrow-right\"></i></strong></button></div>";

        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
        {
            result += "<div class=\"media-button-group-horizontal\"><button type=\"button\" id=\"" + this.GetAddFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa-regular fa-star\"></i></strong></button><button type=\"button\" id=\"" + this.GetRemoveFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa-solid fa-star\"></i></strong></button></div>";
            result += this.CreateAppWindowButtonMarkup(current);
            result += "<div class=\"media-button-group-horizontal\"><button type=\"button\" id=\"" + this.GetFullscreenButtonId(current.GetIndex()) + "\" class=\"media-button\" aria-label=\"" + GetCurrentString("Full screen") + "\"><strong><i class=\"fa-solid fa-expand\"></i></strong></button></div>";
        }

        if(this.DisplayNextButton(current) || this.DisplayPreviousButton(current))
        {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button" + (this.DisplayPreviousButton(current) ? "" : " media-button-hidden") + "\"><strong><i class=\"fa-solid fa-backward-step\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button" + (this.DisplayNextButton(current) ? "" : " media-button-hidden") + "\"><strong><i class=\"fa-solid fa-forward-step\"></i></strong></button></div>";
        }

        result += "</div></div></div></div>";
        return result;
    }

    public StartMedia(mo: IMediaObject): void
    {
        const activeIndex = this.GetMediaManager()?.GetIndexActiveMediaMediaObject();
        this.StopMiniPlayer();
        const parent = mo.GetParent();
        let muted = false;

        if(activeIndex !== undefined && activeIndex >= 0 && parent)
        {
            const active = parent.GetChildWithIndex(activeIndex);
            if(active)
            {
                const activeVideo = document.getElementById(this.GetVideoId(active.GetIndex())) as HTMLVideoElement | null;
                if(activeVideo)
                    muted = activeVideo.muted;
                this.StopMedia(active);
            }
        }

        const video = document.getElementById(this.GetVideoId(mo.GetIndex())) as HTMLVideoElement | null;
        if(!video)
            return;

        const streamUrl = mo.GetContentUrl();
        const path = streamUrl.split(/[?#]/)[0].toLowerCase();
        video.muted = muted;

        this.DestroyStream(mo.GetIndex());
        if(/\.m3u8$/.test(path))
        {
            if(video.canPlayType("application/vnd.apple.mpegurl") || video.canPlayType("application/x-mpegurl"))
            {
                video.src = streamUrl;
                video.load();
                PlayMediaElement(video, this);
            }
            else if(Hls.isSupported())
            {
                const hls = new Hls();
                let recoveringMedia = false;
                this.hlsPlayers[mo.GetIndex()] = hls;
                hls.on(Hls.Events.ERROR, (_event, data) => {
                    if(!data.fatal)
                        return;
                    console.error("HLS playback error.", data);
                    if(data.details === Hls.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR)
                    {
                        this.ShowCodecError();
                        hls.destroy();
                        delete this.hlsPlayers[mo.GetIndex()];
                    }
                    else if(data.type === Hls.ErrorTypes.MEDIA_ERROR && !recoveringMedia)
                    {
                        recoveringMedia = true;
                        hls.recoverMediaError();
                    }
                    else
                    {
                        this.ShowStreamError();
                        hls.destroy();
                    }
                });
                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    hls.loadSource(streamUrl);
                });
                hls.on(Hls.Events.MANIFEST_PARSED, () => PlayMediaElement(video, this));
                hls.attachMedia(video);
            }
            else
            {
                this.ShowStreamError();
                return;
            }
        }
        else if(/\.mpd$/.test(path))
        {
            if(!dashjs.supportsMediaSource())
            {
                this.ShowStreamError();
                return;
            }
            const player = dashjs.MediaPlayer().create();
            this.dashPlayers[mo.GetIndex()] = player;
            player.initialize(video, streamUrl, true);
            player.on(dashjs.MediaPlayer.events.ERROR, () => this.ShowStreamError());
        }
        else
        {
            this.ShowStreamError();
            return;
        }

        const background = document.getElementById(this.GetVideoBackgroundId(mo.GetIndex()));
        if(background)
            background.style.visibility = "visible";
        this.GetMediaManager()?.SetIndexActiveMediaMediaObject(mo.GetIndex());
    }

    public StopMedia(mo: IMediaObject): void
    {
        this.DestroyStream(mo.GetIndex());
        super.StopMedia(mo);
        this.hideButton(this.GetFullscreenButtonId(mo.GetIndex()));
        const video = document.getElementById(this.GetVideoId(mo.GetIndex())) as HTMLVideoElement | null;
        if(video)
        {
            video.removeAttribute("src");
            video.load();
        }
    }
    public EventPlayingMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventPlayingMedia(button, mo, v);
        const view = v as TVView;
        view.displayButton(view.GetFullscreenButtonId(mo.GetIndex()));
        view.UpdateFullscreenToggle(mo);
        view.UpdateFullscreenMute(mo);
    }
    public EventPlayMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventPlayMedia(button, mo, v);
        const view = v as TVView;
        view.displayButton(view.GetFullscreenButtonId(mo.GetIndex()));
        view.UpdateFullscreenToggle(mo);
        view.UpdateFullscreenMute(mo);
    }
    public EventPauseMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventPauseMedia(button, mo, v);
        const view = v as TVView;
        if(!view.IsFullscreen(mo))
            view.hideButton(view.GetFullscreenButtonId(mo.GetIndex()));
        view.UpdateFullscreenToggle(mo);
    }
    public EventVolumeChangeMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventVolumeChangeMedia(button, mo, v);
        (v as TVView).UpdateFullscreenMute(mo);
    }

    public EventLoadingMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        const video = document.getElementById(v.GetVideoId(mo.GetIndex())) as HTMLVideoElement | null;
        if(video && !video.paused && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)
            (v as TVView).EventReadyMedia(button, mo, v);
        else
            super.EventLoadingMedia(button, mo, v);
    }

    public EventTimeUpdateMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventTimeUpdateMedia(button, mo, v);
        const video = document.getElementById(v.GetVideoId(mo.GetIndex())) as HTMLVideoElement | null;
        if(video && !video.paused && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA)
            (v as TVView).EventReadyMedia(button, mo, v);
    }

    private DestroyStream(index: number): void
    {
        const hls = this.hlsPlayers[index];
        if(hls)
        {
            hls.destroy();
            delete this.hlsPlayers[index];
        }
        const dash = this.dashPlayers[index];
        if(dash)
        {
            dash.reset();
            delete this.dashPlayers[index];
        }
    }

    private ShowStreamError(): void
    {
        this.GetMediaManager()?.ShowAlertPopupError(GetCurrentString("Unable to play this TV stream in this browser."));
    }

    private ShowCodecError(): void
    {
        this.GetMediaManager()?.ShowAlertPopupError(GetCurrentString("This browser does not support the H.264/AAC codecs used by this TV stream."));
    }

    public CreatePreview(): string
    {
        return "<div><label>TV Preview</label></div>";
    }
}
