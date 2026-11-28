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


export var GetFileAsync = async function (path:string, timeout: number = 0) {
const p = new Promise<string|null>(resolve => GetFileAsyncFunction(resolve, path, timeout));
const result = await p;
return result;
};
export var GetFileAsyncFunction = function (resolve:(value: string|null | Promise<string>) => void, path:string, timeout: number = 0) {
    let req = new XMLHttpRequest()
    req.open('GET', path, true)
    req.timeout = timeout;
    req.onerror = req.ontimeout = req.onabort = () => resolve(null);
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
    ["App window","App window"],["Return to mini window","Return to mini window"],
    ["Media type:","Media type:"],["All","All"],["Music","Music"],["Radio","Radio"],["Video","Video"],["Pictures","Pictures"],["Television","TV"],
    ["Load more","Load more"],["Unable to load more media.","Unable to load more media."],
    ["Previous results","Previous results"],["Next results","Next results"],
    ["HOME","Home"],["MUSIC","Music"],["RADIO","Radios"],["VIDEO","Videos"],["PHOTO","Photos"],["TV","Tvs"],["SEARCH","Search"],["FAVORITE","Favorites"],["SETTINGS","Settings"],
    ["Start","Start"],
    ["Play","Play"],
    ["Pause","Pause"],
    ["Mute","Mute"],
    ["Use the volume buttons on your iOS device to mute sound.","Use the volume buttons on your iOS device to mute sound."],
    ["Unable to change mute setting.","Unable to change mute setting."],
    ["Search for ","Search for "],["Unable to search.","Unable to search."],
    ["Unable to open search result.","Unable to open search result."],
    ["VolumeUp","+"],
    ["VolumeDown","-"],
    ["Stop","Stop"],
    ["Repeat","Repeat"]
    ,["Match","Match"],["Description","Description"],["Title","Title"],["Artist","Artist"],["Album","Album"],["Station","Station"],["Unknown","Unknown"],["Play one item","Play one item"],["Play all items once","Play all items once"],["Play all items and loop","Play all items and loop"],["Folder","Folder"],["Path","Path"],["Content URL","Content URL"],["Image URL","Image URL"]
]
);
export var frStrings:Map<string,string> = new Map 
([
    ["App window","Fenêtre de l'application"],["Return to mini window","Retour à la mini-fenêtre"],
    ["Start","Joue"],
    ["Play","Joue"],
    ["Pause","Pause"],
    ["Mute","Silence"],
    ["Use the volume buttons on your iOS device to mute sound.","Utilisez les boutons de volume de votre appareil iOS pour couper le son."],
    ["Unable to change mute setting.","Impossible de modifier le réglage du son."],
    ["Search for ","Recherche de "],["Unable to search.","Impossible d'effectuer la recherche."],
    ["Unable to open search result.","Impossible d'ouvrir le résultat de recherche."],
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
    ["Portuguese","Portugais"],["Spanish","Espagnol"],["Match","Correspondance"],["Description","Description"],["Title","Titre"],["Artist","Artiste"],["Album","Album"],["Station","Station"],["Unknown","Inconnu"],
    ["Match","Correspondance"],["Description","Description"],["Title","Titre"],["Artist","Artiste"],["Album","Album"],["Folder","Dossier"],["Path","Chemin"],["Content URL","URL du contenu"],["Image URL","URL de l'image"],
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
    ["HOME","Accueil"],
    ["MUSIC","Musiques"],
    ["VIDEO","Vidéos"],
    ["RADIO","Radios"],
    ["TV","Télévisions"],
    ["DEVICE","Appareils"],
    ["SETTINGS","Paramètres"],
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
    ["Unmute","Rétablir le son"],["Unrepeat","Annuler la répétition"],["Application Configuration","Configuration de l'application"],
    ["Configuration","Configuration"],["Pagination size:","Taille de pagination:"],["Slide Show Period ms:","Période du diaporama ms:"],
    ["Fullscreen Inactivity Period ms:","Période d'inactivité plein écran ms:"],["Reinitialize","Réinitialiser"],
    ["Reinitializing the local storage","Réinitialisation du stockage local"],["Are you sure you want to reinitialize the local storage? You will lose your configuration and your favorite playlists.","Voulez-vous vraiment réinitialiser le stockage local ? Vous perdrez votre configuration et vos listes favorites."],
    ["Favorite Configuration","Configuration des favoris"],["New favorite Playlist:","Nouvelle liste favorite:"],["Select the current playlist:","Sélectionner la liste actuelle:"],
    ["Current favorites playlist name:","Nom de la liste des favoris actuelle:"],["New playlist name","Nom de la nouvelle liste"],
    ["Remove current playlist","Supprimer la liste actuelle"],["Asset name","Nom du média"],["Asset type","Type du média"],["Logo","Logo"],
    ["Export playlist","Exporter la liste"],["Import playlist","Importer la liste"],["Playlist JSON","JSON de la liste"],
    ["No media assets in this playlist.","Aucun média dans cette liste."],["Unable to import favorites playlist.","Impossible d'importer la liste de favoris."],
    ["No current favorites playlist is available.","Aucune liste de favoris actuelle n'est disponible."],
    ["Add new playlist","Ajouter une liste"],["Remove playlist","Supprimer la liste"],["Export all playlists","Exporter toutes les listes"],
    ["Import all playlists","Importer toutes les listes"],["Favorite playlists content:","Contenu des listes favorites:"],
    ["FAVORITE","Favoris"],["Favorites","Favoris"],["Cloud Configuration","Configuration du cloud"],["Cloud","Cloud"],["Clouds","Clouds"],
    ["Cloud Account Name:","Nom du compte cloud:"],["Cloud SAS:","SAS cloud:"],["Cloud Container Name:","Nom du conteneur cloud:"],
    ["Cloud Folder Name:","Nom du dossier cloud:"],["Menu Type:","Type de menu:"],["Status:","État:"],["Result:","Résultat:"],
    ["Create Menu","Créer le menu"],["Cancel creation","Annuler la création"],["Render Menu","Afficher le menu"],
    ["Device Configuration","Configuration des appareils"],["Devices","Appareils"],["PHOTO","Photos"],["SEARCH","Recherche"],
    ["Photo Page","Page des photos"],["Explore your photos","Explorer vos photos"],["Search","Rechercher"],
    ["Search assets:","Rechercher des médias:"],["Asset name or metadata","Nom ou métadonnées"],["Name","Nom"],["Type","Type"],
    ["Open","Ouvrir"],["Searching...","Recherche en cours..."],["Enter a search string.","Saisissez une recherche."],
    ["Case sensitive","Respecter la casse"],["Whole word","Mot entier"],
    ["Media type:","Type de média:"],["All","Tous"],["Music","Musique"],["Radio","Radio"],["Video","Vidéo"],["Pictures","Photos"],["Television","TV"],
    ["Load more","Afficher plus"],["Unable to load more media.","Impossible de charger davantage de médias."],
    ["Previous results","Résultats précédents"],["Next results","Résultats suivants"],
    ["Show mini player","Afficher le mini-lecteur"],["Mini player display period ms:","Durée d'affichage du mini-lecteur ms:"],
    ["Previous radio","Radio précédente"],["Next radio","Radio suivante"],["Previous song","Chanson précédente"],["Next song","Chanson suivante"],
    ["No assets found.","Aucun média trouvé."],["asset(s) found.","média(s) trouvé(s)."],["Start slide show","Démarrer le diaporama"],
    ["Stop slide show","Arrêter le diaporama"],["Previous photo","Photo précédente"],["Next photo","Photo suivante"],
    ["Exit full screen","Quitter le plein écran"],["Full screen","Plein écran"],["Video progress","Progression vidéo"],
    ["Live progress","Progression du direct"],["Live stream","Diffusion en direct"],["Loading","Chargement"],
    ["Unable to enter full screen mode.","Impossible d'activer le mode plein écran."],
    ["Unable to start media playback. Please tap play again.","Impossible de démarrer la lecture. Appuyez de nouveau sur lecture."],
    ["Unable to load music data.","Impossible de charger les données musicales."],
    ["Unable to load TV channels.","Impossible de charger les chaînes TV."],["Unable to play this TV stream in this browser.","Impossible de lire cette chaîne TV dans ce navigateur."],
    ["This browser does not support the H.264/AAC codecs used by this TV stream.","Ce navigateur ne prend pas en charge les codecs H.264/AAC de cette chaîne TV."],
    ["Loading Music data...","Chargement des données musicales..."],["Loading Photo data...","Chargement des données photos..."],
    ["Loading Radio data...","Chargement des données radio..."],["Loading TV data...","Chargement des données TV..."],["Loading Video data...","Chargement des données vidéo..."],
    ["Creation Date: ","Date de création: "],["Size: ","Taille: "],["Track: ","Titre: "],
    ["photos","photos"],["videos","vidéos"],["tracks","titres"],["albums","albums"],["channels","chaînes"],
    ["Yes","Oui"],["No","Non"],["Ok","OK"],["Cancel","Annuler"],["Leaving the application","Quitter l'application"],
    ["Are you sure to leave the application?","Voulez-vous vraiment quitter l'application?"]
]
);

export var strings:Map<string,Map<string,string>> = new Map([
    ["en",enStrings],
    ["fr",frStrings],
    ["de",new Map([
        ["App window","Anwendungsfenster"],["Return to mini window","Zurück zum Minifenster"],
        ["Start","Start"],["Play","Abspielen"],["Pause","Pause"],["Mute","Stumm"],["Unmute","Ton einschalten"],
        ["Use the volume buttons on your iOS device to mute sound.","Verwenden Sie die Lautstärketasten Ihres iOS-Geräts, um den Ton stummzuschalten."],
        ["Unable to change mute setting.","Die Stummschaltung konnte nicht geändert werden."],
        ["Search for ","Suche nach "],["Unable to search.","Suche konnte nicht ausgeführt werden."],
        ["Unable to open search result.","Das Suchergebnis konnte nicht geöffnet werden."],
        ["VolumeUp","+"],["VolumeDown","-"],["Stop","Stopp"],["Repeat","Wiederholen"],["Unrepeat","Wiederholung beenden"],
        ["Red","Rot"],["Blue","Blau"],["Green","Grün"],["Orange","Orange"],["Purple","Lila"],["Yellow","Gelb"],
        ["English","Englisch"],["German","Deutsch"],["Italian","Italienisch"],["French","Französisch"],["Portuguese","Portugiesisch"],["Spanish","Spanisch"],
        ["Settings Page","Einstellungsseite"],["Application Configuration","Anwendungskonfiguration"],["Configuration","Konfiguration"],
        ["Color:","Farbe:"],["Language:","Sprache:"],["Pagination size:","Seitengröße:"],
        ["Slide Show Period ms:","Diaschau-Zeit ms:"],["Fullscreen Inactivity Period ms:","Inaktivitätszeit Vollbild ms:"],
        ["Reinitialize","Zurücksetzen"],["Reinitializing the local storage","Lokalen Speicher zurücksetzen"],
        ["Are you sure you want to reinitialize the local storage? You will lose your configuration and your favorite playlists.","Möchten Sie den lokalen Speicher wirklich zurücksetzen? Ihre Konfiguration und Favoriten werden gelöscht."],
        ["Favorite Configuration","Favoritenkonfiguration"],["New favorite Playlist:","Neue Favoriten-Wiedergabeliste:"],
        ["Current favorites playlist name:","Name der aktuellen Favoritenliste:"],["New playlist name","Name der neuen Wiedergabeliste"],
        ["Remove current playlist","Aktuelle Wiedergabeliste entfernen"],["Asset name","Medienname"],["Asset type","Medientyp"],["Logo","Logo"],
        ["Export playlist","Wiedergabeliste exportieren"],["Import playlist","Wiedergabeliste importieren"],["Playlist JSON","Wiedergabelisten-JSON"],
        ["No media assets in this playlist.","Diese Wiedergabeliste enthält keine Medien."],["Unable to import favorites playlist.","Favoriten-Wiedergabeliste konnte nicht importiert werden."],
        ["Select the current playlist:","Aktuelle Wiedergabeliste auswählen:"],["Add new playlist","Wiedergabeliste hinzufügen"],
        ["Remove playlist","Wiedergabeliste entfernen"],["Export all playlists","Alle Wiedergabelisten exportieren"],
        ["Import all playlists","Alle Wiedergabelisten importieren"],["Favorite playlists content:","Inhalt der Favoriten-Wiedergabelisten:"],
        ["FAVORITE","Favoriten"],["Favorites","Favoriten"],["Cloud Configuration","Cloud-Konfiguration"],["Cloud","Cloud"],["Clouds","Clouds"],
        ["Cloud Account Name:","Cloud-Kontoname:"],["Cloud SAS:","Cloud-SAS:"],["Cloud Container Name:","Cloud-Containername:"],
        ["Cloud Folder Name:","Cloud-Ordnername:"],["Menu Type:","Menütyp:"],["Status:","Status:"],["Result:","Ergebnis:"],
        ["Create Menu","Menü erstellen"],["Cancel creation","Erstellung abbrechen"],["Render Menu","Menü anzeigen"],
        ["Device Configuration","Gerätekonfiguration"],["Device","Gerät"],["Devices","Geräte"],["Device Page","Gerätes Seite"],
        ["HOME","Startseite"],["MUSIC","Musikstücke"],["RADIO","Radios"],["VIDEO","Videos"],["PHOTO","Fotos"],["TV","Fernsehsender"],["SEARCH","Suche"],["SETTINGS","Einstellungen"],
        ["Home Page","Startseite"],["Explore your media","Medien erkunden"],["Back to Home","Zurück zur Startseite"],
        ["Music Page","Musikseite"],["Play your Music","Musik abspielen"],["Radio Page","Radiosenderseite"],["Play your radio stations","Radiosender hören"],
        ["Video Page","Videoseite"],["Play your video files","Videodateien abspielen"],["TV Page","TV-Seite"],["Play your TV channels","TV-Sender ansehen"],
        ["Photo Page","Fotoseite"],["Explore your photos","Fotos ansehen"],["Search","Suche"],["Search assets:","Medien durchsuchen:"],
        ["Asset name or metadata","Name oder Metadaten"],["Name","Name"],["Type","Typ"],["Open","Öffnen"],["Searching...","Suche läuft..."],
        ["Enter a search string.","Suchbegriff eingeben."],["No assets found.","Keine Medien gefunden."],
        ["Case sensitive","Groß-/Kleinschreibung beachten"],["Whole word","Ganzes Wort"],
        ["Media type:","Medientyp:"],["All","Alle"],["Music","Musik"],["Radio","Radio"],["Video","Video"],["Pictures","Bilder"],["Television","TV"],
        ["Load more","Mehr anzeigen"],["Unable to load more media.","Weitere Medien konnten nicht geladen werden."],
        ["Previous results","Vorherige Ergebnisse"],["Next results","Nächste Ergebnisse"],
        ["Show mini player","Miniplayer anzeigen"],["Mini player display period ms:","Miniplayer-Anzeigedauer ms:"],
        ["Previous radio","Vorheriger Radiosender"],["Next radio","Nächster Radiosender"],["Previous song","Vorheriger Titel"],["Next song","Nächster Titel"],
        ["asset(s) found.","Medien gefunden."],["Start slide show","Diaschau starten"],["Stop slide show","Diaschau stoppen"],
        ["Previous photo","Vorheriges Foto"],["Next photo","Nächstes Foto"],["Exit full screen","Vollbild verlassen"],["Full screen","Vollbild"],
        ["Video progress","Videofortschritt"],["Live progress","Live-Fortschritt"],["Live stream","Livestream"],["Loading","Laden"],
        ["Unable to enter full screen mode.","Vollbildmodus konnte nicht aktiviert werden."],
        ["Unable to start media playback. Please tap play again.","Wiedergabe konnte nicht gestartet werden. Bitte erneut drücken."],
        ["Unable to load music data.","Musikdaten konnten nicht geladen werden."],
        ["Unable to load TV channels.","TV-Sender konnten nicht geladen werden."],
        ["Unable to play this TV stream in this browser.","Dieser TV-Stream kann in diesem Browser nicht abgespielt werden."],
        ["This browser does not support the H.264/AAC codecs used by this TV stream.","Dieser Browser unterstützt die H.264/AAC-Codecs dieses TV-Streams nicht."],
        ["Loading Music data...","Musikdaten werden geladen..."],["Loading Photo data...","Fotodaten werden geladen..."],
        ["Loading Radio data...","Radiodaten werden geladen..."],["Loading TV data...","TV-Daten werden geladen..."],["Loading Video data...","Videodaten werden geladen..."],
        ["Creation Date: ","Erstellungsdatum: "],["Size: ","Größe: "],["Track: ","Titel: "],
        ["photos","Fotos"],["videos","Videos"],["tracks","Titel"],["albums","Alben"],["channels","Sender"],
        ["Yes","Ja"],["No","Nein"],["Ok","OK"],["Cancel","Abbrechen"],["Leaving the application","Anwendung verlassen"],
        ["Are you sure to leave the application?","Möchten Sie die Anwendung wirklich verlassen?"],
        ["Media <strong>","Medium <strong>"],["</strong> added in the favorite list <strong>","</strong> zur Favoritenliste hinzugefügt <strong>"],
        ["</strong> removed from the favorite list <strong>","</strong> aus der Favoritenliste entfernt <strong>"]
    ])],
    ["it",new Map([
        ["App window","Finestra dell'app"],["Return to mini window","Torna alla mini finestra"],
        ["Start","Avvia"],["Play","Riproduci"],["Pause","Pausa"],["Mute","Disattiva audio"],["Unmute","Attiva audio"],
        ["Use the volume buttons on your iOS device to mute sound.","Usa i pulsanti del volume del dispositivo iOS per disattivare l'audio."],
        ["Unable to change mute setting.","Impossibile modificare l'impostazione audio."],
        ["Search for ","Ricerca di "],["Unable to search.","Impossibile eseguire la ricerca."],
        ["Unable to open search result.","Impossibile aprire il risultato di ricerca."],
        ["VolumeUp","+"],["VolumeDown","-"],["Stop","Ferma"],["Repeat","Ripeti"],["Unrepeat","Annulla ripetizione"],
        ["Red","Rosso"],["Blue","Blu"],["Green","Verde"],["Orange","Arancione"],["Purple","Viola"],["Yellow","Giallo"],
        ["English","Inglese"],["German","Tedesco"],["Italian","Italiano"],["French","Francese"],["Portuguese","Portoghese"],["Spanish","Spagnolo"],
        ["Settings Page","Pagina impostazioni"],["Application Configuration","Configurazione applicazione"],["Configuration","Configurazione"],
        ["Color:","Colore:"],["Language:","Lingua:"],["Pagination size:","Dimensione paginazione:"],
        ["Slide Show Period ms:","Periodo presentazione ms:"],["Fullscreen Inactivity Period ms:","Periodo inattività schermo intero ms:"],
        ["Reinitialize","Reinizializza"],["Reinitializing the local storage","Reinizializzazione memoria locale"],
        ["Are you sure you want to reinitialize the local storage? You will lose your configuration and your favorite playlists.","Reinizializzare la memoria locale? La configurazione e le playlist preferite verranno perse."],
        ["Favorite Configuration","Configurazione preferiti"],["New favorite Playlist:","Nuova playlist preferita:"],
        ["Current favorites playlist name:","Nome della playlist preferita corrente:"],["New playlist name","Nome nuova playlist"],
        ["Remove current playlist","Rimuovi playlist corrente"],["Asset name","Nome contenuto"],["Asset type","Tipo contenuto"],["Logo","Logo"],
        ["Export playlist","Esporta playlist"],["Import playlist","Importa playlist"],["Playlist JSON","JSON playlist"],
        ["No media assets in this playlist.","Nessun contenuto in questa playlist."],["Unable to import favorites playlist.","Impossibile importare la playlist preferita."],
        ["Select the current playlist:","Seleziona la playlist corrente:"],["Add new playlist","Aggiungi playlist"],
        ["Remove playlist","Rimuovi playlist"],["Export all playlists","Esporta tutte le playlist"],
        ["Import all playlists","Importa tutte le playlist"],["Favorite playlists content:","Contenuto playlist preferite:"],
        ["FAVORITE","Preferiti"],["Favorites","Preferiti"],["Cloud Configuration","Configurazione cloud"],["Cloud","Cloud"],["Clouds","Cloud"],
        ["Cloud Account Name:","Nome account cloud:"],["Cloud SAS:","SAS cloud:"],["Cloud Container Name:","Nome contenitore cloud:"],
        ["Cloud Folder Name:","Nome cartella cloud:"],["Menu Type:","Tipo menu:"],["Status:","Stato:"],["Result:","Risultato:"],
        ["Create Menu","Crea menu"],["Cancel creation","Annulla creazione"],["Render Menu","Visualizza menu"],
        ["Device Configuration","Configurazione dispositivo"],["Device","Dispositivo"],["Devices","Dispositivi"],["Device Page","Pagina dispositivi"],
        ["HOME","Home"],["MUSIC","Musiche"],["RADIO","Radio"],["VIDEO","Video"],["PHOTO","Foto"],["TV","Televisioni"],["SEARCH","Ricerca"],["SETTINGS","Impostazioni"],
        ["Home Page","Pagina iniziale"],["Explore your media","Esplora i tuoi contenuti"],["Back to Home","Torna alla home"],
        ["Music Page","Pagina musica"],["Play your Music","Riproduci musica"],["Radio Page","Pagina radio"],["Play your radio stations","Ascolta le radio"],
        ["Video Page","Pagina video"],["Play your video files","Riproduci i tuoi video"],["TV Page","Pagina TV"],["Play your TV channels","Guarda i canali TV"],
        ["Photo Page","Pagina foto"],["Explore your photos","Esplora le tue foto"],["Search","Cerca"],["Search assets:","Cerca contenuti:"],
        ["Asset name or metadata","Nome o metadati"],["Name","Nome"],["Type","Tipo"],["Open","Apri"],["Searching...","Ricerca..."],
        ["Enter a search string.","Inserisci una stringa di ricerca."],["No assets found.","Nessun contenuto trovato."],
        ["Case sensitive","Maiuscole/minuscole"],["Whole word","Parola intera"],
        ["Media type:","Tipo di contenuto:"],["All","Tutti"],["Music","Musica"],["Radio","Radio"],["Video","Video"],["Pictures","Immagini"],["Television","TV"],
        ["Load more","Mostra altro"],["Unable to load more media.","Impossibile caricare altri contenuti."],
        ["Previous results","Risultati precedenti"],["Next results","Risultati successivi"],
        ["Show mini player","Mostra mini lettore"],["Mini player display period ms:","Durata visualizzazione mini lettore ms:"],
        ["Previous radio","Radio precedente"],["Next radio","Radio successiva"],["Previous song","Brano precedente"],["Next song","Brano successivo"],
        ["asset(s) found.","contenuto/i trovato/i."],["Start slide show","Avvia presentazione"],["Stop slide show","Ferma presentazione"],
        ["Previous photo","Foto precedente"],["Next photo","Foto successiva"],["Exit full screen","Esci da schermo intero"],["Full screen","Schermo intero"],
        ["Video progress","Avanzamento video"],["Live progress","Avanzamento live"],["Live stream","Diretta"],["Loading","Caricamento"],
        ["Unable to enter full screen mode.","Impossibile attivare la modalità schermo intero."],
        ["Unable to start media playback. Please tap play again.","Impossibile avviare la riproduzione. Premere di nuovo riproduci."],
        ["Unable to load music data.","Impossibile caricare i dati musicali."],
        ["Unable to load TV channels.","Impossibile caricare i canali TV."],
        ["Unable to play this TV stream in this browser.","Impossibile riprodurre questo canale TV nel browser."],
        ["This browser does not support the H.264/AAC codecs used by this TV stream.","Questo browser non supporta i codec H.264/AAC del canale TV."],
        ["Loading Music data...","Caricamento dati musica..."],["Loading Photo data...","Caricamento dati foto..."],
        ["Loading Radio data...","Caricamento dati radio..."],["Loading TV data...","Caricamento dati TV..."],["Loading Video data...","Caricamento dati video..."],
        ["Creation Date: ","Data creazione: "],["Size: ","Dimensione: "],["Track: ","Traccia: "],
        ["photos","Foto"],["videos","Video"],["tracks","Tracce"],["albums","Album"],["channels","Canali"],
        ["Yes","Sì"],["No","No"],["Ok","OK"],["Cancel","Annulla"],["Leaving the application","Chiusura applicazione"],
        ["Are you sure to leave the application?","Abbandonare l'applicazione?"]
    ])],
    ["pt",new Map([
        ["App window","Janela do aplicativo"],["Return to mini window","Voltar à mini janela"],
        ["Start","Iniciar"],["Play","Reproduzir"],["Pause","Pausar"],["Mute","Silenciar"],["Unmute","Ativar som"],
        ["Use the volume buttons on your iOS device to mute sound.","Use os botões de volume do dispositivo iOS para silenciar o som."],
        ["Unable to change mute setting.","Não foi possível alterar a configuração de áudio."],
        ["Search for ","Pesquisar por "],["Unable to search.","Não foi possível pesquisar."],
        ["Unable to open search result.","Não foi possível abrir o resultado da pesquisa."],
        ["VolumeUp","+"],["VolumeDown","-"],["Stop","Parar"],["Repeat","Repetir"],["Unrepeat","Cancelar repetição"],
        ["Red","Vermelho"],["Blue","Azul"],["Green","Verde"],["Orange","Laranja"],["Purple","Roxo"],["Yellow","Amarelo"],
        ["English","Inglês"],["German","Alemão"],["Italian","Italiano"],["French","Francês"],["Portuguese","Português"],["Spanish","Espanhol"],
        ["Settings Page","Página de configurações"],["Application Configuration","Configuração do aplicativo"],["Configuration","Configuração"],
        ["Color:","Cor:"],["Language:","Idioma:"],["Pagination size:","Tamanho da paginação:"],
        ["Slide Show Period ms:","Período da apresentação ms:"],["Fullscreen Inactivity Period ms:","Período de inatividade em tela cheia ms:"],
        ["Reinitialize","Reinicializar"],["Reinitializing the local storage","Reinicializando o armazenamento local"],
        ["Are you sure you want to reinitialize the local storage? You will lose your configuration and your favorite playlists.","Deseja reinicializar o armazenamento local? Sua configuração e playlists favoritas serão perdidas."],
        ["Favorite Configuration","Configuração dos favoritos"],["New favorite Playlist:","Nova playlist favorita:"],
        ["Current favorites playlist name:","Nome da playlist de favoritos atual:"],["New playlist name","Nome da nova playlist"],
        ["Remove current playlist","Remover playlist atual"],["Asset name","Nome do item"],["Asset type","Tipo do item"],["Logo","Logo"],
        ["Export playlist","Exportar playlist"],["Import playlist","Importar playlist"],["Playlist JSON","JSON da playlist"],
        ["No media assets in this playlist.","Nenhum item nesta playlist."],["Unable to import favorites playlist.","Não foi possível importar a playlist de favoritos."],
        ["Select the current playlist:","Selecionar playlist atual:"],["Add new playlist","Adicionar playlist"],
        ["Remove playlist","Remover playlist"],["Export all playlists","Exportar todas as playlists"],
        ["Import all playlists","Importar todas as playlists"],["Favorite playlists content:","Conteúdo das playlists favoritas:"],
        ["FAVORITE","Favoritos"],["Favorites","Favoritos"],["Cloud Configuration","Configuração da nuvem"],["Cloud","Nuvem"],["Clouds","Nuvens"],
        ["Cloud Account Name:","Nome da conta na nuvem:"],["Cloud SAS:","SAS da nuvem:"],["Cloud Container Name:","Nome do contêiner:"],
        ["Cloud Folder Name:","Nome da pasta:"],["Menu Type:","Tipo de menu:"],["Status:","Estado:"],["Result:","Resultado:"],
        ["Create Menu","Criar menu"],["Cancel creation","Cancelar criação"],["Render Menu","Exibir menu"],
        ["Device Configuration","Configuração do dispositivo"],["Device","Dispositivo"],["Devices","Dispositivos"],["Device Page","Página de dispositivos"],
        ["HOME","Início"],["MUSIC","Músicas"],["RADIO","Rádios"],["VIDEO","Vídeos"],["PHOTO","Fotos"],["TV","Televisões"],["SEARCH","Pesquisa"],["SETTINGS","Configurações"],
        ["Home Page","Página inicial"],["Explore your media","Explore sua mídia"],["Back to Home","Voltar ao início"],
        ["Music Page","Página de música"],["Play your Music","Reproduzir música"],["Radio Page","Página de rádio"],["Play your radio stations","Ouvir rádios"],
        ["Video Page","Página de vídeo"],["Play your video files","Reproduzir vídeos"],["TV Page","Página de TV"],["Play your TV channels","Assistir canais de TV"],
        ["Photo Page","Página de fotos"],["Explore your photos","Explorar fotos"],["Search","Pesquisar"],["Search assets:","Pesquisar mídia:"],
        ["Asset name or metadata","Nome ou metadados"],["Name","Nome"],["Type","Tipo"],["Open","Abrir"],["Searching...","Pesquisando..."],
        ["Enter a search string.","Digite uma pesquisa."],["No assets found.","Nenhuma mídia encontrada."],
        ["Case sensitive","Diferenciar maiúsculas e minúsculas"],["Whole word","Palavra inteira"],
        ["Media type:","Tipo de mídia:"],["All","Todos"],["Music","Música"],["Radio","Rádio"],["Video","Vídeo"],["Pictures","Imagens"],["Television","TV"],
        ["Load more","Mostrar mais"],["Unable to load more media.","Não foi possível carregar mais mídia."],
        ["Previous results","Resultados anteriores"],["Next results","Próximos resultados"],
        ["Show mini player","Mostrar miniplayer"],["Mini player display period ms:","Tempo de exibição do miniplayer ms:"],
        ["Previous radio","Rádio anterior"],["Next radio","Próxima rádio"],["Previous song","Música anterior"],["Next song","Próxima música"],
        ["asset(s) found.","mídia(s) encontrada(s)."],["Start slide show","Iniciar apresentação"],["Stop slide show","Parar apresentação"],
        ["Previous photo","Foto anterior"],["Next photo","Próxima foto"],["Exit full screen","Sair da tela cheia"],["Full screen","Tela cheia"],
        ["Video progress","Progresso do vídeo"],["Live progress","Progresso ao vivo"],["Live stream","Transmissão ao vivo"],["Loading","Carregando"],
        ["Unable to enter full screen mode.","Não foi possível entrar no modo tela cheia."],
        ["Unable to start media playback. Please tap play again.","Não foi possível iniciar a reprodução. Toque em reproduzir novamente."],
        ["Unable to load music data.","Não foi possível carregar os dados de música."],
        ["Unable to load TV channels.","Não foi possível carregar os canais de TV."],
        ["Unable to play this TV stream in this browser.","Não foi possível reproduzir esta transmissão neste navegador."],
        ["This browser does not support the H.264/AAC codecs used by this TV stream.","Este navegador não suporta os codecs H.264/AAC desta transmissão."],
        ["Loading Music data...","Carregando dados de música..."],["Loading Photo data...","Carregando dados de fotos..."],
        ["Loading Radio data...","Carregando dados de rádio..."],["Loading TV data...","Carregando dados de TV..."],["Loading Video data...","Carregando dados de vídeo..."],
        ["Creation Date: ","Data de criação: "],["Size: ","Tamanho: "],["Track: ","Faixa: "],
        ["photos","Fotos"],["videos","Vídeos"],["tracks","Faixas"],["albums","Álbuns"],["channels","Canais"],
        ["Yes","Sim"],["No","Não"],["Ok","OK"],["Cancel","Cancelar"],["Leaving the application","Saindo do aplicativo"],
        ["Are you sure to leave the application?","Deseja sair do aplicativo?"]
    ])],
    ["es",new Map([
        ["App window","Ventana de la aplicación"],["Return to mini window","Volver a la miniventana"],
        ["Start","Iniciar"],["Play","Reproducir"],["Pause","Pausar"],["Mute","Silenciar"],["Unmute","Activar sonido"],
        ["Use the volume buttons on your iOS device to mute sound.","Usa los botones de volumen del dispositivo iOS para silenciar el sonido."],
        ["Unable to change mute setting.","No se pudo cambiar la configuración de sonido."],
        ["Search for ","Buscar "],["Unable to search.","No se pudo realizar la búsqueda."],
        ["Unable to open search result.","No se pudo abrir el resultado de la búsqueda."],
        ["VolumeUp","+"],["VolumeDown","-"],["Stop","Detener"],["Repeat","Repetir"],["Unrepeat","Cancelar repetición"],
        ["Red","Rojo"],["Blue","Azul"],["Green","Verde"],["Orange","Naranja"],["Purple","Morado"],["Yellow","Amarillo"],
        ["English","Inglés"],["German","Alemán"],["Italian","Italiano"],["French","Francés"],["Portuguese","Portugués"],["Spanish","Español"],
        ["Settings Page","Página de configuración"],["Application Configuration","Configuración de la aplicación"],["Configuration","Configuración"],
        ["Color:","Color:"],["Language:","Idioma:"],["Pagination size:","Tamaño de paginación:"],
        ["Slide Show Period ms:","Intervalo de presentación ms:"],["Fullscreen Inactivity Period ms:","Tiempo de inactividad en pantalla completa ms:"],
        ["Reinitialize","Restablecer"],["Reinitializing the local storage","Restableciendo el almacenamiento local"],
        ["Are you sure you want to reinitialize the local storage? You will lose your configuration and your favorite playlists.","¿Quieres restablecer el almacenamiento local? Perderás la configuración y las listas favoritas."],
        ["Favorite Configuration","Configuración de favoritos"],["New favorite Playlist:","Nueva lista favorita:"],
        ["Current favorites playlist name:","Nombre de la lista de favoritos actual:"],["New playlist name","Nombre de la nueva lista"],
        ["Remove current playlist","Eliminar lista actual"],["Asset name","Nombre del medio"],["Asset type","Tipo de medio"],["Logo","Logotipo"],
        ["Export playlist","Exportar lista"],["Import playlist","Importar lista"],["Playlist JSON","JSON de la lista"],
        ["No media assets in this playlist.","No hay medios en esta lista."],["Unable to import favorites playlist.","No se pudo importar la lista de favoritos."],
        ["Select the current playlist:","Seleccionar la lista actual:"],["Add new playlist","Añadir lista"],
        ["Remove playlist","Eliminar lista"],["Export all playlists","Exportar todas las listas"],
        ["Import all playlists","Importar todas las listas"],["Favorite playlists content:","Contenido de las listas favoritas:"],
        ["FAVORITE","Favoritos"],["Favorites","Favoritos"],["Cloud Configuration","Configuración de la nube"],["Cloud","Nube"],["Clouds","Nubes"],
        ["Cloud Account Name:","Nombre de la cuenta en la nube:"],["Cloud SAS:","SAS de la nube:"],["Cloud Container Name:","Nombre del contenedor en la nube:"],
        ["Cloud Folder Name:","Nombre de la carpeta:"],["Menu Type:","Tipo de menú:"],["Status:","Estado:"],["Result:","Resultado:"],
        ["Create Menu","Crear menú"],["Cancel creation","Cancelar creación"],["Render Menu","Mostrar menú"],
        ["Device Configuration","Configuración del dispositivo"],["Device","Dispositivo"],["Devices","Dispositivos"],["Device Page","Página de dispositivos"],
        ["HOME","Inicio"],["MUSIC","Música"],["RADIO","Radios"],["VIDEO","Vídeos"],["PHOTO","Fotos"],["TV","Televisión"],["SEARCH","Búsqueda"],["SETTINGS","Configuración"],
        ["Home Page","Página de inicio"],["Explore your media","Explora tus contenidos multimedia"],["Back to Home","Volver al inicio"],
        ["Music Page","Página de música"],["Play your Music","Reproduce tu música"],["Radio Page","Página de radio"],["Play your radio stations","Escucha estaciones de radio"],
        ["Video Page","Página de vídeo"],["Play your video files","Reproduce tus vídeos"],["TV Page","Página de TV"],["Play your TV channels","Mira tus canales de TV"],
        ["Photo Page","Página de fotos"],["Explore your photos","Explora tus fotos"],["Search","Buscar"],["Search assets:","Buscar medios:"],
        ["Asset name or metadata","Nombre o metadatos"],["Name","Nombre"],["Type","Tipo"],["Open","Abrir"],["Searching...","Buscando..."],
        ["Enter a search string.","Introduce un término de búsqueda."],["No assets found.","No se encontraron medios."],
        ["Case sensitive","Distinguir mayúsculas y minúsculas"],["Whole word","Palabra completa"],
        ["Media type:","Tipo de medio:"],["All","Todos"],["Music","Música"],["Radio","Radio"],["Video","Vídeo"],["Pictures","Imágenes"],["Television","TV"],
        ["Load more","Cargar más"],["Unable to load more media.","No se pudieron cargar más medios."],
        ["Previous results","Resultados anteriores"],["Next results","Resultados siguientes"],
        ["Show mini player","Mostrar minirreproductor"],["Mini player display period ms:","Duración del minirreproductor ms:"],
        ["Previous radio","Radio anterior"],["Next radio","Radio siguiente"],["Previous song","Canción anterior"],["Next song","Canción siguiente"],
        ["asset(s) found.","medio(s) encontrado(s)."],["Start slide show","Iniciar presentación"],["Stop slide show","Detener presentación"],
        ["Previous photo","Foto anterior"],["Next photo","Foto siguiente"],["Exit full screen","Salir de pantalla completa"],["Full screen","Pantalla completa"],
        ["Video progress","Progreso del vídeo"],["Live progress","Progreso en directo"],["Live stream","Transmisión en directo"],["Loading","Cargando"],
        ["Unable to enter full screen mode.","No se pudo activar el modo de pantalla completa."],
        ["Unable to start media playback. Please tap play again.","No se pudo iniciar la reproducción. Pulsa reproducir de nuevo."],
        ["Unable to load music data.","No se pudieron cargar los datos de música."],
        ["Unable to load TV channels.","No se pudieron cargar los canales de TV."],
        ["Unable to play this TV stream in this browser.","No se puede reproducir esta transmisión en este navegador."],
        ["This browser does not support the H.264/AAC codecs used by this TV stream.","Este navegador no admite los códecs H.264/AAC de esta transmisión."],
        ["Loading Music data...","Cargando datos de música..."],["Loading Photo data...","Cargando datos de fotos..."],
        ["Loading Radio data...","Cargando datos de radio..."],["Loading TV data...","Cargando datos de TV..."],["Loading Video data...","Cargando datos de vídeo..."],
        ["Creation Date: ","Fecha de creación: "],["Size: ","Tamaño: "],["Track: ","Pista: "],
        ["photos","Fotos"],["videos","Vídeos"],["tracks","Pistas"],["albums","Álbumes"],["channels","Canales"],
        ["Yes","Sí"],["No","No"],["Ok","OK"],["Cancel","Cancelar"],["Leaving the application","Saliendo de la aplicación"],
        ["Are you sure to leave the application?","¿Quieres salir de la aplicación?"]
    ])]
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
