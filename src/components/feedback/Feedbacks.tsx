import { Box, Typography } from "@mui/material";
import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { FeedbackForm } from "./FeedbackForm";

type Props = {
  readonly response: ItemFeedbackShowResponse[];
};
export const Feedbacks = (props: Props) => {
  return (
    <>
      <Typography variant="body1" fontWeight="bold" m={2}>
        フィードバック
      </Typography>
      <Typography variant="body2" m={3}>
        ※Alt(Option) + Enter または Ctrl(Command) + Enterで保存
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {props.response.map((itemFeedback) => (
          <FeedbackForm key={itemFeedback.chartItemId} data={itemFeedback} />
        ))}
      </Box>
    </>
  );
};
