import { useState } from "react";
import { ItemFeedbackShowResponse } from "../../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";

type FeedbackFormHandler = {
  readonly textFeedback: string;
  readonly isEditing: boolean;
  readonly changeText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  readonly onSuccessUpdate: (isSuccess: boolean) => void;
  readonly onUnload: (e: any) => void;
};

export const useFeedbackFormHandler = (
  data: ItemFeedbackShowResponse
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

  const onSuccessUpdate = (isSuccess: boolean) => {
    setIsEditing(!isSuccess);
  };

  const onUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return {
    textFeedback,
    isEditing,
    changeText,
    onSuccessUpdate,
    onUnload,
  };
};
