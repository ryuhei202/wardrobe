import { CoordinateItemsIndexResponse } from "../../model/api/response/styling/coordinateItem/CoordinateItemsIndexResponse";
import { useGetRequest } from "./UseGetRequest";

type CoordinateItemsIndex = {
  readonly data?: CoordinateItemsIndexResponse;
  readonly error: Error | null;
};

type TCoordinateItemsIndexArg = {
  coordinateId: number;
};

export const useCoordinateItemsIndex = ({
  coordinateId,
}: TCoordinateItemsIndexArg): CoordinateItemsIndex => {
  const { data, error } = useGetRequest<CoordinateItemsIndexResponse>(
    `coordinates/${coordinateId}/coordinate_items`
  );

  return {
    data,
    error,
  };
};
