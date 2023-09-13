import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/api/response/shared/ErrorResponse";
import { usePatchRequest } from "./UsePatchRequest";

type TMemberMemoUpdateParams = {
  memo?: string;
  memoNext?: string;
};

export const useMemberMemoUpdate = (memberId: number) => {
  const { mutate, isLoading } = usePatchRequest<
    TMemberMemoUpdateParams,
    AxiosError<ErrorResponse>
  >(`styling/members/${memberId}/member_memo`);

  return { mutate, isLoading };
};
