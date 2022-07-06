import { useGetRequest } from "./UseGetRequest";
import { CoordinateStylistCommentsShowResponse } from "./../../model/api/response/styling/coordinateStylistComment/CoordinateStylistCommentsShowResponse";

type TCoordinateStylistCommentsShowArg = {
  coordinateId: number;
};

export const useCoordinateStylistCommentsShow = ({
  coordinateId,
}: TCoordinateStylistCommentsShowArg) => {
  const { data, error, refetch } =
    useGetRequest<CoordinateStylistCommentsShowResponse>(
      `coordinates/${coordinateId}/coordinate_stylist_comments`
    );

  return { data, error, refetch };
};
