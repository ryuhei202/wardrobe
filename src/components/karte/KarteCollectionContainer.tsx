import { CircularProgress, Typography } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { KarteCollection } from "./KarteCollection";

export const KarteCollectionContainer = () => {
  const KARTE_NUM = 2;
  const { data, error } = useKartesIndex({
    memberId: useContextDefinedState(MemberIdContext),
    limit: KARTE_NUM,
  });
  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <KarteCollection response={data} />;
};
