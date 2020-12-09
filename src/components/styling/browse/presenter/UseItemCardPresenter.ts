import ItemCardResponse from "../../../../model/api/response/styling/browse/ItemCardResponse";
import { hostUrl } from "../../../../model/HostUrl";

export interface ItemCardPresenter {
  itemImageUrl: () => string;
  colorImageUrl: () => string;
}

export const useItemCardPresenter = (
  data: ItemCardResponse
): ItemCardPresenter => {
  const itemImageUrl = (): string => {
    return `${hostUrl()}${data.imageUrl}`;
  };

  const colorImageUrl = (): string => {
    return `${hostUrl()}${data.colorImagePath}`;
  };

  return { itemImageUrl, colorImageUrl };
};
