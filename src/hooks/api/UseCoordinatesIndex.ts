import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { CoordinateIndexResponse } from "../../model/api/response/styling/coordinate/CoordinateIndexResponse";
import { useGetRequest } from "./UseGetRequest";

type CoordinatesIndex = {
  readonly data?: CoordinateIndexResponse;
  readonly error: Error | null;
  readonly refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<CoordinateIndexResponse, Error>>;
  readonly isFetching: boolean;
};

type TCoordinatesIndexArg = {
  chartId: number;
};

export const useCoordinatesIndex = ({
  chartId,
}: TCoordinatesIndexArg): CoordinatesIndex => {
  const { data, error, refetch, isFetching } =
    useGetRequest<CoordinateIndexResponse>(
      `styling/kartes/${chartId}/coordinates`,
    );

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
