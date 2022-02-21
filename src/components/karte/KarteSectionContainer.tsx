import { CircularProgress, Typography } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { KarteSection } from "./KarteSection";

export const KarteSectionContainer = () => {
  const { data, error } = useKartesIndex({
    memberId: useContextDefinedState(MemberIdContext),
  });

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <KarteSection response={data} />;
};
