import { CircularProgress, Typography } from "@mui/material";
import { useItemFeedbacksShow } from "../../hooks/api/UseItemFeedbacksShow";
import { useLatestKartesShow } from "../../hooks/api/UseLatestKartesShow";
import { Feedbacks } from "./Feedbacks";

export const FeedbacksContainer = () => {
  const {
    data: latestKartes,
    error: latestKartesError,
  } = useLatestKartesShow();

  const { data: feedbacks, error: feedbacksError } = useItemFeedbacksShow(
    latestKartes?.chartId
  );
  if (latestKartes?.chartId === null)
    return <Typography>カルテが存在しません。</Typography>;
  if (!feedbacks) return <CircularProgress />;
  if (latestKartesError)
    return <Typography>{latestKartesError.message}</Typography>;
  if (feedbacksError) return <Typography>{feedbacksError.message}</Typography>;

  return <Feedbacks response={feedbacks} />;
};
