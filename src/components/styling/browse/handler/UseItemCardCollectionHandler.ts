import ItemCardResponse from "../../../../model/api/response/styling/browse/ItemCardResponse";
import ItemCardData from "../../../../model/styling/browse/data/ItemCardData";

export interface ItemCardCollectionHandler {
  itemCardArrayData: () => ItemCardData[];
}

export const useItemCardCollectionHandler = (
  itemCards: ItemCardResponse[]
): ItemCardCollectionHandler => {
  const itemCardArrayData = (): ItemCardData[] => {
    return itemCards.map((item) => {
      return {
        colorImagePath: item.colorImagePath,
        seriesName: item.seriesName,
        categoryName: item.categoryName,
        brandName: item.brandName,
        imagePath: item.imagePath,
      };
    });
  };

  return { itemCardArrayData };
};
