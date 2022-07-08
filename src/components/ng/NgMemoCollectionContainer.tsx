import { CircularProgress, Typography } from "@mui/material";
import { useNgsIndex } from "../../hooks/api/UseNgsIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { NgMemoCollection } from "./NgMemoCollection";

export const NgMemosContainer = () => {
  const { data, error } = useNgsIndex({
    memberId: useContextDefinedState(MemberIdContext),
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <NgMemoCollection response={data} />;
};
