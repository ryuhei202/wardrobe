import { Divider } from "@mui/material";
import { FeedbacksContainer } from "../feedback/FeedbacksContainer";
import { HearingFormContainer } from "./HearingFormContainer";

export const MainContents = () => {
  return (
    <>
      <FeedbacksContainer />
      <Divider style={{ margin: 20 }} />
      <HearingFormContainer />
    </>
  );
};
