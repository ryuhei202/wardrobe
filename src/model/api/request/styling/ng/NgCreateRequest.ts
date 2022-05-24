import { ItemCategoryNg } from "./ItemCategoryNg";
import { SizeNg } from "./SizeNg";

export type NgCreateRequest = {
  readonly ngCategoryId: number;
  readonly freeText: string;
  readonly chartItemId?: number;
  readonly itemCategoryNg?: ItemCategoryNg;
  readonly sizeNg?: SizeNg;
};
