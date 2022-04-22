import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { CoordinateIndexResponse } from "../../model/api/response/styling/coordinate/CoordinateIndexResponse";
import { useGetRequest } from "./UseGetRequest";

type CoordinatesShow = {
  readonly data?: CoordinateIndexResponse;
  readonly error: Error | null;
  readonly refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<CoordinateIndexResponse, Error>>;
  readonly isFetching: boolean;
};

type TCoordinatesShowArg = {
  chartId: number;
};

export const useCoordinatesIndex = ({
  chartId,
}: TCoordinatesShowArg): CoordinatesShow => {
  const { data, error, refetch, isFetching } =
    useGetRequest<CoordinateIndexResponse>(`kartes/${chartId}/coordinates`);

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
