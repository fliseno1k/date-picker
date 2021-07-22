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

        const currentItems: Item[] = MONTHS.map((month, i) => {
            return new Item(
                `${i+1}/${this.year}`, 
                month, 
                new Date(this.year, i),
                ['PRIMARY']
            );
        });

        this.lastPage = new PageBuilder()
            .setDate(new Date(this.year, 1))
            .setItems([...currentItems])
            .setTitle(`${this.year}`)
            .setOptions({ rows: 3, cols: 4 })
            .build();
        
        return this.lastPage;
    }


    public getPreviousPage() {
        const date = new Date(this.year - 1, 1);
        this.year = date.getFullYear();

        return this.getCurrentPage();
    }

    public getNextPage() {
        const date = new Date(this.year + 1, 1);
        this.year = date.getFullYear();

        return this.getCurrentPage();
    }

    public setDate(date: Date) {
        this.year = date.getFullYear();
    }
}
