import { PostRequest } from "../../PostRequest";
import { PostRegisterItemsParamsParams } from "./PostRegisterItemsParams";

export const useRegisterItemsRequest = (
  karteId: number,
  adminId: number,
  itemIds: number[]
): PostRequest => {
  const url = (): string => {
    return "styling/arranges/register_items";
  };

  const params = (): PostRegisterItemsParamsParams => {
    return {
      chartId: karteId,
      adminId: adminId,
      itemIds: itemIds,
    };
  };

  return { url, params };
};
