import { SelectionProgressData } from "../../../model/styling/props_data/SelectionProgressData";

export interface SelectionProgressPresenter {
  hasItemImage: (index: number) => boolean;
  itemImageUrl: (index: number) => string;
  labelText: (index: number) => string;
  borderProp: (index: number) => number;
  isDisabled: (index: number) => boolean;
  tooltipText: (index: number) => string[];
  isCompleteButtonAvailable: () => boolean;
}

export const useSelectionProgressPresenter = (
  data: SelectionProgressData
): SelectionProgressPresenter => {
  const hasItemImage = (index: number): boolean => {
    return data.items.length > index;
  };

  const itemImageUrl = (index: number): string => {
    return data.items[index].itemImagePath;
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

  const tooltipText = (index: number): string[] => {
    if (data.items.length > index) {
      return data.items[index].partSizes.map(
        (partSize) => `${partSize.name}: ${partSize.value ?? ""}`
      );
    }
    return [];
  };

  const isCompleteButtonAvailable = () => {
    return (
      data.rentableItemNum !== 0 && data.rentableItemNum === data.items.length
    );
  };

  return {
    hasItemImage,
    itemImageUrl,
    labelText,
    borderProp,
    isDisabled,
    tooltipText,
    isCompleteButtonAvailable,
  };
};
