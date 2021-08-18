import { HostUrl } from "./../../../../model/HostUrl";
import ItemCardData from "../../../../model/styling/browse/props_data/ItemCardData";

export interface ItemCardPresenter {
  itemImageUrl: () => string;
  mainColorImageUrl: () => string;
  subColorImageUrl: () => string;
}

export const useItemCardPresenter = (data: ItemCardData): ItemCardPresenter => {
  const itemImageUrl = (): string => {
    return `${HostUrl()}${data.imagePath}`;
  };

  const mainColorImageUrl = (): string => {
    return `${HostUrl()}${data.mainColorImagePath}`;
  };

  const subColorImageUrl = (): string => {
    return `${HostUrl()}${data.subColorImagePath}`;
  };

  return { itemImageUrl, mainColorImageUrl, subColorImageUrl };
};
