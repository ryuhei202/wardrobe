import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { useItemsUpdate } from "../../../hooks/api/UseItemUpdate";
import { DetailResponse } from "../../../model/api/response/styling/browse/DetailResponse";
import { DetailSizeItemRecordResponse } from "../../../model/api/response/styling/browse/DetailSizeItemRecordResponse";
import { PartSize } from "../../../model/selecting/PartSize";
import { TItem } from "../../../model/selecting/TItem";
import { Refinement } from "../../../model/selecting/browse/Refinement";
import { DetailItemTableData } from "../../../model/selecting/browse/props_data/DetailItemTableData";
import { DetailSizeButtonData } from "../../../model/selecting/browse/props_data/DetailSizeButtonData";
import { RentalIdContext } from "../../context/RentalContextProvider";
import { DetailItemTableCallback } from "../../selecting/browse/callback/DetailItemTableCallback";
import { DetailSizeButtonArrayCallback } from "../../selecting/browse/callback/DetailSizeButtonArrayCallback";

type TArgs = {
  detail: DetailResponse;
  defaultRefinement: Refinement;
  onClickBackButton: () => void;
  onChangeCurrentRefinement: (refinement: Refinement) => void;
  onItemSelect: () => void;
  currentItemId?: number;
};

export const useRentalDetailHandler = ({
  detail,
  defaultRefinement,
  onClickBackButton,
  onChangeCurrentRefinement,
  onItemSelect,
  currentItemId,
}: TArgs) => {
  const { rentalId } = useContext(RentalIdContext);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>();
  const [selectedItem, setSelectedItem] = useState<Omit<TItem, "rank"> | null>(
    null,
  );
  const {
    mutate,
    isLoading: isPatchLoading,
    error: patchError,
  } = useItemsUpdate({
    rentalId,
    itemId: selectedItem?.id ?? 0,
  });
  const queryClient = useQueryClient();

  const selectedSizeName = (): string => {
    if (selectedSizeIndex === undefined) return "";
    return detail.sizes[selectedSizeIndex].name;
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

  const detailSizeButtonArrayCallback = (): DetailSizeButtonArrayCallback => {
    return {
      onSelect: (index: number) => {
        setSelectedSizeIndex(index);
        setSelectedItem(null);
      },
    };
  };

  const selectedItemId = (): string => {
    return selectedItem?.id.toString() ?? "";
  };

  const detailItemTableData = (): DetailItemTableData => {
    const columns =
      selectedSizeIndex === undefined
        ? []
        : detail.sizes[selectedSizeIndex].columns;
    const itemRecords =
      selectedSizeIndex === undefined
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

  const createPartSizes = (
    columns: string[],
    itemRecord: DetailSizeItemRecordResponse,
  ): PartSize[] => {
    return columns.map((column, index) => {
      return {
        name: column,
        value: itemRecord.values[index],
      };
    });
  };

  const detailItemTableCallback = (): DetailItemTableCallback => {
    return {
      onSelect: (index: number) => {
        if (selectedSizeIndex !== undefined) {
          const selectedSize = detail.sizes[selectedSizeIndex];
          const columns = selectedSize.columns;
          const itemRecord = selectedSize.itemRecords[index];
          setSelectedItem({
            id: itemRecord.itemId,
            imagePath: detail.itemImagePath,
            partSizes: createPartSizes(columns, itemRecord),
            locationId: itemRecord.locationId,
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
          setSelectedItem({
            id: unsizedItemRecords.itemId,
            imagePath: detail.itemImagePath,
            partSizes: createPartSizes([], unsizedItemRecords),
            locationId: unsizedItemRecords.locationId,
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

  const isSelectItemButtonDisabled = (): boolean => {
    return selectedItem === undefined;
  };

  const onClickSelectItemButton = () => {
    if (selectedItem) {
      mutate(
        { previousItemId: currentItemId },
        {
          onSuccess: () => {
            if (selectedItem) {
              queryClient.invalidateQueries(
                `rentals/${rentalId}/rental_coordinate`,
              );
              onClickBackButton();
              onChangeCurrentRefinement(defaultRefinement);
            }
          },
        },
      );
    }
  };

  return {
    selectedSizeName,
    detailSizeButtonArrayData,
    detailSizeButtonArrayCallback,
    selectedItemId,
    detailItemTableData,
    detailItemTableCallback,
    isSelectItemButtonDisabled,
    onClickSelectItemButton,
    isPatchLoading,
    patchError,
  };
};
