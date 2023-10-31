import { useMutation } from "react-query";
import { axiosClient } from "./../../model/api/shared/AxiosClient";
import { baseUrl } from "./../../model/api/shared/BaseUrl";

export const useDeleteRequest = <T>(
  path: string,
  params?: T,
  afterMutation: {
    onSuccess: () => Promise<unknown> | void;
    onError: () => Promise<unknown> | void;
  } = { onSuccess: () => undefined, onError: () => undefined },
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate, error, isLoading } = useMutation<any, Error, number | string>(
    path,
    (id) =>
      axiosClient.delete(`${baseUrl()}/${path}/${id}`, {
        data: params,
      }),
    afterMutation,
  );

  return { mutate, error, isLoading };
};
