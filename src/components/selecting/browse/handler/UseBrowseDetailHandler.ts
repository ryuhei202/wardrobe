import { AxiosError } from "axios";
import { TItem } from "./../../../../model/selecting/TItem";
import { useState } from "react";
import { DetailItemTableCallback } from "../callback/DetailItemTableCallback";
import { DetailSizeButtonArrayCallback } from "../callback/DetailSizeButtonArrayCallback";
import { DetailSizeButtonData } from "../../../../model/selecting/browse/props_data/DetailSizeButtonData";
import { DetailItemTableData } from "../../../../model/selecting/browse/props_data/DetailItemTableData";
import { DetailResponse } from "../../../../model/api/response/styling/browse/DetailResponse";
import { BrowseDetailCallback } from "../callback/BrowseDetailCallback";
import { PartSize } from "../../../../model/selecting/PartSize";
import { DetailSizeItemRecordResponse } from "../../../../model/api/response/styling/browse/DetailSizeItemRecordResponse";
import { ValidationDialogCallback } from "../callback/ValidationDialogCallback";
import { ValidationError } from "../../../../model/selecting/browse/ValidationError";
import { DetailStatus } from "../../../../model/selecting/browse/DetailStatus";
import { useBrowsesSelect } from "../../../../hooks/api/UseBrowsesSelect";
import { useContextDefinedState } from "../../../context/UseContextDefinedState";
import {
  ChartIdContext,
  CoordinateIdContext,
} from "../../../context/provider/ContextProvider";
import { useQueryClient } from "react-query";

export interface BrowseDetailHandler {
  selectedItem: TItem | null;
  currentValidationErrors: ValidationError[];
  detailStatus: DetailStatus;
  isPostLoading: boolean;
  postError: AxiosError | null;
  resetPostError: () => void;
  onClickSelectItemButton: () => void;
  detailSizeButtonArrayCallback: () => DetailSizeButtonArrayCallback;
  detailItemTableCallback: () => DetailItemTableCallback;
  validationDialogCallback: () => ValidationDialogCallback;
  selectedSizeName: () => string;
  selectedItemId: () => string;
  isSelectItemButtonDisabled: () => boolean;
  detailSizeButtonArrayData: () => DetailSizeButtonData[];
  detailItemTableData: () => DetailItemTableData;
}

export const useBrowseDetailHandler = (
  detail: DetailResponse,
  callback: BrowseDetailCallback,
  previousItemId?: number
): BrowseDetailHandler => {
  const chartId = useContextDefinedState(ChartIdContext);
  const coordinateId = useContextDefinedState(CoordinateIdContext);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);
  const [currentValidationErrors, setCurrentValidationErrors] = useState<
    ValidationError[]
  >([]);
  const [detailStatus, setDetailStatus] = useState<DetailStatus>(
    DetailStatus.Browsing
  );
  const {
    mutate,
    error: postError,
    isLoading: isPostLoading,
    reset: resetPostError,
  } = useBrowsesSelect();
  const queryClient = useQueryClient();

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
    if (currentValidationErrors.length === 0) {
      if (selectedItem) {
        mutate(
          { itemId: selectedItem.id, coordinateId, chartId, previousItemId },
          {
            onSuccess: () => {
              if (selectedItem) {
                callback.onSelectItem();
                queryClient.invalidateQueries(
                  `coordinates/${coordinateId}/coordinate_items`
                );
              }
            },
          }
        );
      }
    } else {
      setDetailStatus(DetailStatus.Validating);
    }
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
        if (selectedSizeIndex !== null) {
          const selectedSize = detail.sizes[selectedSizeIndex];
          const columns = selectedSize.columns;
          const itemRecord = selectedSize.itemRecords[index];
          setCurrentValidationErrors(itemRecord.validationErrors);
          setSelectedItem({
            id: itemRecord.itemId,
            imagePath: detail.itemImagePath,
            partSizes: createPartSizes(columns, itemRecord),
            locationName: itemRecord.locationName,
            categoryName: detail.categoryName,
            mainColorName: detail.mainColor.name,
            subColorName: detail.subColor.name,
            brandName: detail.brandName,
            patternName: detail.patternName,
            size: selectedSize.name,
            dropSize: detail.dropSize,
          });
        } else {
          const unsizedItemRecords = detail.unsizedItemRecords[index];
          setCurrentValidationErrors(unsizedItemRecords.validationErrors);
          setSelectedItem({
            id: unsizedItemRecords.itemId,
            imagePath: detail.itemImagePath,
            partSizes: createPartSizes([], unsizedItemRecords),
            locationName: unsizedItemRecords.locationName,
            categoryName: detail.categoryName,
            mainColorName: detail.mainColor.name,
            subColorName: detail.subColor.name,
            brandName: detail.brandName,
            patternName: detail.patternName,
            size: "なし",
            dropSize: detail.dropSize,
          });
        }
      },
    };
  };

  const validationDialogCallback = (): ValidationDialogCallback => {
    return {
      onClickCancelButton: () => setDetailStatus(DetailStatus.Browsing),
      onClickSelectButton: () => {
        setDetailStatus(DetailStatus.Browsing);
        if (selectedItem) {
          mutate(
            { itemId: selectedItem.id, coordinateId, chartId, previousItemId },
            {
              onSuccess: () => {
                if (selectedItem) {
                  callback.onSelectItem();
                  queryClient.invalidateQueries(
                    `coordinates/${coordinateId}/coordinate_items`
                  );
                }
              },
            }
          );
        }
      },
    };
  };

  const selectedSizeName = (): string => {
    if (selectedSizeIndex === null) return "";
    return detail.sizes[selectedSizeIndex].name;
  };

  const selectedItemId = (): string => {
    return selectedItem?.id.toString() ?? "";
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
          isSelected: selectedItem?.id === item.itemId ?? false,
          rank: item.rank,
        };
      }),
    };
  };

  return {
    selectedItem,
    currentValidationErrors,
    detailStatus,
    isPostLoading,
    postError,
    resetPostError,
    onClickSelectItemButton,
    detailSizeButtonArrayCallback,
    detailItemTableCallback,
    validationDialogCallback,
    selectedSizeName,
    selectedItemId,
    isSelectItemButtonDisabled,
    detailSizeButtonArrayData,
    detailItemTableData,
  };
};
