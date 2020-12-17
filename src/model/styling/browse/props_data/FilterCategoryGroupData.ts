import FilterCheckboxData from "./FilterCheckboxData";
import FilterListButtonData from "./FilterListButtonData";

export default interface FilterCategoryGroupData {
  readonly broaderCategoryData: FilterListButtonData[] | null;
  readonly smallCategoryData: FilterCheckboxData[];
}
