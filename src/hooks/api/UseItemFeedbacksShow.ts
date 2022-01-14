import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type ItemFeedbacksShow = {
  readonly data?: ItemFeedbackShowResponse;
  readonly error: Error | null;
};

export const useItemFeedbacksShow = (): ItemFeedbacksShow => {
  const { data, error } = useKarteGetRequest<ItemFeedbackShowResponse>(
    "item_feedbacks"
  );

  return {
    data,
    error,
  };
};
