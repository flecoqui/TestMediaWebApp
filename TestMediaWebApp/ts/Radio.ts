
class Radio extends MediaObject{


    public  CreateView(): string
    {
                
//        var result =  "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" ><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"></img></div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
//        result += "<div>"          


        var result =  "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" >";
        if(!isNullOrUndefinedOrEmpty(this.GetImageUrl()))
        {
            result += "<img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"></img>";
        }
        else
        {
            var count: number = 0;
            var urlArray: string[] = [];
            result += "<div class=\"carousel slide\" data-interval=\"2000\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
            for(var i = 0; i < this.GetChildListLength(); i++){
                var obj: MediaObject =  this.GetChildWithIndex(i);
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
                        result += "<div class=\"carousel-item active\"><img class=\"card-img-top\" src=\"" + urlArray[i] + "\" ></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item\"><img class=\"card-img-top\" src=\"" + urlArray[i] + "\" ></div>";
                }
            }
            else{
                result += "<div class=\"carousel-item active\"><img class=\"card-img-top\" src=\"assets/img/Music.png\" ></div>";
            }
            result += "</div></div>";
        }

        result +="</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div>"          

        if(!isNullOrUndefinedOrEmpty(this.GetContentUrl()))
        {
            result +=  "<audio  id=\"" + this.GetAudioId() + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId() + "\"  src=\"" + this.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId() + "\">00:00:00</label>";          
            result += "<div class=\"media-slider-container\" style=\"display: none\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId() + "\" ></div>";
            result +=  "<label class=\"media-duration\"  id=\"" + this.GetDurationId() + "\" style=\"display: none\"  >00:00</label>";

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
/*
        if(!isNullOrUndefinedOrEmpty(this.GetContentUrl())){
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId() + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-refresh\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId() + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-rotate-right\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId() + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-circle-o-notch\"></i></strong></button>";
            result += "</div>";
        }       
*/        
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


        return result;

    }
    public  CreatePreview(): string
    {
        return "<div><label>Menu Preview</label></div>";
    }
    
}
