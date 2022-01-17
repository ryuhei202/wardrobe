import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type ItemFeedbacksShow = {
  readonly data?: ItemFeedbackShowResponse[];
  readonly error: Error | null;
};

export const useItemFeedbacksShow = (chartId?: number): ItemFeedbacksShow => {
  // カルテIDを受け取ったタイミングでuseQueryを実行する
  const { data, error } = useKarteGetRequest<ItemFeedbackShowResponse[]>(
    "item_feedbacks",
    chartId,
    chartId === undefined ? false : true
  );

  return {
    data,
    error,
  };
};
