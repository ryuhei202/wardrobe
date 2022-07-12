import { usePatchRequest } from "./UsePatchRequest";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

type CoordinateFootwearsUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TCoordinateFootwearsUpdateParams | undefined
  >;
  readonly isLoading: boolean;
};

type TCoordinateFootwearsUpdateParams = {
  footwearId: number;
};

type TCoordinateFootwearsUpdateArg = {
  coordinateId: number;
};

export const useCoordinateFootwearsUpdate = ({
  coordinateId,
}: TCoordinateFootwearsUpdateArg): CoordinateFootwearsUpdate => {
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateFootwearsUpdateParams,
    Error
  >(`coordinates/${coordinateId}/coordinate_footwear`);

  return { mutate, isLoading };
};
