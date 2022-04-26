import { ReviewShowResponse } from "../../model/api/response/styling/review/ReviewShowResponse";
import { useGetRequest } from "./UseGetRequest";

type ReviewsShow = {
  readonly data?: ReviewShowResponse;
  readonly error: Error | null;
};
type TReviewsShowArg = {
  readonly coordinateId: number;
};
export const useReviewsShow = ({
  coordinateId,
}: TReviewsShowArg): ReviewsShow => {
  const { data, error } = useGetRequest<ReviewShowResponse>(
    `coordinates/${coordinateId}/review`
  );
  return {
    data,
    error,
  };
};
