import { Item } from "../Item";
import { Page } from "../Page";
import { PageBuilder } from "../PageBuilder";
import { Constructor } from "./Constructor";


const MONTHS = [
    "Янв.",
    "Февр.",
    "Март",
    "Апр.",
    "Май",
    "Июнь",
    "Июль",
    "Авг.",
    "Сент.",
    "Окт.",
    "Нояб.",
    "Дек.",
];

export class MonthPageConstructor implements Constructor{
    private month: number; 
    private year: number; 
    private lastPage: Page | null = null;

    constructor(date?: Date) {        
        date       = date || new Date();
        this.year  = date.getFullYear();
        this.month = date.getMonth();
    }

    public getCurrentPage() {
        if (this.lastPage && this.lastPage.year === this.year) {
            return this.lastPage;
        }

        const currentItems: Item[] = MONTHS.map((month, i) => {
            return new Item(`${i+1}/${this.year}`, month);
        });

        this.lastPage = new PageBuilder()
            .setPrevious(new Date(this.year - 1, this.month), [])
            .setCurrent(new Date(this.year, this.month), currentItems)
            .setNext(new Date(this.year + 1, this.month), [])
            .setTitle(`${this.year}`)
            .setOptions({ rows: 3, cols: 4 })
            .build();
        
        return this.lastPage;
    }


    public getPreviousPage() {
        const date = new Date(this.year - 1, this.month);
        this.year = date.getFullYear();
        this.month = date.getMonth();

        return this.getCurrentPage();
    }

    public getNextPage() {
        const date = new Date(this.year + 1, this.month);
        this.year = date.getFullYear();
        this.month = date.getMonth();

        return this.getCurrentPage();
    }

    public setDate(date: Date) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
    }
}
