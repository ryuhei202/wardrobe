import FilterCategoryGroupCallback from "./FilterCategoryGroupCallback";
import FilterCheckboxArrayCallback from "./FilterCheckboxArrayCallback";
import FilterMediaArrayCallback from "./FilterMediaArrayCallback";
import FilterSizeArrayCallback from "./FilterSizeArrayCallback";
import FilterSliderArrayCallback from "./FilterSliderArrayCallback";

export default interface FilterGroupCollectionCallback {
  categoryCallback: FilterCategoryGroupCallback;
  sizeCallback: FilterSizeArrayCallback;
  partSizeCallback: FilterSliderArrayCallback;
  colorCallback: FilterMediaArrayCallback;
  patternCallback: FilterMediaArrayCallback;
  logoCallback: FilterMediaArrayCallback;
  dropSizeCallback: FilterCheckboxArrayCallback;
  optionCallback: FilterCheckboxArrayCallback;
  onItemIdChanged: (newId: number) => void;
}
