import { baseUrl } from "./../../model/api/shared/BaseUrl";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { AxiosResponse } from "axios";
import { UseMutateAsyncFunction, useMutation } from "react-query";

export const usePatchRequest = (
  path: string,
  params: {},
  nextRequest: {} = {}
): {
  mutateAsync: UseMutateAsyncFunction<
    AxiosResponse<any>,
    unknown,
    void,
    unknown
  >;
  isLoading: boolean;
  isSuccess: boolean;
} => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    () => axiosClient.patch(`${baseUrl()}/styling/${path}`, params),
    nextRequest
  );

  return { mutateAsync, isLoading, isSuccess };
};
