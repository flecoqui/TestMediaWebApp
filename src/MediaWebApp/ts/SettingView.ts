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
        result += "<ul class='nav nav-pills'><li class='active'><a data-toggle='pill' class='media-tab-button' id='configurationtab' onclick=\"window.UpdateTabBar('configurationtab');\" href='#configuration'>" + GetCurrentString('Configuration') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='favoritetab' onclick=\"window.UpdateTabBar('favoritetab');\"  href='#favorite'>" + GetCurrentString('Favorites') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='cloudtab' onclick=\"window.UpdateTabBar('cloudtab');\"  href='#cloud'>" + GetCurrentString('Clouds') + "</a></li><li ><a data-toggle='pill'  class='media-tab-button' id='devicetab' onclick=\"window.UpdateTabBar('devicetab');\"  href='#device'>" + GetCurrentString('Devices') + "</a></li></ul>";
      //  result += "<ul class='nav nav-tabs'><li class='media-menu-button active'><a data-toggle='tab' href='#configuration'>" + GetCurrentString('Configuration') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#favorite'>" + GetCurrentString('Favorites') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#cloud'>" + GetCurrentString('Clouds') + "</a></li><li class='media-menu-button'><a data-toggle='tab' href='#device'>" + GetCurrentString('Devices') + "</a></li></ul>";

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
        <option value='es' >" + GetCurrentString('Spanish') + "</option> \
        </select></div></div>";
        result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Pagination size:') + "</strong></label><div class='col-sm-4'><input  type=\"number\" class=\"form-control\" id=\"paginationsize\" onchange='window.PaginationChanged();'  placeholder=\"" + GlobalVars.GetGlobalPagination().toString() + "\"></div></div>";
        result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Slide Show Period ms:') + "</strong></label><div class='col-sm-4'><input type=\"number\" class=\"form-control\" id=\"slideshowperiod\" min=\"100\" step=\"100\" value=\"" + GlobalVars.GetGlobalSlideShowPeriod().toString() + "\" onchange='window.SlideShowPeriodChanged();'></div></div>";    
        result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Fullscreen Inactivity Period ms:') + "</strong></label><div class='col-sm-4'><input type=\"number\" class=\"form-control\" id=\"fullscreeninactivityperiod\" min=\"100\" step=\"100\" value=\"" + GlobalVars.GetGlobalFullscreenInactivityPeriod().toString() + "\" onchange='window.FullscreenInactivityPeriodChanged();'></div></div>";    
        result += "<div class='row'><label class='col-sm-4' for='miniplayerdisplayperiod'><strong>" + GetCurrentString('Mini player display period ms:') + "</strong></label><div class='col-sm-4'><input type=\"number\" class=\"form-control\" id=\"miniplayerdisplayperiod\" min=\"100\" max=\"2147483647\" step=\"100\" value=\"" + GlobalVars.GetGlobalMiniPlayerDisplayPeriod().toString() + "\" onchange='window.MiniPlayerDisplayPeriodChanged();'></div></div>";
        result += "<div class=\"row\"><button type=\"button\" id=\"reinitialize\" class=\"media-button  media-button-text\" style=\"display: block\" >" +  GetCurrentString('Reinitialize') + "</button></div>";
        result += "</div>";

        result += "<div id='favorite' class='tab-pane fade'><h3>" + GetCurrentString('Favorite Configuration') + "</h3>";
        result += "<div class='favorite-settings'>";
        result += "<div class='row favorite-settings-row'><label class='col-sm-4' for='playlistselection'><strong>" + GetCurrentString('Current favorites playlist name:') + "</strong></label><div class='col-sm-3'><select id='playlistselection' class='form-control' onchange='window.PlaylistSelectionChanged();'></select></div><div class='col-sm-2'><button type='button' id='addplaylist' class='media-button media-button-text' disabled>" + GetCurrentString('Add new playlist') + "</button></div><div class='col-sm-3'><input type='text' class='form-control' id='newfavoriteplaylist' placeholder='" + GetCurrentString('New playlist name') + "'></div></div>";
        result += "<div class='row favorite-settings-row'><div class='col-sm-7'></div><div class='col-sm-5'><button type='button' id='removeplaylist' class='media-button media-button-text'>" + GetCurrentString('Remove current playlist') + "</button></div></div>";
        result += "<div class='row favorite-settings-row'><div class='col-sm-12 table-responsive'><table class='table favorite-playlist-table'><thead><tr><th>" + GetCurrentString('Asset name') + "</th><th>" + GetCurrentString('Asset type') + "</th><th>" + GetCurrentString('Logo') + "</th></tr></thead><tbody id='playlistitems'></tbody></table></div></div>";
        result += "<div class='row favorite-settings-row'><div class='col-sm-3'><button type='button' id='exportplaylist' class='media-button media-button-text'>" + GetCurrentString('Export playlist') + "</button></div><div class='col-sm-9'><textarea id='jsontext' class='form-control favorite-playlist-json' placeholder='" + GetCurrentString('Playlist JSON') + "'></textarea></div></div>";
        result += "<div class='row favorite-settings-row'><div class='col-sm-3'><button type='button' id='importplaylist' class='media-button media-button-text'>" + GetCurrentString('Import playlist') + "</button></div></div>";
        result += "</div>";
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
                var list:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
                var control:HTMLInputElement = <HTMLInputElement>document.getElementById("newfavoriteplaylist");
                if(control && list){
                    var value = control.value.trim();
                    if(isNullOrUndefinedOrEmpty(value))
                        return;
                    if(list.GetChildWithName(value))
                        return;
                    list.AddChild(new Playlist(value,GetCurrentString("My Playlist: ") + value,"","","",""));
                    GlobalVars.SetGlobalFavoritePlaylists(list);
                    GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
                    control.value = "";
                }
                UpdatePlaylistControls();
           });
        }
        var newPlaylist:HTMLInputElement = <HTMLInputElement>document.getElementById("newfavoriteplaylist");
        if(newPlaylist){
            newPlaylist.addEventListener("input", function(){
                var addButton = <HTMLButtonElement>document.getElementById("addplaylist");
                if(addButton)
                    addButton.disabled = isNullOrUndefinedOrEmpty(newPlaylist.value.trim());
            });
        }
        button = <HTMLButtonElement>document.getElementById("removeplaylist");
        if(!isNullOrUndefined(button)){
            button.addEventListener("click",function()
            {
                var select:HTMLSelectElement = <HTMLSelectElement>document.getElementById("playlistselection");
                if(select && !isNullOrUndefinedOrEmpty(select.value)){
                    var list:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
                    if(list){
                        list.RemoveChildWithName(select.value);
                        GlobalVars.SetGlobalFavoritePlaylists(list);
                    }
                }
                UpdatePlaylistControls();
    
           });
        }
        button = <HTMLButtonElement>document.getElementById("exportplaylist");
        if(!isNullOrUndefined(button)){
            button.addEventListener("click",function()
            {
                var list:IMediaObject|null = GlobalVars.GetGlobalFavoritePlaylists();
                var currentName = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
                var playlist = list?.GetChildWithName(currentName);
                if(playlist){
                    var jsontext = <HTMLTextAreaElement>document.getElementById("jsontext");
                    if(jsontext){    
                        let result:string|null = MediaObject.Serialize(playlist);
                        if(result)
                            jsontext.value = result;
                    }
                }
           });
        }
        button = <HTMLButtonElement>document.getElementById("importplaylist");
        if(!isNullOrUndefined(button)){
            button.addEventListener("click",function()
            {
                var jsontext = <HTMLTextAreaElement>document.getElementById("jsontext");
                if(jsontext && !isNullOrUndefinedOrEmpty(jsontext.value.trim())){
                    try {
                        var list = GlobalVars.GetGlobalFavoritePlaylists();
                        var currentName = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
                        var target = list?.GetChildWithName(currentName);
                        var imported = MediaObject.Deserialize(jsontext.value);
                        var source = imported.GetName() === "Favorite"
                            ? imported.GetChildWithName(currentName)
                            : imported;
                        if(!list || !target || !source)
                            throw new Error(GetCurrentString("No current favorites playlist is available."));
                        while(target.GetChildrenLength() > 0)
                            target.RemoveChildWithIndex(target.GetChildrenLength() - 1);
                        for(const item of source.GetChildren().slice())
                            target.AddChild(item);
                        GlobalVars.SetGlobalFavoritePlaylists(list);
                        UpdatePlaylistControls();
                    }
                    catch(error) {
                        console.error("Unable to import favorites playlist.", error);
                        mediaManager.ShowAlertPopupError(GetCurrentString("Unable to import favorites playlist."));
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
    var select:HTMLSelectElement = <HTMLSelectElement>document.getElementById("playlistselection");
    if(select){
        while(select.options.length > 0)
            select.remove(0);
        if(list){
            for(var i=0;i<list.GetChildrenLength();i++){
                var mo = list.GetChildWithIndex(i);
                if(mo){
                    var option = document.createElement("option");
                    option.text = mo.GetName();
                    option.value = mo.GetName();
                    option.selected = mo.GetName() === defaultvalue;
                    select.options.add(option);
                }
            }
        }
    }
    var current = list ? list.GetChildWithName(defaultvalue) : null;
    var addButton = <HTMLButtonElement>document.getElementById("addplaylist");
    var newPlaylist = <HTMLInputElement>document.getElementById("newfavoriteplaylist");
    if(addButton && newPlaylist)
        addButton.disabled = isNullOrUndefinedOrEmpty(newPlaylist.value.trim());
    var removeButton = <HTMLButtonElement>document.getElementById("removeplaylist");
    if(removeButton)
        removeButton.disabled = !current;
    var exportButton = <HTMLButtonElement>document.getElementById("exportplaylist");
    if(exportButton)
        exportButton.disabled = !current;
    var table = <HTMLTableSectionElement>document.getElementById("playlistitems");
    if(table)
        table.innerHTML = RenderPlaylistItems(current);
}

var RenderPlaylistItems = function(playlist:IMediaObject|null):string {
    if(!playlist || playlist.GetChildrenLength() === 0)
        return "<tr><td colspan='3'>" + EscapeHtml(GetCurrentString("No media assets in this playlist.")) + "</td></tr>";
    var result = "";
    for(var i=0; i<playlist.GetChildrenLength(); i++){
        var media = playlist.GetChildWithIndex(i);
        if(!media)
            continue;
        var type = media.GetType();
        var typeImages:Record<string,string> = {
            Music: "assets/img/Music.png",
            Radio: "assets/img/Radio.png",
            Video: "assets/img/Videos.png",
            Photo: "assets/img/Pictures.png",
            TV: "assets/img/TV.png",
            Podcast: "assets/img/Radio.png",
            Playlist: "assets/img/Playlist.png"
        };
        var typeImage = typeImages[type] ?? "assets/img/Music.png";
        var image = media.GetImageUrl();
        result += "<tr><td>" + EscapeHtml(media.GetName()) + "</td><td><img class='favorite-type-logo' src='" + EscapeHtml(typeImage) + "' alt='" + EscapeHtml(type) + "' title='" + EscapeHtml(type) + "'></td><td>";
        if(!isNullOrUndefinedOrEmpty(image))
            result += "<img class='favorite-media-logo' src='" + EscapeHtml(image) + "' alt='" + EscapeHtml(media.GetName()) + "'>";
        result += "</td></tr>";
    }
    return result;
};

var EscapeHtml = function(value:string):string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};
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
    var s = <HTMLInputElement>document.getElementById('slideshowperiod');
    var value = parseInt(s.value);
    if (!isNaN(value) && value >= 100)
        GlobalVars.SetGlobalSlideShowPeriod(value);
};
window.SlideShowPeriodChanged = SlideShowPeriodChanged;

var FullscreenInactivityPeriodChanged = function(){
    var s = <HTMLInputElement>document.getElementById('fullscreeninactivityperiod');
    var value = parseInt(s.value);
    if (!isNaN(value) && value >= 100)
        GlobalVars.SetGlobalFullscreenInactivityPeriod(value);
};
window.FullscreenInactivityPeriodChanged = FullscreenInactivityPeriodChanged;

var MiniPlayerDisplayPeriodChanged = function(){
    const input = document.getElementById('miniplayerdisplayperiod') as HTMLInputElement | null;
    if(input)
    {
        GlobalVars.SetGlobalMiniPlayerDisplayPeriod(Number(input.value));
        input.value = GlobalVars.GetGlobalMiniPlayerDisplayPeriod().toString();
    }
};
window.MiniPlayerDisplayPeriodChanged = MiniPlayerDisplayPeriodChanged;

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
        UpdateColorSelection(s, value);
        GlobalVars.SetGlobalColor(value);
        document.documentElement.setAttribute('theme', value);
        //UpdateMenuBar("settingsTitle");
        //UpdateTabBar("configurationtab");
        window.location.reload();
    }
};
window.ColorSelectionChanged = ColorSelectionChanged;

var UpdateColorSelection = function(select: HTMLSelectElement, color: string){
    var backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue(`--media-button-bg-${color}-color`)
        .trim();
    if(!isNullOrUndefinedOrEmpty(backgroundColor)){
        select.style.backgroundColor = backgroundColor;
        select.style.color = getComputedStyle(document.documentElement)
            .getPropertyValue('--media-button-text-color')
            .trim();
    }
};

var ChangeColorSelection = function(color: string){
    var s = <HTMLSelectElement>document.getElementById('colorselection');
    if (!isNullOrUndefined(s)){
        for(var i=0; i<s.options.length;i++){
            if(s.options[i].value == color ){
                s.options.selectedIndex = i;
                UpdateColorSelection(s, color);
                break;
            }
        }
    }
};

var PlaylistSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('playlistselection');
    var value = s ? s.value : "";
    if (!isNullOrUndefined(value)){
        GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
        UpdatePlaylistControls();
    }
};
window.PlaylistSelectionChanged = PlaylistSelectionChanged;


