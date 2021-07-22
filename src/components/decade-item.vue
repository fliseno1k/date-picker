<template> 
    <td class="date-picker__table-item"  @click="onItemSelect" :class="classes">{{ item.value }}</td>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';


Options({})
export default class DecadeItem extends Vue {
    @Prop({ default: '' })
    item

    get classes() {
        return this.item.types
            .filter(type => type.length > 0)
            .map(type => 'date-picker__table-item_' + type)
            .join(' ');
    }

    onItemSelect() {
      console.log('select');
        // this.engine.pushRangeBound(this.item);
        // this.engine.filterPage(this.page);
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