import { CircularProgress, List, Typography } from "@mui/material";
import { useCoordinateItemsIndex } from "../../hooks/api/UseCoordinateItemsIndex";
import { useCoordinatePatternsIndex } from "../../hooks/api/UseCoordinatePatternsIndex";
import { CoordinatePatternItemList } from "../coordinate/CoordinatePatternItemList";
import { CoordinateFootwearFetcher } from "../coordinateFootwear/CoordinateFootwearFetcher";
import { CoordinateChangeItemFetcher } from "../coordinateItem/CoordinateChangeItemFetcher";
import { CoordinateItem } from "../coordinateItem/CoordinateItem";

type TProps = {
  readonly coordinateId: number;
  readonly isLeeapPlan?: boolean;
};
export const CoordinatePatternContainer = ({
  coordinateId,
  isLeeapPlan,
}: TProps) => {
  const { data, error } = useCoordinatePatternsIndex({ coordinateId });
  const { data: coordinateItems } = useCoordinateItemsIndex({ coordinateId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return (
    <List dense>
      {!isLeeapPlan &&
        coordinateItems?.map((ItemInfo) => (
          <CoordinateItem item={ItemInfo.itemInfo} />
        ))}
      {data.selectedCoordinatePatterns.map((coordinatePattern, index) => (
        <CoordinatePatternItemList
          coordinatePattern={coordinatePattern}
          index={index}
          key={index}
        />
      ))}
      <CoordinateChangeItemFetcher coordinateId={coordinateId} />
      <CoordinateFootwearFetcher coordinateId={coordinateId} />
    </List>
  );
};
