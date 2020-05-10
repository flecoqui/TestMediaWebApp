/*
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    BlobDownloadResponseModel
  } from "@azure/storage-blob";
import { MediaPlaybackMode} from "./IMediaView";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var BlobServiceClient;
/*
import {
    BlobServiceClient
  } from "@azure/storage-blob";
*/
var TestAzureStorage = function () {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var account, accountKey, sharedKeyCredential, blobServiceClient, i, _b, _c, container, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    account = "mediacloud";
                    accountKey = "9y4eAbrgpCRtP72wXamkJcUOV8ph1NEPlHtQcBZlDOYh1gNI/g6Vz4JP3xFHMAlKqn4/2JX3c9FLILo5u7k5YA==";
                    sharedKeyCredential = "?sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
                    blobServiceClient = new BlobServiceClient(
                    // When using AnonymousCredential, following url should include a valid SAS or support public access
                    "https://" + account + ".blob.core.windows.net", sharedKeyCredential);
                    i = 1;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _b = __asyncValues(blobServiceClient.listContainers());
                    _d.label = 2;
                case 2: return [4 /*yield*/, _b.next()];
                case 3:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                    container = _c.value;
                    console.log("Container " + i++ + ": " + container.name);
                    _d.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _d.trys.push([7, , 10, 11]);
                    if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_b)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
};
/**
 * Jquery
 */
/*
interface JQuery{
    carousel():void;
}
*/
var ActivateCarousel = function () {
    $('.carousel').carousel();
};
var isNullOrUndefined = function (value) {
    if ((value === null) || (value === undefined))
        return true;
    return false;
};
var isNullOrUndefinedOrEmpty = function (value) {
    if ((value === null) || (value === undefined))
        return true;
    if (value == "")
        return true;
    return false;
};
var GetTimeString = function (seconds) {
    var format = function (val) { return ("0" + Math.floor(val)).slice(-2); };
    var hours = seconds / 3600;
    var minutes = (seconds % 3600) / 60;
    return [hours, minutes, seconds % 60].map(format).join(':');
};
var GetFileAsync = function (path) {
    return __awaiter(this, void 0, void 0, function () {
        var p, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = new Promise(function (resolve) { return GetFileAsyncFunction(resolve, path); });
                    return [4 /*yield*/, p];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
var GetFileAsyncFunction = function (resolve, path) {
    var req = new XMLHttpRequest();
    req.open('GET', path, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200)
                resolve(req.responseText);
            else
                resolve(null);
        }
    };
    req.send(null);
};
var enStrings = new Map([
    ["Start", "Start"],
    ["Play", "Play"],
    ["Pause", "Pause"],
    ["Mute", "Mute"],
    ["VolumeUp", "+"],
    ["VolumeDown", "-"],
    ["Stop", "Stop"],
    ["Repeat", "Repeat"]
]);
var frStrings = new Map([
    ["Start", "Joue"],
    ["Play", "Joue"],
    ["Pause", "Pause"],
    ["Mute", "Silence"],
    ["VolumeUp", "+"],
    ["VolumeDown", "-"],
    ["Stop", "Arrêter"],
    ["Repeat", "Répéter"],
    ["Red", "Rouge"],
    ["Blue", "Bleu"],
    ["Green", "Vert"],
    ["Orange", "Orange"],
    ["Purple", "Violet"],
    ["Yellow", "Jaune"],
    ["English", "Anglais"],
    ["German", "Allemand"],
    ["Italian", "Italien"],
    ["French", "Français"],
    ["Portuguese", "Portugais"],
    ["Configure your application: color, language", "Configuration de votre application, couleur, langage"],
    ["Settings Page", "Page de Configuration"],
    ["Color:", "Couleur:"],
    ["Language:", "Langage:"],
    ["Music Page", "Page de musique"],
    ["TV Page", "Page de TV"],
    ["Home Page", "Page d'Accueil"],
    ["Video Page", "Page de Vidéos"],
    ["Device Page", "Page des dispositifs audio"],
    ["Back to Home", "Retour à l'acceuil"],
    ["Test Media Web Application &copy;", "Test Media Web Application &copy;"],
    ["Feel free to download the code from:", "N'hésitez pas à télécharger le code ici:"],
    ["Web Media App", "Web Media App"],
    ["HOME", "ACCUEIL"],
    ["MUSIC", "MUSIQUE"],
    ["VIDEO", "VIDEO"],
    ["RADIO", "RADIO"],
    ["TV", "TV"],
    ["DEVICE", "APPAREIL"],
    ["SETTINGS", "PARAMETRES"],
    ["Music Page", "Page de Musique"],
    ["Play your Music", "Jouer vos contenus musicaux"],
    ["Radio Page", "Page des radios"],
    ["Play your radio stations", "Ecouter vos stations de radios"],
    ["Video Page", "Page des vidéos"],
    ["Play your video files", "Visualiser vos vidéos"],
    ["TV Page", "Page Télévision"],
    ["Play your TV channels", "Regarder vos chaines de télévision"],
    ["Device Page", "Page des appareils"],
    ["Explore your local devices", "Explorer vos appareils sur le réseau"],
    ["Home Page", "Page d'acceuil"],
    ["Explore your media", "Explorer et jouer vos contenus multi-média"],
]);
var strings = new Map([
    ["en", enStrings],
    ["fr", frStrings]
]);
var GetCurrentString = function (id) {
    var localStrings = strings.get(GlobalVars.globalLanguage);
    if (!isNullOrUndefined(localStrings)) {
        var s = localStrings.get(id);
        if (!isNullOrUndefined(s)) {
            return s;
        }
    }
    return id;
};
/**
 * Media playback mode
 */
var MediaPlaybackMode;
(function (MediaPlaybackMode) {
    MediaPlaybackMode[MediaPlaybackMode["NoLoop"] = 0] = "NoLoop";
    MediaPlaybackMode[MediaPlaybackMode["Loop"] = 1] = "Loop";
    MediaPlaybackMode[MediaPlaybackMode["PlaylistLoop"] = 2] = "PlaylistLoop";
})(MediaPlaybackMode || (MediaPlaybackMode = {}));
var GlobalVars = /** @class */ (function () {
    function GlobalVars() {
    }
    GlobalVars.globalPlaybackLoop = MediaPlaybackMode.Loop;
    GlobalVars.globalLanguage = "en";
    GlobalVars.globalColor = "blue";
    return GlobalVars;
}());
//# sourceMappingURL=Common.js.map