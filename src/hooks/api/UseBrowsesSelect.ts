import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/api/response/shared/ErrorResponse";
import { usePostRequest } from "./UsePostRequest";

type PostSelectParams = {
  itemId: number;
  chartId: number;
  coordinateId: number;
  previousItemId?: number;
};

export const useBrowsesSelect = () => {
  const { mutate, error, isLoading, reset } = usePostRequest<
    PostSelectParams,
    AxiosError<ErrorResponse>
  >("browses/select");

  return {
    mutate,
    error,
    isLoading,
    reset,
  };
};
