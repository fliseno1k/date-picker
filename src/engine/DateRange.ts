
const MS_PER_DAY = 1000 * 60 * 60 * 24;

type OrderedRange = {
    leftBound: Date, 
    rightBound: Date, 
    rangeLength: number;
}

export class DateRange {
    private bounds: Date[];

    constructor(bounds?: Date[]) {
        this.bounds = bounds || [];
    }

    private orderDates(a: Date, b: Date) {
        const isGreater = a.getTime() > b.getTime();

        if (isGreater) {
            [a, b] = [b, a];
        }

        return [a, b];
    }

    private dateDiffInDays(a: Date, b: Date) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / MS_PER_DAY);
    }

    public pushBound(bound: Date) {
        if (this.bounds.length === 2) {
            const boundsTimes = [...this.bounds, bound].map(bound => bound.getTime());
            this.bounds = [Math.max(...boundsTimes)].map(bound => new Date(bound));
        } else {
            this.bounds.push(bound);
        }
    }

    public clearBounds() {
        this.bounds = [];
    }

    get orderedRange() {
        const [leftBound, rightBound] = this.orderDates(this.bounds[0], this.bounds[1]);
        return {
            leftBound, 
            rightBound, 
            length: this.dateDiffInDays(leftBound, rightBound),
        }
    }
}