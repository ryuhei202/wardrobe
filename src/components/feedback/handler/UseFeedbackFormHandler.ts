import { AxiosResponse } from "axios";
import { UseMutateFunction, useQueryClient } from "react-query";
import { ItemFeedbackShowResponse } from "../../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { FeedbackFormCallback } from "../callback/FeedbackFormCallback";

type FeedbackFormHandler = {
  readonly handleChangeText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  readonly handleUnload: (e: any) => void;
  readonly handleCaller: () => void;
  readonly handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const useFeedbackFormHandler = (
  data: ItemFeedbackShowResponse,
  callback: FeedbackFormCallback,
  setTextFeedback: React.Dispatch<React.SetStateAction<string>>,
  isEditing: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>,
  isLoading: boolean
): FeedbackFormHandler => {
  const queryClient = useQueryClient();

  const handleChangeText = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTextFeedback(event.target.value);
    data.textFeedback !== event.target.value
      ? setIsEditing(true)
      : setIsEditing(false);

    if (data.textFeedback === null && event.target.value === "")
      setIsEditing(false);
  };

  const handleUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const handleCaller = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("karte/item_feedbacks");
        queryClient.invalidateQueries("member/kartes");
        setIsEditing(false);
        callback.onSuccess();
      },
      onError: () => {
        setIsEditing(true);
        callback.onFailure();
      },
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey && event.key === "Enter" && isEditing && !isLoading) {
      handleCaller();
    }
  };

  return {
    handleChangeText,
    handleUnload,
    handleCaller,
    handleKeyDown,
  };
};
