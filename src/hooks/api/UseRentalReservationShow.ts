import { useGetRequest } from "./UseGetRequest";

type TResponse = {
  readonly data?: TRentalReservationShowResponse;
  readonly error: Error | null;
};
type TRentalReservationShowResponse = {
  id: number;
  firstName: string;
  lastName: string;
  onetMembership_no: number;
  age: number;
  shootingAt: string;
};

type TArgs = {
  readonly rentalId: number;
};
export const useRentalReservationShow = ({ rentalId }: TArgs): TResponse => {
  const { data, error } = useGetRequest<TRentalReservationShowResponse>(
    `rentals/${rentalId}/rental_reservation`,
  );
  return {
    data,
    error,
  };
};
