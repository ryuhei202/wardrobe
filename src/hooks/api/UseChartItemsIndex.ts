import { ChartItemIndexResponse } from "../../model/api/response/styling/chartItem/ChartItemIndexResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type TChartItemsIndex = {
  readonly data?: ChartItemIndexResponse;
  readonly error: Error | null;
};

type TChartItemsIndexArg = {
  chartId?: number;
  onError: () => Promise<unknown> | void;
};

export const useChartItemsIndex = ({
  chartId,
  onError,
}: TChartItemsIndexArg): TChartItemsIndex => {
  const { data, error } = useKarteGetRequest<ChartItemIndexResponse>({
    path: "chart_items",
    chartId,
    onError,
    isEnabled: chartId !== undefined,
  });

  return {
    data,
    error,
  };
};
