import { Item } from "../item";
import { Page } from "../page";
import { PageBuilder } from "../page-builder";
import { Constructor } from "./constructor";
import { PageItemsEnum } from "@/types/page-items.enum";


/** Массив сокращенных названий месяцев */
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

/** Количество колонок */
const COLS_COUNT = 4;

/** Количество строк */
const ROWS_COUNT = 3;

/**
 * Конструктор страниц месяцев
 * 
 * @author Флис Алексей
 */
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

    /**
     * Получение страницы для предыдущего года
     * 
     * @author Флис Алексей
     */
    public getPreviousPage() {
        const date = new Date(this.year - 1, 1);
        this.year = date.getFullYear();

        return this.getCurrentPage();
    }

    /**
     * Получение страницы для следующего года года
     * 
     * @author Флис Алексей
     */
    public getNextPage() {
        const date = new Date(this.year + 1, 1);
        this.year = date.getFullYear();

        return this.getCurrentPage();
    }

    /**
     * Установка текущей даты
     * 
     * @author Флис Алексей
     */
    public setDate(date: Date) {
        this.year = date.getFullYear();
    }
}
