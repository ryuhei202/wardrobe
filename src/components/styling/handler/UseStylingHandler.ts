import { useState } from "react";
import ItemBrowseCallback from "../browse/callback/ItemBrowseCallback";
import SelectedItem from "../../../model/styling/SelectedItem";
import KarteContainerData from "../../../model/styling/karte/props_data/KarteContainerData";
import KarteContainerCallback from "../karte/callback/KarteContainerCallback";
import SelectionConfirmData from "../../../model/styling/props_data/SelectionConfirmData";
import SelectionConfirmCallback from "../callback/SelectionConfirmCallback";
import ArrangeData from "../../../model/styling/arrange/props_data/ArrangeData";
import ArrangeCallback from "../arrange/callback/ArrangeCallback";
import { MainContentType } from "../../../model/styling/MainContentType";

export interface StylingHandler {
  mainContentType: MainContentType | undefined;
  karteContainerData: () => KarteContainerData;
  karteContainerCallback: () => KarteContainerCallback;
  itemBrowseCallback: () => ItemBrowseCallback;
  selectionConfirmData: () => SelectionConfirmData;
  selectionConfirmCallback: () => SelectionConfirmCallback;
  arrangeData: () => ArrangeData;
  arrangeCallback: () => ArrangeCallback;
  currentSelectedItem: () => SelectedItem | null;
}

export const useStylingHandler = (): StylingHandler => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainContentType, setMainContentType] = useState<MainContentType>();

  const karteContainerData = (): KarteContainerData => {
    return { selectedIndex: currentIndex, items: selectedItems };
  };

  const karteContainerCallback = (): KarteContainerCallback => {
    return {
      selectionProgressCallback: {
        onSelect: (index: number) => setCurrentIndex(index),
        onClickCompleteButton: () =>
          setMainContentType(MainContentType.Confirm),
      },
      onKarteFetched: (
        isItemRegistered: boolean,
        registeredItems: SelectedItem[]
      ) => {
        if (isItemRegistered) {
          setSelectedItems(registeredItems);
          setCurrentIndex(registeredItems.length);
        }
        setMainContentType(MainContentType.Browse);
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
      onCancelSelection: () => setMainContentType(MainContentType.Browse),
      onConfirmSelection: () => setMainContentType(MainContentType.Arrange),
    };
  };

  const arrangeData = (): ArrangeData => {
    return {
      items: selectedItems,
    };
  };

  const arrangeCallback = (): ArrangeCallback => {
    return {
      onClickBackButton: () => setMainContentType(MainContentType.Confirm),
    };
  };

  const currentSelectedItem = (): SelectedItem | null => {
    if (currentIndex >= selectedItems.length) {
      return null;
    } else {
      return selectedItems[currentIndex];
    }
  };

  return {
    mainContentType,
    karteContainerData,
    karteContainerCallback,
    itemBrowseCallback,
    selectionConfirmData,
    selectionConfirmCallback,
    arrangeData,
    arrangeCallback,
    currentSelectedItem,
  };
};
