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
                    <span @click="stepBack"  >{{ title }}</span>
                </div>
                <slide-control @slide="rightSlide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </slide-control>
            </div>
            <div class="date-picker__body">
                <table class="date-picker__table">
                    <table-head :values="tHeadValues" />
                    <table-body :rows="rowedPage" />
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import SlideControl from './slide-control.vue';
import TableHead from './table-head.vue';
import TableBody from './table-body.vue';

import initEngine, { cEnum } from '../engine/';

const cArray = [cEnum.DECADES, cEnum.MONTHS, cEnum.DAYS];

@Options({
    components: {
        SlideControl,
        TableHead, 
        TableBody
    }
})
export default class DatePicker extends Vue {
    currentPageType = 2;
    tHeadValues = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    engine = initEngine();
    page = null;

    created() {
        this.page = this.engine.getCurrentPage();
    }

    updated() {
        console.log(this.isTHeadVisible);
    }

    leftSlide() {
        this.page = this.engine.getPreviousPage();
    }

    rightSlide() {
        this.page = this.engine.getNextPage();
    }

    stepBack() {
        if (this.currentPageType >= 1) {
            this.currentPageType--;
            this.engine.setPageConstructor(cArray[this.currentPageType]);
            this.page = this.engine.getCurrentPage();
        }
    }

    get isTHeadVisible() {
        return this.currentPageType === 2;
    }

    get rowedPage() {
        return this.page.toRows();
    }

    get title() {
        return this.page.pageTitle;
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

.date-picker__table tbody td {
    font-size: 16px; 
    line-height: 32px;
    color: #333;
}

</style>