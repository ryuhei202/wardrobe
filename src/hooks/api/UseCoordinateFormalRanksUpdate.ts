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
  >(`coordinates/${coordinateId}/coordinate_formal_ranks`, {
    formalRank,
  });

  return { mutate, isLoading };
};
