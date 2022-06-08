import {
  Alert,
  Box,
  FormControlLabel,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMemberMemoUpdate({
    memo,
    memoNext,
    nextCoordeHearing,
    memberId: useContextDefinedState(MemberIdContext),
  });

  const handlePost = useCallback(() => {
    mutate(undefined, {
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
    });
  }, [queryClient, mutate]);

  useEffect(() => {
    if (response.nextCoordeHearing !== nextCoordeHearing) handlePost();
  }, [nextCoordeHearing, response.nextCoordeHearing, handlePost]);

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
            次回コーデに関して
          </Typography>
          <Box>
            <Typography variant="caption">
              自動ヒアリング: {response.lineSurveyNext || "未回答"}
            </Typography>
          </Box>
          <MemberMemoForm
            value={memoNext}
            disabled={response.memoNext === memoNext || isLoading}
            onChange={setMemoNext}
            onPost={handlePost}
          />
          <FormControlLabel
            value="end"
            style={{ marginLeft: 0 }}
            control={
              <Switch
                checked={!!nextCoordeHearing}
                onChange={() => {
                  setNextCoordeHearing(
                    !!nextCoordeHearing
                      ? NEXT_COORDE_HEARING.HEARING
                      : NEXT_COORDE_HEARING.HEARING_END
                  );
                }}
                size="small"
              />
            }
            label={
              <Typography variant="subtitle2" fontWeight="bold">
                {nextCoordeHearing
                  ? "次回ヒアリング完了済み"
                  : "次回ヒアリング未完了"}
              </Typography>
            }
            labelPlacement="end"
          />
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
            その他メモ
          </Typography>
          <MemberMemoForm
            value={memo}
            disabled={response.memo === memo || isLoading}
            onChange={setMemo}
            onPost={handlePost}
          />
        </div>
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
