import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

import { useMemberPutRequest } from "./UseMemberPutRequest";
import { UpdateSizes } from "../../model/api/request/styling/member_size/UpdateSizes";

type TMemberSizesUpdate = {
  readonly mutate: UseMutateFunction<AxiosResponse>;
  readonly isLoading: boolean;
};

type TMemberSizesUpdateParams = {
  sizes: UpdateSizes;
};

type TMemberSizesUpdateArg = {
  memberId: number;
} & TMemberSizesUpdateParams;

export const UseMemberSizesUpdate = ({
  memberId,
  sizes,
}: TMemberSizesUpdateArg): TMemberSizesUpdate => {
  const params: TMemberSizesUpdateParams = { sizes };
  const { mutate, isLoading } = useMemberPutRequest({
    memberId,
    params,
    path: "size",
  });

  return { mutate, isLoading };
};
