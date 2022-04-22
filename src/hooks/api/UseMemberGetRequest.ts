import { useQuery } from "react-query";
import { axiosClient } from "../../model/api/shared/AxiosClient";
import { baseUrl } from "../../model/api/shared/BaseUrl";

export const useMemberGetRequest = <T, U>(
  path: string,
  memberId: number,
  params?: U
): {
  data?: T;
  error: Error | null;
} => {
  const { data, error } = useQuery<T, Error>(`member/${path}`, () =>
    axiosClient
      .get(`${baseUrl()}/styling/members/${memberId}/${path}`, {
        params,
      })
      .then((r) => r.data)
  );

  return {
    data,
    error,
  };
};
