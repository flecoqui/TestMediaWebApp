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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BuildMediaObjects = function () {
    var home = new Home("Home", "Main Menu", "", "assets/img/Home.png", "", "");
    var playlist = new Playlist("playlist1", "", "", "assets/img/Home.png", "", "");
    var menuTV = new Menu("TV", "Watch your TV program", "", "assets/img/TV.png", "", "");
    var menuVideos = new Menu("Videos", "Watch your videos", "", "assets/img/Videos.png", "", "");
    var menuMusic = new Menu("Music", "Listen your music", "", "assets/img/Music.png", "", "");
    var menuPhotos = new Menu("Photos", "Watch your photos", "", "assets/img/Pictures.png", "", "");
    var menuRadio = new Menu("Radio", "Listen radios", "", "assets/img/Radio.png", "", "");
    var menuPlaylist = new Menu("Playlist", "Listen your Playlist", "", "assets/img/Playlist.png", "", "");
    var music1 = new Music("Planet Claire", "The B-52's - Play Loud - Planet Claire", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music2 = new Music("Rock Lobster", "The B-52's - Play Loud - Rock Lobster", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var album1 = new Music("Play Loud", "The B-52's - Play Loud", "", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var artist1 = new Music("The B-52's", "The B-52's", "", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    album1.AddChild(music1);
    album1.AddChild(music2);
    artist1.AddChild(album1);
    menuMusic.AddChild(artist1);
    var radio1 = new Radio("France Inter", "Radio France - France Inter", "http://direct.franceinter.fr/live/franceinter-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/franceinter.png", "", "");
    var radio2 = new Radio("France Musique", "Radio France - France Musique", "http://direct.franceinter.fr/live/francemusique-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/francemusique.png", "", "");
    menuRadio.AddChild(radio1);
    menuRadio.AddChild(radio2);
    home.AddChild(menuRadio);
    menuPlaylist.AddChild(playlist);
    home.AddChild(menuTV);
    home.AddChild(menuVideos);
    home.AddChild(menuMusic);
    home.AddChild(menuPhotos);
    home.AddChild(menuPlaylist);
    return home;
};
var BuildMediaMusicObjects = function () {
    //    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    var menuMusic = new Music("Music", "Listen your music", "", "assets/img/Music.png", "", "");
    var music1 = new Music("Planet Claire", "The B-52's - Play Loud - Planet Claire", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg", "", "");
    var music2 = new Music("Rock Lobster", "The B-52's - Play Loud - Rock Lobster", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg", "", "");
    var album1 = new Music("Play Loud", "The B-52's - Play Loud", "", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg", "", "");
    var album2 = new Music("Cosmic Thing", "The B-52's - Cosmic Thing", "", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    //    const artist1 : MediaObject = new Music("The B-52's","Explore the albums","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    var artist1 = new Music("The B-52's", "Explore the albums", "", "", "", "");
    var music11 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music12 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music13 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music14 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music15 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music16 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music17 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music18 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music19 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music20 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music21 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music22 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music23 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music24 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music25 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music26 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music27 = new Music("Love Shack", "The B-52's - Cosmic Thing - Love Shack", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music28 = new Music("Junebug", "The B-52's - Cosmic Thing - Junebug", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    var music29 = new Music("Roam", "The B-52's - Cosmic Thing - Roam", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a", "https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg", "", "");
    album1.AddChild(music1);
    album1.AddChild(music2);
    album2.AddChild(music11);
    album2.AddChild(music12);
    album2.AddChild(music13);
    album2.AddChild(music14);
    album2.AddChild(music15);
    album2.AddChild(music16);
    album2.AddChild(music17);
    album2.AddChild(music18);
    album2.AddChild(music19);
    album2.AddChild(music20);
    album2.AddChild(music21);
    album2.AddChild(music22);
    album2.AddChild(music23);
    album2.AddChild(music24);
    album2.AddChild(music25);
    album2.AddChild(music26);
    album2.AddChild(music27);
    album2.AddChild(music28);
    album2.AddChild(music29);
    artist1.AddChild(album1);
    artist1.AddChild(album2);
    menuMusic.AddChild(artist1);
    return menuMusic;
};
var BuildMediaRadioObjects = function () {
    //    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    var menuRadio = new Radio("Radio", "Listen your favorite radios", "", "assets/img/Radio.png", "", "");
    var radio1 = new Radio("France Inter", "Radio France - France Inter", "http://direct.franceinter.fr/live/franceinter-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/franceinter.png", "", "");
    var radio2 = new Radio("RMC", "Radio Monte Carlo", "http://rmc.bfmtv.com/rmcinfo-mp3", "https://mediacloud.blob.core.windows.net/radio/rmc.png", "", "");
    var radio3 = new Radio("EUROPE1", "Europe 1", "http://ais-live.cloud-services.paris:8000/europe1.mp3", "https://mediacloud.blob.core.windows.net/radio/europe1.png", "", "");
    var radio4 = new Radio("RTL", "Radio Télévision Luxembourg", "http://streaming.radio.rtl.fr/rtl-1-44-96", "https://mediacloud.blob.core.windows.net/radio/rtl.png", "", "");
    var radio5 = new Radio("France Musique", "Radio France - France Musique", "http://direct.franceinter.fr/live/francemusique-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/francemusique.png", "", "");
    var radio6 = new Radio("France Culture", "Radio France - France Culture", "http://direct.franceculture.fr/live/franceculture-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/fc.png", "", "");
    var radio7 = new Radio("France Info", "Radio France - France Info", "http://direct.franceinfo.fr/live/franceinfo-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/franceinfo.png", "", "");
    var radio8 = new Radio("FIP", "Radio France - France Inter Paris", "http://direct.fipradio.fr/live/fip-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/fip.png", "", "");
    var radio9 = new Radio("France Bleu Armorique", "Radio France - France Bleu Armorique", "http://direct.francebleu.fr/live/fbarmorique-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/armorique.png", "", "");
    //    const radioGroup : MediaObject = new Radio("Radio France","Autres stations","","https://mediacloud.blob.core.windows.net/radio/fc.png","","");
    var radioGroup = new Radio("Radio France", "Autres stations", "", "", "", "");
    /*
        menuRadio.AddChild(radio5);
        
        menuRadio.AddChild(radio6);
        
        menuRadio.AddChild(radio7);
        menuRadio.AddChild(radio8);
        menuRadio.AddChild(radio9);
    
    */
    radioGroup.AddChild(radio5);
    radioGroup.AddChild(radio6);
    radioGroup.AddChild(radio7);
    radioGroup.AddChild(radio8);
    radioGroup.AddChild(radio9);
    menuRadio.AddChild(radioGroup);
    menuRadio.AddChild(radio1);
    menuRadio.AddChild(radio2);
    menuRadio.AddChild(radio3);
    menuRadio.AddChild(radio4);
    return menuRadio;
};
var RenderMediaObjects = function (id) {
    mediaPointer = BuildMediaObjects();
    if (!isNullOrUndefined(mediaPointer)) {
        mediaView = new MediaView("mainview", false, MediaPlaybackMode.NoLoop);
        mediaView.SetRoot(mediaPointer);
        mediaView.SetCurrentMediaObject(mediaPointer);
        mediaView.SetIndexActiveMediaMediaObject(-1);
        mediaView.RenderView();
    }
};
var HideBurgerMenu = function () {
    var button = document.getElementById("mediaburgerbutton");
    if (!isNullOrUndefined(button)) {
        button.classList.add("collapsed");
    }
    var nav = document.getElementById("navbarsExampleDefault");
    if (!isNullOrUndefined(nav)) {
        nav.classList.remove("show");
    }
};
var RenderMusicPage = function (id) {
    RenderMusicPageAsync(id).then(function (value) {
    });
};
var RenderMusicPageAsync = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var source, object;
        return __generator(this, function (_a) {
            source = "{\"_type\":\"Music\",\"_title\":\"Music\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"The B-52's\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Play Loud\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Planet Claire\",\"_mediaChildList\":[],\"_path\":\"/Play Loud/Planet Claire\",\"_description\":\"The B-52's - Play Loud - Planet Claire\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Rock Lobster\",\"_mediaChildList\":[],\"_path\":\"/Play Loud/Rock Lobster\",\"_description\":\"The B-52's - Play Loud - Rock Lobster\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1}],\"_path\":\"/The B-52's/Play Loud\",\"_description\":\"The B-52's - Play Loud\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Cosmic Thing\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":2},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":3},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":4},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":5},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":6},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":7},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":8},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":9},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":10},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":11},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":12},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":13},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":14},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":15},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":16},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":17},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":18}],\"_path\":\"/The B-52's/Cosmic Thing\",\"_description\":\"The B-52's - Cosmic Thing\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1}],\"_path\":\"/Music/The B-52's\",\"_description\":\"Explore the albums\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0}],\"_path\":\"/Music\",\"_description\":\"Listen your music\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"assets/img/Music.png\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null}";
            mediaPointer = BuildMediaMusicObjects();
            if (!isNullOrUndefined(mediaPointer)) {
                if (true) {
                    //var source: string = MediaObject.Serialize(mediaPointer);
                    //source = await GetFileAsync("musicobject.json");
                    object = MediaObject.Deserialize(source);
                    if (!isNullOrUndefined(object)) {
                        mediaPointer = object;
                    }
                }
                mediaView = new MusicView("mainview", false, GlobalVars.globalPlaybackLoop);
                mediaView.SetRoot(mediaPointer);
                mediaView.SetCurrentMediaObject(mediaPointer);
                mediaView.SetIndexActiveMediaMediaObject(-1);
                mediaView.RenderView();
            }
            HideBurgerMenu();
            /* Reinitialize last audio/video index */
            mediaView.SetIndexActiveMediaMediaObject(-1);
            return [2 /*return*/];
        });
    });
};
var RenderRadioPage = function (id) {
    TestAzureStorage();
    mediaPointer = BuildMediaRadioObjects();
    if (!isNullOrUndefined(mediaPointer)) {
        mediaView = new RadioView("mainview", false, GlobalVars.globalPlaybackLoop);
        mediaView.SetRoot(mediaPointer);
        mediaView.SetCurrentMediaObject(mediaPointer);
        mediaView.SetIndexActiveMediaMediaObject(-1);
        mediaView.RenderView();
    }
    HideBurgerMenu();
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
var LanguageSelectionChanged = function () {
    var s = document.getElementById('languageselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)) {
        GlobalVars.globalLanguage = value;
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-language", GlobalVars.globalLanguage);
        UpdateMainPageText();
    }
};
var ChangeLanguageSelection = function (lang) {
    var s = document.getElementById('languageselection');
    if (!isNullOrUndefined(s)) {
        for (var i = 0; i < s.options.length; i++) {
            if (s.options[i].value == lang) {
                s.options.selectedIndex = i;
                break;
            }
        }
    }
};
var ColorSelectionChanged = function () {
    var s = document.getElementById('colorselection');
    var value = s.options[s.selectedIndex].value;
    if (!isNullOrUndefined(value)) {
        GlobalVars.globalColor = value;
        if (typeof (Storage) !== "undefined")
            localStorage.setItem("mediawebapp-color", GlobalVars.globalColor);
        document.documentElement.setAttribute('theme', GlobalVars.globalColor);
    }
};
var ChangeColorSelection = function (color) {
    var s = document.getElementById('colorselection');
    if (!isNullOrUndefined(s)) {
        for (var i = 0; i < s.options.length; i++) {
            if (s.options[i].value == color) {
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
    ChangeColorSelection(GlobalVars.globalColor);
    ChangeLanguageSelection(GlobalVars.globalLanguage);
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
var UpdateMainPageText = function () {
    var s = document.getElementById('backHomePage');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("Back to Home");
    }
    var d = document.getElementById('footerTitle');
    if (!isNullOrUndefined(d)) {
        d.innerHTML = GetCurrentString("Test Media Web Application &copy;");
    }
    var d = document.getElementById('footerMessage');
    if (!isNullOrUndefined(d)) {
        d.innerHTML = GetCurrentString("Feel free to download the code from:");
    }
    s = document.getElementById('appName');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("Web Media App");
    }
    s = document.getElementById('homeTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("HOME");
    }
    s = document.getElementById('musicTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("MUSIC");
    }
    s = document.getElementById('tvTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("TV");
    }
    s = document.getElementById('videoTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("VIDEO");
    }
    s = document.getElementById('radioTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("RADIO");
    }
    s = document.getElementById('deviceTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("DEVICE");
    }
    s = document.getElementById('settingsTitle');
    if (!isNullOrUndefined(s)) {
        s.innerHTML = GetCurrentString("SETTINGS");
    }
};
var mediaView;
var mediaPointer;
var InitializeMediaApp = function (id, lang, col, mode) {
    GlobalVars.globalLanguage = lang;
    GlobalVars.globalColor = col;
    var currentMode = mode;
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        var language = localStorage.getItem("mediawebapp-language");
        if (isNullOrUndefined(language)) {
            localStorage.setItem("mediawebapp-language", GlobalVars.globalLanguage);
        }
        else {
            GlobalVars.globalLanguage = language;
        }
        var color = localStorage.getItem("mediawebapp-color");
        if (isNullOrUndefined(color)) {
            localStorage.setItem("mediawebapp-color", GlobalVars.globalColor);
        }
        else {
            GlobalVars.globalColor = color;
        }
        var pmode = localStorage.getItem("mediawebapp-mode");
        if (isNullOrUndefined(pmode)) {
            localStorage.setItem("mediawebapp-mode", currentMode);
        }
        else {
            currentMode = pmode;
        }
    }
    UpdateMainPageText();
    document.documentElement.setAttribute('theme', GlobalVars.globalColor);
    GlobalVars.globalPlaybackLoop = MediaPlaybackMode.NoLoop;
    if (currentMode == "loop")
        GlobalVars.globalPlaybackLoop = MediaPlaybackMode.Loop;
    if (currentMode == "playlistloop")
        GlobalVars.globalPlaybackLoop = MediaPlaybackMode.PlaylistLoop;
    RenderHomePage(id);
};
// "noloop", "loop", "playlistloop"
//InitializeMediaApp("mainview", "en", "blue", "noloop");
//# sourceMappingURL=Index.js.map