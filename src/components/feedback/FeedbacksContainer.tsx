import { CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useItemFeedbacksShow } from "../../hooks/api/UseItemFeedbacksShow";
import { useLatestKartesShow } from "../../hooks/api/UseLatestKartesShow";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { Feedbacks } from "./Feedbacks";

export const FeedbacksContainer = () => {
  const memberId = useContext(MemberIdContext).state;
  const { data: latestKartes, error: latestKartesError } = useLatestKartesShow({
    memberId: memberId!,
  });
  const { data: feedbacks, error: feedbacksError } = useItemFeedbacksShow({
    chartId: latestKartes?.chartId,
  });

  if (latestKartes?.chartId === null)
    return <Typography>カルテが存在しません。</Typography>;
  if (!feedbacks) return <CircularProgress />;
  if (latestKartesError)
    return <Typography>{latestKartesError.message}</Typography>;
  if (feedbacksError) return <Typography>{feedbacksError.message}</Typography>;

  return <Feedbacks response={feedbacks} />;
};
