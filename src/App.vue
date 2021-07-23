<template>
    <div class="full-screen">
        <div
            ref="datePicker"
            class="date-picker"
        >
            <div class="date-picker__container">
                <date-picker-preview
                    :range="range"
                    @togglePicker="onPickerToggle"
                    @clearRange="onRangeClear"
                />
                <date-picker-calendar
                    v-if="isPickerOpen"
                    :style="calendarStyles"
                    :range="range"
                    @outsideClick="onOutsideClick"
                    @rangeUpdate="onRangeUpdate"
                />
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DatePickerCalendar from './components/date-picker-calendar.vue';
import DatePickerPreview from './components/date-picker-preview.vue';
import { DateRange } from "@/engine/date-range";

@Options({
    components: {
        DatePickerCalendar,
        DatePickerPreview,
    },
})
export default class App extends Vue {
    isPickerOpen = false;
    calendarStyles = {};
    dateRange = new DateRange();

    mounted() {
        const { right, width } = (this.$refs.datePicker as HTMLElement).getBoundingClientRect();
        const property = right - width / 2 > window.innerWidth / 2 ? 'right' : 'left';

        this.calendarStyles = {
            position: 'absolute',
            top: 'calc(100% + 10px)',
            [property]: 0,
        };
    }

    onPickerToggle() {
        this.isPickerOpen = !this.isPickerOpen;
    }

    onOutsideClick() {
        this.isPickerOpen = false;
    }

    onRangeUpdate(bound: any) {
        this.dateRange.pushBound(bound);
    }

    onRangeClear() {
        this.dateRange.clearBounds();
    }

    get range() {
        return this.dateRange.orderedRange;
    }
}
</script>
<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.full-screen {
  width: 100%; 
  height: 100vh; 
  overflow: hidden;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
    padding: 100px;
}

.date-picker {
    position: relative;
}
</style>
