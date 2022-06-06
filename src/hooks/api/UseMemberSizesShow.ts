import { useMemberGetRequest } from "./UseMemberGetRequest";
import { MemberSizeShowResponse } from "./../../model/api/response/styling/member_size/MemberSizeShowResponse";

type TMemberSizesShow = {
  readonly data?: MemberSizeShowResponse;
  readonly error: Error | null;
};

type TMemberSizesShowArg = {
  memberId: number;
};

export const useMemberSizesShow = ({
  memberId,
}: TMemberSizesShowArg): TMemberSizesShow => {
  const { data, error } = useMemberGetRequest<
    MemberSizeShowResponse,
    undefined
  >("size", memberId);

  return { data, error };
};
