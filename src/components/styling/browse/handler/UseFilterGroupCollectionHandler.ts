import Filter from "../../../../model/styling/browse/Filter";
import FilterCategoryGroupCallback from "../callback/FilterCategoryGroupCallback";
import FilterGroupCollectionCallback from "../callback/FilterGroupCollectionCallback";

export interface FilterGroupCollectionHandler {
  filterCategoryGroupCallback: FilterCategoryGroupCallback;
  onSizeChanged: (filter: Filter) => () => void;
  onColorChanged: (filter: Filter) => () => void;
  onPatternChanged: (filter: Filter) => () => void;
  onLogoChanged: (filter: Filter) => () => void;
  onOptionChanged: (filter: Filter) => () => void;
}
export const useFilterGroupCollectionHandler = (
  callback: FilterGroupCollectionCallback
): FilterGroupCollectionHandler => {
  const onLargeCategoryChanged = (filter: Filter) => () => {
    callback.onLargeCategoryChanged(filter);
  };

  const onMediumCategoryChanged = (filter: Filter) => () => {
    callback.onMediumCategoryChanged(filter);
  };

  const onSmallCategoryChanged = (filter: Filter) => () => {
    callback.onSmallCategoryChanged(filter);
  };

  const onSizeChanged = (filter: Filter) => () => {
    callback.onSizeChanged(filter);
  };

  const onColorChanged = (filter: Filter) => () => {
    callback.onColorChanged(filter);
  };

  const onPatternChanged = (filter: Filter) => () => {
    callback.onPatternChanged(filter);
  };

  const onLogoChanged = (filter: Filter) => () => {
    callback.onLogoChanged(filter);
  };

  const onOptionChanged = (filter: Filter) => () => {
    callback.onOptionChanged(filter);
  };

  return {
    filterCategoryGroupCallback: {
      onLargeCategoryChanged,
      onMediumCategoryChanged,
      onSmallCategoryChanged,
    },
    onSizeChanged,
    onColorChanged,
    onPatternChanged,
    onLogoChanged,
    onOptionChanged,
  };
};
