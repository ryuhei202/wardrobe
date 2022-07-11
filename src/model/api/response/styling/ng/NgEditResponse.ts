import { TItemCategoryNg } from "./TItemCategoryNg";
import { TSizeNg } from "./TSizeNg";

export type NgEditResponse = {
  readonly id: number;
  readonly ngCategoryId: number;
  readonly chartId: number | null;
  readonly chartItemId: number | null;
  readonly freeText: string;
  readonly itemCategoryNg: TItemCategoryNg | null;
  readonly sizeNg: TSizeNg | null;
};
