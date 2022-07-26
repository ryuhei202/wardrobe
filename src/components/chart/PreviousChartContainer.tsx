import { CircularProgress, Typography } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { ChartList } from "./ChartList";

export const PreviousChartContainer = () => {
  const KARTE_NUM = 1;
  const { data, error } = useKartesIndex({
    memberId: useContextDefinedState(MemberIdContext),
    limit: KARTE_NUM,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <ChartList response={data} />;
};
