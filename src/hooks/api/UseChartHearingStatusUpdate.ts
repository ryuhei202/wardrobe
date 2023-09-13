import { usePatchRequest } from "./UsePatchRequest";

type ChartHearingStatusUpdateParams = {
  status: number;
};

export const useChartHearingStatusUpdate = (chartId: number) => {
  const { mutate, isLoading } = usePatchRequest<
    ChartHearingStatusUpdateParams,
    Error
  >(`styling/kartes/${chartId}/chart_hearing_status`);

  return { mutate, isLoading };
};
