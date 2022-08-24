import { TCoordinateFootwearsShowResponse } from "./../../../model/api/response/styling/coordinateFootwear/TCoordianteFootwearsShowResponse";
import { TItem } from "./../../../model/selecting/TItem";
import { useEffect, useState } from "react";
import { ItemBrowseCallback } from "../browse/callback/ItemBrowseCallback";
import { SelectionConfirmData } from "../../../model/selecting/props_data/SelectionConfirmData";
import { SelectionConfirmCallback } from "../callback/SelectionConfirmCallback";
import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { ArrangeCallback } from "../arrange/callback/ArrangeCallback";
import { MainContentType } from "../../../model/selecting/MainContentType";
import { SelectionProgressData } from "../../../model/selecting/props_data/SelectionProgressData";
import { SelectionProgressCallback } from "../callback/SelectionProgressCallback";
import { TCoordinateItem } from "../../../model/coordinateItem/TCoordinateItem";

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
  coordinateItemsIndexResponse: TCoordinateItem[],
  coordinateFootwearShowData: TCoordinateFootwearsShowResponse
): SelectingHandler => {
  const selectedItems = coordinateItemsIndexResponse;
  const [currentIndex, setCurrentIndex] = useState<number>(
    coordinateItemsIndexResponse.length >= defaultItemNum
      ? coordinateItemsIndexResponse.length - 1
      : coordinateItemsIndexResponse.length
  );
  const [mainContentType, setMainContentType] = useState<MainContentType>(
    coordinateItemsIndexResponse.length >= defaultItemNum &&
      coordinateFootwearShowData.coordinateFootwear !== null
      ? MainContentType.Confirm
      : MainContentType.Browse
  );
  const [rentableItemNum, setRentableItemNum] = useState<number>(
    coordinateItemsIndexResponse.length >= defaultItemNum
      ? coordinateItemsIndexResponse.length
      : defaultItemNum
  );

  useEffect(() => {
    if (coordinateItemsIndexResponse.length < defaultItemNum) {
      setRentableItemNum(defaultItemNum);
    }
  }, [defaultItemNum, setRentableItemNum, coordinateItemsIndexResponse.length]);

  const selectionProgressData = (): SelectionProgressData => {
    return {
      selectedIndex: currentIndex,
      items: selectedItems,
      rentableItemNum: rentableItemNum,
      selectedFootwear: coordinateFootwearShowData.coordinateFootwear,
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
      selectedFootwear: coordinateFootwearShowData.coordinateFootwear,
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
