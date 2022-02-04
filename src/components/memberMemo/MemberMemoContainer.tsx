import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useMemberMemoShow } from "../../hooks/api/UseMemberMemoShow";
import { MemberMemo } from "./MemberMemo";

export const MemberMemoContainer = () => {
  const { data, error } = useMemberMemoShow();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return <MemberMemo response={data} />;
};
