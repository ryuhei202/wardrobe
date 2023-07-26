import { FilterFormalRankResponse } from "../../model/api/response/styling/browse/FilterFormalRankResponse";
import { FilterMediaResponse } from "../../model/api/response/styling/browse/FilterMediaResponse";
import { FilterRangeResponse } from "../../model/api/response/styling/browse/FilterRangeResponse";
import { FilterResponse } from "../../model/api/response/styling/browse/FilterResponse";
import { LargeCategoryChoiceResponse } from "../../model/api/response/styling/browse/LargeCategoryChoiceResponse";
import { FormalRankRefinement } from "../../model/selecting/browse/FormalRankRefinement";
import { ValueRefinement } from "../../model/selecting/browse/ValueRefinement";
import { useGetRequest } from "./UseGetRequest";

type TResponse = {
  readonly data?: TRentalFiltersResponse;
  readonly error: Error | null;
};

type TRentalFiltersResponse = {
  readonly filter: FilterChoiceResponse;
  readonly sort: FilterResponse[];
  readonly defaultRefinement: Refinement;
};

type FilterChoiceResponse = {
  readonly largeCategory: LargeCategoryChoiceResponse[];
  readonly size: FilterResponse[];
  readonly rangesOfPartSizes: FilterRangeResponse[];
  readonly color: FilterMediaResponse[];
  readonly pattern: FilterMediaResponse[];
  readonly logo: FilterMediaResponse[];
  readonly dropSize: FilterResponse[];
  readonly formalRank: FilterFormalRankResponse;
  readonly option: FilterResponse[];
};

type Refinement = {
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
  readonly optionIds: number[];
  readonly sortId: number;
  readonly rank: string[];
  readonly pageNo: number;
};

type TArgs = {
  readonly rentalId: number;
};
export const useRentalFilters = ({ rentalId }: TArgs): TResponse => {
  const { data, error } = useGetRequest<TRentalFiltersResponse>(
    `rentals/${rentalId}/filters`,
  );
  return {
    data,
    error,
  };
};
