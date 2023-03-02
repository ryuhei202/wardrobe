import { CircularProgress, Typography } from "@mui/material";
import { ChartIdContext } from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { ChartMainContents } from "./ChartMainContents";

export const ChartMainContentsContainer = () => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { data: chartsShowData, error: chartsShowError } = useKartesShow({
    chartId,
  });
  const { data: coordinatesIndexData, error: coordinatesIndexError } =
    useCoordinatesIndex({ chartId });

  if (coordinatesIndexError)
    return <Typography>{coordinatesIndexError.message}</Typography>;
  if (chartsShowError)
    return <Typography>{chartsShowError.message}</Typography>;

  if (!coordinatesIndexData || !chartsShowData) return <CircularProgress />;

  return (
    <ChartMainContents
      coordinates={coordinatesIndexData.coordinates}
      hearingCompleted={chartsShowData.hearingCompleted}
      plan={chartsShowData.plan}
      isLeeapPlan={chartsShowData.isLeeapPlan}
    />
  );
};
