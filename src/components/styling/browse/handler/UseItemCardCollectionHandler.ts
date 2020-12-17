import ItemCardResponse from "../../../../model/api/response/styling/browse/ItemCardResponse";
import ItemCardData from "../../../../model/styling/browse/data/ItemCardData";
import ItemCardCallback from "../callback/ItemCardCallback";
import ItemCardCollectionCallback from "../callback/ItemCardCollectionCallback";

export interface ItemCardCollectionHandler {
  itemCardArrayData: () => ItemCardData[];
  itemCardCallback: (index: number) => ItemCardCallback;
}

export const useItemCardCollectionHandler = (
  itemCards: ItemCardResponse[],
  callback: ItemCardCollectionCallback
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

  const itemCardCallback = (index: number): ItemCardCallback => {
    return {
      onClick: () => {
        callback.onSelect(itemCards[index].id);
      },
    };
  };

  return { itemCardArrayData, itemCardCallback };
};
