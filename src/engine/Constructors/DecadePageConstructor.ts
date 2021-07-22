import { Item } from "../Item";
import { Page } from "../Page";
import { PageBuilder } from "../PageBuilder";
import { Constructor } from "./Constructor";


export class DecadePageConstructor implements Constructor {
    private year: number;
    private lastPage: Page | null = null;

    constructor(date?: Date) {
        date      = date || new Date();
        this.year = Math.floor(date.getFullYear() / 10) * 10; 
    }

    public getCurrentPage() {
        if (this.lastPage && this.lastPage.year === this.year) {
            return this.lastPage;
        }

        const previousYear = new Date(this.year - 1, 0).getFullYear();
        const previousDecade = new Date(this.year - 10, 0).getFullYear() + '/' + previousYear;
        const previousYears = [new Item(`${previousYear}/${previousDecade}`, previousYear)];

        const currentYears = [];
        for (let i = 0; i < 10; i++) {
            currentYears.push(new Item(`${this.year + i}/${this.year}`, this.year + i));
        }

        const nextYear = new Date(this.year + 10, 0).getFullYear();
        const nextDecade = nextYear; 
        const nextYears = [new Item(`${nextYear}/${nextDecade}`, nextYear)];

        this.lastPage = new PageBuilder()
            .setTitle(`${this.year}-${new Date(this.year + 10, 0).getFullYear()}`)
            .setPrevious(new Date(previousYear, 0), previousYears)
            .setCurrent(new Date(this.year, 0), currentYears)
            .setNext(new Date(nextYear, 0), nextYears)
            .setOptions({ rows: 3, cols: 4 })
            .build();

        return this.lastPage;
    }

    public getPreviousPage() {
        this.year = new Date(this.year - 10, 0).getFullYear();
        return this.getCurrentPage();
    } 

    public getNextPage() {
        this.year = new Date(this.year + 10, 0).getFullYear();
        return this.getCurrentPage();
    }

    public setDate(date: Date) {
        this.year = date.getFullYear();
    }
}
