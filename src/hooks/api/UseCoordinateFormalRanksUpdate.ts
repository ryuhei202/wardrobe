import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePatchRequest } from "./UsePatchRequest";

type CoordinateFormalRanksUpdate = {
  readonly mutate: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    TCoordinateFormalRanksUpdateParams | undefined
  >;
  readonly isLoading: boolean;
};

type TCoordinateFormalRanksUpdateParams = {
  formalRank: number;
};

type TCoordinateFormalRanksUpdateArg = {
  coordinateId: number;
} & TCoordinateFormalRanksUpdateParams;

export const useCoordinateTopsRatiosUpdate = ({
  coordinateId,
  formalRank,
}: TCoordinateFormalRanksUpdateArg): CoordinateFormalRanksUpdate => {
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateFormalRanksUpdateParams,
    Error
  >(`coordinates/${coordinateId}/coordinate_tops_ratios`, {
    formalRank,
  });

  return { mutate, isLoading };
};
