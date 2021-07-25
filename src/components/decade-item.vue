<template> 
    <td 
        @click.stop="onItemSelect"
        class="date-picker__table-item" 
        :class="classes"
    >{{ item.value }}</td>
</template>

<script lang="ts">
import { DatePicker as DatePickerEngine } from '@/engine/date-picker';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Item } from '@/engine/item';
import { TimePeriodsEnum } from '../types/time-periods.enum';


Options({})
export default class DecadeItem extends Vue {
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
            .map(type => 'date-picker__table-item_' + type)
            .join(' ');
    }

    /**
     * Обработчик события клика по элементу
     * 
     * @author Флис Алексей
     */
    onItemSelect() {
        this.engine.setPageConstructor(TimePeriodsEnum.MONTHS, { date: this.item.date });
        this.$emit('updatePage');
    }

}
</script>

<style>
.date-picker__table-item_primary {
    color: #333;
}

.date-picker__table-item_secondary {
    color: #8c8c8c;
}

.date-picker__table-item_range_bound {
    background: #fc8507;
    color: #fff;
    border-radius: 4px;
}

.date-picker__table-item_inside_range {
    border-radius: 0;
    background: #ffe7ce;
}

.date-picker__table-item {
    font-size: 16px; 
    line-height: 32px;
    cursor: pointer;
    padding: 1px;
    border-radius: 2px;
    user-select: none;
}

</style>