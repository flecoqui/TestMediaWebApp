
/*
import { isNullOrUndefined } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { IMediaView } from "./IMediaView";
import { MediaView } from "./MediaView";
import { Menu } from "./Menu";
import { Music, MusicView } from "./Music";
import { Radio, RadioView } from "./Radio";
import { Playlist } from "./Playlist";
import { Home } from "./Home";
import { MediaPlaybackMode } from "./IMediaView";
import { GlobalVars, GetCurrentString, TestAzureStorage} from "./Common";
*/


var RenderHomePage = function (id,bPush:boolean = true) {

    mediaPointer = new Home("Home","Home main View","","","","");
    if(!isNullOrUndefined(mediaPointer)){
        mediaManager.SetRoot(mediaPointer)
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

