class List {
    constructor() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
    add(value) {
        this.items.push(value);
    }
    get(index) {
        return this.items[index];
    }
    remove(index) {
        return this.items.splice(index, 1);
    }
    pop() {
        if (this.items.length > 0) {
            var m = this.items[this.items.length - 1];
            this.remove(this.items.length - 1);
            return m;
        }
        return null;
    }
    peek() {
        if (this.items.length > 0) {
            var m = this.items[this.items.length - 1];
            return m;
        }
        return null;
    }
    push(value) {
        this.items.push(value);
    }
}
//# sourceMappingURL=List.js.map