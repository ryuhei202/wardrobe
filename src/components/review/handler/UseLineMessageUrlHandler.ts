import { AxiosResponse } from "axios";
import { UseMutateFunction, useQueryClient } from "react-query";
import { SelectedReviewFormCallback } from "../callback/SelectedReviewFormCallback";

type LineMessageUrlFormHandler = {
  readonly handleChangeText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  readonly handleCaller: () => void;
  readonly handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

type LineMessageUrlHandlerArgs = {
  readonly setLineMessageUrlText: React.Dispatch<React.SetStateAction<string>>;
  readonly isEditing: boolean;
  readonly setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  readonly mutate: UseMutateFunction<
    AxiosResponse<any>,
    unknown,
    void,
    unknown
  >;
  readonly isLoading: boolean;
  readonly callback: SelectedReviewFormCallback;
  readonly coordinateId: number;
  readonly prevLineMessageUrl?: string | null;
};
export const useLineMessageUrlHandler = ({
  setLineMessageUrlText,
  isEditing,
  setIsEditing,
  mutate,
  isLoading,
  callback,
  coordinateId,
  prevLineMessageUrl,
}: LineMessageUrlHandlerArgs): LineMessageUrlFormHandler => {
  const queryClient = useQueryClient();
  const handleChangeText = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLineMessageUrlText(event.target.value);
    prevLineMessageUrl !== event.target.value
      ? setIsEditing(true)
      : setIsEditing(false);
    if (prevLineMessageUrl === (null || undefined) && event.target.value === "")
      setIsEditing(false);
  };

  const handleCaller = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries(`coordinates/${coordinateId}/review`);
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
    handleCaller,
    handleKeyDown,
  };
};
