/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/

/**
 * PhotoView
 */
 class PhotoView extends MediaView{
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

    public  CreateView(current: IMediaObject): string
    {
        var result =  "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\""+this.GetControlViewId(current.GetIndex())+"\" ><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\"  \" >";
        if(!isNullOrUndefinedOrEmpty(current.GetImageUrl()))
        {
            result += "<div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img></div>";
        }
        else
        {
            var count: number = 0;
            var urlArray: string[] = [];
            result += "<div class=\"carousel slide\" data-interval=\""+ GlobalVars.GetGlobalSlideShowPeriod()+"\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
            for(var i = 0; i < current.GetChildrenLength(); i++){
                var obj: IMediaObject =  current.GetChildWithIndex(i);
                if(!isNullOrUndefined(obj)){
                    var url = obj.GetImageUrl();
                    if(!isNullOrUndefinedOrEmpty(url)){
                        if(urlArray.indexOf(url)<= 0){
                            urlArray.push(url);
                        }
                    }
                }
            }
            if(urlArray.length>0){
                var active: boolean = true;
                for(var i = 0; i < urlArray.length; i++){
                    if(active == true){
                        result += "<div class=\"carousel-item  active\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item \"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                }
            }
            else{
                result += "<div class=\"carousel-item active\"><div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"assets/img/Music.png\" ></div></div>";
            }
            result += "</div></div>";
        }

        result +="</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div class='media-playback-div'>"          


        // Placeholder
        {
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
        let folder:string = current.GetFolder();
        let size:string = current.GetFileSize();
        let date:string = current.GetFileDate();
        let title:string = current.GetTitle();

        if(isNullOrUndefinedOrEmpty(folder)) {
                if(!isNullOrUndefinedOrEmpty(date)||
                !isNullOrUndefinedOrEmpty(title)||
                !isNullOrUndefinedOrEmpty(size)){
                // Audio track                
                result += "<p class=\"media-artist\" ><strong>" + title +"</strong></p>";
                if(!isNullOrUndefinedOrEmpty(size))
                    result += "<p class=\"media-album\" >" + date + " "+ GetCurrentString('Size: ')+ size +"</p>";
                else
                    result += "<p class=\"media-album\" >" + date +"</p>";
                }
                else{
                    // Album
                    let num:string = current.GetChildrenLength().toString();
                    result += "<p class=\"media-artist\" ><strong>" + title +"</strong></p>";
                    result += "<p class=\"media-album\" >" + num + " " +  GetCurrentString('photos') +"</p>";
                }        
            }
            else
            { 
                // Artist
                let num:string = current.GetChildrenLength().toString();
                let counter:number = 0;
                for(let i:number = 0;i<current.GetChildrenLength();i++){
                    counter += current.GetChildWithIndex(i).GetChildrenLength();
                }
                result += "<p class=\"media-artist\" ><strong>" + num + " " +  GetCurrentString('albums') +"</strong></p>";
                result += "<p class=\"media-album\" >" + counter.toString() + " " +  GetCurrentString('tracks') +"</p>";
            }
        /*
        }
        else {
            result += "<p class=\"media-artist\" ><strong>" + current.GetDescription() +"</strong></p>";
            result += "<p class=\"media-album\" ></p>";
        }
        */
        
        
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
