import { Item } from "./Item";

export type PagePart = {
    date:  Date;
    items: Item[];
}

export type FormatingOptions = {
    rows: number, 
    cols: number
}

export class Page {

    constructor(
        private title            : string,
        private current          : PagePart,
        private previous         : PagePart, 
        private next             : PagePart,
        private options : FormatingOptions,
    ) {}

    public toArray() {
        return [
            ...this.previous.items, 
            ...this.current.items, 
            ...this.next.items
        ];
    }

    public toRows() {
        const page = this.toArray();
        const rows: Item[][] = [];

        for (let i = 0, j = page.length; i < j; i += this.options.cols) {
            rows.push(page.slice(i, i + this.options.cols));
        }

        return rows;
    }

    get month() {
        return this.current.date.getMonth();
    }

    get year() {
        return this.current.date.getFullYear();
    }

    get pageTitle() {
        return this.title;
    }
}
