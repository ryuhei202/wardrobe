import { HostUrl } from "../../../../model/HostUrl";
import { InfoPurchasedItemResponse } from "./../../../../model/api/response/styling/karte/InfoPurchasedItemRespons";

interface PurchasedItemCollectionPresenter {
  itemListText: (item: InfoPurchasedItemResponse) => string;
  itemListPurchasedDate: (item: InfoPurchasedItemResponse) => string;
  itemListOriginalImageUrl: (item: InfoPurchasedItemResponse) => string;
  itemListPopupImageUrl: (item: InfoPurchasedItemResponse) => string;
}

export const usePurchasedItemCollectionPresenter = (): PurchasedItemCollectionPresenter => {
  const itemListText = (item: InfoPurchasedItemResponse): string =>
    `${item.id} / ${item.brandName} / ${item.size} / ${item.categoryName} / ${item.colorName} / ${item.patternName}`;

  const itemListPurchasedDate = (item: InfoPurchasedItemResponse): string =>
    `購入日：${new Date(item.purchasedDate).toLocaleDateString()}`;

  const itemListOriginalImageUrl = (item: InfoPurchasedItemResponse): string =>
    item.imagePath.thumb;

  const itemListPopupImageUrl = (item: InfoPurchasedItemResponse): string =>
    item.imagePath.original;

  return {
    itemListText,
    itemListPurchasedDate,
    itemListOriginalImageUrl,
    itemListPopupImageUrl,
  };
};
