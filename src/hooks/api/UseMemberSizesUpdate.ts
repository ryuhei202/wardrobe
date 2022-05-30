import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

import { useMemberPutRequest } from "./UseMemberPutRequest";
import { MemberSizeUpdateParams } from "../../model/api/request/styling/member_size/MemberSizeUpdateParams";

type TMemberSizesUpdate = {
  readonly mutate: UseMutateFunction<AxiosResponse>;
  readonly isLoading: boolean;
};

type TMemberSizesUpdateArg = {
  memberId: number;
  params: MemberSizeUpdateParams;
};

export const UseMemberSizesUpdate = ({
  memberId,
  params,
}: TMemberSizesUpdateArg): TMemberSizesUpdate => {
  const { mutate, isLoading } = useMemberPutRequest({
    memberId,
    params,
    path: "size",
  });

  return { mutate, isLoading };
};
