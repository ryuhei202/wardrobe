import { CircularProgress, Typography } from "@mui/material";
import { useKarteHearingStatusShow } from "../../hooks/api/UseKarteHearingStatusShow";
import { ChartHearingStatus } from "./ChartHearingStatus";

type TProps = {
  chartId: number;
};

export const ChartHearingStatusContainer = ({ chartId }: TProps) => {
  const { data, error } = useKarteHearingStatusShow({ chartId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  return (
    <ChartHearingStatus
      chartId={chartId}
      currentStatus={data.currentStatus}
      nextStatuses={data.nextStatuses}
    />
  );
};
