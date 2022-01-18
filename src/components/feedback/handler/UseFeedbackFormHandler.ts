import { AxiosResponse } from "axios";
import { useState } from "react";
import { UseMutateFunction } from "react-query";
import { ItemFeedbackShowResponse } from "../../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { FeedbackFormCallback } from "../callback/FeedbackFormCallback";

type FeedbackFormHandler = {
  readonly textFeedback: string;
  readonly isEditing: boolean;
  readonly changeText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  readonly onUnload: (e: any) => void;
  readonly onKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>
  ) => void;
};

export const useFeedbackFormHandler = (
  data: ItemFeedbackShowResponse,
  callback: FeedbackFormCallback
): FeedbackFormHandler => {
  const [textFeedback, setTextFeedback] = useState<string>(data.textFeedback);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const changeText = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTextFeedback(event.target.value);
    data.textFeedback !== event.target.value
      ? setIsEditing(true)
      : setIsEditing(false);

    if (data.textFeedback === null && event.target.value === "")
      setIsEditing(false);
  };
  const onUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>
  ) => {
    if (event.altKey && event.key === "Enter" && isEditing) {
      mutate(undefined, {
        onSuccess: () => {
          setIsEditing(false);
          callback.onSuccess();
        },
        onError: () => {
          setIsEditing(true);
          callback.onFailure();
        },
      });
    }
  };

  return {
    textFeedback,
    isEditing,
    changeText,
    onUnload,
    onKeyDown,
  };
};
