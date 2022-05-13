import { CircularProgress, Typography } from "@mui/material";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";
import { CoordinateListItem } from "./CoordinateListItem";

type TProps = {
  chartId: number;
};

export const CoordinateContainer = ({ chartId }: TProps) => {
  const { data, error } = useCoordinatesIndex({
    chartId,
  });
  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return (
    <>
      {data.selectedCoordinates.map((coordinate, index) => (
        <CoordinateListItem coordinate={coordinate} index={index} />
      ))}
    </>
  );
};
