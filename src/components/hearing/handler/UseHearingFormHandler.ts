import { AxiosResponse } from "axios";
import { UseMutateFunction, useQueryClient } from "react-query";
import { HearingFormCallback } from "../callback/HearingFormCallback";

type HearingFormHandler = {
  readonly handleChangeText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  readonly handleCaller: () => void;
  readonly handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};
export const useHearingFormHandler = (
  callback: HearingFormCallback,
  initialText: string,
  setReferenceText: React.Dispatch<React.SetStateAction<string>>,
  isEditing: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>,
  isLoading: boolean
): HearingFormHandler => {
  const queryClient = useQueryClient();

  const handleChangeText = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setReferenceText(event.target.value);
    initialText !== event.target.value
      ? setIsEditing(true)
      : setIsEditing(false);
  };

  const handleCaller = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries("member/latest_styling_references");
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
