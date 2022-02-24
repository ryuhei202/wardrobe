import { MemberShowResponse } from "../../model/api/response/styling/member/MemberShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

export type TMembersShow = {
  readonly data?: MemberShowResponse;
  readonly error: Error | null;
};

type TMembersShowArg = {
  memberId: number;
};

export const useMembersShow = ({ memberId }: TMembersShowArg): TMembersShow => {
  const { data, error } = useMemberGetRequest<MemberShowResponse>({
    memberId,
    path: "",
  });

  return {
    data,
    error,
  };
};
