import { useGetRequest } from "./UseGetRequest";
import { CoordinateHearingsShowResponse } from "../../model/api/response/styling/coordinateHearing/CoordinateHearingsShowResponse";

type CoordinateHearingsShow = {
  readonly data?: CoordinateHearingsShowResponse[];
  readonly error: Error | null;
};

type TCoordinateHearingsShowArg = {
  coordinateId: number;
};

export const useCoordinateHearingsShow = ({
  coordinateId,
}: TCoordinateHearingsShowArg): CoordinateHearingsShow => {
  const { data, error } = useGetRequest<CoordinateHearingsShowResponse[]>(
    `coordinates/${coordinateId}/coordinate_hearings`
  );

  return {
    data,
    error,
  };
};
