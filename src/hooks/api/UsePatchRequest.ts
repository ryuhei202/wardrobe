import { baseUrl } from "./../../model/api/shared/BaseUrl";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { AxiosResponse } from "axios";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";

export const usePatchRequest = (
  path: string,
  params: {}
): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
} => {
  const { mutate, isLoading } = useMutation(() =>
    axiosClient.patch(`${baseUrl()}/styling/${path}`, params)
  );

  return { mutate, isLoading };
};
