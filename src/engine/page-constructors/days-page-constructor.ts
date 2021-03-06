import { Item } from "../item";
import { Page } from "../page";
import { PageBuilder } from "../page-builder";
import { Constructor } from "./constructor";
import { PageItemsEnum } from "@/types/page-items.enum";


/** Массив месяцев года по порядку */
const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

/** Количество недель, отображаемых на одной странице */
const WEEKS_COUNT      = 6;

/** Количество дней в неделе */
const DAYS_IN_WEEK     = 7;

/** Количество дней на одной странице */
const DAYS_IN_ONE_PAGE = WEEKS_COUNT * DAYS_IN_WEEK;

/**
 * Конструктор страниц дней
 * 
 * @author Флис Алексей
 */
export class DaysPageConstructor implements Constructor {
    /** Год */
    private year!: number;

    /** Месяц */
    private month!: number;

    /** Последняя посчитанная страница */
    private lastPage: Page | null = null;

    /** Опции */
    private options = { filterable: true };

    constructor(date?: Date, options?: { filterable: boolean }) {
        date = date || new Date();
        this.setDate(date);
        this.options = options || this.options;
    }

    /**
     * Получение количества дней в определенном месяце
     * 
     * @author Флис Алексей
     */
    private getMonthLength(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Получение сраницы для текущего месяца
     * 
     * @author Флис Алексей
     */
    public getCurrentPage() {
        if (this.lastPage && this.lastPage.date.getMonth() === this.month) {
            return this.lastPage;
        }

        const currentMonthLength = this.getMonthLength(this.year, this.month);
        const firstDay = new Date(this.year, this.month, 1).getDay();

        const previousDate = new Date(this.year, this.month - 1);
        const previousMonth = previousDate.getMonth();
        const previousMonthYear = previousDate.getFullYear();
        const previousMonthLength = this.getMonthLength(previousMonthYear, previousMonth)
        const previousDays = [];

        //  Если первое число месяца выпадает на воскресенье, заполнить строку последними длянми предудущего месяца
        if (firstDay === 0) {
            for (let i = DAYS_IN_WEEK - 2; i >= 0; i--) {
                previousDays.push( new Item(
                    `${'_' + Math.random().toString(36).substr(2, 9)}`, 
                    previousMonthLength - i, 
                    new Date(previousMonthYear, previousMonth, previousMonthLength - i),
                    [PageItemsEnum.SECONDARY]
                ));
            }
        //  Если первое число месяца выпадает на понедельник, включить добавочную неделю в начало массива
        } else if (firstDay === 1) {
            for (let i = DAYS_IN_WEEK - 1; i >= 0; i--) {
                previousDays.push( new Item(
                    `${'_' + Math.random().toString(36).substr(2, 9)}`, 
                    previousMonthLength - i, 
                    new Date(previousMonthYear, previousMonth, previousMonthLength - i),
                    [PageItemsEnum.SECONDARY]
                ));            
            }
        //  Если первое число месяца наступает посреди недели, то заполнить строку последними днями предыдущего месяца
        } else {
            for (let i = firstDay - 2; i >= 0; i--) {
                previousDays.push( new Item(
                    `${'_' + Math.random().toString(36).substr(2, 9)}`, 
                    previousMonthLength - i, 
                    new Date(previousMonthYear, previousMonth, previousMonthLength - i),
                    [PageItemsEnum.SECONDARY]
                ));            
            }
        }

        // Заполнение массива днями текущего месяца 
        const currentDays = [];
        for (let i = 1; i <= currentMonthLength; i++) {
            currentDays.push( new Item(
                `${'_' + Math.random().toString(36).substr(2, 9)}`, 
                i,
                new Date(this.year, this.month, i),
                [PageItemsEnum.PRIMARY]
            ));
        }

        const nextMonthDate = new Date(this.year, this.month + 1, 1);
        const nextMonth = nextMonthDate.getMonth();
        const nextMonthYear = nextMonthDate.getFullYear();
        const nextDays = [];
       
        // Заполнение массива днями следующего месяца 
        const availableLength = DAYS_IN_ONE_PAGE - (currentDays.length + previousDays.length);
        for (let i = 1; i <= availableLength; i++) {
            nextDays.push( new Item(
                `${'_' + Math.random().toString(36).substr(2, 9)}`, 
                i,
                new Date(nextMonthYear, nextMonth, i),
                [PageItemsEnum.SECONDARY]
            ));
        }

        this.lastPage = new PageBuilder()
            .setDate(new Date(this.year, this.month))
            .setTitle(`${months[this.month]} ${this.year}`)
            .setItems([...previousDays, ...currentDays, ...nextDays])
            .setOptions({ rows: WEEKS_COUNT, cols: DAYS_IN_WEEK, ...this.options })
            .build();

        return this.lastPage;
    }

    /**
     * Получение страницы для следующего месяца
     * 
     * @author Флис Алексей
     */
    public getNextPage() {
        this.setDate(new Date(this.year, this.month + 1));
        return this.getCurrentPage();
    }

    /**
     * Получение страницы для предыдущего месяца
     * 
     * @author Флис Алексей
     */
    public getPreviousPage() {
        this.setDate(new Date(this.year, this.month - 1));
        return this.getCurrentPage();
    }

    /**
     * Установка текущей даты
     * 
     * @author Флис Алексей
     */
    public setDate(date: Date) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
    }
} 
