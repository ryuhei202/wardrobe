import { useGetRequest } from "./UseGetRequest";
import { CoordinateTopsRatiosShowResponse } from "../../model/api/response/styling/coordinateTopsRatio/CoordinateTopsRatiosShowResponse";

type TCoordinateTopsRatiosShowArg = {
  coordinateId: number;
};

export const useCoordinateTopsRatiosShow = ({
  coordinateId,
}: TCoordinateTopsRatiosShowArg) => {
  const { data, error, refetch } =
    useGetRequest<CoordinateTopsRatiosShowResponse>(
      `coordinates/${coordinateId}/coordinate_tops_ratios`
    );

  return {
    data,
    error,
    refetch,
  };
};
