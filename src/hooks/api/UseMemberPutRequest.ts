import { AxiosResponse } from "axios";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { axiosClient } from "../../model/api/shared/AxiosClient";
import { baseUrl } from "../../model/api/shared/BaseUrl";

type TMemberPutRequestArg = {
  path: string;
  params: {};
  memberId: number;
};

export const useMemberPutRequest = ({
  path,
  params,
  memberId,
}: TMemberPutRequestArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
} => {
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
