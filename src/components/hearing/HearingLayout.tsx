import { Alert, Box, Snackbar } from "@mui/material";
import { useState } from "react";
import { StylingReferenceText } from "../../model/hearing/StylingReferenceText";
import { useHearingLayoutHandler } from "./handler/UseHearingLayoutHandler";
import { HearingForm } from "./HearingForm";

type Props = {
  readonly response: StylingReferenceText[];
};
export const HearingLayout = ({ response }: Props) => {
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string | undefined>(
    undefined
  );
  //現在ヒアリングしているカテゴリ
  const ACTIVE_CATEGORIES = [
    { id: 1, title: "意識する相手(補足)" },
    { id: 7, title: "コーデイメージ" },
  ];
  const { hearingFormCallback } = useHearingLayoutHandler(
    setSeverity,
    setIsSnackBarOpen,
    setSnackBarText
  );

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
        {ACTIVE_CATEGORIES.map((category) => (
          <HearingForm
            key={category.id}
            category={category}
            callback={hearingFormCallback()}
            initialText={
              response.find((r) => category.id === r.categoryId)?.text ?? ""
            }
          />
        ))}
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={5000}
          onClose={() => setIsSnackBarOpen(false)}
        >
          <Alert severity={severity}>{snackBarText}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};
