import { THearingStatus } from "../../model/api/response/styling/coordinateHearingStatus/NextStatuses";
import { useGetRequest } from "./UseGetRequest";

export type TCoordinateHearingStatusShowResponse = {
  readonly currentStatus: string;
  readonly nextStatuses: THearingStatus[];
  readonly prevStatus: THearingStatus | null;
};

type TArgs = {
  coordinateId: number;
};

export const useCoordinateHearingStatusShow = ({ coordinateId }: TArgs) => {
  const { data, error } = useGetRequest<TCoordinateHearingStatusShowResponse | object>(
    `styling/coordinates/${coordinateId}/coordinate_hearing_status`,
  );

  return { data, error };
};
