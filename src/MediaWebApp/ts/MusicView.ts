import { isNullOrUndefined, isNullOrUndefinedOrEmpty,GetCurrentString } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaView } from "./MediaView";
import { GlobalVars } from "./GlobalVars";



/**
 * MusicView
 */
export  class MusicView extends MediaView{
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
            result += "<div class=\"embed-responsive embed-responsive-1by1\"><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img></div>";
        }
        else
        {
            var count: number = 0;
            var urlArray: string[] = [];
            result += "<div class=\"carousel slide\" data-interval=\""+ GlobalVars.GetGlobalSlideShowPeriod()+"\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
            for(var i = 0; i < current.GetChildrenLength(); i++){
                var obj: IMediaObject|null =  current.GetChildWithIndex(i);
                if(obj)
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


        
        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
        {
            result +=  "<audio  id=\"" + this.GetAudioId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></audio>";
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
        let artist:string = current.GetArtist();
        let album:string = current.GetAlbum();
        let track:string = current.GetTrack();
        let title:string = current.GetTitle();

        if(!isNullOrUndefinedOrEmpty(artist)) {
           if(!isNullOrUndefinedOrEmpty(album)){               
                if(!isNullOrUndefinedOrEmpty(track)||
                !isNullOrUndefinedOrEmpty(title)){
                // Audio track                
                result += "<p class=\"media-artist\" ><strong>" + artist +"</strong></p>";
                if(!isNullOrUndefinedOrEmpty(track))
                    result += "<p class=\"media-album\" >" + album + " "+ GetCurrentString('Track: ')+ track+"</p>";
                else
                    result += "<p class=\"media-album\" >" + album +"</p>";
                }
                else{
                    // Album
                    let num:string = current.GetChildrenLength().toString();
                    result += "<p class=\"media-artist\" ><strong>" + artist +"</strong></p>";
                    result += "<p class=\"media-album\" >" + num + " " +  GetCurrentString('tracks') +"</p>";
                }        
            }
            else
            { 
                // Artist
                let num:string = current.GetChildrenLength().toString();
                let counter:number = 0;
                for(let i:number = 0;i<current.GetChildrenLength();i++){
                    let mo = current.GetChildWithIndex(i);
                    if(mo)
                        counter += mo.GetChildrenLength();
                }
                result += "<p class=\"media-artist\" ><strong>" + num + " " +  GetCurrentString('albums') +"</strong></p>";
                result += "<p class=\"media-album\" >" + counter.toString() + " " +  GetCurrentString('tracks') +"</p>";
            }
        }
        else {
            result += "<p class=\"media-artist\" ><strong>" + current.GetDescription() +"</strong></p>";
            result += "<p class=\"media-album\" ></p>";
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

        /*
        result +=  "<strong>" + this.GetName() +"</strong></p>";   
        result +=  this.GetDescription() +"</p>";   
        result +=  "</p><div class=\"d-flex justify-content-between align-items-center\"><div>" ;       
        result += "<div class=\"btn-group\">";
        if(!isNullOrUndefined(this.GetParent())){
            result +=  "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("BACK") + "</strong></button>" ;
        };
        if(!isNullOrUndefined(this.GetChildWithIndex(0))){
            result +=  "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("CHILD") + "</strong></button>";
        }
        if(this.GetOneItemNavigation()===true)
        {

            if(!isNullOrUndefined(this.GetPrevious())){
                result +=  "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"mediabutton\">" + GetCurrentString("PREVIOUS") + "</button>";
            }
            if(!isNullOrUndefined(this.GetNext())){
                result +=  "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"mediabutton\">" + GetCurrentString("NEXT") + "</button>";
            }
        }
        result += "</div>";
        if(!isNullOrUndefined(this.GetContentUrl()))
        {

            result +=  "<audio autoplay id=\"" + this.GetAudioId(current.GetIndex()) + "\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  /></audio>";
            result += "<div class=\"mediabutton-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("START") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("STOP") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("PLAY") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("PAUSE") + "</strong></button>";
            result += "</div>"
            result += "<div class=\"btn-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Mute") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Unmute") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetVolumeUpButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("VolumeUp") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetVolumeDownButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("VolumeDown") + "</strong></button>";
            result += "</div>"
            result += "<div class=\"btn-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetRepeatButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Repeat") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetUnrepeatButtonId(current.GetIndex()) + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Unrepeat") + "</strong></button>";
            result += "</div>"

        }
        
        if(!isNullOrUndefined(this.GetContentUrl()))
        {
            result += "<div>"
            result +=  "<small class=\"text-muted\"  id=\"" + this.GetPositionId(current.GetIndex()) + "\"   >00:00</small>";
            result +=  "<small class=\"text-muted\"  > / </small>";
            result +=  "<small class=\"text-muted\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</small>";
            result += "</div>"
        }        
        //result +=  "</div>";

        result +=  "</div></div></div>";
        */
        return result;

    }
    public  CreatePreview(): string
    {
        return "<div><label>Menu Preview</label></div>";
    }
    
}
