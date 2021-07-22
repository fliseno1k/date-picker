<template>
    <div class="date-picker">
        <div class="date-picker__container">
            <div class="date-picker__header">
                <slide-control @slide="leftSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" class="date-picker__control-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </slide-control>
                <div class="date-picker__title">
                    <span @click="stepBack">{{ title }}</span>
                </div>
                <slide-control @slide="rightSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </slide-control>
            </div>
            <div class="date-picker__body">
                <table class="date-picker__table">
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
                                @constructorSet="this.onConstructorSet"
                                @rangeSelect="this.onRangeSelect"
                            ></component>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { TimePeriodsEnum } from "@/types/time-periods.enum";
import SlideControl from './slide-control.vue';
import DecadeItem from './decade-item.vue';
import DayItem from './day-item.vue';
import MonthItem from './month-item.vue';
import initEngine from '../engine/';


const timePeriodToComponent = {
    [TimePeriodsEnum.DECADES]: 'decade-item',
    [TimePeriodsEnum.MONTHS]: 'month-item',
    [TimePeriodsEnum.DAYS]: 'day-item'
};

@Options({
    components: {
        SlideControl,
        DecadeItem,
        DayItem, 
        MonthItem
    }
})
export default class DatePicker extends Vue {
    currentPeriod = TimePeriodsEnum.DAYS;
    tableHeadValues = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    engine = initEngine();
    page = null;

    created() {
        this.page = this.engine.getCurrentPage();
    }

    leftSlide() {
        this.page = this.engine.getPreviousPage();
    }

    rightSlide() {
        this.page = this.engine.getNextPage();
    }

    stepBack() {
        if (this.currentPeriod >= 1) {
            this.currentPeriod--;
            this.page = this.engine
                .setPageConstructor(this.currentPeriod, { date: this.page.date })
                .getCurrentPage();
        }
    }

    onConstructorSet({ period, date }) {
        this.currentPeriod = period;
        this.page = this.engine
            .setPageConstructor(this.currentPeriod, { date })
            .getCurrentPage();
    }

    onRangeSelect() {
        window.dispatchEvent(new CustomEvent('rangeSelect', { 
            detail: { 
                range: this.engine.getRange 
            }
        }));
    }

    get isTableHeadVisible() {
        return this.currentPeriod === TimePeriodsEnum.DAYS;
    }

    get rowedPage() {
        return this.page.toRows();
    }

    get title() {
        return this.page.title;
    }

    get currentItem() {
      return timePeriodToComponent[this.currentPeriod];
    }
}
</script>

<style>

.date-picker {
    display: block;
    width: 300px;
    padding: 16px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 20%);
    font-size: 16px;
}

.date-picker__container {}

.date-picker__header {
    display: flex;
    flex-direction: row;
    line-height: 32px;
    color: #333;
}

.date-picker__title {
    flex-grow: 1;
    text-align: center;
}

.date-picker__title span {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    text-transform: capitalize;
    transition: .3s ease-in-out;
    cursor: pointer;
}

.date-picker__title span:hover {
    color: #fc5808;
    text-decoration: underline;
    transition: .3s ease-in-out;
}

.date-picker__body {
    display: flex;
    position: relative;
    padding-top: 14px;
    overflow: hidden;
}

.date-picker__table {
    width: 100%;
}

.date-picker__table thead {
    font-size: 13px;
    color: #8c8c8c;
}
</style>
