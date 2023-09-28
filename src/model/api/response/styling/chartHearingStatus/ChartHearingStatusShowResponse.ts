import { NextStatuses } from "../coordinateHearingStatus/NextStatuses";

export type ChartHearingStatusShowResponse = {
  readonly currentStatus: string;
  readonly nextStatuses: NextStatuses;
};
