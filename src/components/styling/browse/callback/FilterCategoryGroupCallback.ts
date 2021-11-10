import { FilterCheckboxArrayCallback } from "./FilterCheckboxArrayCallback";
import { FilterListButtonArrayCallback } from "./FilterListButtonArrayCallback";

export interface FilterCategoryGroupCallback {
  broaderCategoryCallback: FilterListButtonArrayCallback;
  smallerCategoryCallback: FilterCheckboxArrayCallback;
}
