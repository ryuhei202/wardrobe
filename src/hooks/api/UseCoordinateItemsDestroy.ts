import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { useDeleteRequest } from "./UseDeleteRequest";

type TCoordinateitemsDestroy = {
  readonly mutate: UseMutateFunction<
    AxiosResponse,
    unknown,
    number | string,
    unknown
  >;
};

export const useCoordinateItemsDestroy = (): TCoordinateitemsDestroy => {
  const { mutate } = useDeleteRequest(`coordinate_items`);

  return { mutate };
};
