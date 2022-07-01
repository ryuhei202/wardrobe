import { CircularProgress, Typography } from "@mui/material";
import { useCoordinatePatternsIndex } from "../../hooks/api/UseCoordinatePatternsIndex";
import { CoordinateListItem } from "../coordinate/CoordinateListItem";

type TProps = {
  readonly coordinateId: number;
};
export const CoordinatePatternContainer = ({ coordinateId }: TProps) => {
  const { data, error } = useCoordinatePatternsIndex({ coordinateId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return (
    <>
      {data.selectedCoordinatePatterns.map((coordinatePattern, index) => (
        <CoordinateListItem
          coordinatePattern={coordinatePattern}
          index={index}
        />
      ))}
    </>
  );
};
