import { PurchasedItemIndexResponse } from "../../model/api/response/styling/purchaseItem/PurchasedItemIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

export const usePurchasedItemsIndex = () => {
  const { data, error } = useMemberGetRequest<PurchasedItemIndexResponse[]>(
    "purchased_items"
  );

  return {
    data,
    error,
  };
};
