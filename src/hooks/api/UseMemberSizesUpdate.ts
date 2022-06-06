import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

import { MemberSizeUpdateParams } from "../../model/api/request/styling/member_size/MemberSizeUpdateParams";
import { useMemberPatchRequest } from "./UseMemberPatchRequest";

type TMemberSizesUpdateArg = {
  memberId: number;
};

export const useMemberSizesUpdate = ({ memberId }: TMemberSizesUpdateArg) => {
  return useMemberPatchRequest<MemberSizeUpdateParams>({
    memberId,
    path: "size",
  });
};
