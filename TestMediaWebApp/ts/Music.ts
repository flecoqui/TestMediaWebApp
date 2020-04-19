
class Music extends MediaObject{

    public  CreateView(): string
    {
        var result =  "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";        
        result +=  "<strong>" + this.GetName() +"</strong></p>";   
        result +=  this.GetDescription() +"</p>";   
        result +=  "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">" ;       
        if(!isNullOrUndefined(this.GetParent())){
            result +=  "<button type=\"button\" id=\"" + this.GetParentButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>" ;
        };
        if(!isNullOrUndefined(this.GetChildWithIndex(0))){
            result +=  "<button type=\"button\" id=\"" + this.GetChildButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if(this.GetOneItemNavigation()===true)
        {

            if(!isNullOrUndefined(this.GetPrevious())){
                result +=  "<button type=\"button\" id=\"" + this.GetPreviousButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if(!isNullOrUndefined(this.GetNext())){
                result +=  "<button type=\"button\" id=\"" + this.GetNextButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        if(!isNullOrUndefined(this.GetContentUrl()))
        {

            result +=  "<audio autoplay id=\"" + this.GetAudioId() + "\" ><source id=\"" + this.GetAudioSourceId() + "\"  /></audio>";
            result +=  "<button type=\"button\" id=\"" + this.GetStartButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("Start") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetStopButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("Stop") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPlayButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("Play") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPauseButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("Pause") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("Mute") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("Unmute") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetVolumeUpButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("VolumeUp") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetVolumeDownButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("VolumeDown") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetRepeatButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("Repeat") + "</button>";
            result +=  "<button type=\"button\" id=\"" + this.GetUnrepeatButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">" + GetCurrentString("Unrepeat") + "</button>";

        }
        result +=  "</div>";
        
        if(!isNullOrUndefined(this.GetContentUrl()))
        {
            result +=  "<small class=\"text-muted\"  id=\"" + this.GetPositionId() + "\"   >00:00</small>";
            result +=  "<small class=\"text-muted\"  id=\"" + this.GetDurationId() + "\"   >00:00</small>";
        }        
        result +=  "</div></div></div>";
        return result;

    }
    public  CreatePreview(): string
    {
        return "<div><label>Menu Preview</label></div>";
    }
    
}
