import { useMemberGetRequest } from "./UseMemberGetRequest";
import { MemberSizeSizeChoiceResponse } from "../../model/api/response/styling/member_size/MemberSizeSizeChoiceResponse";

type TMemberSizesSizeChoice = {
  readonly data?: MemberSizeSizeChoiceResponse;
  readonly error: Error | null;
};

type TMemberSizesSizeChoiceArg = {
  memberId: number;
};

export const useMemberSizesSizeChoice = ({
  memberId,
}: TMemberSizesSizeChoiceArg): TMemberSizesSizeChoice => {
  const { data, error } = useMemberGetRequest<
    MemberSizeSizeChoiceResponse,
    undefined
  >("size/size_choices", memberId);

  return { data, error };
};
