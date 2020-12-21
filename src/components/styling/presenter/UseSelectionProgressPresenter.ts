import { HostUrl } from "./../../../model/HostUrl";
import SelectionProgressData from "../../../model/styling/props_data/SelectionProgressData";

export interface SelectionProgressPresenter {
  hasItemImage: (index: number) => boolean;
  itemImageUrl: (index: number) => string;
  labelText: (index: number) => string;
  borderProp: (index: number) => number;
  isDisabled: (index: number) => boolean;
}

export const useSelectionProgressPresenter = (
  data: SelectionProgressData
): SelectionProgressPresenter => {
  const hasItemImage = (index: number): boolean => {
    return data.items.length > index;
  };

  const itemImageUrl = (index: number): string => {
    return `${HostUrl()}${data.items[index].itemImagePath}`;
  };

  const labelText = (index: number): string => {
    if (data.items.length > index) {
      return data.items[index].itemId.toString();
    } else {
      return `アイテムNo.${index + 1}`;
    }
  };

  const borderProp = (index: number): number => {
    return data.selectedIndex === index ? 1 : 0;
  };

  const isDisabled = (index: number): boolean => {
    return data.items.length < index;
  };

  return { hasItemImage, itemImageUrl, labelText, borderProp, isDisabled };
};
