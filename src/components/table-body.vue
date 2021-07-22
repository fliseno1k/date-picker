<template>
    <tbody>
        <tr v-bind:key="i" v-for="(row, i) in rows">
            <td v-bind:key="item.id" v-for="item in row">
                {{ item.value }}
            </td>
        </tr>
    </tbody>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Options({})
export default class TableBody extends Vue {
    @Prop(Array) rows; 
}
</script>

<style>

</style>