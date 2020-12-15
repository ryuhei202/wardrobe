import FilterCategoryGroupCallback from "../callback/FilterCategoryGroupCallback";
import FilterCheckboxArrayCallback from "../callback/FilterCheckboxArrayCallback";
import FilterListButtonArrayCallback from "../callback/FilterListButtonArrayCallback";

export interface FilterCategoryGroupHandler {
  smallCategoryCallback: FilterCheckboxArrayCallback;
  biggerCategoryCallback: FilterListButtonArrayCallback;
}

export const useFilterCategoryGroupHandler = (
  callback: FilterCategoryGroupCallback
): FilterCategoryGroupHandler => {
  return {
    smallCategoryCallback: {
      onClick: (index: number) => callback.onSmallCategoryClick(index),
    },
    biggerCategoryCallback: {
      onClick: (index: number) => callback.onBroaderCategoryClick(index),
    },
  };
};
