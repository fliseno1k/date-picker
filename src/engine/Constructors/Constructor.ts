import { Page } from "../Page";

export interface Constructor {
    getCurrentPage(): Page; 
    getNextPage(): Page;
    getPreviousPage(): Page;
    setDate(date: Date): void;
}