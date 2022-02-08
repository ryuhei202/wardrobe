import { MemberMemoShowResponse } from "../../model/api/response/styling/member_memo/MemberMemoShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type MemberMemoShow = {
  readonly data?: MemberMemoShowResponse;
  readonly error: Error | null;
};

export const useMemberMemoShow = (): MemberMemoShow => {
  const { data, error } = useMemberGetRequest<MemberMemoShowResponse>(
    "member_memo"
  );

  return {
    data,
    error,
  };
};
