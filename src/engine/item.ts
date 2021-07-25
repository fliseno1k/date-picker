import { PageItemsEnum } from "@/types/page-items.enum";

/** Индекс в массиве типов для указания типа по отношению к диапазону дат */
const RANGED_TYPE_INDEX = 1;

/**
 * Элемент таблицы
 * 
 * @author Флис Алексей
 */
export class Item {

    constructor(
        public readonly id: string, 
        public readonly value: number | string, 
        public readonly date: Date,
        public readonly types: string[] = [],
    ) {}

    /**
     * Установка типа элемента по отношению к диапазону дат
     * 
     * @author Флис Алексей
     */
    set rangeType(type: PageItemsEnum | '') {
        this.types[RANGED_TYPE_INDEX] = type;
    }
}
