import { CircularProgress, Typography } from "@mui/material";
import { useKartesShow } from "../../hooks/api/UseKartesShow";
import { Selecting } from "./Selecting";

export const SelectingContainer = () => {
  const { data, error } = useKartesShow();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <Selecting response={data} />;
};
