import { HostUrl } from "./../../../../model/HostUrl";
import ItemCardData from "../../../../model/styling/browse/props_data/ItemCardData";

export interface ItemCardPresenter {
  itemImageUrl: () => string;
  colorImageUrl: () => string;
}

export const useItemCardPresenter = (data: ItemCardData): ItemCardPresenter => {
  const itemImageUrl = (): string => {
    return `${HostUrl()}${data.imagePath}`;
  };

  const colorImageUrl = (): string => {
    return `${HostUrl()}${data.colorImagePath}`;
  };

  return { itemImageUrl, colorImageUrl };
};
