import { useState } from "react";
import ItemBrowseCallback from "../browse/callback/ItemBrowseCallback";
import SelectedItem from "../../../model/styling/SelectedItem";
import KarteContainerData from "../../../model/styling/karte/props_data/KarteContainerData";
import KarteContainerCallback from "../karte/callback/KarteContainerCallback";
import SelectionConfirmData from "../../../model/styling/props_data/SelectionConfirmData";
import SelectionConfirmCallback from "../callback/SelectionConfirmCallback";
import ArrangeData from "../../../model/styling/arrange/props_data/ArrangeData";
import ArrangeCallback from "../arrange/callback/ArrangeCallback";

export interface StylingHandler {
  isKarteFetched: boolean;
  isSelectionCompleted: boolean;
  isConfirmed: boolean;
  karteContainerData: () => KarteContainerData;
  karteContainerCallback: () => KarteContainerCallback;
  itemBrowseCallback: () => ItemBrowseCallback;
  selectionConfirmData: () => SelectionConfirmData;
  selectionConfirmCallback: () => SelectionConfirmCallback;
  arrangeData: () => ArrangeData;
  arrangeCallback: () => ArrangeCallback;
}

export const useStylingHandler = (): StylingHandler => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isKarteFetched, setIsKarteFetched] = useState(false);
  const [isSelectionCompleted, setIsSelectionCompleted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const karteContainerData = (): KarteContainerData => {
    return { selectedIndex: currentIndex, items: selectedItems };
  };

  const karteContainerCallback = (): KarteContainerCallback => {
    return {
      selectionProgressCallback: {
        onSelect: (index: number) => setCurrentIndex(index),
        onClickCompleteButton: () => setIsSelectionCompleted(true),
      },
      onKarteFetched: () => {
        setIsKarteFetched(true);
      },
      onItemRegistered: (items: SelectedItem[]) => {
        setSelectedItems(items);
        setIsConfirmed(true);
        setIsSelectionCompleted(true);
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
      onConfirmSelection: () => setIsConfirmed(true),
    };
  };

  const arrangeData = (): ArrangeData => {
    return {
      items: selectedItems,
    };
  };

  const arrangeCallback = (): ArrangeCallback => {
    return {
      onClickBackButton: () => setIsConfirmed(false),
    };
  };

  return {
    isKarteFetched,
    isSelectionCompleted,
    isConfirmed,
    karteContainerData,
    karteContainerCallback,
    itemBrowseCallback,
    selectionConfirmData,
    selectionConfirmCallback,
    arrangeData,
    arrangeCallback,
  };
};
