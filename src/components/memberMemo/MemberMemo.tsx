import { Alert, Box, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";
import { useMemberMemoUpdate } from "../../hooks/api/UseMemberMemoUpdate";
import { MemberMemoShowResponse } from "../../model/api/response/styling/member_memo/MemberMemoShowResponse";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { MemberMemoForm } from "./MemberMemoForm";

type Props = {
  readonly response: MemberMemoShowResponse;
};

export const MemberMemo = ({ response }: Props) => {
  const [memo, setMemo] = useState(response.memo);
  const [memoNext, setMemoNext] = useState(response.memoNext);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useMemberMemoUpdate({
    memo,
    memoNext,
    memberId: useContext(MemberIdContext).state!,
  });

  const handlePost = () => {
    mutate(undefined, {
      onSuccess: () => {
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
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
        noValidate
        autoComplete="off"
      >
        <MemberMemoForm
          label="次回コーデに関して"
          value={memoNext}
          disabled={response.memoNext === memoNext || isLoading}
          onChange={setMemoNext}
          onPost={handlePost}
        />
        <MemberMemoForm
          label="その他メモ"
          value={memo}
          disabled={response.memo === memo || isLoading}
          onChange={setMemo}
          onPost={handlePost}
        />
      </Box>
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
