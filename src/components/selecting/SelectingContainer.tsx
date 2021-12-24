import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useKarteShow } from "../../hooks/api/UseKarteShow";
import { Selecting } from "./Selecting";

export const SelectingContainer = () => {
  const { data, isLoading, error } = useKarteShow();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <Selecting response={data} />;
};
