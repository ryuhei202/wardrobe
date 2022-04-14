import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { CoordinateShowResponse } from "../../model/api/response/styling/coordinate/CoordinateShowResponse";
import { useGetRequest } from "./UseGetRequest";

type CoordinatesShow = {
  readonly data?: CoordinateShowResponse;
  readonly error: Error | null;
  readonly refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<CoordinateShowResponse, Error>>;
  readonly isFetching: boolean;
};

type TCoordinatesShowArg = {
  chartId: number;
};

export const useCoordinatesShow = ({
  chartId,
}: TCoordinatesShowArg): CoordinatesShow => {
  const { data, error, refetch, isFetching } =
    useGetRequest<CoordinateShowResponse>(`kartes/${chartId}/coordinate`);

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
