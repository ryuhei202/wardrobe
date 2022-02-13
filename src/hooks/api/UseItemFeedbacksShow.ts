import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { useKarteGetRequest } from "./UseKarteGetRequest";

type ItemFeedbacksShow = {
  readonly data?: ItemFeedbackShowResponse[];
  readonly error: Error | null;
};

type TItemFeedbacksShowArg = {
  chartId?: number;
};

export const useItemFeedbacksShow = ({
  chartId,
}: TItemFeedbacksShowArg): ItemFeedbacksShow => {
  // カルテIDを受け取ったタイミングでuseQueryを実行する
  const { data, error } = useKarteGetRequest<ItemFeedbackShowResponse[]>({
    path: "item_feedbacks",
    chartId,
    isEnabled: chartId !== undefined,
  });

  return {
    data,
    error,
  };
};
