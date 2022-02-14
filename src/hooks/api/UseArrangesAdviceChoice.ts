import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { AdviceChoiceResponse } from "../../model/api/response/styling/arrange/AdviceChoiceResponse";
import { useGetRequest } from "./UseGetRequest";

type ArrangesAdviceChoice = {
  readonly data?: AdviceChoiceResponse;
  readonly error: Error | null;
  readonly refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<AdviceChoiceResponse, Error>>;
  readonly isFetching: boolean;
};

type TArrangesAdviceChoiceArg = {
  chartId: number;
};

export const useArrangesAdviceChoice = ({
  chartId,
}: TArrangesAdviceChoiceArg): ArrangesAdviceChoice => {
  const {
    data,
    error,
    refetch,
    isFetching,
  } = useGetRequest<AdviceChoiceResponse>("arranges/advice_choice", {
    chartId,
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
