import { AxiosResponse } from "axios";
import { UseMutateFunction, useQueryClient } from "react-query";
import { SelectedReviewFormCallback } from "../callback/SelectedReviewFormCallback";

type LineMessageUrlFormHandler = {
  readonly handleChangeText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  readonly handleSendClickButton: () => void;
  readonly handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

type LineMessageUrlHandlerArgs = {
  readonly setLineMessageUrlText: React.Dispatch<React.SetStateAction<string>>;
  readonly isEditing: boolean;
  readonly setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setIsUrlEditing: React.Dispatch<React.SetStateAction<boolean>>;
  readonly mutate: UseMutateFunction<
    AxiosResponse<unknown, unknown>,
    unknown,
    | {
        lineMessageUrl: string;
      }
    | undefined,
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
  setIsUrlEditing,
  mutate,
  isLoading,
  callback,
  coordinateId,
  prevLineMessageUrl,
}: LineMessageUrlHandlerArgs): LineMessageUrlFormHandler => {
  const queryClient = useQueryClient();
  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLineMessageUrlText(event.target.value);
    prevLineMessageUrl !== event.target.value ? setIsEditing(true) : setIsEditing(false);
    if (prevLineMessageUrl === (null || undefined) && event.target.value === "")
      setIsEditing(false);
  };

  const handleSendClickButton = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries(`styling/coordinates/${coordinateId}/review`);
        setIsEditing(false);
        callback.onSuccess();
        setIsUrlEditing(false);
      },
      onError: () => {
        setIsEditing(true);
        callback.onFailure();
      },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey && event.key === "Enter" && isEditing && !isLoading) {
      handleSendClickButton();
    }
    if (event.key === "Enter") event.preventDefault();
  };
  return {
    handleChangeText,
    handleSendClickButton,
    handleKeyDown,
  };
};
