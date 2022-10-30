import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
import { GetCurrentString } from "./Common";
import { GlobalVars } from "./GlobalVars";

/**
 * HomeView
 */
export class HomeView extends MediaView{
    public CreateChildView(current: IMediaObject):boolean
    {
        var div = document.getElementById(this.GetMediaManager().GetId());
        if (isNullOrUndefined(div))
            return false;
        if(div){
            let result:string = "<div id=\"home\" class=\"container\"><h3>" + GetCurrentString('Home Page') + "</h3><p>" + GetCurrentString('Explore your media') + "</p>";
            result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button></div></div>";
            result += "</div></div>";
            div.innerHTML = result;
        }
        return true
    }
    public RegisterViewEvents(current: IMediaObject): boolean
    {
        return true;
    }
    public InitializeViewControls(current: IMediaObject): boolean
    {
        return true;
    }
    public MakeViewControlVisible(current: IMediaObject): boolean
    {
        return true;
    }
    public  CreateView(current: IMediaObject): string
    {
        var result =  "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\""+this.GetControlViewId(current.GetIndex())+"\" ><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";        
        result +=  "<strong>" + current.GetName() +"</strong></p>";   
        result +=  current.GetDescription() +"</p>";   
        result +=  "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">" ;       
        if(!isNullOrUndefined(current.GetParent())){
            result +=  "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>" ;
        };
        if(!isNullOrUndefined(current.GetChildWithIndex(0))){
            result +=  "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if( this.DisplayNextButton(current)||this.DisplayPreviousButton(current))
        {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if(this.DisplayPreviousButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            if(this.DisplayNextButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            result += "</div>";
        }
        result +=  "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    }
    public  CreatePreview(): string
    {
        return "<div><label>Home Preview</label></div>";
    }
    
}



