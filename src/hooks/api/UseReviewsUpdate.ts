import { usePatchRequest } from "./UsePatchRequest";
import { UseMutateFunction } from "react-query";
import { AxiosResponse } from "axios";

type TReviewsUpdateArg = {
  readonly coordinateId: number;
  readonly lineMessageUrl: string;
};
export const useReviewsUpdate = ({
  coordinateId,
  lineMessageUrl,
}: TReviewsUpdateArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, unknown, void, unknown>;
  isSuccess: boolean;
  isLoading: boolean;
} => {
  const { mutate, isSuccess, isLoading } = usePatchRequest(
    `coordinates/${coordinateId}/review`,
    { lineMessageUrl }
  );
  return { mutate, isSuccess, isLoading };
};
