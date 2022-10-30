import { isNullOrUndefined } from "./Common";
import { Home } from "./Home";
import { mediaManager,SetMediaPointer,UpdateMenuBar,HideBurgerMenu } from "./Index";
import {IMediaObject} from "./IMediaObject"


export var RenderHomePage = function (id:string,bPush:boolean = true) {

    let mediaPointer:IMediaObject = new Home("Home","Home main View","","","","");
    if(!isNullOrUndefined(mediaPointer)){
        mediaManager.SetRoot(mediaPointer)
        SetMediaPointer(mediaPointer)
        mediaManager.RenderMediaView(bPush);    
    }
    /*
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return; 
        
    let result:string = "<div id=\"home\" class=\"container\"><h3>" + GetCurrentString('Home Page') + "</h3><p>" + GetCurrentString('Explore your media') + "</p>";
    result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button></div></div>";
    result += "</div></div>";
    div.innerHTML = result;
    */
    HideBurgerMenu();
    UpdateMenuBar("homeTitle");
    return;
};
// Export method:
window.RenderHomePage = RenderHomePage;

