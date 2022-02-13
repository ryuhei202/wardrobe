import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { KarteSection } from "./KarteSection";

export const KarteSectionContainer = () => {
  const { data, error } = useKartesIndex({
    memberId: useContext(MemberIdContext).state!,
  });

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <KarteSection response={data} />;
};
