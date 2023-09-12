import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useChartHearingStatusShow } from "../../hooks/api/UseChartHearingStatusShow";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { ChartIdContext } from "../context/provider/ContextProvider";
import { ChartHearingStatus } from "./ChartHearingStatus";

type TProps = {
  onUnsetStatusFetched: () => void; // TODO: delete (ステータス運用方法の移行時にのみ必要)
};

export const ChartHearingStatusContainer = ({
  onUnsetStatusFetched,
}: TProps) => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { data, error } = useChartHearingStatusShow({ chartId });
  useEffect(() => {
    if (data && !Object.hasOwn(data, "currentStatus")) onUnsetStatusFetched();
  }, [data, onUnsetStatusFetched]);

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
