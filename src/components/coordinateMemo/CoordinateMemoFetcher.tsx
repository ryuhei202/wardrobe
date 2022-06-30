import { CircularProgress, Typography } from "@mui/material";
import { useCoordinateMemosShow } from "../../hooks/api/UseCoordinateMemosShow";
import { CoordinateMemo } from "./CoordinateMemo";

type TProps = {
  readonly coordinateId: number;
};

export const CoordinateMemoFetcher = ({ coordinateId }: TProps) => {
  const { data, error, refetch } = useCoordinateMemosShow({ coordinateId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return (
    <CoordinateMemo
      coordinateId={coordinateId}
      response={data}
      onUpdateComplete={refetch}
    />
  );
};
