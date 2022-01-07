import { PurchasedItemIndexResponse } from "../../model/api/response/styling/purchaseItem/PurchasedItemIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type PurchasedItemsIndex = {
  readonly data?: PurchasedItemIndexResponse[];
  readonly error: Error | null;
};
export const usePurchasedItemsIndex = (): PurchasedItemsIndex => {
  const { data, error } = useMemberGetRequest<PurchasedItemIndexResponse[]>(
    "purchased_items"
  );

  return {
    data,
    error,
  };
};
