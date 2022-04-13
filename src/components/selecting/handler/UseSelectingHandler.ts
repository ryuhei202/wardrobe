import { KarteShowResponse } from "./../../../model/api/response/styling/karte/KarteShowResponse";
import { useState } from "react";
import { ItemBrowseCallback } from "../browse/callback/ItemBrowseCallback";
import { SelectedItem } from "../../../model/selecting/SelectedItem";
import { SelectionConfirmData } from "../../../model/selecting/props_data/SelectionConfirmData";
import { SelectionConfirmCallback } from "../callback/SelectionConfirmCallback";
import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { ArrangeCallback } from "../arrange/callback/ArrangeCallback";
import { MainContentType } from "../../../model/selecting/MainContentType";
import { SelectionProgressData } from "../../../model/selecting/props_data/SelectionProgressData";
import { SelectionProgressCallback } from "../callback/SelectionProgressCallback";

export interface SelectingHandler {
  mainContentType: MainContentType | undefined;
  selectionProgressData: () => SelectionProgressData;
  selectionProgressCallback: () => SelectionProgressCallback;
  itemBrowseCallback: () => ItemBrowseCallback;
  selectionConfirmData: () => SelectionConfirmData;
  selectionConfirmCallback: () => SelectionConfirmCallback;
  arrangeData: () => ArrangeData;
  arrangeCallback: () => ArrangeCallback;
  currentSelectedItem: () => SelectedItem | null;
}

export const useSelectingHandler = (
  response: KarteShowResponse
): SelectingHandler => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
    response.registeredItems
  );
  const [currentIndex, setCurrentIndex] = useState<number>(
    response.registeredItems.length >= response.defaultItemNum
      ? response.registeredItems.length - 1
      : response.registeredItems.length
  );
  const [mainContentType, setMainContentType] = useState<MainContentType>(
    response.registeredItems.length
      ? MainContentType.Confirm
      : MainContentType.Browse
  );
  const [rentableItemNum, setRentableItemNum] = useState<number>(
    response.registeredItems.length >= response.defaultItemNum
      ? response.registeredItems.length
      : response.defaultItemNum
  );

  const selectionProgressData = (): SelectionProgressData => {
    return {
      selectedIndex: currentIndex,
      items: selectedItems,
      rentableItemNum: rentableItemNum,
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
    selectionProgressCallback,
    itemBrowseCallback,
    selectionConfirmData,
    selectionConfirmCallback,
    arrangeData,
    arrangeCallback,
    currentSelectedItem,
  };
};
