import { CircularProgress, Typography } from "@mui/material";
import { useCoordinateTopsRatiosShow } from "../../hooks/api/UseCoordinateTopsRatiosShow";
import { CoordinateTopsRatio } from "./CoordinateTopsRatio";

type TProps = {
  readonly coordinateId: number;
  readonly isEditable: boolean;
};

export const CoordinateTopsRatioFetcher = ({
  coordinateId,
  isEditable,
}: TProps) => {
  const { data, error, refetch } = useCoordinateTopsRatiosShow({
    coordinateId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  if (isEditable)
    return (
      <CoordinateTopsRatio
        coordinateId={coordinateId}
        response={data}
        key={String(data.longSleeveNum) + String(data.shortSleeveNum)}
        onUpdateComplete={refetch}
      />
    );

  return (
    <div style={{ display: "block" }}>
      <Typography variant="body2">半袖: {data.shortSleeveNum}</Typography>
      <Typography variant="body2">長袖: {data.longSleeveNum}</Typography>
    </div>
  );
};
