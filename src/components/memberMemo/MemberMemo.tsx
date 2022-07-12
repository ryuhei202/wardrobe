import { Alert, ListItem, ListSubheader, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useMemberMemoUpdate } from "../../hooks/api/UseMemberMemoUpdate";
import { MemberMemoShowResponse } from "../../model/api/response/styling/member_memo/MemberMemoShowResponse";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { MemoForm } from "../shared/MemoForm";

type Props = {
  readonly response: MemberMemoShowResponse;
};

export const MemberMemo = ({ response }: Props) => {
  const [memo, setMemo] = useState(response.memo);
  const [memoNext, setMemoNext] = useState(response.memoNext);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMemberMemoUpdate(
    useContextDefinedState(MemberIdContext)
  );

  const handlePost = () => {
    mutate(
      { memo, memoNext },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(`member/member_memo`);
          setSeverity("success");
          setSnackBarText("ヒアリングの変更を保存しました");
        },
        onError: () => {
          setSeverity("error");
          setSnackBarText("ヒアリングの変更に失敗しました");
        },
        onSettled: () => {
          setIsSnackBarOpen(true);
        },
      }
    );
  };

  const isChangedMemos =
    memo !== response.memo || memoNext !== response.memoNext;

  useEffect(() => {
    alertClosedWindow(!isChangedMemos);
  }, [isChangedMemos]);

  return (
    <>
      <ListSubheader>パートナーメモ</ListSubheader>
      <ListItem style={{ display: "block" }}>
        <MemoForm
          value={memo}
          disabled={response.memo === memo || isLoading}
          onChange={setMemo}
          onPost={handlePost}
        />
      </ListItem>
      <ListSubheader>次回コーデに関して</ListSubheader>
      <ListItem style={{ display: "block" }}>
        <MemoForm
          value={memoNext}
          disabled={response.memoNext === memoNext || isLoading}
          onChange={setMemoNext}
          onPost={handlePost}
        />
      </ListItem>

      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
    </>
  );
};
