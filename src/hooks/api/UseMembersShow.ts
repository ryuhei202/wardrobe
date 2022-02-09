import { MemberShowResponse } from "../../model/api/response/styling/member/MemberShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type MembersShow = {
  readonly data?: MemberShowResponse;
  readonly error: Error | null;
};

export const useMembersShow = (memberId: number): MembersShow => {
  const { data, error } = useMemberGetRequest<MemberShowResponse>(memberId, "");

  return {
    data,
    error,
  };
};
