
var isNullOrUndefined = function (value: any) {
    if ((value === null) || (value === undefined))
        return true;
    return false;
};
var isNullOrUndefinedOrEmpty = function (value: any) {
    if ((value === null) || (value === undefined))
        return true;
    if(value == "")
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
    const album1 : MediaObject = new Music("Play Loud","The B-52's - Play Loud","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const artist1 : MediaObject = new Music("The B-52's","The B-52's","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    
    album1.AddChild(music1);
    album1.AddChild(music2);
    artist1.AddChild(album1);
    menuMusic.AddChild(artist1);

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
var BuildMediaMusicObjects = function (id: string):MediaObject
{
//    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    const menuMusic : MediaObject = new Music("Music","Listen your music","","assets/img/Music.png","","");

    const music1 : MediaObject = new Music("Planet Claire","The B-52's - Play Loud - Planet Claire","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music2 : MediaObject = new Music("Rock Lobster","The B-52's - Play Loud - Rock Lobster","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const album1 : MediaObject = new Music("Play Loud","The B-52's - Play Loud","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const artist1 : MediaObject = new Music("The B-52's","Explore the albums","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    
    album1.AddChild(music1);
    album1.AddChild(music2);
    artist1.AddChild(album1);
    menuMusic.AddChild(artist1);

    menuMusic.SetId(id);
    menuMusic.SetRoot();
    menuMusic.SetCurrentMediaObject();

    return menuMusic;
}
var BuildMediaRadioObjects = function (id: string):MediaObject
{
//    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    const menuRadio : MediaObject = new Music("Radio","Listen your favorite radios","","assets/img/Radio.png","","");

    const radio1 : MediaObject = new Radio("France Inter","Radio France - France Inter","http://direct.franceinter.fr/live/franceinter-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/franceinter.png","","");
    const radio2 : MediaObject = new Radio("RMC","Radio Monte Carlo","http://rmc.bfmtv.com/rmcinfo-mp3","https://mediacloud.blob.core.windows.net/radio/rmc.png","","");
    const radio3 : MediaObject = new Radio("EUROPE1","Europe 1","http://ais-live.cloud-services.paris:8000/europe1.mp3", "https://mediacloud.blob.core.windows.net/radio/europe1.png","","");
    const radio4 : MediaObject = new Radio("RTL","Radio Télévision Luxembourg","http://streaming.radio.rtl.fr/rtl-1-44-96", "https://mediacloud.blob.core.windows.net/radio/rtl.png","","");
    const radio5 : MediaObject = new Radio("France Musique","Radio France - France Musique","http://direct.franceinter.fr/live/francemusique-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/francemusique.png","","");
    const radio6 : MediaObject = new Radio("France Culture","Radio France - France Culture","http://direct.franceculture.fr/live/franceculture-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/fc.png","","");
    const radio7 : MediaObject = new Radio("France Info","Radio France - France Info","http://direct.franceinfo.fr/live/franceinfo-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/franceinfo.png","","");
    const radio8 : MediaObject = new Radio("FIP","Radio France - France Inter Paris","http://direct.fipradio.fr/live/fip-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/fip.png","","");
    const radio9 : MediaObject = new Radio("France Bleu Armorique","Radio France - France Bleu Armorique","http://direct.francebleu.fr/live/fbarmorique-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/armorique.png","","");

    const radioGroup : MediaObject = new Radio("Radio France","Autres stations","","https://mediacloud.blob.core.windows.net/radio/fc.png","","");

   
    menuRadio.AddChild(radio1);
    menuRadio.AddChild(radio2);        
    menuRadio.AddChild(radio3);     
    menuRadio.AddChild(radio4);    
    

    menuRadio.AddChild(radio5);    
    
    menuRadio.AddChild(radio6);    
    
    menuRadio.AddChild(radio7);    
    menuRadio.AddChild(radio8);    
    menuRadio.AddChild(radio9);    
    //menuRadio.AddChild(radioGroup);    


    menuRadio.SetId(id);
    menuRadio.SetRoot();
    menuRadio.SetCurrentMediaObject();

    return menuRadio;
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
    /*
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"music\" class=\"tab-pane\"><h3>" + GetCurrentString('Music Page') + "</h3><p>" + GetCurrentString('Play your Music') + "</p></div>";
    */
   mediaPointer = BuildMediaMusicObjects(id);
   if(!isNullOrUndefined(mediaPointer)){
       mediaPointer.SetOneItemNavigation(false);   
       mediaPointer.RenderMedia(null);    
   }
   
    HideBurgerMenu();
    /* Reinitialize last audio/video index */
    MediaObject.gActiveMediaObjectIndex = -1;

    return;
};
var RenderRadioPage = function (id) {
    /*
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"radio\" class=\"tab-pane\"><h3>" + GetCurrentString('Radio Page') + "</h3><p>" + GetCurrentString('Play your radio stations') + "</p></div></div>";
    */
   mediaPointer = BuildMediaRadioObjects(id);
   if(!isNullOrUndefined(mediaPointer)){
       mediaPointer.SetOneItemNavigation(false);   
       mediaPointer.RenderMedia(null);    
   }
   
    HideBurgerMenu();
    /* Reinitialize last audio/video index */
    MediaObject.gActiveMediaObjectIndex = -1;
    return;
};
var RenderVideoPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"video\" class=\"tab-pane\"><h3>" + GetCurrentString('Video Page') + "</h3><p>" + GetCurrentString('Play your video files') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
var RenderTVPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"tv\" class=\"tab-pane\"><h3>" + GetCurrentString('TV Page') + "</h3><p>" + GetCurrentString('Play your TV channels') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
var RenderDevicePage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"device\" class=\"tab-pane\"><h3>" + GetCurrentString('Device Page') + "</h3><p>" + GetCurrentString('Explore your local devices') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
var LanguageSelectionChanged = function(){
    var s = <HTMLSelectElement>document.getElementById('languageselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)){
        currentLanguage = value;
        if (typeof(Storage) !== "undefined") 
            localStorage.setItem("mediawebapp-language",currentLanguage);
        UpdateMainPageText();
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
        if (typeof(Storage) !== "undefined") 
            localStorage.setItem("mediawebapp-color",currentColor);
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
    var result = "<div class='media-template'><div id='setting' class='tab-pane'><h3>" + GetCurrentString('Settings Page') + "</h3><p>" + GetCurrentString('Configure your application: color, language') + "</p>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Color:') + "</strong></label><div class='col-sm-8'> \
    <select id='colorselection' class='selectpicker' onchange='ColorSelectionChanged();' > \
    <option value='red' style='background-color:var(--media-button-bg-red-color)'>" + GetCurrentString('Red') + "</option> \
    <option value='green' style='background-color:var(--media-button-bg-green-color)'>" + GetCurrentString('Green') + "</option> \
    <option value='blue' style='background-color:var(--media-button-bg-blue-color)'>" + GetCurrentString('Blue') + "</option> \
    <option value='yellow' style='background-color:var(--media-button-bg-yellow-color)'>" + GetCurrentString('Yellow') + "</option> \
    <option value='purple' style='background-color:var(--media-button-bg-purple-color)'>" + GetCurrentString('Purple') + "</option> \
    <option value='orange' style='background-color:var(--media-button-bg-orange-color)'>" + GetCurrentString('Orange') + "</option> \
    </select></div></div>";
    result += "<div class='row'><label class='col-sm-4' ><strong>" + GetCurrentString('Language:') + "</strong></label><div class='col-sm-8'><select id='languageselection'  class='selectpicker' onchange='LanguageSelectionChanged();'  > \
    <option value='en' >" + GetCurrentString('English') + "</option> \
    <option value='fr' >" + GetCurrentString('French') + "</option> \
    <option value='de' >" + GetCurrentString('German') + "</option> \
    <option value='it' >" + GetCurrentString('Italian') + "</option> \
    <option value='pt' >" + GetCurrentString('Portuguese') + "</option> \
    </select></div></div></div></div>";
    div.innerHTML = result;

    HideBurgerMenu();
    ChangeColorSelection(currentColor);
    ChangeLanguageSelection(currentLanguage);
    return;
};

var RenderHomePage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return; 

    div.innerHTML = "<div class='media-template'><div id=\"home\" class=\"tab-pane\"><h3>" + GetCurrentString('Home Page') + "</h3><p>" + GetCurrentString('Explore your media') + "</p></div></div>";
    HideBurgerMenu();
    return;
};

var currentPlaybackLoop = MediaObjectPlaybackMode.Loop;
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
    ["Stop","Arrêter"],
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
    ["French","Français"],
    ["Portuguese","Portugais"],
    ["Configure your application: color, language","Configuration de votre application, couleur, langage"],
    ["Settings Page","Page de Configuration"],
    ["Color:","Couleur:"],
    ["Language:","Langage:"],
    ["Music Page","Page de musique"],
    ["TV Page","Page de TV"],
    ["Home Page","Page d'Accueil"],
    ["Video Page","Page de Vidéos"],
    ["Device Page","Page des dispositifs audio"],
    ["Back to Home","Retour à l'acceuil"],
    ["Test Media Web Application &copy;","Test Media Web Application &copy;"],
    ["Feel free to download the code from:","N'hésitez pas à télécharger le code ici:"],
    ["Web Media App","Web Media App"],
    ["HOME","ACCUEIL"],
    ["MUSIC","MUSIQUE"],
    ["VIDEO","VIDEO"],
    ["RADIO","RADIO"],
    ["TV","TV"],
    ["DEVICE","APPAREIL"],
    ["SETTINGS","PARAMETRES"],
    ["Music Page","Page de Musique"],
    ["Play your Music","Jouer vos contenus musicaux"],
    ["Radio Page","Page des radios"],
    ["Play your radio stations","Ecouter vos stations de radios"],
    ["Video Page","Page des vidéos"],
    ["Play your video files","Visualiser vos vidéos"],
    ["TV Page","Page Télévision"],
    ["Play your TV channels","Regarder vos chaines de télévision"],
    ["Device Page","Page des appareils"],
    ["Explore your local devices","Explorer vos appareils sur le réseau"],
    ["Home Page","Page d'acceuil"],
    ["Explore your media","Explorer et jouer vos contenus multi-média"],
]
);

var strings:Map<string,Map<string,string>> = new Map([
    ["en",enStrings],
    ["fr",frStrings]    
]) 

var UpdateMainPageText = function (){
    var s = <HTMLElement>document.getElementById('backHomePage');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("Back to Home");
    }
    var d = <HTMLDivElement>document.getElementById('footerTitle');
    if (!isNullOrUndefined(d)){
        d.innerHTML = GetCurrentString("Test Media Web Application &copy;");
    }
    var d = <HTMLDivElement>document.getElementById('footerMessage');
    if (!isNullOrUndefined(d)){
        d.innerHTML = GetCurrentString("Feel free to download the code from:");
    }
    s = <HTMLElement>document.getElementById('appName');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("Web Media App");
    }
    s = <HTMLElement>document.getElementById('homeTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("HOME");
    }
    s = <HTMLElement>document.getElementById('musicTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("MUSIC");
    }
    s = <HTMLElement>document.getElementById('tvTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("TV");
    }
    s = <HTMLElement>document.getElementById('videoTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("VIDEO");
    }
    s = <HTMLElement>document.getElementById('radioTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("RADIO");
    }
    s = <HTMLElement>document.getElementById('deviceTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("DEVICE");
    }
    s = <HTMLElement>document.getElementById('settingsTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("SETTINGS");
    }
}

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

var InitializeMediaApp = function (id: string, lang: string, col: string, mode: string)
{
    currentLanguage = lang;
    currentColor = col;
    var currentMode: string = mode;

    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      var language = localStorage.getItem("mediawebapp-language");
      if(isNullOrUndefined(language)){
        localStorage.setItem("mediawebapp-language",currentLanguage);
      }
      else{
        currentLanguage = language;
      }

      var color = localStorage.getItem("mediawebapp-color");
      if(isNullOrUndefined(color)){
        localStorage.setItem("mediawebapp-color",currentColor);
      }
      else{
        currentColor = color;
      }

      var pmode = localStorage.getItem("mediawebapp-mode");
      if(isNullOrUndefined(pmode)){
        localStorage.setItem("mediawebapp-mode",currentMode);
      }
      else{
        currentMode = pmode;
      }

    } 
    UpdateMainPageText();
    document.documentElement.setAttribute('theme', currentColor);
    var m = MediaObjectPlaybackMode.NoLoop; 
    if(currentMode == "loop")
        m = MediaObjectPlaybackMode.Loop;
    if(currentMode == "playlistloop")
        m = MediaObjectPlaybackMode.PlaylistLoop;

    MediaObject.SetMediaPlaybackMode(m);
    RenderHomePage(id);
}
