import { CircularProgress, Typography } from "@mui/material";
import {
  ChartIdContext,
  MemberIdContext,
} from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";
import { useMemberMemoShow } from "../../hooks/api/UseMemberMemoShow";
import { ChartMainContents } from "./ChartMainContents";

export const ChartMainContentsContainer = () => {
  const chartId = useContextDefinedState(ChartIdContext);
  const { data: coordinatesIndexData, error: coordinatesIndexError } =
    useCoordinatesIndex({ chartId });
  const { data: memberMemoShowData, error: memberMemoShowError } =
    useMemberMemoShow({
      memberId: useContextDefinedState(MemberIdContext),
    });

  if (coordinatesIndexError)
    return <Typography>{coordinatesIndexError.message}</Typography>;
  if (memberMemoShowError)
    return <Typography>{memberMemoShowError.message}</Typography>;
  if (!coordinatesIndexData || !memberMemoShowData) return <CircularProgress />;
  return (
    <ChartMainContents
      coordinates={coordinatesIndexData.coordinates}
      nextCoordeHearing={memberMemoShowData.nextCoordeHearing}
    />
  );
};
