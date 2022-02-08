import { useMemberPutRequest } from "./UseMemberPutRequest";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

type MemberMemoUpdate = {
  readonly mutate: UseMutateFunction<AxiosResponse>;
  readonly isLoading: boolean;
};

export const useMemberMemoUpdate = (params: {
  memo?: string;
  memoNext?: string;
}): MemberMemoUpdate => {
  const { mutate, isLoading } = useMemberPutRequest("member_memo", params);

  return { mutate, isLoading };
};
