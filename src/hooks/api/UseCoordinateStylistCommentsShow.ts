import { CoordinateStylistCommentsShowResponse } from "./../../model/api/response/styling/coordinateStylistComment/CoordinateStylistCommentsShowResponse";
import { useGetRequest } from "./UseGetRequest";

type TCoordinateStylistCommentsShowArg = {
  coordinateId: number;
};

export const useCoordinateStylistCommentsShow = ({
  coordinateId,
}: TCoordinateStylistCommentsShowArg) => {
  const { data, error, refetch } =
    useGetRequest<CoordinateStylistCommentsShowResponse>(
      `styling/coordinates/${coordinateId}/coordinate_stylist_comment`,
    );

  return { data, error, refetch };
};
