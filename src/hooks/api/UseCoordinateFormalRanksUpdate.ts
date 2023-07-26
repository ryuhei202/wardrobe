import { usePatchRequest } from "./UsePatchRequest";

type TCoordinateFormalRanksUpdateParams = {
  formalRank: number;
};

type TCoordinateFormalRanksUpdateArg = {
  coordinateId: number;
} & TCoordinateFormalRanksUpdateParams;

export const useCoordinateFormalRanksUpdate = ({
  coordinateId,
  formalRank,
}: TCoordinateFormalRanksUpdateArg) => {
  const { mutate, isLoading } = usePatchRequest<
    TCoordinateFormalRanksUpdateParams,
    Error
  >(`styling/coordinates/${coordinateId}/coordinate_formal_rank`, {
    formalRank,
  });

  return { mutate, isLoading };
};
