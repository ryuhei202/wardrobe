import { SizeNg } from "../../../request/styling/ng/SizeNg";
import { ItemCategoryNg } from "../../../request/styling/ng/ItemCategoryNg";

export type NgEditConvertResponse = {
  readonly id: number;
  readonly ngCategoryId: number;
  readonly chartId?: number;
  readonly chartItemId?: number;
  readonly freeText: string;
  readonly itemCategoryNg?: ItemCategoryNg;
  readonly sizeNg?: SizeNg;
};
