import {Constructor, DaysPageConstructor, DecadePaceConstructor, MonthPageConstructor,} from "./page-constructors";
import {DateRange} from "./date-range";
import {RangeFilter} from "./range-filter";
import {Item} from "./item";
import {Page} from "./page";
import {TimePeriodsEnum} from "@/types/time-periods.enum";
import {OrderedRange} from "@/types/range.type";


/** Фабрика конструкторов страниц */
const constructorsFactory = {
    [TimePeriodsEnum.DAYS]:    DaysPageConstructor,
    [TimePeriodsEnum.MONTHS]:  MonthPageConstructor,
    [TimePeriodsEnum.DECADES]: DecadePaceConstructor,
};

/**
 * Движок компонента "DatePicker" для выбора диапазона дат
 * 
 * @author Флис Алексей
 */
export class DatePicker {
    /** Экземпляр текущего конструктора страниц */
    private pageConstructor: Constructor;

    /** Тип текущего конструктора страниц */
    private currentConstructor: TimePeriodsEnum;

    constructor(private dateRange: DateRange, options?: { date: Date }) {
        this.pageConstructor = new constructorsFactory[TimePeriodsEnum.DAYS](options?.date);
        this.currentConstructor = TimePeriodsEnum.DAYS;

    }

    /**
     * Получение текущей страницы из конструктора
     * 
     * @author Флис Алексей
     */
    public getCurrentPage() {
        const page = this.pageConstructor.getCurrentPage();
        return page.options.filterable
            ? RangeFilter.filter(page, this.dateRange.orderedRange)
            : page;
    }
    
    /**
     * Получение следующей страницы из конструктора
     * 
     * @author Флис Алексей
     */
    public getNextPage() {
        const page = this.pageConstructor.getNextPage();
        return page.options.filterable
            ? RangeFilter.filter(page, this.dateRange.orderedRange)
            : page;
    }

    /**
     * Получение предыдущей страницы из конструктора
     * 
     * @author Флис Алексей
     */
    public getPreviousPage() {
        const page =  this.pageConstructor.getPreviousPage();
        return page.options.filterable
            ? RangeFilter.filter(page, this.dateRange.orderedRange)
            : page;
    }

    /**
     * Установка текущего конструктора страниц
     * 
     * @author Флис Алексей
     */
    public setPageConstructor(type: TimePeriodsEnum, options?: { date: Date }) {
        this.pageConstructor = new constructorsFactory[type](options?.date);
        this.currentConstructor = type;
        return this;
    }

    /**
     * Добавление границы диапазона дат
     * 
     * @author Флис Алексей
     */
    public pushRangeBound(bound: Item) {
        this.dateRange.pushBound(bound);
    }

    /**
     * Очистка диапазона дат
     * 
     * @author Флис Алексей
     */
    public clearRange() {
        this.dateRange.clearBounds();
    }

    /**
     * Проверка на заполненость диапазона дат
     * 
     * @author Флис Алексей
     */
    public isRangeFull() {
        return this.dateRange.isFull;
    }

    /**
     * Установка диапазона дат
     * 
     * @author Флис Алексей
     */
    public setRange(range: OrderedRange) {
        this.dateRange.range = range;
    }

    /**
     * Получение текущего диапазона дат
     * 
     * @author Флис Алексей
     */
    public getRange() {
        return this.dateRange.orderedRange;
    }

    /**
     * Выполнение фильтрации заданной страницы по текущему диапазону
     * 
     * @author Флис Алексей
     */
    public filterPage(page: Page) {
        return RangeFilter.filter(page, this.dateRange.orderedRange);
    }

    /**
     * Получение типа текущего конструктора
     * 
     * @author Флис Алексей
     */
    public getCurrentConstructor() {
        return this.currentConstructor;
    }
}
