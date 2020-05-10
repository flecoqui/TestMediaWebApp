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


/*
import {
    BlobServiceClient
  } from "@azure/storage-blob";
*/
declare var azblob: any;
var menuCreationStatus:HTMLElement;
var menuCreationResult:HTMLElement;
const reportStatus = message => {
    menuCreationStatus.innerHTML = `${message}`;
};
const reportResult = message => {
    menuCreationResult.innerHTML += `${message}<br/>`;
  //  menuCreationResult.scrollTop = menuCreationResult.scrollHeight;
};
var analyzeArray = async function (array = [] ){
    return new Promise( resolve => {
        try
        {
            var result:string = "";
            var queueWork,
            i = -1,
            work = function () {
            // do work for array[i]
            // ...
            result += array[i].name + "<br>";
            queueWork();
            };
            queueWork = function () {
                if ((++i < array.length)&&(GlobalVars.GetCancellationToken() == false)) {
                    reportStatus( i + " files analyzed...");     
                    setTimeout(work, 0); // yield to browser
                }
                else
                {
                    reportResult(result);
                    if(i == array.length) 
                        resolve(true);    
                    else
                        resolve(false);
                }
            };
            queueWork();
        }
        catch(error)
        {
            resolve(false);
        }
    });
}
var CreateMediaMenu = async function(menuType: string, account:string, sas:string,  container:string, folder:string, statusId:string, resultId:string) {
    menuCreationStatus = <HTMLElement>document.getElementById(statusId);
    menuCreationResult = <HTMLElement>document.getElementById(resultId);

    
const containerURL = new azblob.ContainerURL(
    `https://${account}.blob.core.windows.net/${container}?${sas}`,
    azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));

try {
    let counter = 0;
    let marker = undefined;
    reportStatus("Starting creation...");
    reportResult("");
    var itemsArray = [];
    do {
            const listBlobsResponse = await containerURL.listBlobFlatSegment(
            azblob.Aborter.none, marker);
            marker = listBlobsResponse.nextMarker;
            var items = listBlobsResponse.segment.blobItems;
            counter += items.length;
           // itemsArray.push(items);
            Array.prototype.push.apply(itemsArray, items);
            reportStatus(counter + " files retrieved...");            
  //          itemsArray.push(items);         
    } while (marker&&(GlobalVars.GetCancellationToken() == false));

    /*
        for (const blob of items) {
            reportResult(blob.name);
            reportStatus("Creation for "+ counter + " files");
            if(cancellationToken == true)
                break;
            counter++;
        }
        */
       /*
        counter = 0;
        var i = 0;
        var j = itemsArray.length;
        var interval = setInterval( function() {
           // reportResult(itemsArray[i].name);
            reportStatus( ++counter + " files analyzed...");            
            if((cancellationToken == true)||(++i>j)){
                clearInterval(interval);
            }
        },1);
        */
       if(GlobalVars.GetCancellationToken() == false){
            var res = await analyzeArray(itemsArray);
            if(res == true)
                reportStatus("Analyze successful...");
            else            
                reportStatus("Analyze cancelled...");            
        }

/*
    } while (marker&&(cancellationToken == false));
*/
    if(GlobalVars.GetCancellationToken() == true)
    {
        reportStatus("Creation cancelled and "+ counter + " files partially analyzed");
    }
    else{
        if (counter > 0) {
            reportStatus("Creation done for "+ counter + " files");
        } else {
            reportStatus("Creation done no files found...");
        }
    }
    
} catch (error) {
 
}
}
/**
 * Jquery
 */
/*
interface JQuery{
    carousel():void;
}
*/
 var ActivateCarousel = function (){
    (<any>$('.carousel')).carousel();
}
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
 var GetTimeString = function (seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const hours = seconds / 3600
    const minutes = (seconds % 3600) / 60
    return [hours, minutes, seconds % 60].map(format).join(':')
  }



 var GetFileAsync = async function (path) {
const p = new Promise<string>(resolve => GetFileAsyncFunction(resolve, path));
const result = await p;
return result;
};
var GetFileAsyncFunction = function (resolve, path) {
    let req = new XMLHttpRequest()
    req.open('GET', path, true)
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
         if(req.status == 200)
           resolve(req.responseText)
         else
         resolve(null)
      }
    };
    req.send(null)
};

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

 var GetCurrentString = function (id: string): string
{
    var localStrings = strings.get(GlobalVars.GetGlobalLanguage());
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
private static  globalSAS:string = "sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
private static  globalContainer:string = "music";
private static  globalFolder:string = "";
private static  globalMenuType:string = "Music";
private static  globalCancellationToken:boolean = false;

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
public static  GetGlobalLanguage():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-language"))
    return this.globalLanguage;
};
public static  GetGlobalColor():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-color"))
    return this.globalColor;
};
public static  GetGlobalAccount():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-account"))
    return this.globalAccount;
};
public static  GetGlobalSAS():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-sas"))
    return this.globalSAS;
};
public static  GetGlobalContainer():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-container"))
    return this.globalContainer;
};
public static  GetGlobalFolder():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-folder"))
    return this.globalFolder;
};
public static  GetGlobalMenuType():string { 
    if (typeof(Storage) !== "undefined") 
        GlobalVars.SetGlobalLanguage(localStorage.getItem("mediawebapp-menutype"))
    return this.globalMenuType;
};
public static  GetCancellationToken():boolean { 
    return this.globalCancellationToken;
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

