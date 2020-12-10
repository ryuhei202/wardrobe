import Filter from "../../../../model/styling/browse/Filter";

export default interface FilterCategoryGroupCallback {
  onLargeCategoryChanged: (filter: Filter) => () => void;
  onMediumCategoryChanged: (filter: Filter) => () => void;
  onSmallCategoryChanged: (filter: Filter) => () => void;
}
