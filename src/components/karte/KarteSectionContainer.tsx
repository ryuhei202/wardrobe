import { CircularProgress, Typography } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { KarteSection } from "./KarteSection";

export const KarteSectionContainer = () => {
  const { data, error } = useKartesIndex();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <KarteSection response={data} />;
};
