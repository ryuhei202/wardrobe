import { useGetRequest } from "./UseGetRequest";
import { CoordinateDescriptionsShowResponse } from "./../../model/api/response/styling/coordinateDescription/CoordinateDescriptionsShowResponse";
import { SimplifiedHearingsShowResponse } from "../../model/api/response/styling/simplifiedHearing/SimplifiedHearingsShowResponse";

type TSimplifiedHearingsShowArg = {
  coordinateId: number;
};

export const useSimplifiedHearingsShow = ({
  coordinateId,
}: TSimplifiedHearingsShowArg) => {
  const { data, error, refetch } =
    useGetRequest<SimplifiedHearingsShowResponse>(
      `coordinates/${coordinateId}/simplified_hearing`
    );

  return { data, error, refetch };
};
