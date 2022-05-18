import {
  Alert,
  Box,
  FormControlLabel,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useMemberMemoUpdate } from "../../hooks/api/UseMemberMemoUpdate";
import { MemberMemoShowResponse } from "../../model/api/response/styling/member_memo/MemberMemoShowResponse";
import {
  NEXT_COORDE_HEARING,
  TNextCoordeHearing,
} from "../../model/api/response/styling/member_memo/NextCoordeHearing";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { MemberMemoForm } from "./MemberMemoForm";

type Props = {
  readonly response: MemberMemoShowResponse;
};

export const MemberMemo = ({ response }: Props) => {
  const [memo, setMemo] = useState(response.memo);
  const [memoNext, setMemoNext] = useState(response.memoNext);
  const [nextCoordeHearing, setNextCoordeHearing] =
    useState<TNextCoordeHearing>(response.nextCoordeHearing);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useMemberMemoUpdate({
    memo,
    memoNext,
    nextCoordeHearing: nextCoordeHearing
      ? NEXT_COORDE_HEARING.HEARING
      : NEXT_COORDE_HEARING.HEARING_END,
    memberId: useContextDefinedState(MemberIdContext),
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
        <div>
          <Box sx={{ m: 1, position: "relative" }}>
            自動ヒアリング:{" "}
            <Typography>{response.lineSurveyNext ?? "未回答"}</Typography>
          </Box>
          <MemberMemoForm
            label="次回コーデに関して"
            value={memoNext}
            disabled={response.memoNext === memoNext || isLoading}
            onChange={setMemoNext}
            onPost={handlePost}
          />
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={!!nextCoordeHearing}
                onChange={() => {
                  setNextCoordeHearing(
                    nextCoordeHearing
                      ? NEXT_COORDE_HEARING.HEARING
                      : NEXT_COORDE_HEARING.HEARING_END
                  );
                  handlePost();
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={
              nextCoordeHearing
                ? "次回ヒアリング完了済み"
                : "次回ヒアリング未完了"
            }
            labelPlacement="end"
          />
        </div>
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
