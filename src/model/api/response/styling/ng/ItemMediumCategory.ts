import { ItemSmallCategory } from "./ItemSmallCategory";

export type ItemMediumCategory = {
  readonly id: number;
  readonly name: string;
  readonly itemSmallCategory: ItemSmallCategory[];
};
