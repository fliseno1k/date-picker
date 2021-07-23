<template>
    <div class="range-picker">
        <div class="range-picker__container">
            <div class="range-picker__date-picker-caller">
                <button @click="onButtonClick">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </span>
                </button>    
            </div>
            <div class="range-picker__title">
                <span class="range-picker__text">27/12/2021 - 31/01/2022</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Button extends Vue {

    onButtonClick() {
        this.$emit('togglePicker');
    }

}
</script>

<style>
    .range-picker {
        position: relative;
    }

    .range-picker__container {
        display: flex;
        justify-content: center;
    }

    .range-picker__date-picker-caller {
        flex: none;
    }

    .range-picker__date-picker-caller button {
        display: flex;
        align-items: center;
        padding: 8px;
        border: 1px solid #8c8c8c;
        border-radius: 8px;
        outline: none;
        background: transparent;
        cursor: pointer;
        margin-right: 12px;
    }

    .range-picker__date-picker-caller button span {
        display: inline-block;
        width: 24px;
        height: 24px;
        color: #8c8c8c;
    }

    .range-picker__title {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 8px;
        background: #fff;
        border: 1px solid #8c8c8c;
    }

    .range-picker__text {
        font-size: 18px;
        font-weight: 500;
        color: #8c8c8c;
    }

</style>