import { usePatchRequest } from "./UsePatchRequest";
import { TNextCoordeHearing } from "../../model/api/response/styling/member_memo/NextCoordeHearing";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/api/response/shared/ErrorResponse";

type TMemberMemoUpdateParams = {
  memo?: string;
  memoNext?: string;
  nextCoordeHearing?: TNextCoordeHearing;
};

export const useMemberMemoUpdate = (memberId: number) => {
  const { mutate, isLoading } = usePatchRequest<
    TMemberMemoUpdateParams,
    AxiosError<ErrorResponse>
  >(`members/${memberId}/member_memo`);

  return { mutate, isLoading };
};
