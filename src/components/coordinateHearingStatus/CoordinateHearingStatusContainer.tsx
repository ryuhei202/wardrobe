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
  if (!Object.hasOwn(data, "currentStatus")) return <></>;

  return (
    <CoordinateHearingStatus
      coordinateId={coordinateId}
      currentStatus={data.currentStatus}
      nextStatuses={data.nextStatuses}
    />
  );
};
