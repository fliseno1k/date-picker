import { Item } from "../Item";
import { Page } from "../Page";
import { PageBuilder } from "../PageBuilder";
import { Constructor } from "./Constructor";


export class DecadePageConstructor implements Constructor {
    private year!: number;
    private lastPage: Page | null = null;

    constructor(date?: Date) {
        date = date || new Date();
        this.setDate(date);
    }

    public getCurrentPage() {
        if (this.lastPage && this.lastPage.date.getFullYear() === this.year) {
            return this.lastPage;
        }

        const previousYear = new Date(this.year - 1, 0).getFullYear();
        const previousDecade = new Date(this.year - 10, 0).getFullYear() + '/' + previousYear;
        const previousYears = [new Item(
            `${previousYear}/${previousDecade}`, 
            previousYear, 
            new Date(previousYear, 1),
            ['SECONDARY']
        )];

        const currentYears = [];
        for (let i = 0; i < 10; i++) {
            currentYears.push(new Item(
                `${this.year + i}/${this.year}`, 
                this.year + i, 
                new Date(this.year + i, 1),
                ['PRIMARY']
            ));
        }

        const nextYear = new Date(this.year + 10, 0).getFullYear();
        const nextDecade = nextYear; 
        const nextYears = [ new Item(
            `${nextYear}/${nextDecade}`, 
            nextYear, 
            new Date(nextDecade, 1),
            ['SECONDARY']
        )];

        this.lastPage = new PageBuilder()
            .setDate(new Date(this.year, 1))
            .setTitle(`${this.year}-${new Date(this.year + 10, 0).getFullYear()}`)
            .setItems([...previousYears, ...currentYears, ...nextYears])
            .setOptions({ rows: 3, cols: 4 })
            .build();

        return this.lastPage;
    }

    public getPreviousPage() {
        this.setDate(new Date(this.year - 10, 1));
        return this.getCurrentPage();
    } 

    public getNextPage() {
        this.setDate(new Date(this.year + 10, 1));
        return this.getCurrentPage();
    }

    public setDate(date: Date) {
        this.year = Math.floor(date.getFullYear() / 10) * 10; 
    }
}
