import { useGetRequest } from "./UseGetRequest";

type TResponse = {
  readonly data?: TRentalRequestStatusResponse;
  readonly error: Error | null;
};
export type TRentalRequestStatusResponse = {
  rentalStatus: number;
};

type TArgs = {
  readonly rentalId: number;
};
export const useRentalRequestStatus = ({ rentalId }: TArgs): TResponse => {
  const { data, error } = useGetRequest<TRentalRequestStatusResponse>(
    `biz/rentals/${rentalId}/status`,
  );
  return {
    data,
    error,
  };
};
