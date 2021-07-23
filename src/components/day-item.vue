<template> 
    <td
        @click="onItemSelect"
        class="date-picker-calendar__table-item"
        :class="classes"
    >{{ item.value }}</td>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

Options({})
export default class DayItem extends Vue {
    @Prop({ default: '' })
    item

    @Prop({ default: '' })
    engine

    get classes() {
        return this.item.types
            .filter(type => type.length > 0)
            .map(type => 'date-picker-calendar__table-item_' + type)
            .join(' ');
    }

    onItemSelect() {
        this.$emit('selectBound', { bound: this.item });

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