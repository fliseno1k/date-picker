
const DEFAULT_TYPE_INDEX = 0; 
const RANGED_TYPE_INDEX = 1;

export enum ItemTypes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RANGE_BOUND = 'rangeBound', 
    RANGE_INNER = 'rangeInner',
}

export class Item {

    constructor(
        public readonly id: string, 
        public readonly value: number | string, 
        public readonly types: string[] = [],
    ) {}

    public setRangeType(type: string) {
        this.types[RANGED_TYPE_INDEX] = type;
    }
}