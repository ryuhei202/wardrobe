import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useMemberMemoShow } from "../../hooks/api/UseMemberMemoShow";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { OldMemberMemo } from "./OldMemberMemo";

export const MemberMemoContainer = () => {
  const { data, error } = useMemberMemoShow({
    memberId: useContextDefinedState(MemberIdContext),
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <OldMemberMemo response={data} />;
};
