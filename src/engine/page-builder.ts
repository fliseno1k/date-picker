import { Page } from "./page";
import { Item } from './item';
import { FormattingOptions } from "@/types/formatting-options.type";

/**
 * Строитель класса страницы
 * 
 * @author Флис Алексей
 */
export class PageBuilder {
    /** Дата */
    private date: Date | null = null;

    /** Заголовок */
    private title: string | null = null;
    
    /** Элементы страницы */
    private items: Item[] | null = null;

    /** Опции */
    private options: FormattingOptions | null = null;


    /**
     * Установка заголовка страницы
     * 
     * @author Флис Алексей
     */
    public setTitle(title: string) {
        this.title = title;
        return this;
    }

    /**
     * Установка элементов таблицы
     * 
     * @author Флис Алексей
     */
    public setItems(items: Item[]) {
        this.items = items;
        return this;
    }

    /**
     * Установка опции страницы
     * 
     * @author Флис Алексей
     */
    public setOptions(options: FormattingOptions) {
        this.options = options;
        return this;
    }

    /**
     * Установка даты страницы
     * 
     * @author Флис Алексей
     */
    public setDate(date: Date) {
        this.date = date;
        return this;
    }

    /**
     * Создание экземпляра страницы
     * 
     * @author Флис Алексей
     */
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
