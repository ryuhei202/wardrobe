import { usePatchRequest } from "./UsePatchRequest";
import { UseMutateFunction } from "react-query";
import { AxiosResponse } from "axios";

type TLatestStylingReferenceTextUpdate = {
  categoryId: number;
  text: string;
  memberId: number;
};

export const useLatestStylingReferenceTextUpdate = ({
  categoryId,
  text,
  memberId,
}: TLatestStylingReferenceTextUpdate): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isLoading: boolean;
} => {
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
