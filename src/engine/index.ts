import { DatePicker } from "./DatePicker";
import { DateRange } from "./DateRange";

export default function init() {
    return new DatePicker(new DateRange());
}