import { MemberIdContext } from "./../../contexts/MemberIdContext";
import { useContext } from "react";
import { usePatchRequest } from "./UsePatchRequest";
import { UseMutateFunction } from "react-query";
import { AxiosResponse } from "axios";

export const useLatestStylingReferenceTextsUpdate = (
  categoryId: number,
  text: string
): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
} => {
  const memberId = useContext(MemberIdContext);
  const params = {
    categoryId,
    text,
  };
  const { mutate, isLoading } = usePatchRequest(
    `members/${memberId}/styling_reference_text`,
    params
  );
  return { mutate, isLoading };
};
