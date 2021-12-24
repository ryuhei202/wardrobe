import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { MemberIdContext } from "../../components/App";
import { AxiosClient } from "../../model/api/shared/AxiosClient";
import { baseUrl } from "../../model/api/shared/BaseUrl";

export const useMemberGetRequest = <T>(
  path: string
): {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
} => {
  const memberId = useContext(MemberIdContext);
  const { data, isLoading, error } = useQuery<T, Error>(`member/${path}`, () =>
    AxiosClient.get(`${baseUrl()}/styling/members/${memberId}/${path}`).then(
      (r) => r.data
    )
  );

  return {
    data,
    isLoading,
    error,
  };
};
