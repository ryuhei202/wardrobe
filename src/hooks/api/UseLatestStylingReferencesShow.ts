import { StylingReferenceResponse } from "../../model/api/response/styling/StylingReferenceResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type LatestStylingReferencesShow = {
  readonly data?: StylingReferenceResponse[];
  readonly error: Error | null;
};

type TLatestStylingReferencesShowArg = {
  memberId: number;
};

export const useLatestStylingReferencesShow = ({
  memberId,
}: TLatestStylingReferencesShowArg): LatestStylingReferencesShow => {
  const { data, error } = useMemberGetRequest<
    StylingReferenceResponse[],
    undefined
  >("latest_styling_references", memberId);

  return {
    data,
    error,
  };
};
