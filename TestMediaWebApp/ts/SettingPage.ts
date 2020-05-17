
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

/*
var PaginationChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('paginationsize');
    var value = s.value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalPagination(parseInt(value));
    }
};
window.PaginationChanged = PaginationChanged;

var SlideShowPeriodChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('slideshowperiod');
    var value = s.value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalSlideShowPeriod(parseInt(value));
    }
};
window.SlideShowPeriodChanged = SlideShowPeriodChanged;

var LanguageSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('languageselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalLanguage(value);
        UpdateMainPageText();
    }
};
window.LanguageSelectionChanged = LanguageSelectionChanged;

var ChangeLanguageSelection = function(lang: string){
    var s = <HTMLSelectElement>document.getElementById('languageselection');
    if (!isNullOrUndefined(s)){
        for(var i=0; i<s.options.length;i++){
            if(s.options[i].value == lang ){
                s.options.selectedIndex = i;
                break;
            }
        }
    }
};

var ColorSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('colorselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalColor(value);
        document.documentElement.setAttribute('theme', value);
        UpdateMenuBar("settingsTitle");
    }
};
window.ColorSelectionChanged = ColorSelectionChanged;

var ChangeColorSelection = function(color: string){
    var s = <HTMLSelectElement>document.getElementById('colorselection');
    if (!isNullOrUndefined(s)){
        for(var i=0; i<s.options.length;i++){
            if(s.options[i].value == color ){
                s.options.selectedIndex = i;
                break;
            }
        }
    }
};

var PlaylistSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('playlistselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
    }
};
window.PlaylistSelectionChanged = PlaylistSelectionChanged;


var cancellationToken:boolean = false;

var UpdatePlaylistControls = function() {
    var defaultvalue:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
    var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
    var value:string = "";
    if((!isNullOrUndefined(defaultvalue))&&(!isNullOrUndefined(list))){
        var select:HTMLSelectElement = <HTMLSelectElement>document.getElementById("playlistselection");
        if(!isNullOrUndefined(select)){
            var i:number, L:number = select.options.length - 1;
            for(i = L; i >= 0; i--) {
               select.remove(i);
            }
            
            for(i=0;i<list.GetChildrenLength();i++){
                value = list.GetChildWithIndex(i).GetName();
                var option = document.createElement("option");
                option.text = value;
                option.value = value;
                if(value == defaultvalue)
                    option.selected = true;
                else
                    option.selected = false;
                select.options.add(option);
            }
        }
    }

}
var InitializeCloudControls = function (){
    var button = <HTMLButtonElement>document.getElementById("createmenu");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",async function()
        {
            var account: string = "";
            var sas: string = "";
            var container: string = "";
            var folder: string = "";
            var menutype: string = "";
            
            var input = <HTMLInputElement>document.getElementById("accountname");
            if(!isNullOrUndefined(input)){
                account = input.value;
            }
            input = <HTMLInputElement>document.getElementById("containername");
            if(!isNullOrUndefined(input)){
                container = input.value;
            }
            input = <HTMLInputElement>document.getElementById("sas");
            if(!isNullOrUndefined(input)){
                sas = input.value;
            }
            input = <HTMLInputElement>document.getElementById("foldername");
            if(!isNullOrUndefined(input)){
                folder = input.value;
            }
            var select = <HTMLSelectElement>document.getElementById("menutype");
            if(!isNullOrUndefined(select)){
                menutype = select.value;
            }
            GlobalVars.SetGlobalAccount(account);
            GlobalVars.SetGlobalContainer(container);
            GlobalVars.SetGlobalSAS(sas);
            GlobalVars.SetGlobalFolder(folder);
            GlobalVars.SetGlobalMenuType(menutype);

            cancellationToken = false;
            var button = <HTMLButtonElement>document.getElementById("createmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = true;
                button.style.display = "none";   
            }
            button = <HTMLButtonElement>document.getElementById("cancelmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = false;
                button.style.display = "block";   
            }
            GlobalVars.SetCancellationToken(false);

            await CreateMediaMenu(menutype,account,sas,container,folder,"status","result");
            button = <HTMLButtonElement>document.getElementById("createmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = false;
                button.style.display = "block";   
            }
            button = <HTMLButtonElement>document.getElementById("cancelmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = true;
                button.style.display = "none";   
            }
            var result = <HTMLElement>document.getElementById("result");
            if(!isNullOrUndefined(result)&&(!isNullOrUndefinedOrEmpty(result.innerHTML))){
                button = <HTMLButtonElement>document.getElementById("rendermenu");
                if(!isNullOrUndefined(button)){
                    button.disabled = false;
                    button.style.display = "block";   
                }
            }
        });
    }
    button = <HTMLButtonElement>document.getElementById("cancelmenu");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            GlobalVars.SetCancellationToken(true);
            var button = <HTMLButtonElement>document.getElementById("createmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = false;
                button.style.display = "block";   
            }
            button = <HTMLButtonElement>document.getElementById("cancelmenu");
            if(!isNullOrUndefined(button)){
                button.disabled = true;
                button.style.display = "none";   
            }
        });    
    }
    button = <HTMLButtonElement>document.getElementById("rendermenu");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var result = <HTMLTextAreaElement>document.getElementById("result");
            if(!isNullOrUndefined(result)&&(!isNullOrUndefinedOrEmpty(result.innerHTML))){


                var object:IMediaObject = MediaObject.Deserialize(result.value);
                if(!isNullOrUndefined(object))
                {
                    mediaPointer = object;        
                    mediaManager = MediaManager.CreateMediaManager("mainview",GlobalVars.GetGlobalPagination(),GlobalVars.GetGlobalPlaybackLoop());
                    mediaManager.SetRoot(mediaPointer)
                    mediaManager.SetCurrentMediaObject(mediaPointer)
                    mediaManager.SetIndexActiveMediaMediaObject(-1);
                    mediaManager.RenderMediaView(true);    
                }        
            }
       });
    }
    button = <HTMLButtonElement>document.getElementById("addplaylist");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var value:string = "";
            var defaultvalue:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
            var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
            var control:HTMLInputElement = <HTMLInputElement>document.getElementById("newfavoriteplaylist");
            if(!isNullOrUndefined(control)){
                value = control.value;                
                if((!isNullOrUndefinedOrEmpty(value))){
                    if((!isNullOrUndefined(defaultvalue))&&(!isNullOrUndefined(list))){
                        // Check if already exists
                        if(!isNullOrUndefined(list.GetChildWithName(value)))
                            return;
                        list.AddChild(new Playlist(value,GetCurrentString("My Playlist: ") + value,"","","",""));
                        GlobalVars.SetGlobalFavoritePlaylists(list);
                        GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
                    }
                }
            }
            UpdatePlaylistControls();
       });
    }
    button = <HTMLButtonElement>document.getElementById("removeplaylist");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var select:HTMLSelectElement = <HTMLSelectElement>document.getElementById("playlistselection");
            if(!isNullOrUndefined(select)){                             
                for(var i:number=0;i<select.options.length;i++){
                    if(select.options[i].selected == true)
                    {
                        var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
                        if((!isNullOrUndefined(list))){
                            list.RemoveChildWithName(select.options[i].value);
                        }
                        GlobalVars.SetGlobalFavoritePlaylists(list);
                    }
                }
            }
            UpdatePlaylistControls();

       });
    }
    button = <HTMLButtonElement>document.getElementById("exportplaylists");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
            if((!isNullOrUndefined(list))){
                var jsontext = <HTMLElement>document.getElementById("jsontext");
                if(!isNullOrUndefined(jsontext)){    
                    jsontext.innerHTML = MediaObject.Serialize(list);

                }
            }
       });
    }
    button = <HTMLButtonElement>document.getElementById("importplaylists");
    if(!isNullOrUndefined(button)){
        button.addEventListener("click",function()
        {
            var jsontext = <HTMLTextAreaElement>document.getElementById("jsontext");
            if((!isNullOrUndefined(jsontext))&&(!isNullOrUndefinedOrEmpty(jsontext.innerHTML))){    
                var object:IMediaObject = MediaObject.Deserialize(jsontext.value);
                if(!isNullOrUndefined(object)){
                    GlobalVars.SetGlobalFavoritePlaylists(object);
                }
            }
       });
    }
    var input = <HTMLInputElement>document.getElementById("accountname");
    if(!isNullOrUndefined(input)){
        input.value = GlobalVars.GetGlobalAccount();
    }
    input = <HTMLInputElement>document.getElementById("containername");
    if(!isNullOrUndefined(input)){
        input.value = GlobalVars.GetGlobalContainer();
    }
    input = <HTMLInputElement>document.getElementById("sas");
    if(!isNullOrUndefined(input)){
        input.value = GlobalVars.GetGlobalSAS();
    }
    input = <HTMLInputElement>document.getElementById("foldername");
    if(!isNullOrUndefined(input)){
        input.value = GlobalVars.GetGlobalFolder();
    }
    var select = <HTMLSelectElement>document.getElementById("menutype");
    if(!isNullOrUndefined(select)){
        for(var i=0; i<select.options.length;i++){
            if(select.options[i].value == GlobalVars.GetGlobalFolder() ){
                select.options.selectedIndex = i;
                break;
            }
        }
    }
    var button = <HTMLButtonElement>document.getElementById("createmenu");
    if(!isNullOrUndefined(button)){
        button.disabled = false;
        button.style.display = "block";   
    }
    button = <HTMLButtonElement>document.getElementById("cancelmenu");
    if(!isNullOrUndefined(button)){
        button.disabled = true;
        button.style.display = "none";   
    }
    button = <HTMLButtonElement>document.getElementById("rendermenu");
    if(!isNullOrUndefined(button)){
        button.disabled = true;
        button.style.display = "none";   
    }
    UpdatePlaylistControls();
    GlobalVars.SetCancellationToken(false);
}
*/
var RenderSettingPage = function (id,bPush:boolean = true) {

    mediaPointer = new Setting("Setting","Setting main View","","","","");
    if(!isNullOrUndefined(mediaPointer)){
        mediaManager = MediaManager.CreateMediaManager(id,GlobalVars.GetGlobalPagination(),GlobalVars.GetGlobalPlaybackLoop());
        mediaManager.SetRoot(mediaPointer)
        mediaManager.SetCurrentMediaObject(mediaPointer)
        mediaManager.SetIndexActiveMediaMediaObject(-1);
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
    UpdateMenuBar("settingsTitle");
    return;
};

/*
var RenderSettingsPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    var result = "<div id='setting' class='container'><h3>" + GetCurrentString('Settings Page') + "</h3>";
    result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button></div></div>";
    result +="<p></p><p><strong>" + GetCurrentString('APPLICATION CONFIGURATION:') + "</strong></p><p></p>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Color:') + "</strong></label><div class='col-sm-8'> \
    <select id='colorselection' class='selectpicker' onchange='window.ColorSelectionChanged();' > \
    <option value='red' style='background-color:var(--media-button-bg-red-color)'>" + GetCurrentString('Red') + "</option> \
    <option value='green' style='background-color:var(--media-button-bg-green-color)'>" + GetCurrentString('Green') + "</option> \
    <option value='blue' style='background-color:var(--media-button-bg-blue-color)'>" + GetCurrentString('Blue') + "</option> \
    <option value='yellow' style='background-color:var(--media-button-bg-yellow-color)'>" + GetCurrentString('Yellow') + "</option> \
    <option value='purple' style='background-color:var(--media-button-bg-purple-color)'>" + GetCurrentString('Purple') + "</option> \
    <option value='orange' style='background-color:var(--media-button-bg-orange-color)'>" + GetCurrentString('Orange') + "</option> \
    </select></div></div>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Language:') + "</strong></label><div class='col-sm-8'><select id='languageselection'  class='selectpicker' onchange='window.LanguageSelectionChanged();'  > \
    <option value='en' >" + GetCurrentString('English') + "</option> \
    <option value='fr' >" + GetCurrentString('French') + "</option> \
    <option value='de' >" + GetCurrentString('German') + "</option> \
    <option value='it' >" + GetCurrentString('Italian') + "</option> \
    <option value='pt' >" + GetCurrentString('Portuguese') + "</option> \
    </select></div></div>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Pagination size:') + "</strong></label><div class='col-sm-4'><input  type=\"number\" class=\"form-control\" id=\"paginationsize\" onchange='window.PaginationChanged();'  placeholder=\"" + GlobalVars.GetGlobalPagination().toString() + "\"></div></div>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Slide Show Period ms:') + "</strong></label><div class='col-sm-4'><input  type=\"number\" class=\"form-control\" id=\"slideshowperiod\" onchange='window.SlideShowPeriodChanged();'  placeholder=\"" + GlobalVars.GetGlobalSlideShowPeriod().toString() + "\"></div></div>";    

    result += "<p></p><p><strong>" + GetCurrentString('CONFIGURE FAVORITE PLAYLISTS:') + "</strong></p><p></p>";
    result += "<div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('New favorite Playlist:') + "</strong></label><div class='col-sm-2'><input  type=\"text\" class=\"form-control \" id=\"newfavoriteplaylist\" placeholder=\"\"></div><div class='col-sm-1'></div><div class='col-sm-3'><button type=\"button\" id=\"addplaylist\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Add new playlist') + "</button></div></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Select the current playlist:') + "</strong></label><div class='col-sm-2'><select id='playlistselection'  class='selectpicker' onchange='window.PlaylistSelectionChanged();'  > ";
    var value:string = "";
    var defaultvalue:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
    var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();

    if((!isNullOrUndefined(defaultvalue))&&(!isNullOrUndefined(list))){
        for(var i:number=0;i<list.GetChildrenLength();i++){
            value = list.GetChildWithIndex(i).GetName();
            if(value == defaultvalue)
                result += "<option value=\"" + value + "\" selected >" + value + "</option>"; 
            else
                result += "<option value=\"" + value + "\" >" + value + "</option>"; 
        }
    }

    result += "</select></div><div class='col-sm-1'></div><div class='col-sm-3'><button type=\"button\" id=\"removeplaylist\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Remove playlist') + "</button></div></div>";
    result += "<div class=\"row\"><div class='col-sm-4'></div>";
    result += "<div class='col-sm-3'><button type=\"button\" id=\"exportplaylists\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Export all playlists') + "</button></div>";
    result += "<div class='col-sm-3'><button type=\"button\" id=\"importplaylists\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Import all playlists') + "</button></div>";
    result += "</div>";
    result += "<div class=\"row\"><label class=\"col-sm-4\" ><strong>" +  GetCurrentString('Favorite playlists content:') + "</strong></label><textarea id=\"jsontext\" class=\"col-sm-8\" style=\"height:100px;  overflow: scroll;\"></textarea></div>"

    result += "</div></div>";


    result += "<p></p><p><strong>" + GetCurrentString('CREATION OF NEW CLOUD PLAYLIST:') + "</strong></p><p></p>";
    result += "<div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Account Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"accountname\" placeholder=\"" + GlobalVars.GetGlobalAccount() + "\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud SAS:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"sas\" placeholder=\"" + GlobalVars.GetGlobalSAS() + "\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Container Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"containername\" placeholder=\"" + GlobalVars.GetGlobalContainer() + "\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Folder Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"foldername\" placeholder=\"" + GlobalVars.GetGlobalFolder() + "\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Menu Type:') + "</strong></label><select id=\"menutype\" class=\"selectpicker col-sm-2\" ><option value=\"Music\">Music</option><option value=\"Photo\">Photo</option><option value=\"Video\">Video</option><option value=\"Radio\">Radio</option><option value=\"TV\">TV</option><option value=\"Playlist\">Playlist</option></select></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Status:') + "</strong></label><div class=\"col-sm-8\"><p id=\"status\" style=\"height:60px; width: 600px;\"></p></div>";
    result += "<label class=\"col-sm-4\" ><strong>" +  GetCurrentString('Result:') + "</strong></label><textarea id=\"result\" class=\"col-sm-8\" style=\"height:100px;  overflow: scroll;\"></textarea></div>";
    result += "<div class=\"row\"><button type=\"button\" id=\"createmenu\" class=\"media-button  media-button-text\" style=\"display: block\">" +  GetCurrentString('Create Menu') + "</button>";
    result += "<button type=\"button\" id=\"cancelmenu\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Cancel creation') + "</button>";
    result += "<button type=\"button\" id=\"rendermenu\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Render Menu') + "</button>";
    result += "</div></div>";
    result += "</div>";

    div.innerHTML = result;

    HideBurgerMenu();
    ChangeColorSelection(GlobalVars.GetGlobalColor());
    ChangeLanguageSelection(GlobalVars.GetGlobalLanguage());
    InitializeCloudControls();
    UpdateMenuBar("settingsTitle");
    return;
};
window.RenderSettingPage = RenderSettingPage;

*/
