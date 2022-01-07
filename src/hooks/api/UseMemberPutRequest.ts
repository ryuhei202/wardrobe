import { AxiosResponse } from "axios";
import { useContext } from "react";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { MemberIdContext } from "../../contexts/MemberIdContext";
import { axiosClient } from "../../model/api/shared/AxiosClient";
import { baseUrl } from "../../model/api/shared/BaseUrl";

export const useMemberPutRequest = (
  path: string,
  params: {}
): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
} => {
  const memberId = useContext(MemberIdContext);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    () =>
      axiosClient.put(
        `${baseUrl()}/styling/members/${memberId}/${path}`,
        params
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`member/${path}`);
      },
    }
  );

  return { mutate, isLoading };
};
