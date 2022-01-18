import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { FeedbackForm } from "./FeedbackForm";
import { useFeedbacksHandler } from "./handler/UseFeedbacksHandler";

type Props = {
  readonly response: ItemFeedbackShowResponse[];
};
export const Feedbacks = (props: Props) => {
  const handler = useFeedbacksHandler();
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
            callback={handler.feedbackFormCallback()}
          />
        ))}
        <Snackbar open={handler.isSnackBarOpen}>
          <Alert severity={handler.severity}>{handler.snackBarText}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};
