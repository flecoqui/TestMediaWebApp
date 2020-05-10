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
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Menu
 */
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Menu;
}(MediaObject));
/**
 * MenuView
 */
var MenuView = /** @class */ (function (_super) {
    __extends(MenuView, _super);
    function MenuView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuView.prototype.RenderView = function () {
        return this.InternalRenderMedia();
    };
    MenuView.prototype.CreateView = function (current) {
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
    MenuView.prototype.CreatePreview = function () {
        return "<div><label>Menu Preview</label></div>";
    };
    return MenuView;
}(MediaView));
//# sourceMappingURL=Menu.js.map