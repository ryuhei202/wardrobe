import { usePatchRequest } from "./UsePatchRequest";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/api/response/shared/ErrorResponse";

type TMemberMemoUpdateParams = {
  memo?: string;
  memoNext?: string;
};

export const useMemberMemoUpdate = (memberId: number) => {
  const { mutate, isLoading } = usePatchRequest<
    TMemberMemoUpdateParams,
    AxiosError<ErrorResponse>
  >(`members/${memberId}/member_memo`);

  return { mutate, isLoading };
};
