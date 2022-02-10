import { useContext } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { ChartIdContext } from "../../contexts/ChartIdContext";
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

export const useBrowsesRefinementChoice = (
  categoryId: number
): BrowsesRefinementChoice => {
  const chartId = useContext(ChartIdContext);
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
