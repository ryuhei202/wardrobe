import { CircularProgress, Typography } from "@mui/material";
import { useKarteHearingStatusShow } from "../../hooks/api/UseKarteHearingStatusShow";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { ChartIdContext } from "../context/provider/ContextProvider";
import { ChartHearingStatus } from "./ChartHearingStatus";

export const ChartHearingStatusContainer = () => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { data, error } = useKarteHearingStatusShow({ chartId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  return (
    <ChartHearingStatus
      currentStatus={data.currentStatus}
      nextStatuses={data.nextStatuses}
    />
  );
};
