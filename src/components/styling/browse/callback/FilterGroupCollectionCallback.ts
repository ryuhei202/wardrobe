import { FilterPartSizeCallback } from "./FilterPartSizeCallback";
import FilterCategoryGroupCallback from "./FilterCategoryGroupCallback";
import FilterCheckboxArrayCallback from "./FilterCheckboxArrayCallback";
import FilterMediaArrayCallback from "./FilterMediaArrayCallback";
import FilterSizeArrayCallback from "./FilterSizeArrayCallback";

export default interface FilterGroupCollectionCallback {
  categoryCallback: FilterCategoryGroupCallback;
  sizeCallback: FilterSizeArrayCallback;
  partSizeCallback: FilterPartSizeCallback;
  colorCallback: FilterMediaArrayCallback;
  patternCallback: FilterMediaArrayCallback;
  logoCallback: FilterMediaArrayCallback;
  dropSizeCallback: FilterCheckboxArrayCallback;
  optionCallback: FilterCheckboxArrayCallback;
  onItemIdChanged: (newId: number) => void;
}
