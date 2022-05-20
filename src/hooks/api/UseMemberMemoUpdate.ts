import { useMemberPutRequest } from "./UseMemberPutRequest";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { TNextCoordeHearing } from "../../model/api/response/styling/member_memo/NextCoordeHearing";

type MemberMemoUpdate = {
  readonly mutate: UseMutateFunction<AxiosResponse>;
  readonly isLoading: boolean;
};

type TMemberMemoUpdateParams = {
  memo?: string;
  memoNext?: string;
  nextCoordeHearing: TNextCoordeHearing;
};

type TMemberMemoUpdateArg = {
  memberId: number;
} & TMemberMemoUpdateParams;

export const useMemberMemoUpdate = ({
  memberId,
  memo,
  memoNext,
  nextCoordeHearing,
}: TMemberMemoUpdateArg): MemberMemoUpdate => {
  const params: TMemberMemoUpdateParams = { memo, memoNext, nextCoordeHearing };
  const { mutate, isLoading } = useMemberPutRequest({
    memberId,
    params,
    path: "member_memo",
  });

  return { mutate, isLoading };
};
