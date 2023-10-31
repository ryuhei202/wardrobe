import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { baseUrl } from "./../../model/api/shared/BaseUrl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePostRequest = <TParams = object, TError = any>(
  path: string,
  params?: TParams,
  afterMutation: {
    onSuccess?: () => Promise<unknown> | void;
    onError?: () => Promise<TError> | void;
  } = { onSuccess: () => undefined, onError: () => undefined },
) => {
  const { mutate, error, isLoading, isSuccess, isIdle, reset } = useMutation<
    AxiosResponse,
    TError,
    TParams | undefined
  >(
    path,
    (lateParams?: TParams) => axiosClient.post(`${baseUrl()}/${path}`, lateParams ?? params),
    afterMutation,
  );

  return { mutate, error, isLoading, isSuccess, isIdle, reset };
};
