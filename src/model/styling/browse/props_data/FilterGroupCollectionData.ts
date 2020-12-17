import FilterCategoryGroupData from "./FilterCategoryGroupData";
import FilterCheckboxData from "./FilterCheckboxData";
import FilterMediaData from "./FilterMediaData";
import FilterSizeData from "./FilterSizeData";

export default interface FilterGroupCollectionData {
  readonly categoryData: FilterCategoryGroupData;
  readonly sizeData: FilterSizeData[];
  readonly colorData: FilterMediaData[];
  readonly patternData: FilterMediaData[];
  readonly logoData: FilterMediaData[];
  readonly optionData: FilterCheckboxData[];
}
