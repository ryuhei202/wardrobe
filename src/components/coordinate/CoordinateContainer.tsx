import { CircularProgress, Typography } from "@mui/material";
import { useCoordinatePatternsIndex } from "../../hooks/api/UseCoordinatePatternsIndex";
import { CoordinateListItem } from "./CoordinateListItem";

type TProps = {
  chartId: number;
};

export const CoordinateContainer = ({ chartId }: TProps) => {
  const { data, error } = useCoordinatePatternsIndex({
    coordinateId: 111111111, // TODO: 別タスクで実装するため、コンパイルエラーが出ないように一旦仮置きの数字を置いておく
  });
  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return (
    <>
      {data.selectedCoordinatePatterns.map((coordinate, index) => (
        <CoordinateListItem coordinatePattern={coordinate} index={index} />
      ))}
    </>
  );
};
