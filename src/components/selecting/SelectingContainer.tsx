import { CircularProgress, Typography } from "@mui/material";
import { useKarteShow } from "../../hooks/api/UseKarteShow";
import { Selecting } from "./Selecting";

export const SelectingContainer = () => {
  const { data, error } = useKarteShow();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <Selecting response={data} />;
};
