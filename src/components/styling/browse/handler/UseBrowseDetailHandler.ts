import { useState } from "react";
import DetailItemTableCallback from "../callback/DetailItemTableCallback";
import DetailSizeButtonArrayCallback from "../callback/DetailSizeButtonArrayCallback";
import DetailSizeButtonData from "../../../../model/styling/browse/props_data/DetailSizeButtonData";
import DetailItemTableData from "../../../../model/styling/browse/props_data/DetailItemTableData";
import DetailResponse from "../../../../model/api/response/styling/browse/DetailResponse";
import BrowseDetailCallback from "../callback/BrowseDetailCallback";
import SelectedItem from "../../../../model/styling/SelectedItem";
import PartSize from "../../../../model/styling/PartSize";
import DetailSizeItemRecordResponse from "../../../../model/api/response/styling/browse/DetailSizeItemRecordResponse";

export interface BrowseDetailHandler {
  onClickSelectItemButton: () => void;
  detailSizeButtonArrayCallback: () => DetailSizeButtonArrayCallback;
  detailItemTableCallback: () => DetailItemTableCallback;
  selectedSizeName: () => string;
  selectedItemId: () => string;
  isSelectItemButtonDisabled: () => boolean;
  detailSizeButtonArrayData: () => DetailSizeButtonData[];
  detailItemTableData: () => DetailItemTableData;
}

export const useBrowseDetailHandler = (
  detail: DetailResponse,
  callback: BrowseDetailCallback
): BrowseDetailHandler => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const createPartSizes = (
    columns: string[],
    itemRecord: DetailSizeItemRecordResponse
  ): PartSize[] => {
    return columns.map((column, index) => {
      return {
        name: column,
        value: itemRecord.values[index],
      };
    });
  };

  const onClickSelectItemButton = () => {
    if (selectedItem) callback.onSelectItem(selectedItem);
  };

  const detailSizeButtonArrayCallback = (): DetailSizeButtonArrayCallback => {
    return {
      onSelect: (index: number) => {
        setSelectedSizeIndex(index);
        setSelectedItem(null);
      },
    };
  };

  const detailItemTableCallback = (): DetailItemTableCallback => {
    return {
      onSelect: (index: number) => {
        if (selectedSizeIndex) {
          const columns = detail.sizes[selectedSizeIndex].columns;
          const itemRecord = detail.sizes[selectedSizeIndex].itemRecords[index];
          setSelectedItem({
            itemId: itemRecord.itemId,
            itemImagePath: detail.itemImagePath,
            partSizes: createPartSizes(columns, itemRecord),
          });
        }
      },
    };
  };

  const selectedSizeName = (): string => {
    if (selectedSizeIndex === null) return "";
    return detail.sizes[selectedSizeIndex].name;
  };

  const selectedItemId = (): string => {
    return selectedItem?.itemId.toString() ?? "";
  };

  const isSelectItemButtonDisabled = (): boolean => {
    return selectedItem === null;
  };

  const detailSizeButtonArrayData = (): DetailSizeButtonData[] => {
    return detail.sizes.map((size, index) => {
      return {
        name: size.name,
        isSelected: selectedSizeIndex === index,
        isDisabled: size.itemRecords.length === 0,
      };
    });
  };

  const detailItemTableData = (): DetailItemTableData => {
    if (selectedSizeIndex === null) return { columns: [], rows: [] };
    return {
      columns: detail.sizes[selectedSizeIndex].columns,
      rows: detail.sizes[selectedSizeIndex].itemRecords.map((item) => {
        return {
          itemId: item.itemId,
          values: item.values,
          isSelected: selectedItem?.itemId === item.itemId ?? false,
        };
      }),
    };
  };

  return {
    onClickSelectItemButton,
    detailSizeButtonArrayCallback,
    detailItemTableCallback,
    selectedSizeName,
    selectedItemId,
    isSelectItemButtonDisabled,
    detailSizeButtonArrayData,
    detailItemTableData,
  };
};
