import { CircularProgress, List, Typography } from "@mui/material";
import { useCoordinatePatternsIndex } from "../../hooks/api/UseCoordinatePatternsIndex";
import { CoordinateListItem } from "../coordinate/CoordinateListItem";
import { CoordinateFootwearFetcher } from "../coordinateFootwear/CoordinateFootwearFetcher";

type TProps = {
  readonly coordinateId: number;
};
export const CoordinatePatternContainer = ({ coordinateId }: TProps) => {
  const { data, error } = useCoordinatePatternsIndex({ coordinateId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return (
    <List dense>
      {data.selectedCoordinatePatterns.map((coordinatePattern, index) => (
        <CoordinateListItem
          coordinatePattern={coordinatePattern}
          index={index}
          key={index}
        />
      ))}
      <CoordinateFootwearFetcher coordinateId={coordinateId} />
    </List>
  );
};
