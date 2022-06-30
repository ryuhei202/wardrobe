import { useGetRequest } from "./UseGetRequest";
import { CoordinateTopsRatiosShowResponse } from "../../model/api/response/styling/coordinateTopsRatio/CoordinateTopsRatiosShowResponse";

type CoordinateTopsRatiosShow = {
  readonly data?: CoordinateTopsRatiosShowResponse;
  readonly error: Error | null;
};

type TCoordinateTopsRatiosShowArg = {
  coordinateId: number;
};

export const useCoordinateTopsRatiosShow = ({
  coordinateId,
}: TCoordinateTopsRatiosShowArg): CoordinateTopsRatiosShow => {
  const { data, error } = useGetRequest<CoordinateTopsRatiosShowResponse>(
    `coordinates/${coordinateId}/coordinate_tops_ratios`
  );

  return {
    data,
    error,
  };
};
