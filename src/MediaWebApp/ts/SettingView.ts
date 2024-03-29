import {GetCurrentString ,isNullOrUndefined, CreateMediaMenu, isNullOrUndefinedOrEmpty } from "./Common";
import { IMediaObject } from "./IMediaObject";
import { MediaObject } from "./MediaObject";
import { MediaView } from "./MediaView";
import { GlobalVars } from "./GlobalVars";
import { Playlist } from "./Playlist";
import { SetMediaPointer, mediaManager } from "./Index";
import { MediaModelBoxType } from "./IMediaManager";

/**
 * HomeView
 */
 export  class SettingView extends MediaView{
    public CreateChildView(current: IMediaObject):boolean
    {
        return this.InternalCreateChildView(current);
    }
    public  CreateView(current: IMediaObject): string
    {
        var result = "<div id='setting' class='container'><h3>" + GetCurrentString('Settings Page') + "</h3>";
        result += "<div class='row container'><label class='col-sm-2' ><strong>" + GetCurrentString('Version: ') + "</strong></label><div class='col-sm-4'><button   class=\"media-button media-button-version\" >" + GlobalVars.GetGlobalVersion().toString() + "</button>";
        result += "</div></div>";


        result += "<div class='container'>";
        result += "<ul class='nav nav-pills'><li class='active'><a data-toggle='pill' class='media-tab-button' id='configurationtab' onclick=\"window.UpdateTabBar('configurationtab');\" href='#configuration'>" + GetCurrentString('Configuration') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='favoritetab' onclick=\"window.UpdateTabBar('favoritetab');\"  href='#favorite'>" + GetCurrentString('Favorite') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='cloudtab' onclick=\"window.UpdateTabBar('cloudtab');\"  href='#cloud'>" + GetCurrentString('Cloud') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='devicetab' onclick=\"window.UpdateTabBar('devicetab');\"  href='#device'>" + GetCurrentString('Device') + "</a></li></ul>";
      //  result += "<ul class='nav nav-tabs'><li class='media-menu-button active'><a data-toggle='tab' href='#configuration'>" + GetCurrentString('Configuration') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#favorite'>" + GetCurrentString('Favorites') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#cloud'>" + GetCurrentString('Cloud') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#device'>" + GetCurrentString('Device') + "</a></li></ul>";

        result += "<div class='tab-content'>";

        result += "<div id='configuration' class='tab-pane fade in active'><h3>" + GetCurrentString('Application Configuration') + "</h3>";
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
        result += "<div class=\"row\"><button type=\"button\" id=\"reinitialize\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Reinitialize') + "</button></div>";
        result += "</div>";

        result += "<div id='favorite' class='tab-pane fade'><h3>" + GetCurrentString('Favorite Configuration') + "</h3>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('New favorite Playlist:') + "</strong></label><div class='col-sm-2'><input  type=\"text\" class=\"form-control \" id=\"newfavoriteplaylist\" placeholder=\"\"></div><div class='col-sm-1'></div><div class='col-sm-3'><button type=\"button\" id=\"addplaylist\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Add new playlist') + "</button></div></div>";
        result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Select the current playlist:') + "</strong></label><div class='col-sm-2'><select id='playlistselection'  class='selectpicker' onchange='window.PlaylistSelectionChanged();'  > ";
        var value:string = "";
        var defaultvalue:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var list:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
    
        if((!isNullOrUndefined(defaultvalue))&&(list)){
            for(var i:number=0;i<list.GetChildrenLength();i++){
                let mo = list.GetChildWithIndex(i);
                if(mo){
                    value = mo.GetName();
                    if(value == defaultvalue)
                        result += "<option value=\"" + value + "\" selected >" + value + "</option>"; 
                    else
                        result += "<option value=\"" + value + "\" >" + value + "</option>"; 
                }
            }
        }
    
        result += "</select></div><div class='col-sm-1'></div><div class='col-sm-3'><button type=\"button\" id=\"removeplaylist\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Remove playlist') + "</button></div></div>";
        result += "<div class=\"row\"><div class='col-sm-4'></div>";
        result += "<div class='col-sm-3'><button type=\"button\" id=\"exportplaylists\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Export all playlists') + "</button></div>";
        result += "<div class='col-sm-3'><button type=\"button\" id=\"importplaylists\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Import all playlists') + "</button></div>";
        result += "</div>";
        result += "<div class=\"row\"><label class=\"col-sm-4\" ><strong>" +  GetCurrentString('Favorite playlists content:') + "</strong></label><textarea id=\"jsontext\" class=\"col-sm-8\" style=\"height:100px;  overflow: scroll;\"></textarea></div>"
        result += "</div>";

        result += "<div id='cloud' class='tab-pane fade'><h3>" + GetCurrentString('Cloud Configuration') + "</h3>";
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

        result += "<div id='device' class='tab-pane fade'><h3>" + GetCurrentString('Device Configuration') + "</h3>";
        result += "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>";
        result += "</div>";

        result += "</div>";
        result += "</div>";

        return result;
    }

    public RegisterViewEvents(current: IMediaObject): boolean
    {
        return true;
    }
    public InitializeViewControls(current: IMediaObject): boolean
    {
        this.InitializeCloudControls();
        return true;
    }
    public MakeViewControlVisible(current: IMediaObject): boolean
    {
        return true;
    }
    public  CreatePreview(): string
    {
        return "<div><label>Home Preview</label></div>";
    }

    


    
    
    public InitializeCloudControls (){
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
                        let mediaPointer:IMediaObject = object;        
                        mediaManager.SetRoot(mediaPointer)
                        SetMediaPointer(mediaPointer)
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
                var list:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
                var control:HTMLInputElement = <HTMLInputElement>document.getElementById("newfavoriteplaylist");
                if(!isNullOrUndefined(control)){
                    value = control.value;                
                    if((!isNullOrUndefinedOrEmpty(value))){
                        if((!isNullOrUndefined(defaultvalue))&&(list)){
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
                            var list:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
                            if(list){
                                list.RemoveChildWithName(select.options[i].value);
                                GlobalVars.SetGlobalFavoritePlaylists(list);
                            }
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
                var list:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
                if(list){
                    var jsontext = <HTMLElement>document.getElementById("jsontext");
                    if(!isNullOrUndefined(jsontext)){    
                        let result:string|null = MediaObject.Serialize(list);
                        if(result)
                            jsontext.innerHTML = result;
                        /*
                        var bb = new Blob([fileContent ], { type: 'application/json' });
                        var a = document.createElement('a');
                        a.download = 'favorite.json';
                        a.href = window.URL.createObjectURL(bb);
                        a.click();
                        */
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
                if(select.options[i].value == GlobalVars.GetGlobalMenuType() ){
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

        // Emulate a click on Configuration Tab
        button = <HTMLButtonElement>document.getElementById("configurationtab");
        if(!isNullOrUndefined(button)){
            button.click();
        }

        var button = <HTMLButtonElement>document.getElementById("reinitialize");
        if(!isNullOrUndefined(button)){
            button.addEventListener("click",async function()
            {
                var result:boolean = await mediaManager.ShowModalBoxAsync(GetCurrentString("Reinitializing the local storage"),GetCurrentString("Are you sure you want to reinitialize the local storage? You will lose your configuration and your favorite playlists."),MediaModelBoxType.YesNo);
                if(result == true){
                    GlobalVars.ClearData();
                    window.location.reload();
                }
            });
        }
        ChangeColorSelection(GlobalVars.GetGlobalColor());
        ChangeLanguageSelection(GlobalVars.GetGlobalLanguage());

    }

}

var cancellationToken:boolean = false;
    
var UpdatePlaylistControls = function() {
    var defaultvalue:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
    var list:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
    var value:string = "";
    if((!isNullOrUndefined(defaultvalue))&&(list)){
        var select:HTMLSelectElement = <HTMLSelectElement>document.getElementById("playlistselection");
        if(!isNullOrUndefined(select)){
            var i:number, L:number = select.options.length - 1;
            for(i = L; i >= 0; i--) {
               select.remove(i);
            }
            
            for(i=0;i<list.GetChildrenLength();i++){
                var mo = list.GetChildWithIndex(i);
                if(mo){
                    value = mo.GetName();
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

}
var UpdateTabBar = function (id:string){
    var array:string[] = ["cloudtab","favoritetab","devicetab","configurationtab"];
    for(var index:number = 0; index < array.length;index++ ){
        var menu = document.getElementById(array[index]);
        if(!isNullOrUndefined(menu)){
            if(id==array[index]){
                if(menu){
                    menu.style.backgroundColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--media-button-bg-color'); // #999999
                    menu.style.color = getComputedStyle(document.documentElement)
                    .getPropertyValue('--media-button-text-color'); // #999999
                }
            }
            else
            {
                if(menu){
                    menu.style.backgroundColor = 'Transparent';
                    menu.style.color = getComputedStyle(document.documentElement)
                    .getPropertyValue('--media-button-bg-color'); // #999999
                }
            }
        };
    }
}
window.UpdateTabBar = UpdateTabBar;

var PaginationChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('paginationsize');
    var value = s.value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalPagination(parseInt(value));
        window.location.reload();
    }
};
window.PaginationChanged = PaginationChanged;

var SlideShowPeriodChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('slideshowperiod');
    var value = s.value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalSlideShowPeriod(parseInt(value));
        window.location.reload();
    }
};
window.SlideShowPeriodChanged = SlideShowPeriodChanged;

var LanguageSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('languageselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalLanguage(value);
        window.location.reload();
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
        //UpdateMenuBar("settingsTitle");
        //UpdateTabBar("configurationtab");
        window.location.reload();
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


