import { useGetRequest } from "./UseGetRequest";
import { CoordinateMemosShowResponse } from "../../model/api/response/styling/coordinateMemo/CoordinateMemosShowResponse";

type TCoordinateMemosShowArg = {
  coordinateId: number;
};

export const useCoordinateMemosShow = ({
  coordinateId,
}: TCoordinateMemosShowArg) => {
  const { data, error, refetch } = useGetRequest<CoordinateMemosShowResponse>(
    `coordinates/${coordinateId}/coordinate_memos`
  );

  return {
    data,
    error,
    refetch,
  };
};
