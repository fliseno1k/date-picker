<template>
    <div class="date-picker-preview">
        <div class="date-picker-preview__container">
            <button @click.stop="onButtonClick" class="date-picker-preview__toggle">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </span>
            </button>
            <div v-if="isTitleVisible" class="date-picker-preview__title">
                <span class="date-picker-preview__text">{{ title }}</span>
                <button @click="onClearRange" class="date-picker-preview__clear-button" >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { OrderedRange } from '@/types/range.type';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';


/**
 * Компонент отображения кнопки переключателя и выбранного диапазона
 * 
 * @author Флис Алексей
 */
@Options({})
export default class Button extends Vue {
    /** Упорядоченный диапазон дат */
    @Prop({ default: ''})
    range!: OrderedRange;

    /**
     * Обработчик события нажатия на переключатель календаря
     * 
     * @author Флис Алексей
     */
    public onButtonClick() {
        this.$emit('togglePicker');
    }

    /**
     * Приведение объекта даты к виду день/месяц/год
     * 
     * @author Флис Алексей
     */
    public ddmmyyyy(date: Date) {
        const mm = date.getMonth() + 1;
        const dd = date.getDate();

        return [
            (dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : '0') + mm,
            date.getFullYear(),
        ].join('/');
    }

    /**
     * Создание страницы на основе переданного значения диапазона дат
     * 
     * @author Флис Алексей
     */
    public onClearRange() {
        this.$emit('clearRange');
    }

    /**
     * Получение заголовка для текущего диапазона дат
     * 
     * @author Флис Алексей
     */
    get title() {
        if (!this.range.leftBound || !this.range.rightBound) return '';
        if (this.range.leftBound.date.getTime() === this.range.rightBound.date.getTime()) return this.ddmmyyyy(this.range.leftBound.date);
        return this.ddmmyyyy(this.range.leftBound.date) + ' - ' + this.ddmmyyyy(this.range.rightBound.date) || '';
    }

    /**
     * Получение флага отображения заголовка диапазаона дат
     * 
     * @author Флис Алексей
     */
    get isTitleVisible() {
        return this.range.leftBound;
    }
}
</script>

<style>
    .date-picker-preview {
        position: relative;
    }

    .date-picker-preview__container {
        display: flex;
        justify-content: center;
    }

    .date-picker-preview__toggle {
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

    .date-picker-preview__toggle span {
        display: inline-block;
        width: 24px;
        height: 24px;
        color: #8c8c8c;
    }

    .date-picker-preview__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 12px;
        border-radius: 8px;
        background: #fff;
        border: 1px solid #8c8c8c;
    }

    .date-picker-preview__text {
        font-size: 18px;
        font-weight: 500;
        color: #8c8c8c;
    }

    .date-picker-preview__clear-button {
        display: flex;
        pdding: 4px;
        margin-left: 10px;
        border-radius: 2px;
        border: none;
        background: transparent;
        cursor: pointer;
    }

    .date-picker-preview__clear-button:hover {
        background: #f8f8f8;

    }

    .date-picker-preview__clear-button span {
        display: inline-block;
        width: 16px;
        height: 16px;
        color: #8c8c8c;
    }

</style>