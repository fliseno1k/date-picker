import { Item } from './item';
import {OrderedRange} from "@/types/range.type";

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

    set range(range: OrderedRange) {
        const arr = [range.leftBound, range.rightBound];
        arr
            .filter((bound: Item) => bound !== null && bound !== undefined)
            .forEach((bound: Item) => this.pushBound(bound));
    }

    get isFull() {
        return this.bounds.length === 2;
    }

    get isEmpty() {
        return this.bounds.length === 0;
    }

    get orderedRange() {
        if (!this.isFull && !this.isEmpty) {
            return {
                leftBound: this.bounds[0],
                rightBound: this.bounds[0],
            }
        } else if (this.isEmpty) {
            return {
                leftBound: null,
                rightBound: null
            }
        }

        return {
            leftBound: this.bounds[0],
            rightBound: this.bounds[1]
        }
    }
}