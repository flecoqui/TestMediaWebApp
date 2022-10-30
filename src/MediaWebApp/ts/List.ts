class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }
    remove(index: number): T[] {
        return this.items.splice(index,1);
    }
    pop(): T|null {
        
        if(this.items.length>0){
            var m:T = this.items[this.items.length-1];
            this.remove(this.items.length-1);
            return m;
        }
        return null;
    }
    peek(): T|null {
        
        if(this.items.length>0){
            var m:T = this.items[this.items.length-1];
            return m;
        }
        return null;
    }
    push(value: T): void {
        this.items.push(value);
    }

}
