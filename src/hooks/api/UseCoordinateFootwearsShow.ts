import { TCoordinateFootwearsShowResponse } from "../../model/api/response/styling/coordinateFootwear/TCoordianteFootwearsShowResponse";
import { useGetRequest } from "./UseGetRequest";

type CoordinateFootwearsShow = {
  readonly data?: TCoordinateFootwearsShowResponse;
  readonly error: Error | null;
};

type TProps = {
  readonly coordinateId: number;
};

export const useCoordinateFootwearsShow = ({
  coordinateId,
}: TProps): CoordinateFootwearsShow => {
  const { data, error } = useGetRequest<TCoordinateFootwearsShowResponse>(
    `styling/coordinates/${coordinateId}/coordinate_footwear`,
  );

  return {
    data,
    error,
  };
};
