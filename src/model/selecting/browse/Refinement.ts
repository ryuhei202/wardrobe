import { FilterFormalRankResponse } from "../../api/response/styling/browse/FilterFormalRankResponse";
import { FormalRankRefinement } from "./FormalRankRefinement";
import { ValueRefinement } from "./ValueRefinement";

type NewType = FilterFormalRankResponse;

export interface Refinement {
  readonly itemId: number | null;
  readonly largeCategoryId: number | null;
  readonly mediumCategoryId: number | null;
  readonly smallCategoryIds: number[];
  readonly sizeIds: number[];
  readonly partSizes: ValueRefinement[];
  readonly colorIds: number[];
  readonly patternIds: number[];
  readonly logoIds: number[];
  readonly dropSizes: number[];
  readonly formalRank: FormalRankRefinement;
  readonly ngIds: number[];
  readonly optionIds: number[];
  readonly sortId: number;
  readonly pageNo: number;
}
