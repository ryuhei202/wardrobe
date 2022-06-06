import { useQueryClient } from "react-query";

import { usePatchRequest } from "./UsePatchRequest";

type TMemberPatchRequestArg<T> = {
  path: string;
  memberId: number;
  params?: T;
};

export const useMemberPatchRequest = <TParams = {}>({
  path,
  memberId,
  params,
}: TMemberPatchRequestArg<TParams>) => {
  const queryClient = useQueryClient();

  return usePatchRequest<TParams>(`members/${memberId}/${path}`, params, {
    onSuccess: () => {
      queryClient.invalidateQueries(`member/${path}`);
    },
  });
};
