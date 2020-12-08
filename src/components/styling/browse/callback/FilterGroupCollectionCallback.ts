import Filter from "../../../../model/styling/browse/Filter";

export default interface FilterGroupCollectionCallback {
  onLargeCategoryChanged: (filter: Filter) => void;
  onMediumCategoryChanged: (filter: Filter) => void;
  onSmallCategoryChanged: (filter: Filter) => void;
  onSizeChanged: (filter: Filter) => void;
  onColorChanged: (filter: Filter) => void;
  onPatternChanged: (filter: Filter) => void;
  onLogoChanged: (filter: Filter) => void;
  onOptionChanged: (filter: Filter) => void;
}
