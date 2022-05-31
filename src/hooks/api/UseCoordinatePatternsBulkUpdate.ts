import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { CoordinateBulkUpdateRequest } from "../../model/api/request/styling/coordinate/CoordinateBulkUpdateRequest";
import { usePatchRequest } from "./UsePatchRequest";

type PostCreateOutfitParams = {
  coordinates: CoordinateBulkUpdateRequest[];
};

type TArrangesCreateOutfitsArg = {
  coordinateId: number;
  coordinates: CoordinateBulkUpdateRequest[];
};

export const useCoordinatePatternsBulkUpdate = ({
  coordinates,
  coordinateId,
}: TArrangesCreateOutfitsArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
} => {
  const params = (): PostCreateOutfitParams => {
    return { coordinates };
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
