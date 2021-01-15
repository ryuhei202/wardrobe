import { useState } from "react";
import ItemBrowseCallback from "../browse/callback/ItemBrowseCallback";
import SelectedItem from "../../../model/styling/SelectedItem";
import KarteContainerData from "../../../model/styling/karte/props_data/KarteContainerData";
import KarteContainerCallback from "../karte/callback/KarteContainerCallback";
import SelectionConfirmData from "../../../model/styling/props_data/SelectionConfirmData";
import SelectionConfirmCallback from "../callback/SelectionConfirmCallback";

export interface StylingHandler {
  isSelectionCompleted: boolean;
  karteContainerData: () => KarteContainerData;
  karteContainerCallback: () => KarteContainerCallback;
  itemBrowseCallback: () => ItemBrowseCallback;
  selectionConfirmData: () => SelectionConfirmData;
  selectionConfirmCallback: () => SelectionConfirmCallback;
}

export const useStylingHandler = (): StylingHandler => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSelectionCompleted, setIsSelectionCompleted] = useState(false);

  const karteContainerData = (): KarteContainerData => {
    return { selectedIndex: currentIndex, items: selectedItems };
  };

  const karteContainerCallback = (): KarteContainerCallback => {
    return {
      selectionProgressCallback: {
        onSelect: (index: number) => setCurrentIndex(index),
        onClickCompleteButton: () => setIsSelectionCompleted(true),
      },
    };
  };

  const itemBrowseCallback = (): ItemBrowseCallback => {
    return {
      onSelectItem: (item: SelectedItem) => {
        let newSelectedItems = [...selectedItems];
        if (currentIndex < selectedItems.length) {
          newSelectedItems[currentIndex] = item;
        } else {
          newSelectedItems.push(item);
        }
        setSelectedItems(newSelectedItems);
        setCurrentIndex(newSelectedItems.length);
      },
    };
  };

  const selectionConfirmData = (): SelectionConfirmData => {
    return {
      items: selectedItems,
    };
  };

  const selectionConfirmCallback = (): SelectionConfirmCallback => {
    return {
      onCancelSelection: () => setIsSelectionCompleted(false),
    };
  };

  return {
    isSelectionCompleted,
    karteContainerData,
    karteContainerCallback,
    itemBrowseCallback,
    selectionConfirmData,
    selectionConfirmCallback,
  };
};
