import { Item } from './item';
import {OrderedRange} from "@/types/range.type";


/**
 * Класс управления диапазоном дат 
 * 
 * @author Флис Алексей
 */
export class DateRange {
    /** Границы диапазона */
    private bounds: Item[];

    constructor(bounds?: Item[]) {
        this.bounds = bounds || [];
    }

    /**
     * Упорядочивание границ диапазона
     * 
     * @author Флис Алексей
     */
    private reorderBounds() {
        if (this.bounds.length < 2) return;
        this.bounds = this.bounds.sort((a: Item, b: Item) => {
            if (a.date.getTime() < b.date.getTime()) return - 1; 
            if (a.date.getTime() > b.date.getTime()) return 1;

            return 0;
        });
    }

    /**
     * Добавление границы диапазона
     * 
     * @author Флис Алексей
     */
    public pushBound(bound: Item) {
        if (!this.isFull()) {
            this.bounds.push(bound);
        } else {
            this.clearBounds();
            this.pushBound(bound);
        }

        this.reorderBounds();
    }

    /**
     * Очистка границ диапазона
     * 
     * @author Флис Алексей
     */
    public clearBounds() {
        this.bounds = [];
    }

    /**
     * Установка диапазона дат
     * 
     * @author Флис Алексей
     */
    set range(range: OrderedRange) {
        const arr = [range.leftBound, range.rightBound];
        arr
            .filter((bound) => bound !== null && bound !== undefined)
            .forEach((bound) => this.pushBound(bound as Item));
    }

    /**
     * Проверка на заполненность диапазона
     * 
     * @author Флис Алексей
     */
    public isFull() {
        return this.bounds.length === 2;
    }

    /**
     * Проверка на отсутствие заданных границ диапазона
     * 
     * @author Флис Алексей
     */
    public isEmpty() {
        return this.bounds.length === 0;
    }

    /**
     * Получение текущего диапазона
     * 
     * @author Флис Алексей
     */
    get orderedRange() {
        if (!this.isFull() && !this.isEmpty()) {
            return {
                leftBound: this.bounds[0],
                rightBound: this.bounds[0],
            }
        } else if (this.isEmpty()) {
            return {
                leftBound: null,
                rightBound: null
            }
        }

        return {
            leftBound: this.bounds[0],
            rightBound: this.bounds[1]
        }
    }
}
