<template>
    <div class="date-picker-calendar-slide-control">
        <button @click="$emit('slide')" class="date-picker-calendar-slide-control__button">
            <span class="date-picker-calendar-slide-control__content-line">
                <slot></slot>
            </span>
        </button>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class SlideControl extends Vue {}
</script>

<style>
.date-picker-calendar-slide-control {
    flex: none;
}

.date-picker-calendar-slide-control__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border: none; 
    border-radius: 4px; 
    background: none;
    cursor: pointer;
}

.date-picker-calendar-slide-control__content-line {
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #333;
}
</style>
