class TV extends MediaObject {
    CreateView() {
        var result = "<div class=\"col-md-4\"><div class=\"card mb-4 box-shadow\"><img class=\"card-img-top\" src=\"" + this.GetImageUrl() + "\" alt=\"Card image cap\"><div class=\"card-body\"><p class=\"card-text\">";
        result += "<strong>" + this.GetName() + "</strong></p>";
        result += this.GetDescription() + "</p>";
        result += "</p><div class=\"d-flex justify-content-between align-items-center\"><div class=\"btn-group\">";
        if (!isNullOrUndefined(this.GetParent())) {
            result += "<button type=\"button\" id=\"" + MediaObject.GetParentButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Back</button>";
        }
        ;
        if (!isNullOrUndefined(this.GetChildWithIndex(0))) {
            result += "<button type=\"button\" id=\"" + MediaObject.GetChildButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Child</button>";
        }
        if (!isNullOrUndefined(this.GetPrevious())) {
            result += "<button type=\"button\" id=\"" + MediaObject.GetPreviousButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Previous</button>";
        }
        if (!isNullOrUndefined(this.GetNext())) {
            result += "<button type=\"button\" id=\"" + MediaObject.GetNextButtonId() + "\"  class=\"btn btn-sm btn-outline-secondary\">Next</button>";
        }
        result += "</div><small class=\"text-muted\">9 mins</small></div></div></div>";
        return result;
    }
    CreatePreview() {
        return "<div><label>Menu Preview</label></div>";
    }
}
//# sourceMappingURL=TV.js.map