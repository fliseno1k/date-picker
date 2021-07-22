import { PagePart, Page, FormatingOptions } from "./Page";
import { Item } from './Item';

export class PageBuilder {
    private title: string | null = null; 
    private currentPart: PagePart | null = null; 
    private previousPart: PagePart | null = null; 
    private nextPart: PagePart | null = null;
    private options: FormatingOptions | null = null;

    public setTitle(title: string) {
        this.title = title;
        return this;
    }

    public setCurrent(date: Date, items: Item[]) {
        this.currentPart = { date, items };
        return this;
    }

    public setPrevious(date: Date, items: Item[]) {
        this.previousPart = { date, items };
        return this;
    }

    public setNext(date: Date, items: Item[]) {
        this.nextPart = { date, items };
        return this;
    }

    public setOptions(options: FormatingOptions) {
        this.options = options;
        return this;
    }

    public build() {
        if (
            this.previousPart === null || 
            this.currentPart  === null || 
            this.nextPart     === null || 
            this.title        === null ||
            this.options      === null
        ) {
            throw new Error();
        }

        return new Page(
            this.title,
            this.currentPart  as PagePart, 
            this.previousPart as PagePart, 
            this.nextPart     as PagePart,
            this.options
        );
    }
}
