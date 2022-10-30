import { GlobalVars} from "./GlobalVars";
import { IMediaObject} from "./IMediaObject";
import { MediaObject} from "./MediaObject";
import { CloudMediaTree} from "./CloudMediaTree";



/*
import {
    BlobServiceClient
  } from "@azure/storage-blob";
*/
declare var azblob: any;
var menuCreationStatus:HTMLElement;
var menuCreationResult:HTMLElement;
const reportStatus = (message:string) => {
    menuCreationStatus.innerHTML = `${message}`;
};
const reportResult = (message:string) => {
    menuCreationResult.innerHTML += `${message}`;
//    menuCreationResult.innerHTML += `${message}<br/>`;
  //  menuCreationResult.scrollTop = menuCreationResult.scrollHeight;
};
var analyzeFilesArray = async function (array:string[],menuType: string, account:string, sas:string,  container:string, folder:string ){
    return new Promise<IMediaObject|null>( (resolve) => {
        try
        {
            var result:string = "";
            var mediaTree:CloudMediaTree = CloudMediaTree.CreateMediaTree(menuType,account,sas,container,folder);

            var queueWork:any,
            i = -1,
            work = function () {
            // do work for array[i]
            // ...
            mediaTree.AddString(array, i);
            result += array[i] + "<br>";
            queueWork();
            };
            queueWork = function () {
                if ((++i < array.length)&&(GlobalVars.GetCancellationToken() == false)) {
                    reportStatus( i + " files analyzed...");     
                    setTimeout(work, 0); // yield to browser
                }
                else
                {
                    //reportResult(result);
                    if(i == array.length) 
                    {
                        resolve(mediaTree.GetMediaTree());    
                    }
                    else
                        resolve(null);
                }
            };
            queueWork();
        }
        catch(error)
        {
            resolve(null);
        }
    });
}
export var CreateMediaMenu = async function(menuType: string, account:string, sas:string,  container:string, folder:string, statusId:string, resultId:string) {
    // Initialize the controls to display the result
    menuCreationStatus = <HTMLElement>document.getElementById(statusId);
    menuCreationResult = <HTMLElement>document.getElementById(resultId);
    // Create the containerURL to browse the file
    var exploreUrl = null;

    exploreUrl = `https://${account}.blob.core.windows.net/${container}?${sas}`;
    const containerURL = new azblob.ContainerURL(
        exploreUrl,
        azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));

    try {
        let counter = 0;
        let marker = undefined;
        reportStatus("Starting creation - Getting the list of files...");
        reportResult("");
        var prefix:string = "";
        if(!isNullOrUndefinedOrEmpty(folder))
            prefix = folder;
        var itemsArray:string[] = [];
        do {
                const listBlobsResponse:any = await containerURL.listBlobFlatSegment(
                azblob.Aborter.none, marker
                /*,
                      {
                        include: [
                            
                          ListBlobsIncludeItem.Snapshots,
                          ListBlobsIncludeItem.Metadata,
                          ListBlobsIncludeItem.Uncommittedblobs,
                          ListBlobsIncludeItem.Copy,
                          ListBlobsIncludeItem.Deleted
    
                        ],
                        maxresults: 1,
                        prefix
                        
                      }*/);
                marker = listBlobsResponse.nextMarker;
                var items = listBlobsResponse.segment.blobItems;
                counter += items.length;

                for(var i = 0; i < items.length;i++){
                    var text:string = items[i].name;
                    if(!isNullOrUndefinedOrEmpty(text)&&(text.indexOf(prefix)==0))
                    {
                        var len:number = items[i].properties.contentLength;
                        var type:string = items[i].properties.contentType;
                        var date:Date = items[i].properties.creationTime;
                        var datestring:string = date.toISOString().slice(0,19);
                        var result = `{{Path: ${items[i].name}}}{{Size: ${len}}}{{Type: ${type}}}{{Date: ${datestring}}}`;
                        itemsArray.push(result);
                    }
                }
                //Array.prototype.push.apply(itemsArray, items);
                reportStatus(counter + " files retrieved...");            
        } while (marker&&(GlobalVars.GetCancellationToken() == false));

        if(GlobalVars.GetCancellationToken() == false){
                var rootMedia:IMediaObject|null = await analyzeFilesArray(itemsArray,menuType, account, sas,  container, folder);
                if(rootMedia){
                    reportStatus("Analyze cancelled...");            
                    var s:string|null = MediaObject.Serialize(rootMedia);
                    if(s)
                        reportResult(s);
                }
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
export var ActivateCarousel = function (){
    (<any>$('.carousel')).carousel();
}
export var isNullOrUndefined = function (value: any) {
    if ((value === null) || (value === undefined))
        return true;
    return false;
};
export var isNullOrUndefinedOrEmpty = function (value: any) {
    if ((value === null) || (value === undefined))
        return true;
    if(value == "")
        return true;
    return false;
};
export var GetTimeString = function (e:number) {
    let h:string = Math.floor(e / 3600).toString().padStart(2,'0');
    let m:string = Math.floor(e % 3600 / 60).toString().padStart(2,'0');
    let s:string = Math.floor(e % 60).toString().padStart(2,'0');    
    return  h + ':' + m + ':' + s;
}


export var GetFileAsync = async function (path:string) {
const p = new Promise<string|null>(resolve => GetFileAsyncFunction(resolve, path));
const result = await p;
return result;
};
export var GetFileAsyncFunction = function (resolve:(value: string|null | Promise<string>) => void, path:string) {
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

export var enStrings:Map<string,string> = new Map 
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
export var frStrings:Map<string,string> = new Map 
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

export var strings:Map<string,Map<string,string>> = new Map([
    ["en",enStrings],
    ["fr",frStrings]    
]) 

export var GetCurrentString = function (id: string): string
{
    var localStrings = strings.get(GlobalVars.GetGlobalLanguage());
    if(localStrings)
    {
        var s = localStrings.get(id);
        if(s)
        {
            return s;
        }    
    }
    return id;
}
