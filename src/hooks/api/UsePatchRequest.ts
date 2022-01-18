import { baseUrl } from "./../../model/api/shared/BaseUrl";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { AxiosResponse } from "axios";
import { UseMutateFunction, useMutation } from "react-query";

export const usePatchRequest = (
  path: string,
  params: {},
  afterMutation: {
    onSuccess: () => Promise<unknown> | void;
    onError: () => Promise<unknown> | void;
  } = { onSuccess: () => {}, onError: () => {} }
): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
  isSuccess: boolean;
} => {
  const { mutate, isLoading, isSuccess } = useMutation(
    () => axiosClient.patch(`${baseUrl()}/styling/${path}`, params),
    afterMutation
  );

  return { mutate, isLoading, isSuccess };
};
