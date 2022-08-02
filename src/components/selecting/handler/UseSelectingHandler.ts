import { TItem } from "./../../../model/selecting/TItem";
import { CoordinateItemsIndexResponse } from "./../../../model/api/response/styling/coordinateItem/CoordinateItemsIndexResponse";
import { useState } from "react";
import { ItemBrowseCallback } from "../browse/callback/ItemBrowseCallback";
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
  currentSelectedItem: () => TItem | null;
}

export const useSelectingHandler = (
  defaultItemNum: number,
  coordinateItemsIndexResponse: CoordinateItemsIndexResponse
): SelectingHandler => {
  const selectedItems = coordinateItemsIndexResponse.coordinateItems;
  const [currentIndex, setCurrentIndex] = useState<number>(
    coordinateItemsIndexResponse.coordinateItems.length >= defaultItemNum
      ? coordinateItemsIndexResponse.coordinateItems.length - 1
      : coordinateItemsIndexResponse.coordinateItems.length
  );
  const [mainContentType, setMainContentType] = useState<MainContentType>(
    coordinateItemsIndexResponse.coordinateItems.length >= defaultItemNum
      ? MainContentType.Confirm
      : MainContentType.Browse
  );
  const [rentableItemNum, setRentableItemNum] = useState<number>(
    coordinateItemsIndexResponse.coordinateItems.length >= defaultItemNum
      ? coordinateItemsIndexResponse.coordinateItems.length
      : defaultItemNum
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
      onSelectItem: () => {
        if (selectedItems.length >= rentableItemNum) {
          setCurrentIndex(rentableItemNum - 1);
        } else {
          setCurrentIndex(selectedItems.length);
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

  const currentSelectedItem = (): TItem | null => {
    if (currentIndex >= selectedItems.length) {
      return null;
    } else {
      return selectedItems[currentIndex].itemInfo;
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
