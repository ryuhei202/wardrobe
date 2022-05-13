import { MemberMemoShowResponse } from "../../model/api/response/styling/member_memo/MemberMemoShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type MemberMemoShow = {
  readonly data?: MemberMemoShowResponse;
  readonly error: Error | null;
};

type TMemberMemoShowArg = {
  memberId: number;
};

export const useMemberMemoShow = ({
  memberId,
}: TMemberMemoShowArg): MemberMemoShow => {
  const { data, error } = useMemberGetRequest<
    MemberMemoShowResponse,
    undefined
  >("member_memo", memberId);

  return {
    data,
    error,
  };
};
