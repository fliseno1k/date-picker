import { Page } from "./Page";
import { Item } from "./item";
import { PageItemsEnum } from "@/types/page-items.enum";


type Range = {
    leftBound: Item, 
    rightBound: Item, 
}

export class RangeFilter {

    static filter(page: Page, rangeBounds: Range): Page {
        if (!rangeBounds.leftBound || !rangeBounds.rightBound) return page;
        page.items.forEach(item => item.setRangeType(''));

        const insideRangeItems = page.items.filter((item: Item) => 
            item.date.getTime() >= rangeBounds.leftBound.date.getTime() && 
            item.date.getTime() <= rangeBounds.rightBound.date.getTime()
        );

        const rangeBoundItems = insideRangeItems.filter((item: Item) => 
            item.date.getTime() === rangeBounds.leftBound.date.getTime() || 
            item.date.getTime() === rangeBounds.rightBound.date.getTime()
        );

        insideRangeItems.forEach((item: Item) => item.setRangeType(PageItemsEnum.RANGE_CHILD));
        rangeBoundItems.forEach((item: Item) => item.setRangeType(PageItemsEnum.RANGE_BOUND));

        return page;
    }
}
