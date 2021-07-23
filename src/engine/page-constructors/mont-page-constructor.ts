import { Item } from "../Item";
import { Page } from "../Page";
import { PageBuilder } from "../PageBuilder";
import { Constructor } from "./constructor";
import { PageItemsEnum } from "@/types/page-items.enum";


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

const COLS_COUNT = 4;
const ROWS_COUNT = 3;

export class MonthPageConstructor implements Constructor{
    private year!: number; 
    private lastPage: Page | null = null;
    private options = { filterable: false };

    constructor(date?: Date, options?: { filterable: boolean }) {        
        date = date || new Date();
        this.setDate(date);
        this.options = options || this.options;
    }

    public getCurrentPage() {
        if (this.lastPage && this.lastPage.date.getFullYear() === this.year) {
            return this.lastPage;
        }

        const currentItems: Item[] = MONTHS.map((month, i) => {
            return new Item(
                `${'_' + Math.random().toString(36).substr(2, 9)}`, 
                month, 
                new Date(this.year, i),
                [PageItemsEnum.PRIMARY]
            );
        });

        this.lastPage = new PageBuilder()
            .setDate(new Date(this.year, 1))
            .setItems([...currentItems])
            .setTitle(`${this.year}`)
            .setOptions({ rows: ROWS_COUNT, cols: COLS_COUNT, ...this.options })
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
