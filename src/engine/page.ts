import { Item } from "./item";
import { FormattingOptions } from "@/types/formatting-options.type";


/**
 * Класс страницы 
 * 
 * @author Флис Алексей
 */
export class Page {

    constructor(
        public readonly date: Date,
        public readonly title: string,
        public readonly items: Item[],
        public readonly options: FormattingOptions,
    ) {}

    /**
     * Преобразование странциы в таблицу
     * 
     * @author Флис Алексей
     */
    public toRows() {
        const rows: Item[][] = [];

        for (let i = 0, j = this.items.length; i < j; i += this.options.cols) {
            rows.push(this.items.slice(i, i + this.options.cols));
        }

        return rows;
    }
}
