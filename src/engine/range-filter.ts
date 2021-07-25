import { Page } from "./page";
import { Item } from "./item";
import { PageItemsEnum } from "@/types/page-items.enum";
import { OrderedRange } from "@/types/range.type";


/**
 * Фильтр страниц
 * 
 * @author Флис Алексей
 */
export class RangeFilter {

    /**
     * Выполнение фильтрации страницы по диапазону дат
     * 
     * @author Флис Алексей
     */
    static filter(page: Page, rangeBounds: OrderedRange ): Page {
        if (!rangeBounds.leftBound || !rangeBounds.rightBound) return page;
        page.items.forEach(item => item.rangeType = '');

        const insideRangeItems = page.items.filter((item: Item) =>
            item.date.getTime() >= (rangeBounds.leftBound as Item).date.getTime() &&
            item.date.getTime() <= (rangeBounds.rightBound as Item).date.getTime()
        );

        const rangeBoundItems = insideRangeItems.filter((item: Item) =>
            item.date.getTime() === (rangeBounds.leftBound as Item).date.getTime() ||
            item.date.getTime() === (rangeBounds.rightBound as Item).date.getTime()
        );

        insideRangeItems.forEach((item: Item) => item.rangeType =PageItemsEnum.RANGE_CHILD);
        rangeBoundItems.forEach((item: Item) => item.rangeType =PageItemsEnum.RANGE_BOUND);

        return page;
    }
}
