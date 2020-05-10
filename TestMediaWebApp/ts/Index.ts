
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
    
    const music11 : MediaObject = new Music("Love Shack","The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music12 : MediaObject = new Music("Junebug","The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music13: MediaObject = new Music("Roam","The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music14 : MediaObject = new Music("Love Shack","The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music15 : MediaObject = new Music("Junebug","The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music16: MediaObject = new Music("Roam","The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music17 : MediaObject = new Music("Love Shack","The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music18 : MediaObject = new Music("Junebug","The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music19: MediaObject = new Music("Roam","The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music20 : MediaObject = new Music("Love Shack","The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music21 : MediaObject = new Music("Love Shack","The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music22 : MediaObject = new Music("Junebug","The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music23: MediaObject = new Music("Roam","The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music24 : MediaObject = new Music("Love Shack","The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music25 : MediaObject = new Music("Junebug","The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music26: MediaObject = new Music("Roam","The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music27 : MediaObject = new Music("Love Shack","The B-52's - Cosmic Thing - Love Shack","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/04-B-52%27s%2C%20The-Cosmic%20Thing-Love%20Shack.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music28 : MediaObject = new Music("Junebug","The B-52's - Cosmic Thing - Junebug","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/05-B-52%27s%2C%20The-Cosmic%20Thing-Junebug.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");
    const music29: MediaObject = new Music("Roam","The B-52's - Cosmic Thing - Roam","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/06-B-52%27s%2C%20The-Cosmic%20Thing-Roam.m4a","https://mediacloud.blob.core.windows.net/music/B-52%27s%2C%20The/Cosmic%20Thing/artwork.jpg","","");



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
        mediaView = new MediaView("mainview",false,MediaPlaybackMode.NoLoop);
        mediaView.SetRoot(mediaPointer)
        mediaView.SetCurrentMediaObject(mediaPointer)
        mediaView.SetIndexActiveMediaMediaObject(-1);
        mediaView.RenderView();    
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
            //source = await GetFileAsync("musicobject.json");
            object = MediaObject.Deserialize(source);
            if(!isNullOrUndefined(object))
            {
                mediaPointer = object;        
            }        
        }
        mediaView = new MusicView("mainview",false,GlobalVars.GetGlobalPlaybackLoop());
        mediaView.SetRoot(mediaPointer)
        mediaView.SetCurrentMediaObject(mediaPointer)
        mediaView.SetIndexActiveMediaMediaObject(-1);
        mediaView.RenderView();    
   }

    HideBurgerMenu();
    /* Reinitialize last audio/video index */
    mediaView.SetIndexActiveMediaMediaObject(-1);


    return;

};
var RenderRadioPage = function (id) {

    mediaPointer = BuildMediaRadioObjects();

    if(!isNullOrUndefined(mediaPointer)){
        mediaView = new RadioView("mainview",false,GlobalVars.GetGlobalPlaybackLoop());
        mediaView.SetRoot(mediaPointer)
        mediaView.SetCurrentMediaObject(mediaPointer)
        mediaView.SetIndexActiveMediaMediaObject(-1);
        mediaView.RenderView();    
    }
    HideBurgerMenu();
    return;
};
window.RenderRadioPage = RenderRadioPage;

var RenderVideoPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"video\" class=\"tab-pane\"><h3>" + GetCurrentString('Video Page') + "</h3><p>" + GetCurrentString('Play your video files') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
window.RenderVideoPage = RenderVideoPage;

var RenderTVPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"tv\" class=\"tab-pane\"><h3>" + GetCurrentString('TV Page') + "</h3><p>" + GetCurrentString('Play your TV channels') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
window.RenderTVPage = RenderTVPage;

var RenderDevicePage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    div.innerHTML = "<div class='media-template'><div id=\"device\" class=\"tab-pane\"><h3>" + GetCurrentString('Device Page') + "</h3><p>" + GetCurrentString('Explore your local devices') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
window.RenderDevicePage = RenderDevicePage;

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
var cancellationToken:boolean = false;

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
            var result = <HTMLElement>document.getElementById("result");
            if(!isNullOrUndefined(result)&&(!isNullOrUndefinedOrEmpty(result.innerText))){


                var object:IMediaObject = MediaObject.Deserialize(result.innerText);
                if(!isNullOrUndefined(object))
                {
                    mediaPointer = object;        
                    mediaView = new MusicView("mainview",false,GlobalVars.GetGlobalPlaybackLoop());
                    mediaView.SetRoot(mediaPointer)
                    mediaView.SetCurrentMediaObject(mediaPointer)
                    mediaView.SetIndexActiveMediaMediaObject(-1);
                    mediaView.RenderView();    
                }        
            }
       });
    }
    var input = <HTMLInputElement>document.getElementById("accountname");
    if(!isNullOrUndefined(input)){
        input.defaultValue = GlobalVars.GetGlobalAccount();
    }
    input = <HTMLInputElement>document.getElementById("containername");
    if(!isNullOrUndefined(input)){
        input.defaultValue = GlobalVars.GetGlobalContainer();
    }
    input = <HTMLInputElement>document.getElementById("sas");
    if(!isNullOrUndefined(input)){
        input.defaultValue = GlobalVars.GetGlobalSAS();
    }
    input = <HTMLInputElement>document.getElementById("foldername");
    if(!isNullOrUndefined(input)){
        input.defaultValue = GlobalVars.GetGlobalFolder();
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
    GlobalVars.SetCancellationToken(false);
}

var RenderSettingPage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return;
    var result = "<div class='media-template'><div id='setting' class='tab-pane'><h3>" + GetCurrentString('Settings Page') + "</h3><p></p><p><strong>" + GetCurrentString('Configure your application: color, language') + "</strong></p><p></p>";
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
    result += "<p></p><p><strong>" + GetCurrentString('Create a new Media Menu from the Cloud:') + "</strong></p><p></p>";
    result += "<div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Account Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"accountname\" placeholder=\"mediacloud\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud SAS:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"sas\" placeholder=\"<to be filled>\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Container Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"containername\" placeholder=\"music\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Cloud Folder Name:') + "</strong></label><input  type=\"text\" class=\"form-control col-sm-4\" id=\"foldername\" placeholder=\"\"></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Menu Type:') + "</strong></label><select id=\"menutype\" class=\"selectpicker col-sm-4\" ><option value=\"Music\">Music</option><option value=\"Photo\">Photo</option><option value=\"Video\">Video</option><option value=\"Radio\">Radio</option><option value=\"TV\">TV</option><option value=\"Playlist\">Playlist</option></select></div>";
    result += "<div class=\"row\"><label  class=\"col-sm-4\"  ><strong>" +  GetCurrentString('Status:') + "</strong></label><div class=\"col-sm-8\"><p id=\"status\" style=\"height:60px; width: 600px; overflow: scroll;\"></p></div>";
    result += "<label class=\"col-sm-4\" ><strong>" +  GetCurrentString('Result:') + "</strong></label><div class=\"col-sm-8\"><p id=\"result\" style=\"height:200px; width: 600px; overflow: scroll;\"></p></div></div>";
    result += "<div class=\"row\"><button type=\"button\" id=\"createmenu\" class=\"media-button media-button-blue media-button-text\" style=\"display: block\">" +  GetCurrentString('Create Menu') + "</button>";
    result += "<button type=\"button\" id=\"cancelmenu\" class=\"media-button media-button-blue media-button-text\" style=\"display: block\" >" +  GetCurrentString('Cancel creation') + "</button>";
    result += "<button type=\"button\" id=\"rendermenu\" class=\"media-button media-button-blue media-button-text\" style=\"display: block\" >" +  GetCurrentString('Render Menu') + "</button>";
    result += "</div></div>";
    result += "</div></div>";

    div.innerHTML = result;

    HideBurgerMenu();
    ChangeColorSelection(GlobalVars.GetGlobalColor());
    ChangeLanguageSelection(GlobalVars.GetGlobalLanguage());
    InitializeCloudControls();
    return;
};
window.RenderSettingPage = RenderSettingPage;


var RenderHomePage = function (id) {
    var div = document.getElementById(id);
    if (isNullOrUndefined(div))
        return; 

    div.innerHTML = "<div class='media-template'><div id=\"home\" class=\"tab-pane\"><h3>" + GetCurrentString('Home Page') + "</h3><p>" + GetCurrentString('Explore your media') + "</p></div></div>";
    HideBurgerMenu();
    return;
};
// Export method:
window.RenderHomePage = RenderHomePage;




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



var mediaView: IMediaView;
var mediaPointer: IMediaObject;
var InitializeMediaApp = function (id: string, lang: string, col: string, mode: string)
{
    if(isNullOrUndefined(GlobalVars.GetGlobalLanguage()) ){
        GlobalVars.SetGlobalLanguage(lang);
    }
    if(isNullOrUndefined(GlobalVars.GetGlobalColor()) ){
        GlobalVars.SetGlobalColor(col);
    }
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


     UpdateMainPageText();
    document.documentElement.setAttribute('theme', GlobalVars.GetGlobalColor());
    RenderHomePage(id);
}
// Export method:
window.InitializeMediaApp = InitializeMediaApp;

// "noloop", "loop", "playlistloop"
//InitializeMediaApp("mainview", "en", "blue", "noloop");