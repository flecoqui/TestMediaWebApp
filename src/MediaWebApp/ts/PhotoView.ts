import { IMediaObject } from "./IMediaObject";
import { MediaView } from "./MediaView";
import { GetCurrentString, isNullOrUndefined, GetFileAsync, isNullOrUndefinedOrEmpty } from "./Common";
import { GlobalVars} from "./GlobalVars";


/**
 * PhotoView
 */
export class PhotoView extends MediaView{
    private fullscreenPhotoIndices: Record<number, number> = {};
    public CreateChildView(current: IMediaObject):boolean
    {
        return this.InternalCreateChildView(current);
    }
    public RegisterViewEvents(current: IMediaObject): boolean
    {
        const result = this.internalRegisterViewEvents(current);
        this.RegisterFullscreenViewEvents(current, true);
        document.getElementById(this.GetFullscreenPreviousButtonId(current.GetIndex()))?.addEventListener("click", () => this.ShowSiblingPhoto(current, -1));
        document.getElementById(this.GetFullscreenNextButtonId(current.GetIndex()))?.addEventListener("click", () => this.ShowSiblingPhoto(current, 1));
        return result;
    }
    public InitializeViewControls(current: IMediaObject): boolean
    {
        return this.internalInitializeVieWControls(current);
    }
    public MakeViewControlVisible(current: IMediaObject): boolean
    {
        return this.InternalMakeViewControlVisible(current);
    }
    public GetFirstChildImageUrl(current: IMediaObject): string|null
    {

        if(!isNullOrUndefined(current))
        {
            var url = current.GetImageUrl();
            if(!isNullOrUndefinedOrEmpty(url)){
                return url;
            }
            else
            {
                for(var i:number = 0 ; i < current.GetChildrenLength();i++){
                    let mo = current.GetChildWithIndex(i)
                    if(mo){
                        var uri = this.GetFirstChildImageUrl(mo);
                        if(!isNullOrUndefinedOrEmpty(uri)){
                            return uri;
                        }
                    }
                }
            }
        }
        return null;

    }
    public GetNumberOfChildImageUrl(current: IMediaObject): number
    {

        var counter:number = 0;
        if(!isNullOrUndefined(current))
        {
            if(!isNullOrUndefinedOrEmpty(current.GetImageUrl()))
            {
                counter++;
            }
            for(var i:number = 0 ; i < current.GetChildrenLength();i++){
                let mo = current.GetChildWithIndex(i);
                if(mo)
                    counter += this.GetNumberOfChildImageUrl(mo);
            }
        }
        return counter;
    }
    public GetImageURl(dataUrl:string,newWidth:number,imageType:string ="image/jpeg"){
        return new Promise(  resolve => {

            try
            {
                let imageArguments=0.7;
                var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;
                image = new Image(); 
                image.src = dataUrl;
                oldWidth = image.width; oldHeight = image.height;
                newHeight = Math.floor(oldHeight / oldWidth * newWidth);
        
                canvas = document.createElement("canvas");
                canvas.width = newWidth; canvas.height = newHeight;
                ctx = canvas.getContext("2d");
                if(ctx)
                    ctx.drawImage(image, 0, 0, newWidth, newHeight);
                //log(ctx);
                newDataUrl = canvas.toDataURL(imageType, imageArguments);
                resolve(newDataUrl);
            }
            catch(Error)
            {
                resolve(null);
            }
            });
    };
    public  CreateView(current: IMediaObject): string
    {
        var result =  "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\"  id=\""+this.GetControlViewId(current.GetIndex())+"\" ><div class=\"card mb-4 box-shadow\"><div  class=\"img-gradient\"  \" >";
        if(!isNullOrUndefinedOrEmpty(current.GetImageUrl()))
        {
            if(!isNullOrUndefinedOrEmpty(current.GetContentUrl()))
                result += "<div class=\"embed-responsive embed-responsive-16by9 media-fullscreen-container\" id=\"" + this.GetFullscreenContainerId(current.GetIndex()) + "\"><img class=\"card-img-top embed-responsive-item media-fullscreen-photo\" src=\"" + current.GetImageUrl() + "\" alt=\"" + current.GetName() + "\"></img>" + this.CreatePhotoFullscreenControls(current) + "</div>";
            else
                result += "<div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + current.GetImageUrl() + "\" alt=\"" + current.GetName() + "\"></img></div>";
        }
        else
        {
            var count: number = 0;
            var urlArray: string[] = [];
            result += "<div class=\"carousel slide\" data-interval=\""+ GlobalVars.GetGlobalSlideShowPeriod()+"\" data-ride=\"carousel\"><div class=\"carousel-inner\">";
            for(var i = 0; i < current.GetChildrenLength(); i++){
                var obj: IMediaObject|null =  current.GetChildWithIndex(i);
                if(obj)
                    if(!isNullOrUndefined(obj)){
                        var url = this.GetFirstChildImageUrl(obj);
                        if(!isNullOrUndefinedOrEmpty(url)){
                            if(url)
                                if(urlArray.indexOf(url)<= 0){
                                    urlArray.push(url);
                                }
                        }
                    }
            }
            if(urlArray.length>0){
                var active: boolean = true;
                for(var i = 0; i < urlArray.length; i++){
                    if(active == true){
                        result += "<div class=\"carousel-item  active\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                        active = false;
                    }
                    else
                        result += "<div class=\"carousel-item \"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"" + urlArray[i] + "\" ></div></div>";
                }
            }
            else{
                result += "<div class=\"carousel-item active\"><div class=\"embed-responsive embed-responsive-16by9\"><img class=\"card-img-top embed-responsive-item\" src=\"assets/img/Pictures.png\" ></div></div>";
            }
            result += "</div></div>";
        }

        result +="</div><div class=\"card-body media-gradientoverlap\" id=\"media-gradient\">";
        result += "<div class='media-playback-div'>"          


        // Placeholder
        {
            result += "<div class=\"media-slider-div media-button-hidden\"><label class=\"media-time\" id=\"" + this.GetPositionId(current.GetIndex()) + "\">00:00</label>";          
            result += "<div class=\"media-slider-container \"><input type=\"range\" min=\"0\" max=\"100\" value=\"0\" class=\"media-slider\" id=\"" + this.GetSliderId(current.GetIndex()) + "\" ></div>";
            result +=  "<label class=\"media-duration\"  id=\"" + this.GetDurationId(current.GetIndex()) + "\"   >00:00</label>";

            result +=  "<button type=\"button\" id=\"" + this.GetUnmuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\"  ><strong><i class=\"fa fa-volume-up\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetMuteButtonId(current.GetIndex()) + "\" class=\"media-button media-button-small media-button-right\" ><strong><i class=\"fa fa-volume-off\"></i></strong></button></div>";

        }
        result += "<div  class=\"media-play-div\">";
        result += "<div><p class=\"media-title\" ><strong>" + current.GetName() +"</strong></p></div>";
    
        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl())){
            result += "<div>";
            result +=  "<button type=\"button\" id=\"" + this.GetStartButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetStopButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-stop\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPlayButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-play\"></i></strong></button>";
            result +=  "<button type=\"button\" id=\"" + this.GetPauseButtonId(current.GetIndex()) + "\"  class=\"media-button media-button-right media-button-top media-button-big\"><strong><i class=\"fa fa-pause\"></i></strong></button>";
            result += "</div>"
        }
        let folder:string = current.GetFolder();
        let size:string = current.GetFileSize();
        let date:string = current.GetFileDate();
        let title:string = current.GetTitle();

        if(isNullOrUndefinedOrEmpty(folder)) {
                if(!isNullOrUndefinedOrEmpty(date)||
                !isNullOrUndefinedOrEmpty(title)||
                !isNullOrUndefinedOrEmpty(size)){
                // Photo               
                result += "<p class=\"media-artist\" ><strong>"+GetCurrentString('Creation Date: ') +date +"</strong></p>";
                if(!isNullOrUndefinedOrEmpty(size))
                    result += "<p class=\"media-album\" >" + GetCurrentString('Size: ')+ size + GetCurrentString(' Bytes') +"</p>";
                else
                    result += "<p class=\"media-album\" ></p>";
                }
                else{
                    // Folder
                    let num:string =  this.GetNumberOfChildImageUrl(current).toString();
                    result += "<p class=\"media-artist\" ><strong>" + title +"</strong></p>";
                    result += "<p class=\"media-album\" >" + num + " " +  GetCurrentString('photos') +"</p>";
                }        
            }
            else
            { 
                // Folder
                let num:string =  this.GetNumberOfChildImageUrl(current).toString();
                result += "<p class=\"media-artist\" ><strong>" + title +"</strong></p>";
                result += "<p class=\"media-album\" >" + num + " " +  GetCurrentString('photos') +"</p>";
            }
        /*
        }
        else {
            result += "<p class=\"media-artist\" ><strong>" + current.GetDescription() +"</strong></p>";
            result += "<p class=\"media-album\" ></p>";
        }
        */
        
        
        result += "</div>"
        result += "</div>"

        result += "<div class=\"media-div\" >";

        if(!isNullOrUndefined(current.GetParent())){
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        else{
            result += "<div class=\"media-button-group-horizontal  media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-left\"></i></strong></button>";
            result += "</div>";
        }
        if(current.HasChild()==true){
            result += "<div class=\"media-button-group-horizontal\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        else{
            result += "<div class=\"media-button-group-horizontal media-button-hidden\" >";
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId(current.GetIndex()) + "\" class=\"media-button\"><strong><i class=\"fa fa-arrow-right\"></i></strong></button>";
            result += "</div>";
        }
        if(!isNullOrUndefinedOrEmpty(current.GetContentUrl())){
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetLoopButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-refresh\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetPlayListLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-rotate-right\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetNoLoopButtonId(current.GetIndex()) + "\" class=\"media-button\"  style=\"display: block;\"><strong><i class=\"fa fa-circle-o-notch\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetAddFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star-o\"></i></strong></button>";
            result += "<button type=\"button\" id=\"" + this.GetRemoveFavoriteButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-star\"></i></strong></button>";
            result += "</div>";
            result += "<div class=\"media-button-group-horizontal\">";
            result += "<button type=\"button\" id=\"" + this.GetDownloadButtonId(current.GetIndex()) + "\" class=\"media-button\" style=\"display: block;\" ><strong><i class=\"fa fa-cloud-download\"></i></strong></button>";
            result += "</div>";
        }   
        if( this.DisplayNextButton(current)||this.DisplayPreviousButton(current))
        {
            result += "<div class=\"media-button-group-horizontal media-button-group-right\">";
            if(this.DisplayPreviousButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-up\"></i></strong></button>";
            }
            else{
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }

            if(this.DisplayNextButton(current)){
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";
            }
            else {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId(current.GetIndex()) + "\" class=\"media-button media-button-hidden\" ><strong><i class=\"fa fa-chevron-down\"></i></strong></button>";

            }
            result += "</div>";
        }

        result += "</div>";
        result += "</div></div></div></div>";

        return result;

    }
    public StartMedia(mo: IMediaObject): void
    {
        this.fullscreenPhotoIndices[mo.GetIndex()] = mo.GetIndex();
        this.EnterFullscreen(mo, true);
    }
    protected EnterFullscreen(cur: IMediaObject, allowWithoutVideo: boolean = false): void
    {
        if(allowWithoutVideo)
        {
            this.fullscreenPhotoIndices[cur.GetIndex()] ??= cur.GetIndex();
            this.UpdateFullscreenPhoto(cur);
        }
        super.EnterFullscreen(cur, allowWithoutVideo);
    }
    public StopMedia(mo: IMediaObject): void
    {
        this.ExitFullscreen(mo);
    }
    private CreatePhotoFullscreenControls(current: IMediaObject): string
    {
        return "<div class=\"media-fullscreen-controls\"><div class=\"media-fullscreen-control-buttons\"><button type=\"button\" id=\"" + this.GetFullscreenPreviousButtonId(current.GetIndex()) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + GetCurrentString("Previous photo") + "\"><strong><i class=\"fa fa-chevron-left\"></i></strong></button><button type=\"button\" id=\"" + this.GetFullscreenStopButtonId(current.GetIndex()) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + GetCurrentString("Stop") + "\"><strong><i class=\"fa fa-stop\"></i></strong></button><button type=\"button\" id=\"" + this.GetFullscreenExitButtonId(current.GetIndex()) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + GetCurrentString("Exit full screen") + "\"><strong><i class=\"fa fa-compress\"></i></strong></button><button type=\"button\" id=\"" + this.GetFullscreenNextButtonId(current.GetIndex()) + "\" class=\"media-button media-fullscreen-control-button\" aria-label=\"" + GetCurrentString("Next photo") + "\"><strong><i class=\"fa fa-chevron-right\"></i></strong></button></div></div>";
    }
    private ShowSiblingPhoto(current: IMediaObject, offset: number): void
    {
        const parent = current.GetParent();
        if(!parent)
            return;
        const displayedIndex = this.fullscreenPhotoIndices[current.GetIndex()] ?? current.GetIndex();
        const nextIndex = displayedIndex + offset;
        if(nextIndex < 0 || nextIndex >= parent.GetChildrenLength())
        {
            this.ShowFullscreenControls(current);
            return;
        }
        const next = parent.GetChildWithIndex(nextIndex);
        if(next && !isNullOrUndefinedOrEmpty(next.GetContentUrl()))
        {
            this.fullscreenPhotoIndices[current.GetIndex()] = nextIndex;
            this.UpdateFullscreenPhoto(current, next);
            this.ShowFullscreenControls(current);
        }
    }
    private UpdateFullscreenPhoto(current: IMediaObject, photo?: IMediaObject): void
    {
        const parent = current.GetParent();
        const index = this.fullscreenPhotoIndices[current.GetIndex()] ?? current.GetIndex();
        const selected = photo ?? parent?.GetChildWithIndex(index) ?? current;
        const container = document.getElementById(this.GetFullscreenContainerId(current.GetIndex()));
        const image = container?.querySelector<HTMLImageElement>(".media-fullscreen-photo");
        if(image)
        {
            image.src = !isNullOrUndefinedOrEmpty(selected.GetContentUrl()) ? selected.GetContentUrl() : selected.GetImageUrl();
            image.alt = selected.GetName();
        }
        const previous = document.getElementById(this.GetFullscreenPreviousButtonId(current.GetIndex())) as HTMLButtonElement | null;
        const next = document.getElementById(this.GetFullscreenNextButtonId(current.GetIndex())) as HTMLButtonElement | null;
        if(previous)
            previous.disabled = index <= 0;
        if(next)
            next.disabled = !parent || index >= parent.GetChildrenLength() - 1;
    }
    public  CreatePreview(): string
    {
        return "<div><label>Menu Preview</label></div>";
    }
    
}
