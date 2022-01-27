import { StylingReferenceText } from "../../model/hearing/StylingReferenceText";
import { useMemberPutRequest } from "./UseMemberPutRequest";
import { UseMutateFunction } from "react-query";
import { AxiosResponse } from "axios";

export const useLatestStylingReferencesUpdate = (
  referenceTexts: StylingReferenceText[]
): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
} => {
  const params = {
    stylingReferenceTexts: referenceTexts,
  };
  const { mutate, isLoading } = useMemberPutRequest(
    "latest_styling_references",
    params
  );
  return { mutate, isLoading };
};
