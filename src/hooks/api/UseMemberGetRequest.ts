import { useContext } from "react";
import { useQuery } from "react-query";
import { MemberIdContext } from "../../contexts/MemberIdContext";
import { axiosClient } from "../../model/api/shared/AxiosClient";
import { baseUrl } from "../../model/api/shared/BaseUrl";

export const useMemberGetRequest = <T>(
  path: string
): {
  data?: T;
  error: Error | null;
} => {
  const memberId = useContext(MemberIdContext);
  const { data, error } = useQuery<T, Error>(`member/${path}`, () =>
    axiosClient
      .get(`${baseUrl()}/styling/members/${memberId}/${path}`)
      .then((r) => r.data)
  );

  return {
    data,
    error,
  };
};
