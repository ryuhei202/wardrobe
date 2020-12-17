import FilterCheckboxArrayCallback from "./FilterCheckboxArrayCallback";
import FilterListButtonArrayCallback from "./FilterListButtonArrayCallback";

export default interface FilterCategoryGroupCallback {
  broaderCategoryCallback: FilterListButtonArrayCallback;
  smallerCategoryCallback: FilterCheckboxArrayCallback;
}
