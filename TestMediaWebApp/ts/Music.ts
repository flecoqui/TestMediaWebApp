
class Music extends MediaObject{
    public  CreateView(): string
    {
                
        var result =  "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" ><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"></img></div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div>"          

        if(!isNullOrUndefinedOrEmpty(this.GetContentUrl()))
        {
            result +=  "<audio  id=\"" + this.GetAudioId() + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId() + "\"  src=\"" + this.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId() + "\">00:00</label>";          
            result += "<div class=\"media-slider-container\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId() + "\" ></div>";
            result +=  "<label class=\"media-duration\"  id=\"" + this.GetDurationId() + "\"   >00:00</label>";

            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId() + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId() + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }

        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + this.GetName() +"</strong></p></div>";
    
        if(!isNullOrUndefinedOrEmpty(this.GetContentUrl())){
            result += "<div>";
            result +=  "<button type=\"button\" id=\"" + this.GetStartButtonId() + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetStopButtonId() + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPlayButtonId() + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPauseButtonId() + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>"
        }
        result += "<p class=\"media-artist\" ><strong>" + this.GetArtist() +"</strong></p>";
        result += "<p class=\"media-album\" >" + this.GetAlbum() +"</p>";
        result += "</div>"
        result += "</div>"

        result += "<div class=\"media-div\" >";

        if(!isNullOrUndefined(this.GetParent())){
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId() + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if(!isNullOrUndefined(this.GetChildWithIndex(0))){
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId() + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }

        if(!isNullOrUndefinedOrEmpty(this.GetContentUrl())){
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId() + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-refresh\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId() + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-rotate-right\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId() + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-circle-o-notch\"></i></strong></button>";
            result += "</div>";
        }       
        if(this.GetOneItemNavigation()===true)
        {
            result += "<div class=\"media-button-group-horizontal\">";
            if(!isNullOrUndefined(this.GetPrevious())){
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId() + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-backward\"></i></strong></button>";
            }
            if(!isNullOrUndefined(this.GetNext())){
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId() + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-forward\"></i></strong></button>";
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
            result +=  "<button type=\"button\" id=\"" + this.GetParentButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("BACK") + "</strong></button>" ;
        };
        if(!isNullOrUndefined(this.GetChildWithIndex(0))){
            result +=  "<button type=\"button\" id=\"" + this.GetChildButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("CHILD") + "</strong></button>";
        }
        if(this.GetOneItemNavigation()===true)
        {

            if(!isNullOrUndefined(this.GetPrevious())){
                result +=  "<button type=\"button\" id=\"" + this.GetPreviousButtonId() + "\"  class=\"mediabutton\">" + GetCurrentString("PREVIOUS") + "</button>";
            }
            if(!isNullOrUndefined(this.GetNext())){
                result +=  "<button type=\"button\" id=\"" + this.GetNextButtonId() + "\"  class=\"mediabutton\">" + GetCurrentString("NEXT") + "</button>";
            }
        }
        result += "</div>";
        if(!isNullOrUndefined(this.GetContentUrl()))
        {

            result +=  "<audio autoplay id=\"" + this.GetAudioId() + "\" ><source id=\"" + this.GetAudioSourceId() + "\"  /></audio>";
            result += "<div class=\"mediabutton-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetStartButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("START") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetStopButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("STOP") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPlayButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("PLAY") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPauseButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("PAUSE") + "</strong></button>";
            result += "</div>"
            result += "<div class=\"btn-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Mute") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Unmute") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetVolumeUpButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("VolumeUp") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetVolumeDownButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("VolumeDown") + "</strong></button>";
            result += "</div>"
            result += "<div class=\"btn-group\">"
            result +=  "<button type=\"button\" id=\"" + this.GetRepeatButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Repeat") + "</strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetUnrepeatButtonId() + "\"  class=\"mediabutton\"><strong>" + GetCurrentString("Unrepeat") + "</strong></button>";
            result += "</div>"

        }
        
        if(!isNullOrUndefined(this.GetContentUrl()))
        {
            result += "<div>"
            result +=  "<small class=\"text-muted\"  id=\"" + this.GetPositionId() + "\"   >00:00</small>";
            result +=  "<small class=\"text-muted\"  > / </small>";
            result +=  "<small class=\"text-muted\"  id=\"" + this.GetDurationId() + "\"   >00:00</small>";
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
