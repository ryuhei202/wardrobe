import { CoordinateFormalRanksShowResponse } from "../../model/api/response/styling/coordinateFormalRank/CoordinateFormalRanksShowResponse";
import { useGetRequest } from "./UseGetRequest";

type useCoordinateFormalRanksShowArg = {
  coordinateId: number;
};

export const useCoordinateFormalRanksShow = ({
  coordinateId,
}: useCoordinateFormalRanksShowArg) => {
  const { data, error, refetch } =
    useGetRequest<CoordinateFormalRanksShowResponse>(
      `coordinates/${coordinateId}/coordinate_formal_rank`
    );

  return {
    data,
    error,
    refetch,
  };
};
