import { LatestStylingReferenceShowResponse } from "./../../model/api/response/styling/latestStylingReference/LatestStylingReferenceShowResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type LatestStylingReferenceShow = {
  readonly data?: LatestStylingReferenceShowResponse[];
  readonly error: Error | null;
};

export const useLatestStylingReferenceShow = (): LatestStylingReferenceShow => {
  const { data, error } = useMemberGetRequest<
    LatestStylingReferenceShowResponse[]
  >("latest_styling_references");

  return {
    data,
    error,
  };
};
