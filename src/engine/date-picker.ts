import {Constructor, DaysPageConstructor, DecadePaceConstructor, MonthPageConstructor,} from "./page-constructors";
import {DateRange} from "./DateRange";
import {RangeFilter} from "./RangeFilter";
import {Item} from "./Item";
import {Page} from "./Page";
import {TimePeriodsEnum} from "@/types/time-periods.enum";


const constructorsFactory = {
    [TimePeriodsEnum.DAYS]:    DaysPageConstructor,
    [TimePeriodsEnum.MONTHS]:  MonthPageConstructor,
    [TimePeriodsEnum.DECADES]: DecadePaceConstructor,
};

export class DatePicker {
    private pageConstructor: Constructor;
    private currentConstructor: TimePeriodsEnum;

    constructor(private dateRange: DateRange) {
        this.pageConstructor = new constructorsFactory[TimePeriodsEnum.DAYS]();
        this.currentConstructor = TimePeriodsEnum.DAYS;

    }

    public getCurrentPage() {
        const page = this.pageConstructor.getCurrentPage();
        return page.options.filterable
            ? RangeFilter.filter(page, this.dateRange.orderedRange)
            : page;
    }
    
    public getNextPage() {
        const page = this.pageConstructor.getNextPage();
        return page.options.filterable
            ? RangeFilter.filter(page, this.dateRange.orderedRange)
            : page;

    }

    public getPreviousPage() {
        const page =  this.pageConstructor.getPreviousPage();
        return page.options.filterable
            ? RangeFilter.filter(page, this.dateRange.orderedRange)
            : page;

    }

    public setPageConstructor(type: TimePeriodsEnum, options?: { date: Date }) {
        this.pageConstructor = new constructorsFactory[type](options?.date);
        this.currentConstructor = type;
        return this;
    }

    public pushRangeBound(bound: Item) {
        this.dateRange.pushBound(bound);
    }

    public clearRange() {
        this.dateRange.clearBounds();
    }

    public isRangeFull() {
        return this.dateRange.isFull;
    }

    public getRange() {
        return this.dateRange.orderedRange;
    }

    public filterPage(page: Page) {
        return RangeFilter.filter(page, this.dateRange.orderedRange);
    }

    public getCurrentConstructor() {
        return this.currentConstructor;
    }
}
