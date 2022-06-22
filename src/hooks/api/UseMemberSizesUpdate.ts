import { AxiosError } from "axios";
import { MemberSizeUpdateParams } from "../../model/api/request/styling/member_size/MemberSizeUpdateParams";
import { ErrorResponse } from "../../model/api/response/shared/ErrorResponse";
import { useMemberPatchRequest } from "./UseMemberPatchRequest";

type TMemberSizesUpdateArg = {
  memberId: number;
};

export const useMemberSizesUpdate = ({ memberId }: TMemberSizesUpdateArg) => {
  return useMemberPatchRequest<
    MemberSizeUpdateParams,
    AxiosError<ErrorResponse>
  >({
    memberId,
    path: "size",
  });
};
