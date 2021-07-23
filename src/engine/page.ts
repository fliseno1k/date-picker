import { Item } from "./item";


export type FormattingOptions = {
    rows: number, 
    cols: number,
    filterable: boolean,
}

export class Page {

    constructor(
        public readonly date: Date,
        public readonly title: string,
        public readonly items: Item[],
        public readonly options: FormattingOptions,
    ) {}

    public toRows() {
        const rows: Item[][] = [];

        for (let i = 0, j = this.items.length; i < j; i += this.options.cols) {
            rows.push(this.items.slice(i, i + this.options.cols));
        }

        return rows;
    }
}
