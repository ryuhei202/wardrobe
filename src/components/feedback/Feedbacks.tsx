import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { FeedbackForm } from "./FeedbackForm";
import { useFeedbacksHandler } from "./handler/UseFeedbacksHandler";

type Props = {
  readonly response: ItemFeedbackShowResponse[];
};
export const Feedbacks = (props: Props) => {
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string | undefined>(
    undefined
  );
  const { feedbackFormCallback } = useFeedbacksHandler(
    setSeverity,
    setIsSnackBarOpen,
    setSnackBarText
  );

  return (
    <>
      <Typography variant="body1" fontWeight="bold" m={2}>
        フィードバック
      </Typography>
      <Typography variant="body2" m={3}>
        ※Alt(Option) + Enterで保存
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {props.response.map((itemFeedback) => (
          <FeedbackForm
            key={itemFeedback.chartItemId}
            data={itemFeedback}
            callback={feedbackFormCallback()}
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
