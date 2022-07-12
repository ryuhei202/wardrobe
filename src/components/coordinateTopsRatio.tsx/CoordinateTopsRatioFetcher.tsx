import { CircularProgress, Typography } from "@mui/material";
import { useCoordinateTopsRatiosShow } from "../../hooks/api/UseCoordinateTopsRatiosShow";
import { CoordinateTopsRatio } from "./CoordinateTopsRatio";

type TProps = {
  readonly coordinateId: number;
};

export const CoordinateTopsRatioFetcher = ({ coordinateId }: TProps) => {
  const { data, error, refetch } = useCoordinateTopsRatiosShow({
    coordinateId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return (
    <CoordinateTopsRatio
      coordinateId={coordinateId}
      response={data}
      key={String(data.longSleeveNum) + String(data.shortSleeveNum)}
      onUpdateComplete={refetch}
    />
  );
};
