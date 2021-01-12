import PastOutfitItemResponse from "../../../../model/api/response/styling/karte/PastOutfitItemResponse";
import PastOutfitResponse from "../../../../model/api/response/styling/karte/PastOutfitResponse";

export interface PastOutfitCollectionDialogPresenter {
  shipmentDate: (index: number) => string;
  coordinateFeedback: (index: number) => string[];
  itemListPrimary: (item: PastOutfitItemResponse) => string;
  itemListSecondary: (item: PastOutfitItemResponse) => string;
}

export const usePastOutfitCollectionDialogPresenter = (
  data: PastOutfitResponse[]
): PastOutfitCollectionDialogPresenter => {
  const shipmentDate = (index: number): string =>
    data[index].rentalStartedAt
      ? new Date(data[index].rentalStartedAt!).toLocaleDateString()
      : "";

  const coordinateFeedback = (index: number): string[] => {
    return data[index].feedback.split("\n");
  };

  const itemListPrimary = (item: PastOutfitItemResponse): string => {
    return `${item.id}, ${item.categoryName}, ${item.colorName}`;
  };

  const itemListSecondary = (item: PastOutfitItemResponse): string => {
    let result = `${item.size}`;
    item.partSizes.forEach((partSize) => {
      result += `, ${partSize.name}: ${partSize.value ?? "未計測"}`;
    });
    return result;
  };

  return {
    shipmentDate,
    coordinateFeedback,
    itemListPrimary,
    itemListSecondary,
  };
};
