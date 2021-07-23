
import { PageItemsEnum } from "@/types/page-items.enum";


const RANGED_TYPE_INDEX = 1;

export class Item {

    constructor(
        public readonly id: string, 
        public readonly value: number | string, 
        public readonly date: Date,
        public readonly types: string[] = [],
    ) {}

    public setRangeType(type: PageItemsEnum | ''): void {
        this.types[RANGED_TYPE_INDEX] = type;
    }
}