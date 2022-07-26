import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCoordinateMemosShow } from "../../hooks/api/UseCoordinateMemosShow";
import { CoordinateMemo } from "./CoordinateMemo";

type TProps = {
  readonly coordinateId: number;
  readonly isEditable: boolean;
};

export const CoordinateMemoFetcher = ({ coordinateId, isEditable }: TProps) => {
  const { data, error, refetch } = useCoordinateMemosShow({ coordinateId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  if (isEditable)
    return (
      <CoordinateMemo
        coordinateId={coordinateId}
        response={data}
        onUpdateComplete={refetch}
      />
    );

  return (
    <Paper variant="outlined">
      <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
        {data.memo}
      </Typography>
    </Paper>
  );
};
