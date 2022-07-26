import {
  CircularProgress,
  ListItem,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useMemberMemoShow } from "../../hooks/api/UseMemberMemoShow";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { MemberMemo } from "./MemberMemo";

type Props = {
  readonly isEditable: boolean;
};

export const MemberMemoFetcher = ({ isEditable }: Props) => {
  const { data, error } = useMemberMemoShow({
    memberId: useContextDefinedState(MemberIdContext),
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  if (isEditable) return <MemberMemo response={data} />;

  return (
    <>
      <ListSubheader>パートナーメモ</ListSubheader>
      <ListItem style={{ display: "block" }}>
        <Paper variant="outlined">
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {data.memo}
          </Typography>
        </Paper>
      </ListItem>
      <ListSubheader>次回コーデに関して</ListSubheader>
      <ListItem style={{ display: "block" }}>
        <Paper variant="outlined">
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            {data.memoNext}
          </Typography>
        </Paper>
      </ListItem>
    </>
  );
};
