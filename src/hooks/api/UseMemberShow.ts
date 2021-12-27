import { MemberShowResponse } from "../../model/api/response/styling/member/MemberShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type MemberShow = {
  readonly data?: MemberShowResponse;
  readonly error: Error | null;
};

export const useMemberShow = (): MemberShow => {
  const { data, error } = useMemberGetRequest<MemberShowResponse>("");

  return {
    data,
    error,
  };
};
