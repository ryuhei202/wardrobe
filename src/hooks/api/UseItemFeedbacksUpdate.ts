import { usePatchRequest } from "./UsePatchRequest";

export const useItemFeedbacksUpdate = (
  chartItemId: number,
  textFeedback: string
) => {
  const params = { textFeedback };
  const { mutate, isSuccess, isLoading } = usePatchRequest(
    `item_feedbacks/${chartItemId}`,
    params
  );
  return { mutate, isSuccess, isLoading };
};
