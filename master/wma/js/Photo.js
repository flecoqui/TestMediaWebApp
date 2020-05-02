class Photo extends MediaObject {
    CreateView() {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + this.GetName() + "</strong></p>";
        result += this.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(this.GetParent())) {
            result += "<button type=\"button\" id=\"" + this.GetParentButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(this.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + this.GetChildButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (this.GetOneItemNavigation() === true) {
            if (!isNullOrUndefined(this.GetPrevious())) {
                result += "<button type=\"button\" id=\"" + this.GetPreviousButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
            }
            if (!isNullOrUndefined(this.GetNext())) {
                result += "<button type=\"button\" id=\"" + this.GetNextButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
            }
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
//# sourceMappingURL=Photo.js.map