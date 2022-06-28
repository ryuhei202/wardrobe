import { TItemCategoryNg } from "./TItemCategoryNg";
import { TSizeNg } from "./TSizeNg";

export type NgEditResponse = {
  readonly id: number;
  readonly ngCategoryId: number;
  readonly freeText: string | null;
  readonly itemCategoryNg: TItemCategoryNg | null;
  readonly sizeNg: TSizeNg | null;
};
