
class Playlist extends MediaObject{

    public  CreateView(): string
    {
        var result =  "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";        
        result +=  "Playlist View to be completed name: " + this.GetName();        
        result +=  "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">" ;       
        if(!isNullOrUndefined(this.GetParent())){
            result +=  "<button type=\"button\" id=\"" + MediaObject.GetParentButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>" ;
        };
        if(!isNullOrUndefined(this.GetChildWithIndex(0))){
            result +=  "<button type=\"button\" id=\"" + MediaObject.GetChildButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if(!isNullOrUndefined(this.GetPrevious())){
            result +=  "<button type=\"button\" id=\"" + MediaObject.GetPreviousButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
        }
        if(!isNullOrUndefined(this.GetNext())){
            result +=  "<button type=\"button\" id=\"" + MediaObject.GetNextButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
        }
        result +=  "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    }
    public  CreatePreview(): string
    {
        return "<div><label>Playlist Preview</label><button id=\"parentButtonId\">Left</button><button id=\"upButtonId\">Up</button><button id=\"downButtonId\">Down</button><button id=\"playButtonId\">Play</button><button id=\"childButtonId\">Child</button></div>";
    }    
}





