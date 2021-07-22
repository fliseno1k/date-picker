import { DatePicker, cEnum } from "./DatePicker";
import { DateRange } from "./DateRange";
import { Filter } from "./Filter";

export default function init() {
    return new DatePicker(
        new Filter(), 
        new DateRange(),
    );
}

export { cEnum };