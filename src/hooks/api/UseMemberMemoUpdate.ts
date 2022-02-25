import { useMemberPutRequest } from "./UseMemberPutRequest";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

type MemberMemoUpdate = {
  readonly mutate: UseMutateFunction<AxiosResponse>;
  readonly isLoading: boolean;
};

type TMemberMemoUpdateParams = {
  memo?: string;
  memoNext?: string;
};

type TMemberMemoUpdateArg = {
  memberId: number;
} & TMemberMemoUpdateParams;

export const useMemberMemoUpdate = ({
  memberId,
  memo,
  memoNext,
}: TMemberMemoUpdateArg): MemberMemoUpdate => {
  const params: TMemberMemoUpdateParams = { memo, memoNext };
  const { mutate, isLoading } = useMemberPutRequest({
    memberId,
    params,
    path: "member_memo",
  });

  return { mutate, isLoading };
};
