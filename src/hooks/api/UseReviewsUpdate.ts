import { usePatchRequest } from "./UsePatchRequest";

type TReviewsUpdateArg = {
  readonly coordinateId: number;
  readonly lineMessageUrl: string;
};
export const useReviewsUpdate = ({
  coordinateId,
  lineMessageUrl,
}: TReviewsUpdateArg) => {
  const { mutate, isSuccess, isLoading } = usePatchRequest(
    `coordinates/${coordinateId}/review`,
    { lineMessageUrl }
  );
  return { mutate, isSuccess, isLoading };
};
