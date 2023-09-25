import { usePatchRequest } from "./UsePatchRequest";

type TArgs = {
  readonly rentalId: number;
  readonly itemId: number;
};
type TParams = {
  readonly previousItemId?: number;
};

export const useItemsUpdate = ({ rentalId, itemId }: TArgs) => {
  const { mutate, isLoading, error } = usePatchRequest<TParams>(
    `biz/rentals/${rentalId}/items/${itemId}`,
  );
  return {
    mutate,
    isLoading,
    error,
  };
};
