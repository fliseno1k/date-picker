<template>
    <div
        class="date-picker-calendar"
        v-click-outside="onOutsideClick"
    >
        <div class="date-picker-calendar__container">
            <div class="date-picker-calendar__header">
                <slide-control @slide="leftSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" class="date-picker__control-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </slide-control>
                <div class="date-picker-calendar__title">
                    <span @click="stepBack">{{ title }}</span>
                </div>
                <slide-control @slide="rightSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </slide-control>
            </div>
            <div class="date-picker-calendar__body">
                <table class="date-picker-calendar__table">
                    <thead v-if="isTableHeadVisible">
                        <tr>
                            <td :key="i" v-for="(value, i) in tableHeadValues">
                                {{ value }}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key="i" v-for="(row, i) in rowedPage">
                            <component :is="currentItem"
                                v-bind:key="item.id" 
                                v-for="item in row"
                                :item="item"
                                :engine="this.engine"
                                @updatePage="this.onPageUpdate"
                                @selectBound="this.onBoundSelect"
                            ></component>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { TimePeriodsEnum } from "@/types/time-periods.enum";
import SlideControl from './slide-control.vue';
import DecadeItem from './decade-item.vue';
import DayItem from './day-item.vue';
import MonthItem from './month-item.vue';
import initEngine from '../engine/';
import { OrderedRange } from '@/types/range.type';
import { Page } from '../engine/page';
import { DatePicker as DatePickerEngine } from '../engine/date-picker';
import { Item } from '../engine/item';


const timePeriodToComponent = {
    [TimePeriodsEnum.DECADES]: 'decade-item',
    [TimePeriodsEnum.MONTHS]: 'month-item',
    [TimePeriodsEnum.DAYS]: 'day-item'
};


/**
 * Компонент "Календарь"
 * 
 * @author Флис Алексей
 */
@Options({
    components: {
        SlideControl,
        DecadeItem,
        DayItem, 
        MonthItem
    },

    directives: {
        clickOutside: {
            beforeMount: (el, binding) => {
                el.clickOutsideEvent = (e: Event) => {
                    if (!(el === e.target || el.contains(e.target))) {
                        binding.value();
                    }
                }
                document.addEventListener('click', el.clickOutsideEvent);
            },
            unmounted: el => {
                document.removeEventListener('click', el.clickOutsideEvent);
            }
        }
    }
})
export default class DatePicker extends Vue {
    /** Выбранный диапазон дат */
    @Prop({ default: { leftBound: null, rightBound: null}})
    private readonly range!: OrderedRange;

    /** Текущий период/тип страниц */
    private currentPeriod = TimePeriodsEnum.DAYS;

    /** Массив имен дней недели */
    private tableHeadValues = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    /** Модель текущей страницы */
    private page: Page | null = null;

    /** Движок */
    private engine: DatePickerEngine | null = null;

    /**
     * Создание страницы на основе переданного значения диапазона дат
     * 
     * @author Флис Алексей
     */
    public created() {
        this.engine = this.range.leftBound
            ? initEngine({ date: this.range.leftBound.date })
            : initEngine();
        this.engine.setRange(this.range);
        this.page = this.engine.getCurrentPage();
    }

    /**
     * Обновление текущей страницы при изменении выбранного диапазона дат
     * 
     * @author Флис Алексей
     */
    @Watch('range')
    public onRangeChange() {
        (this.engine as DatePickerEngine).setRange(this.range);
        this.page = (this.engine as DatePickerEngine).getCurrentPage();
    }

    /**
     * Переключение на предыдущую страницу
     * 
     * @author Флис Алексей
     */
    public leftSlide() {
        this.page = (this.engine as DatePickerEngine).getPreviousPage();
    }

    /**
     * Переключение на следующую страницу
     * 
     * @author Флис Алексей
     */
    public rightSlide() {
        this.page = (this.engine as DatePickerEngine).getNextPage();
    }

    /**
     * Возвращение на страницу врехнего уровня ( от дней к десятилетиям )
     * 
     * @author Флис Алексей
     */
    public stepBack() {
        if (this.currentPeriod >= 1) {
            this.currentPeriod--;
            this.page = (this.engine as DatePickerEngine)
                .setPageConstructor(this.currentPeriod, { date: (this.page as Page).date })
                .getCurrentPage();
        }
    }

    /**
     * Обработчик события нажатия на элемент страницы
     * 
     * @author Флис Алексей
     */
    public onPageUpdate() {
        this.currentPeriod = (this.engine as DatePickerEngine).getCurrentConstructor();
        this.page = (this.engine as DatePickerEngine).getCurrentPage();
    }

    /**
     * Обработчик события выбора границы диапазона дат
     * 
     * @author Флис Алексей
     */
    public onBoundSelect(bound: Item) {
        this.$emit('rangeUpdate', bound);
    }

    /**
     * Обработчик события клика за пределами компонента
     * 
     * @author Флис Алексей
     */
    public onOutsideClick() {
        this.$emit('outsideClick');
    }


    /**
     * Получения флага отображения заголовка таблицы с названиями дней недели
     * 
     * @author Флис Алексей
     */
    get isTableHeadVisible() {
        return this.currentPeriod === TimePeriodsEnum.DAYS;
    }

    /**
     * Получение текущей страницы в формате строк
     * 
     * @author Флис Алексей
     */
    get rowedPage() {
        return (this.page as Page).toRows();
    }

    /**
     * Получение заголовка текущей страницы
     * 
     * @author Флис Алексей
     */
    get title() {
        return (this.page as Page).title;
    }

    /**
     * Получение компонента, отображаемого для текущего периода
     * 
     * @author Флис Алексей
     */
    get currentItem() {
      return timePeriodToComponent[this.currentPeriod];
    }
}
</script>

<style>

.date-picker-calendar {
    display: block;
    width: 300px;
    padding: 16px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 20%);
    font-size: 16px;
}

.date-picker-calendar__container {}

.date-picker-calendar__header {
    display: flex;
    flex-direction: row;
    line-height: 32px;
    color: #333;
}

.date-picker-calendar__title {
    flex-grow: 1;
    text-align: center;
}

.date-picker-calendar__title span {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    text-transform: capitalize;
    transition: .3s ease-in-out;
    cursor: pointer;
}

.date-picker-calendar__title span:hover {
    color: #fc5808;
    text-decoration: underline;
    transition: .3s ease-in-out;
}

.date-picker-calendar__body {
    display: flex;
    position: relative;
    padding-top: 14px;
    overflow: hidden;
}

.date-picker-calendar__table {
    width: 100%;
}

.date-picker__table thead {
    font-size: 13px;
    color: #8c8c8c;
}
</style>
