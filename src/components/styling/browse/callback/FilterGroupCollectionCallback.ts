import FilterCategoryGroupCallback from "./FilterCategoryGroupCallback";
import FilterCheckboxArrayCallback from "./FilterCheckboxArrayCallback";
import FilterMediaArrayCallback from "./FilterMediaArrayCallback";
import FilterSizeArrayCallback from "./FilterSizeArrayCallback";

export default interface FilterGroupCollectionCallback {
  categoryCallback: FilterCategoryGroupCallback;
  sizeCallback: FilterSizeArrayCallback;
  colorCallback: FilterMediaArrayCallback;
  patternCallback: FilterMediaArrayCallback;
  logoCallback: FilterMediaArrayCallback;
  optionCallback: FilterCheckboxArrayCallback;
}
