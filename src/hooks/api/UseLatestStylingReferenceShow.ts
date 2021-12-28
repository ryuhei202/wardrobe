import { StylingReferenceResponse } from "../../model/api/response/styling/StylingReferenceResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type LatestStylingReferenceShow = {
  readonly data?: StylingReferenceResponse[];
  readonly error: Error | null;
};

export const useLatestStylingReferenceShow = (): LatestStylingReferenceShow => {
  const { data, error } = useMemberGetRequest<StylingReferenceResponse[]>(
    "latest_styling_references"
  );

  return {
    data,
    error,
  };
};
