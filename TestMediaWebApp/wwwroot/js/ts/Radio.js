var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
var Radio = /** @class */ (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Radio;
}(MediaObject));
var RadioView = /** @class */ (function (_super) {
    __extends(RadioView, _super);
    function RadioView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    RadioView.prototype.CreateView = function (current) {
        //        var result =  "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" ><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"></img></div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        //        result += "<div>"          
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\" >";
        if (!isNullOrUndefinedOrEmpty(current.GetImageUrl())) {
            result += "<img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"></img>";
        }
        else {
            var count = 0;
            var urlArray = [];
            result += "<div class=\"carousel slide\" data-interval=\"2000\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
            for (var i = 0; i < current.GetChildrenLength(); i++) {
                var obj = current.GetChildWithIndex(i);
                if (!isNullOrUndefined(obj)) {
                    var url = obj.GetImageUrl();
                    if (!isNullOrUndefinedOrEmpty(url)) {
                        if (urlArray.indexOf(url) <= 0) {
                            urlArray.push(url);
                        }
                    }
                }
            }
            if (urlArray.length > 0) {
                var active = true;
                for (var i = 0; i < urlArray.length; i++) {
                    if (active == true) {
                        result += "<div class=\"carousel-item active\"><img class=\"card-img-top\" src=\"" + urlArray[i] + "\" ></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item\"><img class=\"card-img-top\" src=\"" + urlArray[i] + "\" ></div>";
                }
            }
            else {
                result += "<div class=\"carousel-item active\"><img class=\"card-img-top\" src=\"assets/img/Music.png\" ></div>";
            }
            result += "</div></div>";
        }
        result += "</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<audio  id=\"" + this.GetAudioId(current.GetIndex()) + "\" preload=\"none\" ><source id=\"" + this.GetAudioSourceId(current.GetIndex()) + "\"  src=\"" + current.GetContentUrl() + "\" /></audio>";
            result += "<div class=\"media-slider-div\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00:00</label>";
            result += "<div class=\"media-slider-container\" style=\"display: none\"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result += "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\" style=\"display: none\"  >00:00</label>";
            result += "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";
        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() + "</strong></p></div>";
        if (!isNullOrUndefinedOrEmpty(current.GetContentUrl())) {
            result += "<div>";
            result += "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>";
        }
        result += "<p class=\"media-artist\" ><strong>" + current.GetArtist() + "</strong></p>";
        result += "<p class=\"media-album\" >" + current.GetAlbum() + "</p>";
        result += "</div>";
        result += "</div>";
        result += "<div class=\"media-div\" >";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if (current.HasChild() == true) {
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
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
        if (this.IsOneItemNavigation() === true) {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-backward\"></i></strong></button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-step-forward\"></i></strong></button>";
            }
            result += "</div>";
        }
        result += "</div>";
        result += "</div></div></div></div>";
        return result;
    };
    RadioView.prototype.CreatePreview = function () {
        return "<div><label>Menu Preview</label></div>";
    };
    return RadioView;
}(MediaView));
//# sourceMappingURL=Radio.js.map