import { NextStatuses } from "./NextStatuses";

export type ChartHearingStatusShowResponse = {
  readonly currentStatus: string;
  readonly nextStatuses: NextStatuses;
};
