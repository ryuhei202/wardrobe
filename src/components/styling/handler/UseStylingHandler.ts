import { useState } from "react";
import ItemBrowseCallback from "../browse/callback/ItemBrowseCallback";
import SelectedItem from "../../../model/styling/SelectedItem";
import KarteContainerCallback from "../karte/callback/KarteContainerCallback";
import SelectionConfirmData from "../../../model/styling/props_data/SelectionConfirmData";
import SelectionConfirmCallback from "../callback/SelectionConfirmCallback";
import ArrangeData from "../../../model/styling/arrange/props_data/ArrangeData";
import ArrangeCallback from "../arrange/callback/ArrangeCallback";
import { MainContentType } from "../../../model/styling/MainContentType";
import SelectionProgressData from "../../../model/styling/props_data/SelectionProgressData";
import SelectionProgressCallback from "../callback/SelectionProgressCallback";

export interface StylingHandler {
  mainContentType: MainContentType | undefined;
  selectionProgressData: () => SelectionProgressData;
  karteContainerCallback: () => KarteContainerCallback;
  selectionProgressCallback: () => SelectionProgressCallback;
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
  const [rentableItemNum, setRentableItemNum] = useState(0);

  const selectionProgressData = (): SelectionProgressData => {
    return {
      selectedIndex: currentIndex,
      items: selectedItems,
      rentableItemNum: rentableItemNum,
    };
  };

  const karteContainerCallback = (): KarteContainerCallback => {
    return {
      onKarteFetched: (
        isItemRegistered: boolean,
        registeredItems: SelectedItem[],
        rentableItemNum: number
      ) => {
        setRentableItemNum(rentableItemNum);
        if (isItemRegistered) {
          setSelectedItems(registeredItems);
          if (registeredItems.length >= rentableItemNum) {
            setCurrentIndex(rentableItemNum - 1);
          } else {
            setCurrentIndex(registeredItems.length);
          }
        }
        setMainContentType(MainContentType.Browse);
      },
    };
  };

  const selectionProgressCallback = (): SelectionProgressCallback => {
    return {
      onSelect: (index: number) => setCurrentIndex(index),
      onClickCompleteButton: () => setMainContentType(MainContentType.Confirm),
      onAddItemNum: () => {
        const newRentableNum = rentableItemNum + 1;
        setRentableItemNum(newRentableNum);
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
        if (newSelectedItems.length >= rentableItemNum) {
          setCurrentIndex(rentableItemNum - 1);
        } else {
          setCurrentIndex(newSelectedItems.length);
        }
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
    selectionProgressData,
    karteContainerCallback,
    selectionProgressCallback,
    itemBrowseCallback,
    selectionConfirmData,
    selectionConfirmCallback,
    arrangeData,
    arrangeCallback,
    currentSelectedItem,
  };
};
