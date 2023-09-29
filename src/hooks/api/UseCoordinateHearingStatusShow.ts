import { NextStatuses } from "../../model/api/response/styling/coordinateHearingStatus/NextStatuses";
import { useGetRequest } from "./UseGetRequest";

type TCoordinateHearingStatusShowResponse = {
  readonly currentStatus: string;
  readonly nextStatuses: NextStatuses;
};

type TArgs = {
  coordinateId: number;
};

export const useCoordinateHearingStatusShow = ({ coordinateId }: TArgs) => {
  const { data, error } = useGetRequest<
    TCoordinateHearingStatusShowResponse | {}
  >(`styling/coordinates/${coordinateId}/coordinate_hearing_status`);

  return { data, error };
};
