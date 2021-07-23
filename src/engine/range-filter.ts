import { Page } from "./page";
import { Item } from "./item";
import { PageItemsEnum } from "@/types/page-items.enum";
import {OrderedRange} from "@/types/range.type";


export class RangeFilter {

    static filter(page: Page, rangeBounds: OrderedRange ): Page {
        if (!rangeBounds.leftBound || !rangeBounds.rightBound) return page;
        page.items.forEach(item => item.setRangeType(''));

        const insideRangeItems = page.items.filter((item: Item) =>
            item.date.getTime() >= (rangeBounds.leftBound as Item).date.getTime() &&
            item.date.getTime() <= (rangeBounds.rightBound as Item).date.getTime()
        );

        const rangeBoundItems = insideRangeItems.filter((item: Item) =>
            item.date.getTime() === (rangeBounds.leftBound as Item).date.getTime() ||
            item.date.getTime() === (rangeBounds.rightBound as Item).date.getTime()
        );

        insideRangeItems.forEach((item: Item) => item.setRangeType(PageItemsEnum.RANGE_CHILD));
        rangeBoundItems.forEach((item: Item) => item.setRangeType(PageItemsEnum.RANGE_BOUND));

        return page;
    }
}
