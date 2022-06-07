import { baseUrl } from "./../../model/api/shared/BaseUrl";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { useMutation } from "react-query";

export const usePatchRequest = <TParams = {}>(
  path: string,
  params?: TParams,
  afterMutation: {
    onSuccess?: () => Promise<unknown> | void;
    onError?: () => Promise<unknown> | void;
  } = { onSuccess: () => {}, onError: () => {} }
) => {
  const { mutate, error, isLoading, isSuccess } = useMutation(
    path,
    (lateParams?: TParams) =>
      axiosClient.patch(`${baseUrl()}/styling/${path}`, lateParams ?? params),
    afterMutation
  );

  return { mutate, error, isLoading, isSuccess };
};
