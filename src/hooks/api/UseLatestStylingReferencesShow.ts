import { StylingReferenceResponse } from "../../model/api/response/styling/StylingReferenceResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type LatestStylingReferencesShow = {
  readonly data?: StylingReferenceResponse[];
  readonly error: Error | null;
};

export const useLatestStylingReferencesShow = (): LatestStylingReferencesShow => {
  const { data, error } = useMemberGetRequest<StylingReferenceResponse[]>(
    "latest_styling_references"
  );

  return {
    data,
    error,
  };
};
