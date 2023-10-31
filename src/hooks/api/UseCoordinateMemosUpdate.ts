import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePatchRequest } from "./UsePatchRequest";

type CoordinateMemosUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<unknown, unknown>,
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
};

export const useCoordinateMemosUpdate = ({
  coordinateId,
}: TCoordinateMemosUpdateArg): CoordinateMemosUpdate => {
  const { mutate, isLoading } = usePatchRequest<TCoordinateMemosUpdateParams, Error>(
    `styling/coordinates/${coordinateId}/coordinate_memos`,
  );

  return { mutate, isLoading };
};
