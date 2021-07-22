import { Item } from './Item';


type OrderedRange = {
    leftBound: Item, 
    rightBound: Item, 
}

export class DateRange {
    private bounds: Item[];

    constructor(bounds?: Item[]) {
        this.bounds = bounds || [];
    }

    private reorderBounds() {
        if (this.bounds.length < 2) return;
        this.bounds = this.bounds.sort((a: Item, b: Item) => {
            if (a.date.getTime() < b.date.getTime()) return - 1; 
            if (a.date.getTime() > b.date.getTime()) return 1;

            return 0;
        });
    }

    public pushBound(bound: Item) {
        if (!this.isFull) {
            this.bounds.push(bound);
        } else {
            this.clearBounds();
            this.pushBound(bound);
        }

        this.reorderBounds();
    }

    public clearBounds() {
        this.bounds = [];
    }

    get isFull() {
        return this.bounds.length === 2;
    }

    get orderedRange() {
        if (!this.isFull && this.bounds.length === 1) {
            return {
                leftBound: this.bounds[0],
                rightBound: this.bounds[0],
            }
        }

        return {
            leftBound: this.bounds[0],
            rightBound: this.bounds[1]
        }
    }
}