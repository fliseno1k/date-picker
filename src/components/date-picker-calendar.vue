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

<script>
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
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
    },

    directives: {
        clickOutside: {
            beforeMount: (el, binding) => {
                el.clickOutsideEvent = (e) => {
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
    @Prop({ default: { leftBound: null, rightBound: null}})
    range;

    @Watch('range')
    onRangeChange() {
        this.engine.setRange(this.range);
        this.page = this.engine.getCurrentPage();
    }

    currentPeriod = TimePeriodsEnum.DAYS;
    tableHeadValues = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    page = null;
    engine = null;

    created() {
        this.engine = this.range.leftBound
            ? initEngine({ date: this.range.leftBound.date })
            : initEngine();
        this.engine.setRange(this.range);
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

    onPageUpdate() {
        this.currentPeriod = this.engine.getCurrentConstructor();
        this.page = this.engine.getCurrentPage();
    }

    onBoundSelect({ bound }) {
        this.$emit('rangeUpdate', bound);
    }

    onOutsideClick() {
        this.$emit('outsideClick');
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
