import { ChartItemIndexResponse } from "../../model/api/response/styling/chartItem/ChartItemIndexResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type TChartItemsIndex = {
  readonly data?: ChartItemIndexResponse;
  readonly error: Error | null;
};

type TChartItemsIndexArg = {
  chartId?: number;
};

export const useChartItemsIndex = ({
  chartId,
}: TChartItemsIndexArg): TChartItemsIndex => {
  const { data, error } = useKarteGetRequest<ChartItemIndexResponse>({
    path: "chart_items",
    chartId,
    isEnabled: chartId !== undefined,
  });

  return {
    data,
    error,
  };
};
