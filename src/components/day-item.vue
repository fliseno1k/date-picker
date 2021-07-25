<template> 
    <td
        @click="onItemSelect"
        class="date-picker-calendar__table-item"
        :class="classes"
    >{{ item.value }}</td>
</template>

<script lang="ts">
import { DatePicker as DatePickerEngine } from '@/engine/date-picker';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Item } from '@/engine/item';

Options({})
export default class DayItem extends Vue {
    /** Модель элемента */
    @Prop({ default: '' })
    private readonly item!: Item;

    /** Движок */
    @Prop({ default: '' })
    private readonly engine!: DatePickerEngine;

    /** 
     * Получение css-классов элемента в зависимости от его типов 
     *
     * @author Флис Алексей 
     */
    get classes() {
        return this.item.types
            .filter(type => type.length > 0)
            .map(type => 'date-picker-calendar__table-item_' + type)
            .join(' ');
    }

    /**
     * Обработчик события клика по элементу
     * 
     * @author Флис Алексей
     */
    public onItemSelect() {
        this.$emit('selectBound', this.item);

        // if (this.engine.isRangeFull()) {
        //     window.dispatchEvent(new CustomEvent('rangeSelect', {
        //         detail: {
        //             range: this.engine.getRange(),
        //         }
        //     }));
        // }
    }

}
</script>

<style>
.date-picker-calendar__table-item_primary {
    color: #333;
}

.date-picker-calendar__table-item_secondary {
    color: #8c8c8c;
}

.date-picker-calendar__table-item_range_bound {
    background: #fc8507;
    color: #fff;
    border-radius: 4px;
}

.date-picker-calendar__table-item_range_child {
    border-radius: 0;
    background: #ffe7ce;
}

.date-picker-calendar__table-item {
    font-size: 16px; 
    line-height: 32px;
    cursor: pointer;
    padding: 1px;
    border-radius: 2px;
    user-select: none;
}

</style>