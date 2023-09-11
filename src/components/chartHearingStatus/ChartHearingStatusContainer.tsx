import { CircularProgress, Typography } from "@mui/material";
import { useChartHearingStatusShow } from "../../hooks/api/UseChartHearingStatusShow";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { ChartIdContext } from "../context/provider/ContextProvider";
import { ChartHearingStatus } from "./ChartHearingStatus";

export const ChartHearingStatusContainer = () => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { data, error } = useChartHearingStatusShow({ chartId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data || !chartId) return <CircularProgress />;

  return (
    <ChartHearingStatus
      chartId={chartId}
      currentStatus={data.currentStatus}
      nextStatuses={data.nextStatuses}
    />
  );
};
