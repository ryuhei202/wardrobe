import { HostUrl } from "../../../../model/HostUrl";
import { InfoPurchasedItemResponse } from "./../../../../model/api/response/styling/karte/InfoPurchasedItemRespons";

interface PurchasedItemCollectionPresenter {
  itemListText: (item: InfoPurchasedItemResponse) => string;
  itemListOriginalImageUrl: (item: InfoPurchasedItemResponse) => string;
  itemListPopupImageUrl: (item: InfoPurchasedItemResponse) => string;
}

export const usePurchasedItemCollectionPresenter = (): PurchasedItemCollectionPresenter => {
  const itemListText = (item: InfoPurchasedItemResponse): string => {
    return `${item.id} / ${item.brandName} / ${item.size} / ${item.categoryName} / ${item.colorName} / ${item.patternName}`;
  };

  const itemListOriginalImageUrl = (
    item: InfoPurchasedItemResponse
  ): string => {
    return HostUrl() + item.imagePath.thumb;
  };

  const itemListPopupImageUrl = (item: InfoPurchasedItemResponse): string => {
    return HostUrl() + item.imagePath.original;
  };

  return {
    itemListText,
    itemListOriginalImageUrl,
    itemListPopupImageUrl,
  };
};
