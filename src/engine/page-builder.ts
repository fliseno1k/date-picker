import { Page, FormattingOptions } from "./page";
import { Item } from './item';

export class PageBuilder {
    private date: Date | null = null;
    private title: string | null = null; 
    private items: Item[] | null = null;
    private options: FormattingOptions | null = null;


    public setTitle(title: string) {
        this.title = title;
        return this;
    }

    public setItems(items: Item[]) {
        this.items = items;
        return this;
    }

    public setOptions(options: FormattingOptions) {
        this.options = options;
        return this;
    }

    public setDate(date: Date) {
        this.date = date;
        return this;
    }

    public build() {
        if (
            this.items   === null ||
            this.title   === null ||
            this.options === null
        ) {
            throw new Error();
        }

        return new Page(
            this.date as Date,
            this.title,
            this.items,
            this.options
        );
    }
}
