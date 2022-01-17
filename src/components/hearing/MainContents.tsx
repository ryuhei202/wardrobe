import { Divider } from "@mui/material";
import { FeedbacksContainer } from "../feedback/FeedbacksContainer";
import { HearingFormContainer } from "./HearingFormContainer";

export const MainContents = () => {
  return (
    <>
      <HearingFormContainer />
      <Divider style={{ margin: 20 }} />
      <FeedbacksContainer />
    </>
  );
};
