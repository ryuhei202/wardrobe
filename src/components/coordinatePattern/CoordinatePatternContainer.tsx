import { CircularProgress, Typography } from "@mui/material";
import { useCoordinatePatternsIndex } from "../../hooks/api/UseCoordinatePatternsIndex";
import { Coordinate } from "../../model/api/response/styling/coordinate/Coordinate";
import { CoordinateListItem } from "../coordinate/CoordinateListItem";

type TProps = {
  readonly coordinate: Coordinate;
};
export const CoordinatePatternContainer = ({ coordinate }: TProps) => {
  const { data, error } = useCoordinatePatternsIndex({
    coordinateId: coordinate.id,
  });
  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return (
    <>
      {data.selectedCoordinatePatterns.map((coordinate, index) => (
        <CoordinateListItem coordinate={coordinate} index={index} />
      ))}
    </>
  );
};
