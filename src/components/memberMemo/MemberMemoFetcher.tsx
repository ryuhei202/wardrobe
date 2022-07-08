import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useMemberMemoShow } from "../../hooks/api/UseMemberMemoShow";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { MemberMemo } from "./MemberMemo";

export const MemberMemoFetcher = () => {
  const { data, error } = useMemberMemoShow({
    memberId: useContextDefinedState(MemberIdContext),
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <MemberMemo response={data} />;
};
