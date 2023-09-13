import { ChartHearingStatusShowResponse } from "../../model/api/response/styling/chartHearingStatus/ChartHearingStatusShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type KarteHearingStatusShow = {
  readonly data?: ChartHearingStatusShowResponse;
  readonly error: Error | null;
};

type TProps = {
  chartId: number;
};

export const useChartHearingStatusShow = ({
  chartId,
}: TProps): KarteHearingStatusShow => {
  const { data, error } = useKarteGetRequest<ChartHearingStatusShowResponse>({
    path: `chart_hearing_status`,
    chartId,
  });

  return { data, error };
};
