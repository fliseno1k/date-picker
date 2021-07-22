import { Item } from "./Item";


export type FormatingOptions = {
    rows: number, 
    cols: number
}

export class Page {

    constructor(
        public date: Date,
        public title: string,
        public items: Item[],
        private options: FormatingOptions,
    ) {}

    public toRows() {
        const rows: Item[][] = [];

        for (let i = 0, j = this.items.length; i < j; i += this.options.cols) {
            rows.push(this.items.slice(i, i + this.options.cols));
        }

        return rows;
    }
}
