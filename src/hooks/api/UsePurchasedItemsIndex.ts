import { PurchasedItemIndexResponse } from "../../model/api/response/styling/purchaseItem/PurchasedItemIndexResponse";
import { useMemberGetRequest } from "./UseMemberGetRequest";

type PurchasedItemsIndex = {
  readonly data?: PurchasedItemIndexResponse[];
  readonly error: Error | null;
};

type TPurchasedItemsIndexArg = {
  memberId: number;
};

export const usePurchasedItemsIndex = ({
  memberId,
}: TPurchasedItemsIndexArg): PurchasedItemsIndex => {
  const { data, error } = useMemberGetRequest<PurchasedItemIndexResponse[]>({
    path: "purchased_items",
    memberId,
  });

  return {
    data,
    error,
  };
};
