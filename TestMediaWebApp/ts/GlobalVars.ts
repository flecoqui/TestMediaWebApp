/*
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    BlobDownloadResponseModel
  } from "@azure/storage-blob";
import { MediaPlaybackMode} from "./IMediaView";
*/
/*
const { BlobServiceClient } = require("@azure/storage-blob");
*/

/**
 * Media playback mode
 */
enum MediaPlaybackMode {
    NoLoop,
    Loop,
    PlaylistLoop
}
class  GlobalVars {
protected static  globalPlaybackLoop:MediaPlaybackMode = MediaPlaybackMode.Loop;
protected static  globalLanguage:string = "en";
private static  globalColor:string = "blue";
private static  globalAccount:string = "mediacloud";
private static  globalSAS:string = "sv=2019-10-10&ss=b to becompleted";
private static  globalContainer:string = "music";
private static  globalFolder:string = "";
private static  globalMenuType:string = "Music";
private static  globalCancellationToken:boolean = false;
private static  globalElementPerPage = 12;
private static  globalSlideShowPeriod = 3000;
private static  globalFavoritePlaylists:IMediaObject = null;
private static  globalCurrentFavoritePlaylistName:string = "default";
private static  globalVersion:string = "2020-05-18";

public static GetGlobalVersion():string {
    return this.globalVersion;
}


public static  GetGlobalFavoritePlaylists():IMediaObject { 
    if (typeof(Storage) !== "undefined"){
        var value:string = localStorage.getItem("mediawebapp-favoritestring");        
        if(!isNullOrUndefinedOrEmpty(value)){
            var list:IMediaObject = MediaObject.Deserialize(value);
            if(isNullOrUndefined(list)){
                list = new Playlist("Favorite","Favorites Playlists","","assets/img/Playlist.png","","");
                list.AddChild(new Playlist("Default","Default Favorites Playlist","","","",""));
                GlobalVars.SetGlobalCurrentFavoritePlaylistName("Default");
            }            
            GlobalVars.SetGlobalFavoritePlaylists(list)
        }
        else{
            var list:IMediaObject = new Playlist("Favorite","Favorites Playlists","","assets/img/Playlist.png","","");
            list.AddChild(new Playlist("Default","Default Favorites Playlist","","","",""));
            GlobalVars.SetGlobalCurrentFavoritePlaylistName("Default");
            GlobalVars.SetGlobalFavoritePlaylists(list)
        }
    } 
    return this.globalFavoritePlaylists;
};
public static  GetGlobalCurrentFavoritePlaylistName():string { 
    if (typeof(Storage) !== "undefined"){
        let value:string = localStorage.getItem("mediawebapp-currentfavoriteplaylistname"); 
        if(!isNullOrUndefinedOrEmpty(value))
            GlobalVars.SetGlobalCurrentFavoritePlaylistName(value);
    }
    return this.globalCurrentFavoritePlaylistName;
};

public static  GetGlobalPlaybackLoop():MediaPlaybackMode { 
    var mode = "Loop";
    var result:MediaPlaybackMode = MediaPlaybackMode.Loop;
    if (typeof(Storage) !== "undefined") 
        mode = localStorage.getItem("mediawebapp-mode")
    if(mode == "Loop")
        result = MediaPlaybackMode.Loop; 
    if(mode == "NoLoop")
        result = MediaPlaybackMode.NoLoop; 
    if(mode == "PlaylistLoop")
        result = MediaPlaybackMode.PlaylistLoop;
    this.globalPlaybackLoop = result;
    return this.globalPlaybackLoop;
};
public static  GetGlobalPagination():number { 
    if (typeof(Storage) !== "undefined"){
        var value:string = localStorage.getItem("mediawebapp-pagination");
        if(!isNullOrUndefined(value)){
            GlobalVars.SetGlobalPagination(parseInt(value))
        }
    } 
    return this.globalElementPerPage;
};
public static  GetGlobalSlideShowPeriod():number { 
    if (typeof(Storage) !== "undefined"){
        var value:string = localStorage.getItem("mediawebapp-slideshowperiod");
        if(!isNullOrUndefined(value)){
            GlobalVars.SetGlobalSlideShowPeriod(parseInt(value))
        }
    } 
    return this.globalSlideShowPeriod;
};

public static  GetGlobalLanguage():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-language"))
    return this.globalLanguage;
};
public static  GetGlobalColor():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalColor(localStorage.getItem("mediawebapp-color"))
    return this.globalColor;
};
public static  GetGlobalAccount():string { 
    if (typeof(Storage) !== "undefined"){
        var value:string = localStorage.getItem("mediawebapp-account") 
        if(!isNullOrUndefined(value)){
            GlobalVars.SetGlobalAccount(value);
        }
    }
    return this.globalAccount;
};
public static  GetGlobalSAS():string { 
    if (typeof(Storage) !== "undefined"){ 
        var value:string = localStorage.getItem("mediawebapp-sas") 
        if(!isNullOrUndefined(value)){
            GlobalVars.SetGlobalSAS(value);
        }
    }
    return this.globalSAS;
};
public static  GetGlobalContainer():string { 
    if (typeof(Storage) !== "undefined") {
        var value:string = localStorage.getItem("mediawebapp-container") 
        if(!isNullOrUndefined(value)){
            GlobalVars.SetGlobalContainer(value);
        }
    }
    return this.globalContainer;
};
public static  GetGlobalFolder():string { 
    if (typeof(Storage) !== "undefined") {
        var value:string = localStorage.getItem("mediawebapp-folder") 
        if(!isNullOrUndefined(value)){
            GlobalVars.SetGlobalFolder(value);
        }
    }
    return this.globalFolder;
};
public static  GetGlobalMenuType():string { 
    if (typeof(Storage) !== "undefined") {
        var value:string = localStorage.getItem("mediawebapp-menutype") 
        if(!isNullOrUndefined(value)){
            GlobalVars.SetGlobalMenuType(value);
        }
    }
    return this.globalMenuType;
};
public static  GetCancellationToken():boolean { 
    return this.globalCancellationToken;
};

public static  SetGlobalFavoritePlaylists(value:IMediaObject){
    if (typeof(Storage) !== "undefined") {
        if(isNullOrUndefined(value)){
            value = new Playlist("Favorite","Favorites Playlists","","assets/img/Playlist.png","","");
            value.AddChild(new Playlist("Default","Default Favorites Playlist","","","",""));
            GlobalVars.SetGlobalCurrentFavoritePlaylistName("Default");
        }
        localStorage.setItem("mediawebapp-favoritestring",MediaObject.Serialize(value));
    }
    if(!isNullOrUndefined(value)){
        var defaultvalue = GlobalVars.GetGlobalCurrentFavoritePlaylistName();
        var found:boolean = false;
        for(var i:number = 0; i < value.GetChildrenLength();i++)
        {
            if(value.GetChildWithIndex(i).GetName() == defaultvalue){
                found = true;
                break;
            }
        }
        if(found == false)
        {
            if(value.GetChildrenLength()>0)
                GlobalVars.SetGlobalCurrentFavoritePlaylistName(value.GetChildWithIndex(0).GetName());
            else
                GlobalVars.SetGlobalCurrentFavoritePlaylistName("");
        }
    }

    this.globalFavoritePlaylists = value;
};
public static  SetGlobalCurrentFavoritePlaylistName(value:string){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-currentfavoriteplaylistname",value);
    this.globalCurrentFavoritePlaylistName = value;
};
public static  SetGlobalPlaybackLoop(value:MediaPlaybackMode){
    var mode = "Loop";
    if(value == MediaPlaybackMode.Loop)
        mode = "Loop";
    if(value == MediaPlaybackMode.NoLoop)
        mode = "NoLoop";
    if(value == MediaPlaybackMode.PlaylistLoop)
        mode = "PlaylistLoop";
        
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-mode",mode);
    this.globalPlaybackLoop = value;
};
public static  SetGlobalPagination(value:number){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-pagination",value.toString());
    this.globalElementPerPage = value;
};
public static  SetGlobalSlideShowPeriod(value:number){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-slideshowperiod",value.toString());
    this.globalSlideShowPeriod = value;
};
public static  SetGlobalLanguage(value:string){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-language",value);
    this.globalLanguage = value;
};
public static  SetGlobalColor(value:string){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-color",value);
    this.globalColor = value;
};
public static  SetGlobalAccount(value:string){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-account",value);
    this.globalAccount = value;
};
public static  SetGlobalSAS(value:string){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-sas",value);
    this.globalSAS = value;

};
public static  SetGlobalContainer(value:string){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-container",value);
    this.globalContainer = value;

};
public static  SetGlobalFolder(value:string){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-folder",value);
    this.globalFolder = value;

};
public static  SetGlobalMenuType(value:string){
    if (typeof(Storage) !== "undefined") 
        localStorage.setItem("mediawebapp-menutype",value);
    this.globalMenuType = value;

};
public static  SetCancellationToken(value:boolean) { 
    this.globalCancellationToken = value;
};


}

