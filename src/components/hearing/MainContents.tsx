import { Divider } from "@mui/material";
import { FeedbacksContainer } from "../feedback/FeedbacksContainer";
import { HearingLayoutContainer } from "./HearingLayoutContainer";

export const MainContents = () => {
  return (
    <>
      <FeedbacksContainer />
      <Divider style={{ margin: 20 }} />
      <HearingLayoutContainer />
    </>
  );
};
