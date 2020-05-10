/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
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
/**
 * Playlist
 */
var Playlist = /** @class */ (function (_super) {
    __extends(Playlist, _super);
    function Playlist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Playlist;
}(MediaObject));
/**
 * PlaylistView
 */
var PlaylistView = /** @class */ (function (_super) {
    __extends(PlaylistView, _super);
    function PlaylistView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaylistView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    PlaylistView.prototype.CreateView = function (current) {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + current.GetName() + "</strong></p>";
        result += current.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(current.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(current.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.IsOneItemNavigation() === true) {
            if (!isNullOrUndefined(current.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(current.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    };
    PlaylistView.prototype.CreatePreview = function () {
        return "<div><label>Playlist Preview</label><button id=\"parentButtonId\">Left</button><button id=\"upButtonId\">Up</button><button id=\"downButtonId\">Down</button><button id=\"playButtonId\">Play</button><button id=\"childButtonId\">Child</button></div>";
    };
    return PlaylistView;
}(MediaView));
//# sourceMappingURL=Playlist.js.map