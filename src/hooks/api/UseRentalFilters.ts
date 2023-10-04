import { FilterFormalRankResponse } from "../../model/api/response/styling/browse/FilterFormalRankResponse";
import { FilterMediaResponse } from "../../model/api/response/styling/browse/FilterMediaResponse";
import { FilterRangeResponse } from "../../model/api/response/styling/browse/FilterRangeResponse";
import { FilterResponse } from "../../model/api/response/styling/browse/FilterResponse";
import { LargeCategoryChoiceResponse } from "../../model/api/response/styling/browse/LargeCategoryChoiceResponse";
import { Refinement } from "../../model/selecting/browse/Refinement";
import { useGetRequest } from "./UseGetRequest";

type TResponse = {
  readonly data?: TRentalFiltersResponse;
  readonly error: Error | null;
  readonly isFetching: boolean;
};

export type TRentalFiltersResponse = {
  readonly filter: FilterChoiceResponse;
  readonly sort: FilterResponse[];
  readonly defaultRefinement: Refinement;
};

export type FilterChoiceResponse = {
  readonly largeCategory: LargeCategoryChoiceResponse[];
  readonly size: FilterResponse[];
  readonly rangesOfPartSizes: FilterRangeResponse[];
  readonly color: FilterMediaResponse[];
  readonly pattern: FilterMediaResponse[];
  readonly logo: FilterMediaResponse[];
  readonly dropSize: FilterResponse[];
  readonly formalRank: FilterFormalRankResponse;
  readonly rank: FilterResponse[];
  readonly option: FilterResponse[];
};

type TArgs = {
  readonly rentalId: number;
  readonly categoryId: number;
};
export const useRentalFilters = ({
  rentalId,
  categoryId,
}: TArgs): TResponse => {
  const params = {
    categoryId,
  };
  const { data, error, isFetching } = useGetRequest<TRentalFiltersResponse>(
    `biz/rentals/${rentalId}/filters`,
    params,
    `biz/rentals/${rentalId}/filters/?category_id=${categoryId}`,
  );
  return {
    data,
    error,
    isFetching,
  };
};
