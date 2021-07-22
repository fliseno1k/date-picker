import { 
    Constructor, 
    DecadePageConstructor,
    MonthPageConstructor,
    DaysPageContuctor,
} from "./Constructors";
import { DateRange } from "./DateRange";
import { Filter } from "./Filter";

export enum cEnum {
    DECADES = "decades", 
    MONTHS = "months", 
    DAYS = "days"
}

const constructorsFactory = {
    [cEnum.DAYS]:    DaysPageContuctor,
    [cEnum.MONTHS]:  MonthPageConstructor,
    [cEnum.DECADES]: DecadePageConstructor, 
};

export class DatePicker {
    private pageConstructor: Constructor;

    constructor(
        private filter: Filter,
        private dateRange: DateRange
    ) {
        this.pageConstructor = new constructorsFactory[cEnum.DAYS]();
    }

    public getCurrentPage() {
        return this.filter.filter(this.pageConstructor.getCurrentPage());
    }
    
    public getNextPage() {
        return this.filter.filter(this.pageConstructor.getNextPage());
    }

    public getPreviousPage() {
        return this.filter.filter(this.pageConstructor.getPreviousPage());
    }

    public setPageConstructor(type: cEnum.DECADES | cEnum.MONTHS | cEnum.DAYS) {
        this.pageConstructor = new constructorsFactory[type]();
        return this;
    }

    public setRangeBound(bound: Date) {
        this.dateRange.pushBound(bound);
    }

    public clearRange() {
        this.dateRange.clearBounds();
    }
}
