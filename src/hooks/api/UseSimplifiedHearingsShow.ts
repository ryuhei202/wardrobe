import { SimplifiedHearingsShowResponse } from "../../model/api/response/styling/simplifiedHearing/SimplifiedHearingsShowResponse";
import { useGetRequest } from "./UseGetRequest";

type TSimplifiedHearingsShowArg = {
  coordinateId: number;
};

export const useSimplifiedHearingsShow = ({
  coordinateId,
}: TSimplifiedHearingsShowArg) => {
  const { data, error, refetch } =
    useGetRequest<SimplifiedHearingsShowResponse>(
      `styling/coordinates/${coordinateId}/simplified_hearing`,
    );

  return { data, error, refetch };
};
