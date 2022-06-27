import { usePatchRequest } from "./UsePatchRequest";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

type CoordinateMemosUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TCoordinateMemosUpdateParams | undefined
  >;
  readonly isLoading: boolean;
};

type TCoordinateMemosUpdateParams = {
  memo: string;
};

type TCoordinateMemosUpdateArg = {
  coordinateId: number;
} & TCoordinateMemosUpdateParams;

export const useCoordinateMemosUpdate = ({
  coordinateId,
  memo,
}: TCoordinateMemosUpdateArg): CoordinateMemosUpdate => {
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateMemosUpdateParams,
    Error
  >(`coordinates/${coordinateId}/coordinate_memos`, { memo });

  return { mutate, isLoading };
};
