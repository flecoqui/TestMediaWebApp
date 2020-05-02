class Radio extends MediaObject {
    CreateViewold() {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + this.GetName() + "</strong></p>";
        result += this.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(this.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(this.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.GetOneItemNavigation() === true) {
            if (!isNullOrUndefined(this.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(this.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        if (!isNullOrUndefined(this.GetContentUrl())) {
            result += "<audio autoplay loop id=\"" + this.GetAudioId() + "\" ><source id=\"" + this.GetAudioSourceId() + "\"  /></audio>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Start</button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Stop</button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Play</button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Pause</button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Mute</button>";
            result += "<button type=\"button\" id=\"" + this.GetVolumeUpButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">VolumeUp</button>";
            result += "<button type=\"button\" id=\"" + this.GetVolumeDownButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">VolumeDown</button>";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Repeat</button>";
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    }
    CreateView() {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" ><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"></img></div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div>";
        if (!isNullOrUndefinedOrEmpty(this.GetContentUrl())) {
            result += "<audio  id=\"" + this.GetAudioId() + "\" ><source id=\"" + this.GetAudioSourceId() + "\"  src=\"" + this.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId() + "\">00:00:00</label>";
            result += "<div class=\"media-slider-container\" style=\"display: none\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId() + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId() + "\" style=\"display: none\"  >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId() + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId() + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + this.GetName() + "</strong></p></div>";
        if (!isNullOrUndefinedOrEmpty(this.GetContentUrl())) {
            result += "<div>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId() + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId() + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId() + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId() + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>";
        }
        result += "<p class=\"media-artist\" ><strong>" + this.GetArtist() + "</strong></p>";
        result += "<p class=\"media-album\" >" + this.GetAlbum() + "</p>";
        result += "</div>";
        result += "</div>";
        result += "<div class=\"media-div\" >";
        if (!isNullOrUndefined(this.GetParent())) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId() + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if (!isNullOrUndefined(this.GetChildWithIndex(0))) {
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
        if (this.GetOneItemNavigation() === true) {
            result += "<div class=\"media-button-group-horizontal\">";
            if (!isNullOrUndefined(this.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId() + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-backward\"></i></strong></button>";
            }
            if (!isNullOrUndefined(this.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId() + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-forward\"></i></strong></button>";
            }
            result += "</div>";
        }
        result += "</div>";
        result += "</div></div></div></div>";
        return result;
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
//# sourceMappingURL=Radio.js.map