/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/


/**
 * VideoView
 */
 class VideoView extends MediaView{

    public CreateChildView(current: IMediaObject):boolean
    {
        return this.InternalCreateChildView(current);
    }
    public RegisterViewEvents(current: IMediaObject): boolean
    {
        return this.internalRegisterViewEvents(current);
    }
    public InitializeViewControls(current: IMediaObject): boolean
    {
        return this.internalInitializeVieWControls(current);
    }
    public MakeViewControlVisible(current: IMediaObject): boolean
    {
        return this.InternalMakeViewControlVisible(current);
    }
    public GetFirstChildImageUrl(current: IMediaObject): string
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
                    url = this.GetFirstChildImageUrl(current.GetChildWithIndex(i));
                    if(!isNullOrUndefinedOrEmpty(url)){
                        return url;
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
                counter += this.GetNumberOfChildImageUrl(current.GetChildWithIndex(i));
            }
        }
        return counter;
    }

    public  CreateView(current: IMediaObject): string
    {
                
        var result =  "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\""+this.GetControlViewId(current.GetIndex())+"\" ><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient embed-responsive embed-responsive-16by9 \"  \" >";
        //result +=  "<video  id=\"" + this.GetVideoId(current.GetIndex()) + "\" \=\"none\" ><source id=\"" + this.GetVideoSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></video>";
        if(!isNullOrUndefinedOrEmpty(current.GetImageUrl()))
        {
            if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
                result += "<div class=\"media-video-container\"><div id=\"" + this.GetVideoBackgroundId(current.GetIndex()) + "\" class=\"media-video-hidden media-video-background\"><video class=\"media-video\"  id=\"" + this.GetVideoId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetVideoSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></video></div><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img></div>";
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
                result += "<div class=\"carousel slide media-video-container\" data-interval=\""+ GlobalVars.GetGlobalSlideShowPeriod()+"\" data-ride=\"carousel\"><div id=\"" + this.GetVideoBackgroundId(current.GetIndex()) + "\" class=\"media-video-hidden media-video-background\"><video class=\"media-video\"   id=\"" + this.GetVideoId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetVideoSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></video></div><div class=\"carousel-inner\">";

            for(var i = 0; i < current.GetChildrenLength(); i++){
                var obj: IMediaObject =  current.GetChildWithIndex(i);
                if(!isNullOrUndefined(obj)){
                    var url = this.GetFirstChildImageUrl(obj);
                    if(!isNullOrUndefinedOrEmpty(url)){
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
            result += "</div></div>";
        }

        result +="</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div class='media-playback-div'>"          


        
        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
        {
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";          
            result += "<div class=\"media-slider-container\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result +=  "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";

            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        else{
            result += "<div class=\"media-slider-div media-button-hidden\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";          
            result += "<div class=\"media-slider-container \"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result +=  "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";

            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";

        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() +"</strong></p></div>";
    
        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl())){
            result += "<div>";
            result +=  "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
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
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        else{
            result += "<div class=\"media-button-group-horizontal  media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if(current.HasChild()==true){
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        else{
            result += "<div class=\"media-button-group-horizontal media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }

        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl())){
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-refresh\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-rotate-right\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-circle-o-notch\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetAddFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star-o\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetRemoveFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetDownloadButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-cloud-download\"></i></strong></button>";
            result += "</div>";
        }       
        if( this.DisplayNextButton(current)||this.DisplayPreviousButton(current))
        {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if(this.DisplayPreviousButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else{
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }

            if(this.DisplayNextButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";

            }
            result += "</div>";
        }

        result += "</div>";
        result += "</div></div></div></div>";


        return result;

    }
    public  CreatePreview(): string
    {
        return "<div><label>Menu Preview</label></div>";
    }

}
