import { useState } from "react";
import BrowseDetailCallback from "../callback/BrowseDetailCallback";
import BrowseIndexCallback from "../callback/BrowseIndexCallback";
import ItemBrowseCallback from "../callback/ItemBrowseCallback";

export interface ItemBrowseHandler {
  selectedPreregisteredItemId: number | null;
  browseIndexCallback: () => BrowseIndexCallback;
  browseDetailCallback: () => BrowseDetailCallback;
}

export const useItemBrowseHandler = (
  callback: ItemBrowseCallback
): ItemBrowseHandler => {
  const [
    selectedPreregisteredItemId,
    setSelectedPreregisteredItemId,
  ] = useState<number | null>(null);

  const browseIndexCallback = (): BrowseIndexCallback => {
    return {
      itemCardCollectionCallback: {
        onSelect: (preregisteredItemId: number) => {
          setSelectedPreregisteredItemId(preregisteredItemId);
        },
      },
    };
  };

  const browseDetailCallback = (): BrowseDetailCallback => {
    return {
      onClickBackButton: () => setSelectedPreregisteredItemId(null),
      onSelectItem: callback.onSelectItem,
    };
  };

  return {
    selectedPreregisteredItemId,
    browseIndexCallback,
    browseDetailCallback,
  };
};
