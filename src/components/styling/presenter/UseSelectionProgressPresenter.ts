import { hostUrl } from "../../../model/HostUrl";
import SelectionProgressData from "../../../model/styling/data/SelectionProgressData";

export interface SelectionProgressPresenter {
  itemImageUrl: (index: number) => string;
  labelText: (index: number) => string;
}

export const useSelectionProgressPresenter = (
  data: SelectionProgressData
): SelectionProgressPresenter => {
  const itemImageUrl = (index: number): string => {
    return `${hostUrl()}${data.items[index].itemImagePath}`;
  };

  const labelText = (index: number): string => {
    if (data.items.length > index) {
      return data.items[index].itemId.toString();
    } else {
      return `アイテムNo.${index}`;
    }
  };

  return { itemImageUrl, labelText };
};
