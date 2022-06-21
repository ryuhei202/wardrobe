import { baseUrl } from "./../../model/api/shared/BaseUrl";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";

export const usePatchRequest = <TParams = {}, TError = any>(
  path: string,
  params?: TParams,
  afterMutation: {
    onSuccess?: () => Promise<unknown> | void;
    onError?: () => Promise<TError> | void;
  } = { onSuccess: () => {}, onError: () => {} }
) => {
  const { mutate, error, isLoading, isSuccess } = useMutation<
    AxiosResponse,
    TError,
    TParams | undefined
  >(
    path,
    (lateParams?: TParams) =>
      axiosClient.patch(`${baseUrl()}/styling/${path}`, lateParams ?? params),
    afterMutation
  );

  return { mutate, error, isLoading, isSuccess };
};
