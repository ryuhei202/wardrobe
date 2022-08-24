import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { useGetRequest } from "./UseGetRequest";

type CoordinateItemsIndex = {
  readonly data?: TCoordinateItem[];
  readonly error: Error | null;
};

type TCoordinateItemsIndexArg = {
  coordinateId: number;
  isChangeItem?: boolean;
};

export const useCoordinateItemsIndex = ({
  coordinateId,
  isChangeItem,
}: TCoordinateItemsIndexArg): CoordinateItemsIndex => {
  const { data, error } = useGetRequest<TCoordinateItem[]>(
    `coordinates/${coordinateId}/coordinate_items`,
    {
      isChangeItem,
    }
  );

  return {
    data,
    error,
  };
};
