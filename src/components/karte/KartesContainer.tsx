import { CircularProgress, Typography } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { KarteCollection } from "./KarteCollection";

export const KartesContainer = () => {
  const { data, error } = useKartesIndex();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <KarteCollection response={data} />;
};
