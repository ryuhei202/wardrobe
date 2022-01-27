import { MemberIdContext } from "./../../contexts/MemberIdContext";
import { useContext } from "react";
import { usePatchRequest } from "./UsePatchRequest";
import { StylingReferenceText } from "../../model/hearing/StylingReferenceText";
import { UseMutateFunction } from "react-query";
import { AxiosResponse } from "axios";

export const useLatestStylingReferenceTextsUpdate = (
  stylingReferenceTexts: StylingReferenceText[]
): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
} => {
  const memberId = useContext(MemberIdContext);
  const params = {
    stylingReferenceTexts,
  };
  const { mutate, isLoading } = usePatchRequest(
    `members/${memberId}/styling_reference_texts`,
    params
  );
  return { mutate, isLoading };
};
