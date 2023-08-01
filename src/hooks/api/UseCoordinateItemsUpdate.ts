import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePatchRequest } from "./UsePatchRequest";

type TCoordinateitemsUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TCoordinateItemsUpdateParams | undefined
  >;
  readonly isLoading: boolean;
};

type TCoordinateItemsUpdateParams = {
  readonly isChangeItem: boolean;
};

type TCoordinateItemsUpdateArg = {
  readonly coordinateItemId: number;
};

export const useCoordinateItemsUpdate = ({
  coordinateItemId,
}: TCoordinateItemsUpdateArg): TCoordinateitemsUpdate => {
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateItemsUpdateParams,
    Error
  >(`styling/coordinate_items/${coordinateItemId}`);

  return { mutate, isLoading };
};
