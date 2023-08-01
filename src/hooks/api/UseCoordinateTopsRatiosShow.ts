import { CoordinateTopsRatiosShowResponse } from "../../model/api/response/styling/coordinateTopsRatio/CoordinateTopsRatiosShowResponse";
import { useGetRequest } from "./UseGetRequest";

type TCoordinateTopsRatiosShowArg = {
  coordinateId: number;
};

export const useCoordinateTopsRatiosShow = ({
  coordinateId,
}: TCoordinateTopsRatiosShowArg) => {
  const { data, error, refetch } =
    useGetRequest<CoordinateTopsRatiosShowResponse>(
      `styling/coordinates/${coordinateId}/coordinate_tops_ratios`,
    );

  return {
    data,
    error,
    refetch,
  };
};
