import { usePatchRequest } from "./UsePatchRequest";
import { AxiosResponse } from "axios";
import { UseMutateAsyncFunction, useQueryClient } from "react-query";

export const useItemFeedbacksUpdate = (
  chartItemId: number,
  textFeedback: string
): {
  mutateAsync: UseMutateAsyncFunction<
    AxiosResponse<any>,
    unknown,
    void,
    unknown
  >;
  isSuccess: boolean;
} => {
  const queryClient = useQueryClient();
  const params = { textFeedback };
  const onSuccess = {
    onSuccess: () => {
      queryClient.invalidateQueries("karte/item_feedbacks");
    },
  };
  const { mutateAsync, isSuccess } = usePatchRequest(
    `item_feedbacks/${chartItemId}`,
    params,
    onSuccess
  );
  return { mutateAsync, isSuccess };
};
