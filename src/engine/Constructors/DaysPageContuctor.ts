import { Item } from "../Item";
import { Page } from "../Page";
import { PageBuilder } from "../PageBuilder";
import { Constructor } from "./Constructor";

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

const WEEKS_COUNT      = 6; 
const DAYS_IN_WEEK     = 7;
const DAYS_IN_ONE_PAGE = WEEKS_COUNT * DAYS_IN_WEEK;

export class DaysPageContuctor implements Constructor {
    private year!: number;
    private month!: number;
    private lastPage: Page | null = null;

    constructor(date?: Date) {
        date = date || new Date();
        this.setDate(date);
    }

    private getMonthLength(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

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
                    `${previousMonthLength - i}/${previousMonth}`, 
                    previousMonthLength - i, 
                    new Date(previousMonthYear, previousMonth, previousMonthLength),
                    ['SECONDARY']
                ));
            }
        //  Если первое число месяца выпадает на понедельник, включить добавочную неделю в начало массива
        } else if (firstDay === 1) {
            for (let i = DAYS_IN_WEEK - 1; i >= 0; i--) {
                previousDays.push( new Item(
                    `${previousMonthLength - i}/${previousMonth}`, 
                    previousMonthLength - i, 
                    new Date(previousMonthYear, previousMonth, previousMonthLength),
                    ['SECONDARY']
                ));            
            }
        //  Если первое число месяца наступает посреди недели, то заполнить строку последними днями предыдущего месяца
        } else {
            for (let i = firstDay - 2; i >= 0; i--) {
                previousDays.push( new Item(
                    `${previousMonthLength - i}/${previousMonth}`, 
                    previousMonthLength - i, 
                    new Date(previousMonthYear, previousMonth, previousMonthLength),
                    ['SECONDARY']
                ));            
            }
        }

        // Заполнение массива днями текущего месяца 
        const currentDays = [];
        for (let i = 1; i <= currentMonthLength; i++) {
            currentDays.push( new Item(
                `${i}/${this.month}`, 
                i,
                new Date(this.year, this.month, i),
                ['PRIMARY']
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
                `${i}/${nextMonth}`, 
                i,
                new Date(nextMonthYear, nextMonthYear, i),
                ['SECONDARY']
            ));
        }

        this.lastPage = new PageBuilder()
            .setDate(new Date(this.year, this.month))
            .setTitle(`${months[this.month]} ${this.year}`)
            .setItems([...previousDays, ...currentDays, ...nextDays])
            .setOptions({ rows: WEEKS_COUNT, cols: DAYS_IN_WEEK })
            .build();

        return this.lastPage;
    }

    public getNextPage() {
        this.setDate(new Date(this.year, this.month + 1));
        return this.getCurrentPage();
    }

    public getPreviousPage() {
        this.setDate(new Date(this.year, this.month - 1));
        return this.getCurrentPage();
    }

    public setDate(date: Date) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
    }
} 
