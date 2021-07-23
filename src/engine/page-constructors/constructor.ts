import { Page } from "../page";


/**
 * Интерфейс конструкторов страниц
 */
export interface Constructor {
    getCurrentPage(): Page; 
    getNextPage(): Page;
    getPreviousPage(): Page;
    setDate(date: Date): void;
}