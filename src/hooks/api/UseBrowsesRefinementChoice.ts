import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { BrowseRefinementChoiceResponse } from "../../model/api/response/styling/browse/BrowseRefinementChoiceResponse";
import { useGetRequest } from "./UseGetRequest";

type BrowsesRefinementChoice = {
  readonly data?: BrowseRefinementChoiceResponse;
  readonly error: Error | null;
  readonly refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<BrowseRefinementChoiceResponse, Error>>;
  readonly isFetching: boolean;
};

type TBrowsesRefinementChoiceArg = {
  chartId: number;
  categoryId: number;
};

export const useBrowsesRefinementChoice = ({
  chartId,
  categoryId,
}: TBrowsesRefinementChoiceArg): BrowsesRefinementChoice => {
  const params = {
    categoryId,
    chartId,
  };
  const {
    data,
    error,
    refetch,
    isFetching,
  } = useGetRequest<BrowseRefinementChoiceResponse>(
    "browses/refinement_choice",
    params
  );

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
