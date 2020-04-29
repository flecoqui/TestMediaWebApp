
var isNullOrUndefined = function (value: any) {
    if ((value === null) || (value === undefined))
        return true;
    return false;
};

var BuildMediaObjects = function (id: string):MediaObject
{
    const home : MediaObject = new Home("Home","Main Menu","","assets/img/Home.png","","");
    const playlist : MediaObject = new Playlist("playlist1","","","assets/img/Home.png","","");
    const menuTV : MediaObject = new Menu("TV","Watch your TV program","","assets/img/TV.png","","");
    const menuVideos : MediaObject = new Menu("Videos","Watch your videos","","assets/img/Videos.png","","");
    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    const menuPhotos : MediaObject = new Menu("Photos","Watch your photos","","assets/img/Pictures.png","","");
    const menuRadio : MediaObject = new Menu("Radio","Listen radios","","assets/img/Radio.png","","");
    const menuPlaylist : MediaObject = new Menu("Playlist","Listen your Playlist","","assets/img/Playlist.png","","");

    const music1 : MediaObject = new Music("Planet Claire","The B-52's - Play Loud - Planet Claire","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music2 : MediaObject = new Music("Rock Lobster","The B-52's - Play Loud - Rock Lobster","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    menuMusic.AddChild(music1);
    menuMusic.AddChild(music2);

    const radio1 : MediaObject = new Radio("France Inter","Radio France - France Inter","http://direct.franceinter.fr/live/franceinter-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/franceinter.png","","");
    const radio2 : MediaObject = new Radio("France Musique","Radio France - France Musique","http://direct.franceinter.fr/live/francemusique-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/francemusique.png","","");
    menuRadio.AddChild(radio1);
    menuRadio.AddChild(radio2);    
    home.AddChild(menuRadio);
    
    menuPlaylist.AddChild(playlist);
    home.AddChild(menuTV);
    home.AddChild(menuVideos);
    home.AddChild(menuMusic);
    home.AddChild(menuPhotos);
    home.AddChild(menuPlaylist);
    home.SetId(id);
    home.SetRoot();
    home.SetCurrentMediaObject();
    return home;
}
var mediaPointer: MediaObject;

var RenderMediaObjects = function (id: string): void
{

mediaPointer = BuildMediaObjects("mainview");
mediaPointer.SetOneItemNavigation(false);

if(!isNullOrUndefined(mediaPointer)){
    mediaPointer.RenderMedia(null);    
}
}

var HideBurgerMenu = function (){
    var button = document.getElementById("mediaburgerbutton");
    if (!isNullOrUndefined(button)){
        button.classList.add("collapsed"); 
    } 
    var nav = document.getElementById("navbarsExampleDefault");
    if (!isNullOrUndefined(nav)){
        nav.classList.remove("show"); 
    }
}


var RenderMusicPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"music\" class=\"tab-pane\"><h3>Music Page</h3><p>Play your Music</p></div>";
    HideBurgerMenu();
    return;
};
var RenderRadioPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"radio\" class=\"tab-pane\"><h3>Radio Page</h3><p>Play your radio stations</p></div></div>";
    HideBurgerMenu();
    return;
};
var RenderVideoPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"video\" class=\"tab-pane\"><h3>Video Page</h3><p>Play your video files</p></div></div>";
    HideBurgerMenu();
    return;
};
var RenderTVPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"tv\" class=\"tab-pane\"><h3>TV Page</h3><p>Play your TV channels</p></div></div>";
    HideBurgerMenu();
    return;
};
var RenderDevicePage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"device\" class=\"tab-pane\"><h3>Device Page</h3><p>Explorer your local devices</p></div></div>";
    HideBurgerMenu();
    return;
};
var LanguageSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('languageselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        currentLanguage = value;
    }
};
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
        currentColor = value;
        document.documentElement.setAttribute('theme', currentColor);
    }
};
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
var RenderSettingPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"setting\" class=\"tab-pane\"><h3>Setting Page</h3><p>Configure your application</p></div>";
    div.innerHTML += "<div><select id='colorselection' onchange='ColorSelectionChanged();' > \
    <option value='red' style='background-color:var(--mediabutton-bg-red-color)'>" + GetCurrentString('Red') + "</option> \
    <option value='green' style='background-color:var(--mediabutton-bg-green-color)'>" + GetCurrentString('Green') + "</option> \
    <option value='blue' style='background-color:var(--mediabutton-bg-blue-color)'>" + GetCurrentString('Blue') + "</option> \
    <option value='yellow' style='background-color:var(--mediabutton-bg-yellow-color)'>" + GetCurrentString('Yellow') + "</option> \
    <option value='purple' style='background-color:var(--mediabutton-bg-purple-color)'>" + GetCurrentString('Purple') + "</option> \
    <option value='orange' style='background-color:var(--mediabutton-bg-orange-color)'>" + GetCurrentString('Orange') + "</option> \
    </select></div>";
    div.innerHTML += "<div><select id='languageselection' onchange='LanguageSelectionChanged();'  > \
    <option value='en' >" + GetCurrentString('English') + "</option> \
    <option value='fr' >" + GetCurrentString('French') + "</option> \
    <option value='de' >" + GetCurrentString('German') + "</option> \
    <option value='it' >" + GetCurrentString('Italian') + "</option> \
    <option value='pt' >" + GetCurrentString('Portuguese') + "</option> \
    </select></div></div>";


    HideBurgerMenu();
    ChangeColorSelection(currentColor);
    ChangeLanguageSelection(currentLanguage);
    return;
};

var RenderHomePage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return; 

    div.innerHTML = "<div class='media-template'><div id=\"home\" class=\"tab-pane\"><h3>Home Page</h3><p>Explore your media</p></div></div>";
    HideBurgerMenu();
    return;
};

/*
var mediaPointer: MediaObject;
var mediaId: string;
mediaId = "1";
mediaPointer = BuildMediaObjects(mediaId);
const test : MediaObject = new Home("Home","1");
const testChild : MediaObject = new Menu("menu1","1");
test.AddChild(testChild);
var text = JSON.stringify(test);
console.log(text);
text = JSON.stringify(mediaPointer);
console.log("");
console.log(text);


var media: MediaObject;
media = JSON.parse(text);
text = JSON.stringify(media);
console.log(text);



*/

var currentLanguage = "en";
var currentColor = "blue";

var enStrings:Map<string,string> = new Map 
([
    ["Start","Start"],
    ["Play","Play"],
    ["Pause","Pause"],
    ["Mute","Mute"],
    ["VolumeUp","+"],
    ["VolumeDown","-"],
    ["Stop","Stop"],
    ["Repeat","Repeat"]
]
);
var frStrings:Map<string,string> = new Map 
([
    ["Start","Joue"],
    ["Play","Joue"],
    ["Pause","Pause"],
    ["Mute","Silence"],
    ["VolumeUp","+"],
    ["VolumeDown","-"],
    ["Stop","Apprêter"],
    ["Repeat","Répéter"],
    ["Red","Rouge"],
    ["Blue","Bleu"],
    ["Green","Vert"],
    ["Orange","Orange"],
    ["Purple","Violet"],
    ["Yellow","Jaune"],
    ["English","Anglais"],
    ["German","Allemand"],
    ["Italian","Italien"],
    ["Portuguese","Portugais"]
]
);


var strings:Map<string,Map<string,string>> = new Map([
    ["en",enStrings],
    ["fr",frStrings]    
]) 


var GetTimeString = function (seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const hours = seconds / 3600
    const minutes = (seconds % 3600) / 60
    return [hours, minutes, seconds % 60].map(format).join(':')
  }

var GetCurrentString = function (id: string): string
{
var localStrings = strings.get(currentLanguage);
if(!isNullOrUndefined(localStrings))
{
    var s = localStrings.get(id);
    if(!isNullOrUndefined(s))
    {
        return s;
    }    
}
return id;
}
