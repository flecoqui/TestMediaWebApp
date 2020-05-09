/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
*/
/**
 * Photo
 */
class Home extends MediaObject{
}
/**
 * HomeView
 */
class HomeView extends MediaView{
    public RenderView(): boolean
    {
        return this.InternalRenderMedia();
    }
    public  CreateView(current: IMediaObject): string
    {
        var result =  "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + current.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";        
        result +=  "<strong>" + current.GetName() +"</strong></p>";   
        result +=  current.GetDescription() +"</p>";   
        result +=  "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">" ;       
        if(!isNullOrUndefined(current.GetParent())){
            result +=  "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>" ;
        };
        if(!isNullOrUndefined(current.GetChildWithIndex(0))){
            result +=  "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if(this.IsOneItemNavigation()===true)
        {

            if(!isNullOrUndefined(current.GetPrevious())){
                result +=  "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if(!isNullOrUndefined(current.GetNext())){
                result +=  "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        result +=  "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    }
    public  CreatePreview(): string
    {
        return "<div><label>Home Preview</label></div>";
    }
    
}



