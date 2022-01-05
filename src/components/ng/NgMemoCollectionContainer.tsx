import { CircularProgress, Typography } from "@mui/material";
import { useNgsIndex } from "../../hooks/api/UseNgsIndex";
import { NgMemoCollection } from "./NgMemoCollection";

export const NgMemosContainer = () => {
  const { data, error } = useNgsIndex();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <NgMemoCollection response={data} />;
};
