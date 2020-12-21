import { useState } from "react";
import SelectionProgressData from "../../../model/styling/props_data/SelectionProgressData";
import SelectionProgressCallback from "../callback/SelectionProgressCallback";
import ItemBrowseCallback from "../browse/callback/ItemBrowseCallback";
import SelectedItem from "../../../model/styling/SelectedItem";

export interface StylingHandler {
  selectionProgressData: () => SelectionProgressData;
  selectionProgressCallback: () => SelectionProgressCallback;
  itemBrowseCallback: () => ItemBrowseCallback;
}

export const useStylingHandler = (): StylingHandler => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectionProgressData = (): SelectionProgressData => {
    return { selectedIndex: currentIndex, items: selectedItems };
  };

  const selectionProgressCallback = (): SelectionProgressCallback => {
    return {
      onSelect: (index: number) => {
        setCurrentIndex(index);
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

  return {
    selectionProgressData,
    selectionProgressCallback,
    itemBrowseCallback,
  };
};
