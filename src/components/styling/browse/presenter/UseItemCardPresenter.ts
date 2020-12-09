import ItemCardResponse from "../../../../model/api/response/styling/browse/ItemCardResponse";

export interface ItemCardPresenter {
  itemImageUrl: () => string;
  colorImageUrl: () => string;
}

export const useItemCardPresenter = (
  data: ItemCardResponse
): ItemCardPresenter => {
  const itemImageUrl = (): string => {
    return `http://localhost:3000${data.imageUrl}`;
  };

  const colorImageUrl = (): string => {
    return `https://leeap.jp/images/color/${data.mColorId}.jpg`;
  };

  return { itemImageUrl, colorImageUrl };
};
