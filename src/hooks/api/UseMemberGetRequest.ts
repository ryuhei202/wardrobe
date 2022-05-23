import { useQuery } from "react-query";
import { axiosClient } from "../../model/api/shared/AxiosClient";
import { baseUrl } from "../../model/api/shared/BaseUrl";

export const useMemberGetRequest = <T, U>(
  path: string,
  memberId: number,
  params?: U,
  isEnabled = true
): {
  data?: T;
  error: Error | null;
} => {
  if (memberId === undefined) {
    isEnabled = false;
  }
  const { data, error } = useQuery<T, Error>(
    [`member/${path}`, { params }],
    () =>
      axiosClient
        .get(`${baseUrl()}/styling/members/${memberId}/${path}`, {
          params,
        })
        .then((r) => r.data),
    {
      enabled: isEnabled,
    }
  );

  return {
    data,
    error,
  };
};
