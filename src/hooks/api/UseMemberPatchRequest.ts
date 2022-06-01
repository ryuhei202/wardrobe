import { AxiosResponse } from "axios";
import { useMutation, useQueryClient, UseMutateFunction } from "react-query";
import { axiosClient } from "../../model/api/shared/AxiosClient";

import { baseUrl } from "../../model/api/shared/BaseUrl";

type TMemberPatchRequestArg = {
  path: string;
  params: {};
  memberId: number;
};

export const UseMemberPatchRequest = ({
  path,
  params,
  memberId,
}: TMemberPatchRequestArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    () =>
      axiosClient.patch(
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
