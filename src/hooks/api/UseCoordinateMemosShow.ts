import { CoordinateMemosShowResponse } from "../../model/api/response/styling/coordinateMemo/CoordinateMemosShowResponse";
import { useGetRequest } from "./UseGetRequest";

type TCoordinateMemosShowArg = {
  coordinateId: number;
};

export const useCoordinateMemosShow = ({
  coordinateId,
}: TCoordinateMemosShowArg) => {
  const { data, error, refetch } = useGetRequest<CoordinateMemosShowResponse>(
    `styling/coordinates/${coordinateId}/coordinate_memos`,
  );

  return {
    data,
    error,
    refetch,
  };
};
