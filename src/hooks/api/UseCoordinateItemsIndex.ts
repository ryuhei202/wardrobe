import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { useGetRequest } from "./UseGetRequest";

type CoordinateItemsIndex = {
  readonly data?: TCoordinateItem[];
  readonly error: Error | null;
};

type TCoordinateItemsIndexArg = {
  coordinateId: number;
  isChangeItem?: boolean;
  queryKey?: string;
};

export const useCoordinateItemsIndex = ({
  coordinateId,
  isChangeItem,
  queryKey,
}: TCoordinateItemsIndexArg): CoordinateItemsIndex => {
  const { data, error } = useGetRequest<TCoordinateItem[]>(
    `coordinates/${coordinateId}/coordinate_items`,
    {
      isChangeItem,
    },
    queryKey
  );

  return {
    data,
    error,
  };
};
