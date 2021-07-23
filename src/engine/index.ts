import { DatePicker } from "./date-picker";
import { DateRange } from "./date-range";

export default function init(options?: { date: Date }) {
    return new DatePicker(new DateRange(), options);
}