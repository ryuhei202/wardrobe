import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { CoordinatePatternIndexResponse } from "../../model/api/response/styling/coordinatePattern/CoordinatePatternIndexResponse";
import { useGetRequest } from "./UseGetRequest";

type CoordinatePatternsIndex = {
  readonly data?: CoordinatePatternIndexResponse;
  readonly error: Error | null;
  readonly refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<CoordinatePatternIndexResponse, Error>>;
  readonly isFetching: boolean;
};

type TCoordinatePatternsIndexArg = {
  coordinateId: number;
};

export const useCoordinatePatternsIndex = ({
  coordinateId,
}: TCoordinatePatternsIndexArg): CoordinatePatternsIndex => {
  const { data, error, refetch, isFetching } =
    useGetRequest<CoordinatePatternIndexResponse>(
      `styling/coordinates/${coordinateId}/coordinate_patterns`,
    );

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};
