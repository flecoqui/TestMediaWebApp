
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

var BuildMediaObjects = function ():IMediaObject
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
    return home;
}
var BuildMediaMusicObjects = function ():IMediaObject
{
//    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    const menuMusic : MediaObject = new Music("Music","Listen your music","","assets/img/Music.png","","");

    const music1 : MediaObject = new Music("Planet Claire","The B-52's - Play Loud - Planet Claire","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg","","");
    const music2 : MediaObject = new Music("Rock Lobster","The B-52's - Play Loud - Rock Lobster","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg","","");
    const album1 : MediaObject = new Music("Play Loud","The B-52's - Play Loud","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg","","");
    const album2 : MediaObject = new Music("Cosmic Thing","The B-52's - Cosmic Thing","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
//    const artist1 : MediaObject = new Music("The B-52's","Explore the albums","","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const artist1 : MediaObject = new Music("The B-52's","Explore the albums","","","","");
    
    const music11 : MediaObject = new Music("Love Shack","1The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music12 : MediaObject = new Music("Junebug","2The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music13: MediaObject = new Music("Roam","3The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music14 : MediaObject = new Music("Love Shack","4The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music15 : MediaObject = new Music("Junebug","5The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music16: MediaObject = new Music("Roam","6The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music17 : MediaObject = new Music("Love Shack","7The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music18 : MediaObject = new Music("Junebug","8The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music19: MediaObject = new Music("Roam","9The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music20 : MediaObject = new Music("Love Shack","10The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music21 : MediaObject = new Music("Love Shack","11The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music22 : MediaObject = new Music("Junebug","12The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music23: MediaObject = new Music("Roam","13The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music24 : MediaObject = new Music("Love Shack","14The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music25 : MediaObject = new Music("Junebug","15The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music26: MediaObject = new Music("Roam","16The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music27 : MediaObject = new Music("Love Shack","17The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music28 : MediaObject = new Music("Junebug","18The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music29: MediaObject = new Music("Roam","19The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");



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
}
var BuildMediaRadioObjects = function ():IMediaObject
{
//    const menuMusic : MediaObject = new Menu("Music","Listen your music","","assets/img/Music.png","","");
    const menuRadio : MediaObject = new Radio("Radio","Listen your favorite radios","","assets/img/Radio.png","","");

    const radio1 : MediaObject = new Radio("France Inter","Radio France - France Inter","http://direct.franceinter.fr/live/franceinter-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/franceinter.png","","");
    const radio2 : MediaObject = new Radio("RMC","Radio Monte Carlo","http://rmc.bfmtv.com/rmcinfo-mp3","https://mediacloud.blob.core.windows.net/radio/rmc.png","","");
    const radio3 : MediaObject = new Radio("EUROPE1","Europe 1","http://ais-live.cloud-services.paris:8000/europe1.mp3", "https://mediacloud.blob.core.windows.net/radio/europe1.png","","");
    const radio4 : MediaObject = new Radio("RTL","Radio Télévision Luxembourg","http://streaming.radio.rtl.fr/rtl-1-44-96", "https://mediacloud.blob.core.windows.net/radio/rtl.png","","");
    const radio5 : MediaObject = new Radio("France Musique","Radio France - France Musique","http://direct.franceinter.fr/live/francemusique-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/francemusique.png","","");
    const radio6 : MediaObject = new Radio("France Culture","Radio France - France Culture","http://direct.franceculture.fr/live/franceculture-midfi.mp3", "https://mediacloud.blob.core.windows.net/radio/fc.png","","");
    const radio7 : MediaObject = new Radio("France Info","Radio France - France Info","http://direct.franceinfo.fr/live/franceinfo-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/franceinfo.png","","");
    const radio8 : MediaObject = new Radio("FIP","Radio France - France Inter Paris","http://direct.fipradio.fr/live/fip-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/fip.png","","");
    const radio9 : MediaObject = new Radio("France Bleu Armorique","Radio France - France Bleu Armorique","http://direct.francebleu.fr/live/fbarmorique-midfi.mp3","https://mediacloud.blob.core.windows.net/radio/armorique.png","","");

//    const radioGroup : MediaObject = new Radio("Radio France","Autres stations","","https://mediacloud.blob.core.windows.net/radio/fc.png","","");
    const radioGroup : MediaObject = new Radio("Radio France","Autres stations","","","","");

   
    
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
}


var RenderMediaObjects = function (id: string): void
{

    mediaPointer = BuildMediaObjects();

    if(!isNullOrUndefined(mediaPointer)){
        mediaManager = MediaManager.CreateMediaManager("mainview",GlobalVars.GetGlobalPagination(),GlobalVars.GetGlobalPlaybackLoop());
        mediaManager.SetRoot(mediaPointer)
        mediaManager.SetCurrentMediaObject(mediaPointer)
        mediaManager.SetIndexActiveMediaMediaObject(-1);
        mediaManager.RenderMediaView();    
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
    RenderMusicPageAsync(id).then(value =>{
    });
}
window.RenderMusicPage = RenderMusicPage;

var RenderMusicPageAsync = async function (id) {

    var source: string =  "{\"_type\":\"Music\",\"_title\":\"Music\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"The B-52's\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Play Loud\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Planet Claire\",\"_mediaChildList\":[],\"_path\":\"/Play Loud/Planet Claire\",\"_description\":\"The B-52's - Play Loud - Planet Claire\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/01-B-52%27s%2C%20The-Play%20Loud-Planet%20Claire.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Rock Lobster\",\"_mediaChildList\":[],\"_path\":\"/Play Loud/Rock Lobster\",\"_description\":\"The B-52's - Play Loud - Rock Lobster\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/04-B-52%27s%2C%20The-Play%20Loud-Rock%20Lobster.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1}],\"_path\":\"/The B-52's/Play Loud\",\"_description\":\"The B-52's - Play Loud\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Play%20Loud/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Cosmic Thing\",\"_mediaChildList\":[{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":2},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":3},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":4},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":5},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":6},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":7},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":8},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":9},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":10},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":11},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":12},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":13},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":14},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":15},{\"_type\":\"Music\",\"_title\":\"Love Shack\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Love Shack\",\"_description\":\"The B-52's - Cosmic Thing - Love Shack\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":16},{\"_type\":\"Music\",\"_title\":\"Junebug\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Junebug\",\"_description\":\"The B-52's - Cosmic Thing - Junebug\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":17},{\"_type\":\"Music\",\"_title\":\"Roam\",\"_mediaChildList\":[],\"_path\":\"/Cosmic Thing/Roam\",\"_description\":\"The B-52's - Cosmic Thing - Roam\",\"_mainContentUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":18}],\"_path\":\"/The B-52's/Cosmic Thing\",\"_description\":\"The B-52's - Cosmic Thing\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":1}],\"_path\":\"/Music/The B-52's\",\"_description\":\"Explore the albums\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null,\"_index\":0}],\"_path\":\"/Music\",\"_description\":\"Listen your music\",\"_mainContentUrl\":\"\",\"_mainContentImageUrl\":\"assets/img/Music.png\",\"_previewContentUrl\":\"\",\"_previewContentImageUrl\":\"\",\"_mediaParent\":null}";
    var object : IMediaObject;


   mediaPointer = BuildMediaMusicObjects();
   if(!isNullOrUndefined(mediaPointer)){
        if(true){    
            //var source: string = MediaObject.Serialize(mediaPointer);
            source = await GetFileAsync("data/musicobject.json");
            object = MediaObject.Deserialize(source);
            if(!isNullOrUndefined(object))
            {
                mediaPointer = object;        
            }        
        }
        mediaManager = MediaManager.CreateMediaManager("mainview",GlobalVars.GetGlobalPagination(),GlobalVars.GetGlobalPlaybackLoop());
        mediaManager.SetRoot(mediaPointer)
        mediaManager.SetCurrentMediaObject(mediaPointer)
        mediaManager.SetIndexActiveMediaMediaObject(-1);
        mediaManager.RenderMediaView();    
    }

    HideBurgerMenu();
    /* Reinitialize last audio/video index */
    mediaManager.SetIndexActiveMediaMediaObject(-1);
    UpdateMenuBar("musicTitle");


    return;

};
var RenderRadioPage = function (id) {

    mediaPointer = BuildMediaRadioObjects();

    if(!isNullOrUndefined(mediaPointer)){
        mediaManager = MediaManager.CreateMediaManager("mainview",GlobalVars.GetGlobalPagination(),GlobalVars.GetGlobalPlaybackLoop());
        mediaManager.SetRoot(mediaPointer)
        mediaManager.SetCurrentMediaObject(mediaPointer)
        mediaManager.SetIndexActiveMediaMediaObject(-1);
        mediaManager.RenderMediaView();    
    }
    HideBurgerMenu();
    UpdateMenuBar("radioTitle");

    return;
};
window.RenderRadioPage = RenderRadioPage;
var RenderFavoritePage = function (id) {
    var list:IMediaObject = GlobalVars.GetGlobalFavoritePlaylists();
    var name:string = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
    if(!isNullOrUndefinedOrEmpty(name)&&!isNullOrUndefined(list)){
        mediaPointer = list;
        mediaManager = MediaManager.CreateMediaManager("mainview",GlobalVars.GetGlobalPagination(),GlobalVars.GetGlobalPlaybackLoop());
        mediaManager.SetRoot(mediaPointer)
        mediaManager.SetCurrentMediaObject(mediaPointer)
        mediaManager.SetIndexActiveMediaMediaObject(-1);
        mediaManager.RenderMediaView();    
    }
    HideBurgerMenu();
    UpdateMenuBar("favoriteTitle");

    return;
};
window.RenderFavoritePage = RenderFavoritePage;

var RenderVideoPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"video\" class=\"tab-pane\"><h3>" + GetCurrentString('Video Page') + "</h3><p>" + GetCurrentString('Play your video files') + "</p></div></div>";
    HideBurgerMenu();
    UpdateMenuBar("videoTitle");

    return;
};
window.RenderVideoPage = RenderVideoPage;

var RenderTVPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"tv\" class=\"tab-pane\"><h3>" + GetCurrentString('TV Page') + "</h3><p>" + GetCurrentString('Play your TV channels') + "</p></div></div>";
    HideBurgerMenu();
    UpdateMenuBar("tvTitle");

    return;
};
window.RenderTVPage = RenderTVPage;



var UpdateMenuBar = function (id:string){
    var array:string[] = ["homeTitle","musicTitle","radioTitle","tvTitle","videoTitle","favoriteTitle","settingsTitle"];
    for(var index:number = 0; index < array.length;index++ ){
        var menu = document.getElementById(array[index]);
        if(!isNullOrUndefined(menu)){
            if(id==array[index]){
                menu.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--media-button-bg-active-color'); // #999999
            }
            else
                menu.style.backgroundColor = 'Transparent';
        };
    }
}


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
    s = <HTMLElement>document.getElementById('settingsTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("SETTINGS");
    }
    s = <HTMLElement>document.getElementById('favoriteTitle');
    if (!isNullOrUndefined(s)){
        s.innerHTML = GetCurrentString("FAVORITE");
    }
}



var mediaManager: IMediaManager;
var mediaPointer: IMediaObject;
var InitializeMediaApp = function (id: string, lang: string, col: string, mode: string)
{
    if(isNullOrUndefined(GlobalVars.GetGlobalLanguage()) ){
        GlobalVars.SetGlobalLanguage(lang);
    }
    if(isNullOrUndefined(GlobalVars.GetGlobalColor()) ){
        GlobalVars.SetGlobalColor(col);
    }
    /*
    if(isNullOrUndefined(GlobalVars.GetGlobalAccount()) ){
        GlobalVars.SetGlobalAccount(col);
    }
    if(isNullOrUndefined(GlobalVars.GetGlobalContainer()) ){
        GlobalVars.SetGlobalContainer(col);
    }
    if(isNullOrUndefined(GlobalVars.GetGlobalSAS()) ){
        GlobalVars.SetGlobalSAS(col);
    }
    if(isNullOrUndefined(GlobalVars.GetGlobalFolder()) ){
        GlobalVars.SetGlobalFolder(col);
    }
    if(isNullOrUndefined(GlobalVars.GetGlobalMenuType()) ){
        GlobalVars.SetGlobalMenuType(col);
    }
    */
    if(GlobalVars.GetGlobalPlaybackLoop()==MediaPlaybackMode.Loop){
        var result:MediaPlaybackMode = MediaPlaybackMode.Loop;
        if(mode == "Loop")
            result = MediaPlaybackMode.Loop; 
        if(mode == "NoLoop")
            result = MediaPlaybackMode.NoLoop; 
        if(mode == "PlaylistLoop")
            result = MediaPlaybackMode.PlaylistLoop;
        GlobalVars.SetGlobalPlaybackLoop(result);
    }

    window.addEventListener('popstate', function(event) {
        // The popstate event is fired each time when the current history entry changes.
        var navigated:boolean = false;    
        if(!isNullOrUndefined(mediaManager)){
            var object:IMediaObject = mediaManager.GetCurrentMediaObject();
            if(!isNullOrUndefined(object)){
                if(isNullOrUndefined(object.GetParent())){
                }
                else
                {                    
                    mediaManager.NavigateToParent(mediaManager.GetCurrentMediaObject());
                    navigated = true;
                }
            }
        }
        if(navigated !== true){
            // Call Back button programmatically as per user confirmation.
            history.back();
           // history.pushState(null, null, window.location.pathname);
            // Uncomment below line to redirect to the previous page instead.
            // window.location = document.referrer // Note: IE11 is not supporting this.
        } else {
            // Stay on the current page.
            history.pushState(null, null, window.location.pathname);
        }
    
    
    }, false);
     UpdateMainPageText();
    document.documentElement.setAttribute('theme', GlobalVars.GetGlobalColor());
    RenderHomePage(id);
}
// Export method:
window.InitializeMediaApp = InitializeMediaApp;

// "noloop", "loop", "playlistloop"
//InitializeMediaApp("mainview", "en", "blue", "noloop");