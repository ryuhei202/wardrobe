import { CircularProgress, Typography } from "@mui/material";
import { ChartIdContext } from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";
import { ChartMainContents } from "./ChartMainContents";

export const ChartMainContentsContainer = () => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { data, error } = useCoordinatesIndex({ chartId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <ChartMainContents coordinates={data.coordinates} />;
};
