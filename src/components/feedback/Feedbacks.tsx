import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { FeedbackForm } from "./FeedbackForm";

type Props = {
  readonly response: ItemFeedbackShowResponse[];
};
export const Feedbacks = (props: Props) => {
  return (
    <>
      {props.response.map((itemFeedback) => (
        <FeedbackForm key={itemFeedback.chartItemId} data={itemFeedback} />
      ))}
    </>
  );
};
