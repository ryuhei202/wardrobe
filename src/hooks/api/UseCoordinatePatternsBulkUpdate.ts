import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { CoordinateBulkUpdateRequest } from "../../model/api/request/styling/coordinate/CoordinateBulkUpdateRequest";
import { usePatchRequest } from "./UsePatchRequest";

type PostCreateOutfitParams = {
  coordinatePatterns: CoordinateBulkUpdateRequest[];
};

type TArrangesCreateOutfitsArg = {
  coordinateId: number;
  coordinatePatterns: CoordinateBulkUpdateRequest[];
};

export const useCoordinatePatternsBulkUpdate = ({
  coordinatePatterns,
  coordinateId,
}: TArrangesCreateOutfitsArg): {
  mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    PostCreateOutfitParams | undefined,
    unknown
  >;
  error: unknown;
  isLoading: boolean;
  isSuccess: boolean;
} => {
  const params = (): PostCreateOutfitParams => {
    return { coordinatePatterns };
  };

  const { mutate, error, isLoading, isSuccess } = usePatchRequest(
    `coordinates/${coordinateId}/coordinate_patterns/bulk_update`,
    params()
  );

  return {
    mutate,
    error,
    isLoading,
    isSuccess,
  };
};
