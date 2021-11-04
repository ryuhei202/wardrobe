import { useState } from "react";
import { DetailItemTableCallback } from "../callback/DetailItemTableCallback";
import { DetailSizeButtonArrayCallback } from "../callback/DetailSizeButtonArrayCallback";
import { DetailSizeButtonData } from "../../../../model/styling/browse/props_data/DetailSizeButtonData";
import { DetailItemTableData } from "../../../../model/styling/browse/props_data/DetailItemTableData";
import { DetailResponse } from "../../../../model/api/response/styling/browse/DetailResponse";
import { BrowseDetailCallback } from "../callback/BrowseDetailCallback";
import { SelectedItem } from "../../../../model/styling/SelectedItem";
import { PartSize } from "../../../../model/styling/PartSize";
import { DetailSizeItemRecordResponse } from "../../../../model/api/response/styling/browse/DetailSizeItemRecordResponse";
import { ValidationDialogCallback } from "../callback/ValidationDialogCallback";
import { ValidationError } from "../../../../model/styling/browse/ValidationError";
import { DetailStatus } from "../../../../model/styling/browse/DetailStatus";
import { PostSelectCallback } from "../callback/PostSelectCallback";

export interface BrowseDetailHandler {
  selectedItem: SelectedItem | null;
  currentValidationErrors: ValidationError[];
  detailStatus: DetailStatus;
  onClickSelectItemButton: () => void;
  detailSizeButtonArrayCallback: () => DetailSizeButtonArrayCallback;
  detailItemTableCallback: () => DetailItemTableCallback;
  validationDialogCallback: () => ValidationDialogCallback;
  postSelectCallback: () => PostSelectCallback;
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
  const [currentValidationErrors, setCurrentValidationErrors] = useState<
    ValidationError[]
  >([]);
  const [detailStatus, setDetailStatus] = useState<DetailStatus>(
    DetailStatus.Browsing
  );

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

  const onClickSelectItemButton = () =>
    setDetailStatus(DetailStatus.Validating);

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
        if (selectedSizeIndex !== null) {
          const selectedSize = detail.sizes[selectedSizeIndex];
          const columns = selectedSize.columns;
          const itemRecord = selectedSize.itemRecords[index];
          setCurrentValidationErrors(itemRecord.validationErrors);
          setSelectedItem({
            itemId: itemRecord.itemId,
            itemImagePath: detail.itemImagePath.original,
            partSizes: createPartSizes(columns, itemRecord),
            locationName: itemRecord.locationName,
            categoryName: detail.categoryName,
          });
        } else {
          const unsizedItemRecords = detail.unsizedItemRecords[index];
          setCurrentValidationErrors(unsizedItemRecords.validationErrors);
          setSelectedItem({
            itemId: unsizedItemRecords.itemId,
            itemImagePath: detail.itemImagePath.original,
            partSizes: createPartSizes([], unsizedItemRecords),
            locationName: unsizedItemRecords.locationName,
            categoryName: detail.categoryName,
          });
        }
      },
    };
  };

  const validationDialogCallback = (): ValidationDialogCallback => {
    return {
      onClickCancelButton: () => setDetailStatus(DetailStatus.Browsing),
      onClickSelectButton: () => setDetailStatus(DetailStatus.Selecting),
    };
  };

  const postSelectCallback = (): PostSelectCallback => {
    return {
      onSuccess: () => {
        if (selectedItem) callback.onSelectItem(selectedItem);
      },
      onFailure: () => setDetailStatus(DetailStatus.Browsing),
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
    const columns =
      selectedSizeIndex === null ? [] : detail.sizes[selectedSizeIndex].columns;
    const itemRecords =
      selectedSizeIndex === null
        ? detail.unsizedItemRecords
        : detail.sizes[selectedSizeIndex].itemRecords;
    return {
      columns: columns,
      rows: itemRecords.map((item) => {
        return {
          itemId: item.itemId,
          values: item.values,
          isSelected: selectedItem?.itemId === item.itemId ?? false,
        };
      }),
    };
  };

  return {
    selectedItem,
    currentValidationErrors,
    detailStatus,
    onClickSelectItemButton,
    detailSizeButtonArrayCallback,
    detailItemTableCallback,
    validationDialogCallback,
    postSelectCallback,
    selectedSizeName,
    selectedItemId,
    isSelectItemButtonDisabled,
    detailSizeButtonArrayData,
    detailItemTableData,
  };
};
