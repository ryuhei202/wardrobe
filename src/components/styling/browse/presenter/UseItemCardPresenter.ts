import { hostUrl } from "../../../../model/HostUrl";
import ItemCardData from "../../../../model/styling/browse/props_data/ItemCardData";

export interface ItemCardPresenter {
  itemImageUrl: () => string;
  colorImageUrl: () => string;
}

export const useItemCardPresenter = (data: ItemCardData): ItemCardPresenter => {
  const itemImageUrl = (): string => {
    return `${hostUrl()}${data.imagePath}`;
  };

  const colorImageUrl = (): string => {
    return `${hostUrl()}${data.colorImagePath}`;
  };

  return { itemImageUrl, colorImageUrl };
};
