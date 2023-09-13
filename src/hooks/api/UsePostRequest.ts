import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { baseUrl } from "./../../model/api/shared/BaseUrl";

export const usePostRequest = <TParams = {}, TError = any>(
  path: string,
  params?: TParams,
  afterMutation: {
    onSuccess?: () => Promise<unknown> | void;
    onError?: () => Promise<TError> | void;
  } = { onSuccess: () => {}, onError: () => {} },
) => {
  const { mutate, error, isLoading, isSuccess, isIdle, reset } = useMutation<
    AxiosResponse,
    TError,
    TParams | undefined
  >(
    path,
    (lateParams?: TParams) =>
      axiosClient.post(`${baseUrl()}/${path}`, lateParams ?? params),
    afterMutation,
  );

  return { mutate, error, isLoading, isSuccess, isIdle, reset };
};
