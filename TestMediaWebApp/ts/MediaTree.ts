
class CloudMediaTree {

    private _root: IMediaObject;
    private _menuType: string;
    private _account:string;
    private _sas:string;
    private _container:string;
    private _folder:string;
    private _musicExtensions:string = ".m4a;.aac;.mp3;.flac";
    private _videoExtensions:string = ".mp4";
    private _radioExtensions:string = ".json";
    private _tvExtensions:string = ".json";
    private _photoExtensions:string = ".jpg;.png";
    private unknownAlbum:string = "UnknownAlbum";
    private unknownArtist:string = "UnknownArtist";
    

    constructor(menuType: string, account:string, sas:string,  container:string, folder:string){
        this._root = null;
        this._account = account;
        this._sas = sas;
        this._container = container;
        this._folder = folder;
        this._menuType = menuType;
        if(this._menuType == 'Music'){
            this._root = new Music("Cloud Music",`Account: ${account} Container: ${container} Folder: ${folder}`,"","assets/img/Music.png","","");
        }
        else if(this._menuType == 'Radio'){
            this._root = new Radio("Cloud Radio",`Account: ${account} Container: ${container} Folder: ${folder}`,"","assets/img/Radio.png","","");
        }
        else if(this._menuType == 'Video'){
            this._root = new Video("Cloud Video",`Account: ${account} Container: ${container} Folder: ${folder}`,"","assets/img/Videos.png","","");
        }
        else if(this._menuType == 'Photo'){
            this._root = new Photo("Cloud Photo",`Account: ${account} Container: ${container} Folder: ${folder}`,"","assets/img/Pictures.png","","");
        }
        else if(this._menuType == 'TV'){
            this._root = new TV("Cloud TV",`Account: ${account} Container: ${container} Folder: ${folder}`,"","assets/img/TV.png","","");
        }

    }
    public static CreateMediaTree(menuType: string, account:string, sas:string,  container:string, folder:string):CloudMediaTree
    {
        return new CloudMediaTree(menuType, account,sas, container,folder);
    }
    public AddString(arrayPath: string[], index: number):boolean
    {
        if(this._menuType == 'Music'){
            return this.AddMusicString(arrayPath, index);
        }
        else if(this._menuType == 'Radio'){
            return this.AddRadioString(arrayPath, index);
        }
        else if(this._menuType == 'Video'){
            return this.AddVideoString(arrayPath, index);
        }
        else if(this._menuType == 'Photo'){
            return this.AddPhotoString(arrayPath, index);
        }
        else if(this._menuType == 'TV'){
            return this.AddTVString(arrayPath, index);
        }
        return false;
    }
    protected EndWithExtension(path: string, extension: string ){
        var splits = extension.split(";")
        for(var i: number = 0; i < splits.length; i++){
            if(path.toLowerCase().endsWith(splits[i]))
                return true;
        }
        return false;
    }
    protected GetMusicTitle(path: string):string {
        var splits = path.split("/")
        if(!isNullOrUndefined(splits)&&(splits.length>0)){
            var filename:string = splits[splits.length-1];
            if(!isNullOrUndefinedOrEmpty(filename)){
                var descsplits = filename.split('-');
                if(!isNullOrUndefined(descsplits)&&(descsplits.length > 0)){
                    var title:string = descsplits[descsplits.length-1];
                    var pos = title.lastIndexOf(".");
                    if(pos>0)
                    {
                        title = title.substr(0,pos);
                    }
                    return title;
                }
            }
        }
        return path;
    }
    protected GetMusicArtist(path: string):string {
        var splits = path.split("/")
        if(!isNullOrUndefined(splits)&&(splits.length>2)){
            var artist:string = splits[splits.length-3];
            var description:string = splits[splits.length-1];
            if(!isNullOrUndefinedOrEmpty(description)){
                var descsplits = description.split('-');
                if(!isNullOrUndefined(descsplits)&&(descsplits.length == 4)){
                    artist = descsplits[descsplits.length-3];
                }
            }
            return artist;
        }
        return this.unknownArtist;
    }
    protected GetMusicAlbum(path: string):string {
        var splits = path.split("/")
        if(!isNullOrUndefined(splits)&&(splits.length>1)){
            var album:string = splits[splits.length-2];
            var description:string = splits[splits.length-1];
            if(!isNullOrUndefinedOrEmpty(description)){
                var descsplits = description.split('-');
                if(!isNullOrUndefined(descsplits)&&(descsplits.length == 4)){
                    album = descsplits[descsplits.length-2];
                }
            }
            return album;
        }
        return this.unknownAlbum;
    }
    protected GetMusicTrack(path: string):string {
        var splits = path.split("/")
        if(!isNullOrUndefined(splits)){
            var filename:string = splits[splits.length-1];
            if(!isNullOrUndefinedOrEmpty(filename)){
                var pos = filename.indexOf("-");
                if(pos>0)
                {
                    var trackstring = filename.substr(0,pos);
                    var track = -1;
                    try
                    {
                        track = Number.parseInt(trackstring);
                    }
                    catch(Error){}
                    if(track>=0){
                        return track.toString();
                    }
                }
            }
        }
        return "";
    }
    protected GetMusicContentUrl(path: string):string {
        let contentUrl: string = "";
        var suffixUrl = "";
        if(isNullOrUndefinedOrEmpty(this._folder)){
            //suffixUrl = encodeURI(`${path}`);
            suffixUrl = `${path}`;
        }
        else{
            //suffixUrl = encodeURI(`${this._folder}/${path}`);    
            suffixUrl = `${this._folder}/${path}`;    
        }
        contentUrl = `https://${this._account}.blob.core.windows.net/${this._container}/${suffixUrl}?${this._sas}`;

        /*
        if(isNullOrUndefinedOrEmpty(this._folder)){
            contentUrl = `https://${this._account}.blob.core.windows.net/${this._container}/${path}?${this._sas}`;
        }
        else{
            contentUrl = `https://${this._account}.blob.core.windows.net/${this._container}/${this._folder}/${path}?${this._sas}`;    
        }
        */
        return contentUrl;
    }
    protected IsFilePresent(arrayPath: string[],index:number, folder: string):boolean {
        var min:number = (index - 20)>=0 ? index - 20:0;
        var max:number = (index + 20)>= arrayPath.length ? arrayPath.length : index + 20;
        for(var i=min; i<max; i++)
        {
            if(folder == arrayPath[i])
                return true;
        }        
        return false;
    }
    protected GetMusicAlbumUrl(arrayPath: string[],index:number, path: string):string {
        var contentUrl: string = "assets/img/Music.png";  
        var pos = path.lastIndexOf("/");
        if(pos>0)
        {
            var folder = path.substr(0,pos);
            folder += "/artwork.jpg";
            if(this.IsFilePresent(arrayPath,index,folder)==true)
            {
                var suffixUrl = "";
                if(isNullOrUndefinedOrEmpty(this._folder)){
//                    suffixUrl = encodeURI(`${folder}?${this._sas}`);
suffixUrl = `${folder}?${this._sas}`;
                }
                else{
  //                  suffixUrl = encodeURI(`${this._folder}/${folder}?${this._sas}`);    
suffixUrl = `${this._folder}/${folder}?${this._sas}`;    
                }
                contentUrl = `https://${this._account}.blob.core.windows.net/${this._container}/${suffixUrl}`;
            }
        }
        return contentUrl;
    }

    public AddMusicItem(artist: string, album: string, media: IMediaObject):boolean
    {
        try
        {
        var artistMedia = this._root.GetChildWithName(artist);
        if(isNullOrUndefined(artistMedia)){
            this._root.AddChild(new Music(artist,"Artist: " +artist ,"","",""));
            artistMedia = this._root.GetChildWithName(artist);
        }
        var albumMedia = artistMedia.GetChildWithName(album);
        if(isNullOrUndefined(albumMedia)){
            artistMedia.AddChild(new Music(album,"Artist: " +artist + " Album: " + album ,"",media.GetImageUrl(),""));
            albumMedia = artistMedia.GetChildWithName(album);
        }
        albumMedia.AddChild(media);
        }
        catch(Error)
        {
            return false;
        }
        return true;
    }
    public AddMusicString(arrayPath: string[], index: number):boolean
    {
        if(!isNullOrUndefined(arrayPath)&&(index>=0)&&(index<arrayPath.length)){
            let currentPath = arrayPath[index];
            if(!isNullOrUndefinedOrEmpty(currentPath)){
                if(this.EndWithExtension(currentPath,this._musicExtensions)){
                    var album = this.GetMusicAlbum(currentPath);
                    var artist = this.GetMusicArtist(currentPath);
                    this.AddMusicItem(artist,album,new Music(this.GetMusicTitle(currentPath),"Track: " +this.GetMusicTrack(currentPath) + " Album: "+ album + " Artist: " + artist,this.GetMusicContentUrl(currentPath) ,this.GetMusicAlbumUrl(arrayPath,index,currentPath),"",""));
                }
            }
        }
        return false;
    }
    public AddRadioString(arrayPath: string[], index: number):boolean
    {
        return false;
    }
    public AddPhotoString(arrayPath: string[], index: number):boolean
    {
        return false;
    }
    public AddVideoString(arrayPath: string[], index: number):boolean
    {
        return false;
    }
    public AddTVString(arrayPath: string[], index: number):boolean
    {
        return false;
    }
    public GetMediaTree():IMediaObject
    {
        return this._root;
    }



}