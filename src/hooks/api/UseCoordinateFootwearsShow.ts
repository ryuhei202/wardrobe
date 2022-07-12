import { TCoordinateFootwearsShowResponse } from "../../model/api/response/styling/coordinateFootwear/TCoordianteFootwearsShowResponse";
import { useGetRequest } from "./UseGetRequest";

type CoordinateFootwearsShow = {
  readonly data?: TCoordinateFootwearsShowResponse;
  readonly error: Error | null;
};

type TCoordinateFootwearsShowArg = {
  coordinateId: number;
};

export const useCoordinateFootwearsShow = ({
  coordinateId,
}: TCoordinateFootwearsShowArg): CoordinateFootwearsShow => {
  const { data, error } = useGetRequest<TCoordinateFootwearsShowResponse>(
    `coordinates/${coordinateId}/coordinate_footwear`
  );

  return {
    data,
    error,
  };
};
