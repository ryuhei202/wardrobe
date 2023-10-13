import { CircularProgress, Typography } from "@mui/material";
import { useCoordinateHearingStatusShow } from "../../hooks/api/UseCoordinateHearingStatusShow";
import { CoordinateHearingStatus } from "./CoordinateHearingStatus";

type TProps = {
  coordinateId: number;
};

export const CoordinateHearingStatusContainer = ({ coordinateId }: TProps) => {
  const { data, error } = useCoordinateHearingStatusShow({ coordinateId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  if (!("currentStatus" in data && "nextStatuses" in data)) return <></>;

  return (
    <CoordinateHearingStatus
      coordinateId={coordinateId}
      currentStatus={data.currentStatus}
      prevStatus={data.prevStatus}
      nextStatuses={data.nextStatuses}
    />
  );
};
