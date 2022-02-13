import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useNgsIndex } from "../../hooks/api/UseNgsIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { NgMemoCollection } from "./NgMemoCollection";

export const NgMemosContainer = () => {
  const { data, error } = useNgsIndex({
    memberId: useContext(MemberIdContext).state!,
  });

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <NgMemoCollection response={data} />;
};
