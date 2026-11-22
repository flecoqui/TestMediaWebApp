import {} from "./Common";
import { IMediaObject } from "./IMediaObject";
import { IMediaView } from "./IMediaView";
import { MediaView, PlayMediaElement } from "./MediaView";
import { GlobalVars } from "./GlobalVars";
import { GetCurrentString, isNullOrUndefined, GetFileAsync, isNullOrUndefinedOrEmpty } from "./Common";



/**
 * VideoView
 */
 export   class VideoView extends MediaView{
     private slideshowActive: Record<number, boolean> = {};
     private slideshowIndices: Record<number, number> = {};

    public CreateChildView(current: IMediaObject):boolean
    {
        return this.InternalCreateChildView(current);
    }
    public RegisterViewEvents(current: IMediaObject): boolean
    {
        const result = this.internalRegisterViewEvents(current);
        this.RegisterFullscreenViewEvents(current);
        document.getElementById(this.GetFullscreenSlideshowButtonId(current.GetIndex()))?.addEventListener("click", () => this.ToggleSlideshow(current));
        document.getElementById(this.GetFullscreenExitButtonId(current.GetIndex()))?.addEventListener("click", () => this.StopSlideshow(current));
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
    public GetFirstChildImageUrl(current: IMediaObject): string | null
    {

        if(!isNullOrUndefined(current))
        {
            var url = current.GetImageUrl();
            if(!isNullOrUndefinedOrEmpty(url)){
                return url;
            }
            else
            {
                for(var i:number = 0 ; i < current.GetChildrenLength();i++){
                    var mo = current.GetChildWithIndex(i);
                    if(mo){
                        var uri:string|null = this.GetFirstChildImageUrl(mo);
                        if(!isNullOrUndefinedOrEmpty(uri)){
                            return uri;
                        }
                    }
                }
            }
        }
        return null;

    }
    public GetNumberOfChildImageUrl(current: IMediaObject): number
    {

        var counter:number = 0;
        if(!isNullOrUndefined(current))
        {
            if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
            {
                counter++;
            }
            for(var i:number = 0 ; i < current.GetChildrenLength();i++){
                var mo = current.GetChildWithIndex(i);
                if(mo)
                    counter += this.GetNumberOfChildImageUrl(mo);
            }
        }
        return counter;
    }

    public  CreateView(current: IMediaObject): string
    {
                
        var result =  "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\""+this.GetControlViewId(current.GetIndex())+"\" ><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient embed-responsive embed-responsive-16by9 \"  \" >";
        const videoType = this.GetVideoMimeType(current.GetContentUrl());
        const posterUrl = !isNullOrUndefinedOrEmpty(current.GetImageUrl()) ? current.GetImageUrl() : "assets/img/Videos.png";
        const videoMarkup = "<video class=\"media-video\" id=\"" + this.GetVideoId(current.GetIndex()) + "\" preload=\"metadata\" playsinline webkit-playsinline x-webkit-airplay=\"allow\" disablepictureinpicture controlslist=\"nodownload noplaybackrate\" poster=\"" + posterUrl + "\"><source id=\"" + this.GetVideoSourceId(current.GetIndex()) + "\" src=\"" + current.GetContentUrl() + "\"" + (videoType ? " type=\"" + videoType + "\"" : "") + " /></video>";
        //result +=  "<video  id=\"" + this.GetVideoId(current.GetIndex()) + "\" \=\"none\" ><source id=\"" + this.GetVideoSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></video>";
        if(!isNullOrUndefinedOrEmpty(current.GetImageUrl()))
        {
            if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
                result += "<div class=\"media-video-container media-fullscreen-container\" id=\"" + this.GetFullscreenContainerId(current.GetIndex()) + "\"><div id=\"" + this.GetVideoBackgroundId(current.GetIndex()) + "\" class=\"media-video-hidden media-video-background\">" + videoMarkup + "</div><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img>" + this.CreateFullscreenControlsMarkup(current, true, true) + "</div>";
            else
                result += "<div class=\"media-video-container\"><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img></div>";
        }
        else
        {
            var count: number = 0;
            var urlArray: string[] = [];
            if(isNullOrUndefinedOrEmpty(current.GetContentUrl()))
                result += "<div class=\"carousel slide media-video-container\" data-interval=\""+ GlobalVars.GetGlobalSlideShowPeriod()+"\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
            else
                result += "<div class=\"carousel slide media-video-container media-fullscreen-container\" id=\"" + this.GetFullscreenContainerId(current.GetIndex()) + "\" data-interval=\""+ GlobalVars.GetGlobalSlideShowPeriod()+"\" data-ride=\"carousel\"><div id=\"" + this.GetVideoBackgroundId(current.GetIndex()) + "\" class=\"media-video-hidden media-video-background\">" + videoMarkup + "</div><div class=\"carousel-inner\">";

            for(var i = 0; i < current.GetChildrenLength(); i++){
                var obj: IMediaObject|null =  current.GetChildWithIndex(i);
                if(obj)
                    if(!isNullOrUndefined(obj)){
                        var url = this.GetFirstChildImageUrl(obj);
                        if(!isNullOrUndefinedOrEmpty(url)){
                            if(url != null)
                                if(urlArray.indexOf(url)<= 0){
                                    urlArray.push(url);
                                }
                        }
                    }
            }
            if(urlArray.length==0){
                urlArray.push("assets/img/Videos.png");
            }
            if(urlArray.length>0){
                var active: boolean = true;
                for(var i = 0; i < urlArray.length; i++){
                    if(active == true){
                        result += "<div class=\"carousel-item  active\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item \"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                }
            }
            else{
                result += "<div class=\"carousel-item active\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"assets/img/Videos.png\" ></div></div>";
            }
            result += "</div>";
            if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
                result += this.CreateFullscreenControlsMarkup(current, true, true);
            result += "</div>";
        }

        result +="</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div class='media-playback-div'>"          


        
        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
        {
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";          
            result += "<div class=\"media-slider-container\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result +=  "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";

            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa-solid fa-volume-high\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa-solid fa-volume-xmark\"></i></strong></button></div>";
        }
        else{
            result += "<div class=\"media-slider-div media-button-hidden\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";          
            result += "<div class=\"media-slider-container \"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result +=  "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";

            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa-solid fa-volume-high\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa-solid fa-volume-xmark\"></i></strong></button></div>";

        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() +"</strong></p></div>";
    
        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl())){
            result += "<div>";
            result +=  "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa-solid fa-play\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa-solid fa-stop\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa-solid fa-play\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa-solid fa-pause\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetLoadingButtonId(current.GetIndex()) + "\" class=\"media-button media-button-right media-button-top media-button-big media-loading-button\" aria-label=\"" + GetCurrentString("Loading") + "\" disabled><strong><i class=\"fa-solid fa-spinner fa-spin\"></i></strong></button>";
            result += "</div>"
        }
        let title:string = current.GetTitle();
        let folder:string = current.GetFolder();
        let size:string = current.GetFileSize();
        let date:string = current.GetFileDate();
        if(isNullOrUndefinedOrEmpty(folder)) {
            if(!isNullOrUndefinedOrEmpty(date)||
            !isNullOrUndefinedOrEmpty(title)||
            !isNullOrUndefinedOrEmpty(size)){
            // Photo               
            result += "<p class=\"media-artist\" ><strong>"+GetCurrentString('Creation Date: ') +date +"</strong></p>";
            if(!isNullOrUndefinedOrEmpty(size))
                result += "<p class=\"media-album\" >" + GetCurrentString('Size: ')+ size + GetCurrentString(' Bytes') +"</p>";
            else
                result += "<p class=\"media-album\" ></p>";
            }
            else{
                // Folder
                let num:string =  this.GetNumberOfChildImageUrl(current).toString();
                result += "<p class=\"media-artist\" ><strong>" + title +"</strong></p>";
                result += "<p class=\"media-album\" >" + num + " " +  GetCurrentString('videos') +"</p>";
            }        
        }
        else
        { 
            // Folder
            let num:string =  this.GetNumberOfChildImageUrl(current).toString();
            result += "<p class=\"media-artist\" ><strong>" + title +"</strong></p>";
            result += "<p class=\"media-album\" >" + num + " " +  GetCurrentString('videos') +"</p>";
        }
        
        
        result += "</div>"
        result += "</div>"

        result += "<div class=\"media-div\" >";

        if(!isNullOrUndefined(current.GetParent())){
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa-solid fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        else{
            result += "<div class=\"media-button-group-horizontal  media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa-solid fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if(current.HasChild()==true){
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa-solid fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        else{
            result += "<div class=\"media-button-group-horizontal media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa-solid fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }

        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl())){
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa-solid fa-arrows-rotate\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa-solid fa-rotate-right\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa-solid fa-circle-notch\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetAddFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa-regular fa-star\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetRemoveFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa-solid fa-star\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetDownloadButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa-solid fa-cloud-arrow-down\"></i></strong></button>";
            result += "</div>";
            result += this.CreateAppWindowButtonMarkup(current);
            result += "<div class=\"media-button-group-horizontal\"><button type=\"button\" id=\"" + this.GetFullscreenButtonId(current.GetIndex()) + "\" class=\"media-button\" aria-label=\"" + GetCurrentString("Full screen") + "\"><strong><i class=\"fa-solid fa-expand\"></i></strong></button></div>";
        }       
        if( this.DisplayNextButton(current)||this.DisplayPreviousButton(current))
        {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if(this.DisplayPreviousButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa-solid fa-backward-step\"></i></strong></button>";
            }
            else{
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa-solid fa-forward-step\"></i></strong></button>";
            }

            if(this.DisplayNextButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa-solid fa-forward-step\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa-solid fa-forward-step\"></i></strong></button>";

            }
            result += "</div>";
        }

        result += "</div>";
        result += "</div></div></div></div>";


        return result;

    }
    public EventPlayingMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventPlayingMedia(button, mo, v);
        const view = v as VideoView;
        view.displayButton(view.GetFullscreenButtonId(mo.GetIndex()));
        view.UpdateFullscreenToggle(mo);
        view.UpdateFullscreenMute(mo);
        view.UpdateFullscreenTimeline(mo);
    }
    public EventPlayMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventPlayMedia(button, mo, v);
        const view = v as VideoView;
        view.displayButton(view.GetFullscreenButtonId(mo.GetIndex()));
        view.UpdateFullscreenToggle(mo);
        view.UpdateFullscreenMute(mo);
    }
    public EventPauseMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventPauseMedia(button, mo, v);
        const view = v as VideoView;
        if(!view.IsFullscreen(mo))
            view.hideButton(view.GetFullscreenButtonId(mo.GetIndex()));
        view.UpdateFullscreenToggle(mo);
    }
    public EventVolumeChangeMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventVolumeChangeMedia(button, mo, v);
        (v as VideoView).UpdateFullscreenMute(mo);
    }
    public EventTimeUpdateMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        super.EventTimeUpdateMedia(button, mo, v);
        (v as VideoView).UpdateFullscreenTimeline(mo);
    }
    public EventEndedMedia(button: any, mo: IMediaObject, v: IMediaView): void
    {
        const view = v as VideoView;
        if(view.slideshowActive[mo.GetIndex()])
        {
            view.AdvanceSlideshowVideo(mo);
            return;
        }
        super.EventEndedMedia(button, mo, v);
    }
    public StopMedia(mo: IMediaObject): void
    {
        this.StopSlideshow(mo);
        super.StopMedia(mo);
    }
    private ToggleSlideshow(current: IMediaObject): void
    {
        const index = current.GetIndex();
        if(this.slideshowActive[index])
        {
            this.StopSlideshow(current);
            return;
        }
        this.slideshowActive[index] = true;
        this.slideshowIndices[index] = current.GetIndex();
        const button = document.getElementById(this.GetFullscreenSlideshowButtonId(index)) as HTMLButtonElement | null;
        if(button)
        {
            button.classList.add("media-slideshow-active");
            button.innerHTML = "<strong><i class=\"fa-solid fa-image\"></i></strong>";
            button.setAttribute("aria-label", GetCurrentString("Stop slide show"));
        }
        const container = document.getElementById(this.GetFullscreenContainerId(index));
        container?.classList.add("media-slideshow-running");
        this.HideFullscreenControls(current);

        const video = document.getElementById(this.GetVideoId(index)) as HTMLVideoElement | null;
        if(video)
        {
            if(video.paused)
                PlayMediaElement(video, this);
            this.UpdateFullscreenToggle(current);
        }
    }
    private StopSlideshow(current: IMediaObject): void
    {
        const index = current.GetIndex();
        this.slideshowActive[index] = false;
        const button = document.getElementById(this.GetFullscreenSlideshowButtonId(index)) as HTMLButtonElement | null;
        if(button)
        {
            button.classList.remove("media-slideshow-active");
            button.innerHTML = "<strong><i class=\"fa-solid fa-photo-film\"></i></strong>";
            button.setAttribute("aria-label", GetCurrentString("Start slide show"));
        }
        const container = document.getElementById(this.GetFullscreenContainerId(index));
        container?.classList.remove("media-slideshow-running");
        this.ShowFullscreenControls(current, true);
    }
    private AdvanceSlideshowVideo(current: IMediaObject): void
    {
        const index = current.GetIndex();
        const parent = current.GetParent();
        if(!parent)
        {
            this.StopSlideshow(current);
            return;
        }
        const startIndex = this.slideshowIndices[index] ?? current.GetIndex();
        for(let offset = 1; offset <= parent.GetChildrenLength(); offset++)
        {
            const nextIndex = (startIndex + offset) % parent.GetChildrenLength();
            const next = parent.GetChildWithIndex(nextIndex);
            if(next && !isNullOrUndefinedOrEmpty(next.GetContentUrl()))
            {
                this.slideshowIndices[index] = nextIndex;
                const video = document.getElementById(this.GetVideoId(index)) as HTMLVideoElement | null;
                const source = document.getElementById(this.GetVideoSourceId(index)) as HTMLSourceElement | null;
                if(video && source)
                {
                    source.src = next.GetContentUrl();
                    video.load();
                    PlayMediaElement(video, this);
                    this.UpdateFullscreenTimeline(current);
                    this.HideFullscreenControls(current);
                }
                return;
            }
        }
        this.StopSlideshow(current);
    }
    public  CreatePreview(): string
    {
        return "<div><label>Menu Preview</label></div>";
    }

}
