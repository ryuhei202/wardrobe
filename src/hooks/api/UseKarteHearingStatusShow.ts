import { ChartHearingStatusShowResponse } from "../../model/api/response/styling/chartHearingStatus/ChartHearingStatusShowResponse";
import { useGetRequest } from "./UseGetRequest";

type KarteHearingStatusShow = {
  readonly data?: ChartHearingStatusShowResponse;
  readonly error: Error | null;
};

type TProps = {
  chartId: number;
};

export const useKarteHearingStatusShow = ({
  chartId,
}: TProps): KarteHearingStatusShow => {
  const { data, error } = useGetRequest<ChartHearingStatusShowResponse>(
    `styling/kartes/${chartId}/chart_hearing_status`,
  );

  return { data, error };
};
