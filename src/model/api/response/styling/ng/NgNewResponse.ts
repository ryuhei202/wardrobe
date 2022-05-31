import { ItemMediumCategory } from "./ItemMediumCategory";
import { ItemPart } from "./ItemPart";

export type NgNewResponse = {
  readonly itemMediumCategories: ItemMediumCategory[] | null;
  readonly itemParts: ItemPart[] | null;
};
