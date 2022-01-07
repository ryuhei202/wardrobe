import { FilterCheckboxData } from "./FilterCheckboxData";
import { FilterListButtonData } from "./FilterListButtonData";

export interface FilterCategoryGroupData {
  readonly broaderCategoryData: FilterListButtonData[] | null;
  readonly smallCategoryData: FilterCheckboxData[];
}
