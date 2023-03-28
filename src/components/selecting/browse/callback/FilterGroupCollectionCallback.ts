import { FilterPartSizeCallback } from "./FilterPartSizeCallback";
import { FilterCategoryGroupCallback } from "./FilterCategoryGroupCallback";
import { FilterCheckboxArrayCallback } from "./FilterCheckboxArrayCallback";
import { FilterMediaArrayCallback } from "./FilterMediaArrayCallback";
import { FilterSizeArrayCallback } from "./FilterSizeArrayCallback";
import { FormalRankRefinement } from "../../../../model/selecting/browse/FormalRankRefinement";

export interface FilterGroupCollectionCallback {
  categoryCallback: FilterCategoryGroupCallback;
  sizeCallback: FilterSizeArrayCallback;
  partSizeCallback: FilterPartSizeCallback;
  colorCallback: FilterMediaArrayCallback;
  patternCallback: FilterMediaArrayCallback;
  logoCallback: FilterMediaArrayCallback;
  dropSizeCallback: FilterCheckboxArrayCallback;
  formalRankCallback: (value: FormalRankRefinement) => void;
  ngCallback: FilterCheckboxArrayCallback;
  optionCallback: FilterCheckboxArrayCallback;
  onItemIdChanged: (newId: number) => void;
}
