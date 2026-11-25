import "core-js/stable";

if(!("isConnected" in Node.prototype))
{
    Object.defineProperty(Node.prototype, "isConnected", {
        get(this: Node): boolean {
            const root = this.ownerDocument || document;
            return this === root || root.documentElement.contains(this);
        }
    });
}

if(!Element.prototype.matches)
{
    Object.defineProperty(Element.prototype, "matches", {
        configurable: true,
        writable: true,
        value: Element.prototype.webkitMatchesSelector
    });
}

if(!Element.prototype.closest)
{
    Element.prototype.closest = function(selector: string): Element | null {
        let element: Element | null = this;
        while(element)
        {
            if(element.matches(selector))
                return element;
            element = element.parentElement;
        }
        return null;
    };
}

if(!window.CSS || !CSS.supports("display", "grid"))
    document.documentElement.classList.add("media-legacy");
