import { CircularProgress, Typography } from "@mui/material";
import { useCoordinateHearingsShow } from "../../hooks/api/UseCoordinateHearingsShow";
import { CoordinateHearing } from "./CoordinateHearing";

type TProps = {
  readonly coordinateId: number;
};

export const CoordinateHearingFetcher = ({ coordinateId }: TProps) => {
  const { data, error } = useCoordinateHearingsShow({ coordinateId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <CoordinateHearing hearings={data} />;
};
