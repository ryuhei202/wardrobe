import { MemberShowResponse } from "../../model/api/response/styling/member/MemberShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type MemberShow = {
  readonly data: MemberShowResponse | undefined;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const useMemberShow = (): MemberShow => {
  const { data, isLoading, error } = useMemberGetRequest<MemberShowResponse>(
    ""
  );

  return {
    data,
    isLoading,
    error,
  };
};
