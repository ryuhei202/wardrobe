import { FilterPartSizeData } from "./FilterPartSizeData";
import { FilterCategoryGroupData } from "./FilterCategoryGroupData";
import { FilterCheckboxData } from "./FilterCheckboxData";
import { FilterMediaData } from "./FilterMediaData";
import { FilterSizeData } from "./FilterSizeData";

export interface FilterGroupCollectionData {
  readonly categoryData: FilterCategoryGroupData;
  readonly sizeData: FilterSizeData[];
  readonly partSizeData: FilterPartSizeData;
  readonly colorData: FilterMediaData[];
  readonly patternData: FilterMediaData[];
  readonly logoData: FilterMediaData[];
  readonly dropSizeData: FilterCheckboxData[];
  readonly ngData: FilterCheckboxData[];
  readonly optionData: FilterCheckboxData[];
}
