import { useEffect, useState } from "react";
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
  const selectionProgressData = (): SelectionProgressData => {
    return { selectedIndex: 0, items: [] };
  };

  const selectionProgressCallback = (): SelectionProgressCallback => {
    return {
      onSelect: (index: number) => {
        console.log(index);
      },
    };
  };

  const itemBrowseCallback = (): ItemBrowseCallback => {
    return {
      onSelectItem: (item: SelectedItem) => {
        console.log(item);
      },
    };
  };

  return {
    selectionProgressData,
    selectionProgressCallback,
    itemBrowseCallback,
  };
};
