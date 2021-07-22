<template>
    <thead>
        <tr>
            <td 
                v-for="value in $props.values"
                v-bind:key="value"
            >{{ value }}</td>
        </tr>
    </thead>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

Options({})
export default class TableHead extends Vue {
    @Prop({ default: ''}) values;
}

</script>

<style>

</style>