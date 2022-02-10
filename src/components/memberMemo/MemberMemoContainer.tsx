import { CircularProgress, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useMemberMemoShow } from "../../hooks/api/UseMemberMemoShow";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { MemberMemo } from "./MemberMemo";

export const MemberMemoContainer = () => {
  const { data, error } = useMemberMemoShow({
    memberId: useContext(MemberIdContext).state!,
  });

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <MemberMemo response={data} />;
};
