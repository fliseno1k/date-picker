import { Item } from "../Item";
import { Page } from "../Page";
import { PageBuilder } from "../PageBuilder";
import { Constructor } from "./Constructor";
import { PageItemsEnum } from "@/types/page-items.enum";


const COLS_COUNT = 4;
const ROWS_COUNT = 3;

export class DecadePageConstructor implements Constructor {
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

        const previousYear = new Date(this.year - 1, 0).getFullYear();
        const previousDecade = new Date(this.year - 10, 0).getFullYear() + '/' + previousYear;
        const previousYears = [new Item(
            `${'_' + Math.random().toString(36).substr(2, 9)}`, 
            previousYear, 
            new Date(previousYear, 1),
            [PageItemsEnum.SECONDARY]
        )];

        const currentYears = [];
        for (let i = 0; i < 10; i++) {
            currentYears.push(new Item(
                `${'_' + Math.random().toString(36).substr(2, 9)}`, 
                this.year + i, 
                new Date(this.year + i, 1),
                [PageItemsEnum.PRIMARY]
            ));
        }

        const nextYear = new Date(this.year + 10, 0).getFullYear();
        const nextDecade = nextYear; 
        const nextYears = [ new Item(
            `${'_' + Math.random().toString(36).substr(2, 9)}`, 
            nextYear, 
            new Date(nextDecade, 1),
            [PageItemsEnum.SECONDARY]
        )];

        this.lastPage = new PageBuilder()
            .setDate(new Date(this.year, 1))
            .setTitle(`${this.year}-${new Date(this.year + 10, 0).getFullYear()}`)
            .setItems([...previousYears, ...currentYears, ...nextYears])
            .setOptions({ rows: ROWS_COUNT, cols: COLS_COUNT, ...this.options })
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
