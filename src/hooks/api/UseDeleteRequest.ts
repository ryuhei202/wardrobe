import { baseUrl } from "./../../model/api/shared/BaseUrl";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { useMutation } from "react-query";

export const useDeleteRequest = <T>(
  path: string,
  params?: T,
  afterMutation: {
    onSuccess: () => Promise<unknown> | void;
    onError: () => Promise<unknown> | void;
  } = { onSuccess: () => {}, onError: () => {} }
) => {
  const { mutate, error, isLoading } = useMutation<any, Error, number | string>(
    path,
    (id) =>
      axiosClient.delete(`${baseUrl()}/styling/${path}/${id}`, {
        data: params,
      }),
    afterMutation
  );

  return { mutate, error, isLoading };
};
