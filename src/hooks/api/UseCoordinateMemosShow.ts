import { useGetRequest } from "./UseGetRequest";
import { CoordinateMemosShowResponse } from "../../model/api/response/styling/coordinateMemo/CoordinateMemosShowResponse";

type CoordinateMemosShow = {
  readonly data?: CoordinateMemosShowResponse;
  readonly error: Error | null;
};

type TCoordinateMemosShowArg = {
  coordinateId: number;
};

export const useCoordinateMemosShow = ({
  coordinateId,
}: TCoordinateMemosShowArg): CoordinateMemosShow => {
  const { data, error } = useGetRequest<CoordinateMemosShowResponse>(
    `coordinates/${coordinateId}/coordinate_memos`
  );

  return {
    data,
    error,
  };
};
