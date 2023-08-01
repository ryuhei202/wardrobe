import { usePatchRequest } from "./UsePatchRequest";

type TArgs = {
  readonly rentalId: number;
};
type TParams = {
  readonly coordinateChoiceId: number;
};

export const useRentalCoordinateUpdate = ({ rentalId }: TArgs) => {
  const { mutate, isLoading, error } = usePatchRequest<TParams>(
    `rentals/${rentalId}/rental_coordinate`,
  );
  return {
    mutate,
    isLoading,
    error,
  };
};
