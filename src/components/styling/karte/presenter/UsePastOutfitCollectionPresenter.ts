import { InfoPastOutfitItemResponse } from "../../../../model/api/response/styling/karte/InfoPastOutfitItemResponse";
import { InfoPastOutfitResponse } from "../../../../model/api/response/styling/karte/InfoPastOutfitResponse";

interface PastOutfitCollectionPresenter {
  shipmentDate: (index: number) => string;
  coordinateFeedback: (index: number) => string[];
  itemListPrimary: (item: InfoPastOutfitItemResponse) => string;
  itemListSecondary: (item: InfoPastOutfitItemResponse) => string;
  isRated: (item: InfoPastOutfitItemResponse) => boolean;
  rating: (item: InfoPastOutfitItemResponse) => number;
  reviewText: (item: InfoPastOutfitItemResponse) => string;
}

export const usePastOutfitCollectionPresenter = (
  data: InfoPastOutfitResponse[]
): PastOutfitCollectionPresenter => {
  const shipmentDate = (index: number): string =>
    data[index].rentalStartedAt
      ? new Date(data[index].rentalStartedAt!).toLocaleDateString()
      : "";

  const coordinateFeedback = (index: number): string[] => {
    return data[index].feedback.split("\n");
  };

  const itemListPrimary = (item: InfoPastOutfitItemResponse): string => {
    return `${item.id}, ${item.categoryName}, ${item.mainColorName}, ${item.subColorName}`;
  };

  const itemListSecondary = (item: InfoPastOutfitItemResponse): string => {
    let result = `${item.size}`;
    item.partSizes.forEach((partSize) => {
      result += `, ${partSize.name}: ${partSize.value ?? "未計測"}`;
    });
    result += `, ドロップサイズ: ${item.dropSize}`;
    return result;
  };

  const isRated = (item: InfoPastOutfitItemResponse): boolean => {
    return item.rating !== null;
  };

  const rating = (item: InfoPastOutfitItemResponse): number => {
    return item.rating ?? 0;
  };

  const reviewText = (item: InfoPastOutfitItemResponse): string => {
    return item.reviewText;
  };

  return {
    shipmentDate,
    coordinateFeedback,
    itemListPrimary,
    itemListSecondary,
    isRated,
    rating,
    reviewText,
  };
};
