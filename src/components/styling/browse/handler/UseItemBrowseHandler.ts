import { useCategoryRefinementHandler } from "./UseCategoryRefinementHandler";
import { useState } from "react";
import { FilterChoiceResponse } from "../../../../model/api/response/styling/browse/FilterChoiceResponse";
import AppliedFilterData from "../../../../model/styling/browse/props_data/AppliedFilterData";
import FilterGroupCollectionData from "../../../../model/styling/browse/props_data/FilterGroupCollectionData";
import Refinement from "../../../../model/styling/browse/Refinement";
import AppliedFiltersCallback from "../callback/AppliedFiltersCallback";
import FilterGroupCollectionCallback from "../callback/FilterGroupCollectionCallback";
import { useSizeRefinementHandler } from "./UseSizeRefinementHandler";
import { useColorRefinementHandler } from "./UseColorRefinementHandler";
import { usePatternRefinementHandler } from "./UsePatternRefinementHandler";
import { useLogoRefinementHandler } from "./UseLogoRefinementHandler";
import { useOptionRefinementHandler } from "./UseOptionRefinementHandler";
import RefinementChoiceResponse from "../../../../model/api/response/styling/browse/RefinementChoiceResponse";
import ItemCardCollectionCallback from "../callback/ItemCardCollectionCallback";
import BrowseDetailCallback from "../callback/BrowseDetailCallback";
import ItemBrowseCallback from "../callback/ItemBrowseCallback";
import ItemBrowsePaginationCallback from "../callback/ItemBrowsePaginationCallback";
import SelectedItem from "../../../../model/styling/SelectedItem";
import { ValueRefinement } from "../../../../model/styling/browse/ValueRefinement";
import { usePartSizeRefinementHandler } from "./UsePartSizeRefinementHandler";
import { useDropSizeRefinementHandler } from "./UseDropSizeRefinementHandler";
import { useNgRefinementHandler } from "./UseNgRefinementHandler";
import { SelectChangeEvent } from "@mui/material";

export interface ItemBrowseHandler {
  currentRefinement: Refinement;
  selectedPreregisteredItemId: number | null;
  onSortChanged: () => (event: SelectChangeEvent<string | number>) => void;
  paginationCallback: () => ItemBrowsePaginationCallback;
  filterGroupCollectionCallback: () => FilterGroupCollectionCallback;
  appliedFiltersCallback: () => AppliedFiltersCallback;
  itemCardCollectionCallback: () => ItemCardCollectionCallback;
  browseDetailCallback: () => BrowseDetailCallback;
  filterGroupCollectionData: () => FilterGroupCollectionData;
  appliedFilterArrayData: () => AppliedFilterData[];
  selectedSortIndex: () => number;
  sortSelection: () => string[];
}

export const useItemBrowseHandler = (
  choice: RefinementChoiceResponse,
  callback: ItemBrowseCallback
): ItemBrowseHandler => {
  const [currentRefinement, setCurrentRefinement] = useState<Refinement>(
    choice.defaultRefinement
  );
  const [
    selectedPreregisteredItemId,
    setSelectedPreregisteredItemId,
  ] = useState<number | null>(null);

  const onLargeCategoryChanged = (newId: number | null) => {
    const newRefinement = {
      ...currentRefinement,
      largeCategoryId: newId,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onMediumCategoryChanged = (newId: number | null) => {
    const newRefinement = {
      ...currentRefinement,
      mediumCategoryId: newId,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onSmallCategoryChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      smallCategoryIds: newIds,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onMediumCategoryCancelled = () => {
    const newRefinement = {
      ...currentRefinement,
      mediumCategoryId: null,
      smallCategoryIds: [],
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onSizeChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      sizeIds: newIds,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onPartSizeChanged = (newValues: ValueRefinement[]) => {
    const newRefinement = {
      ...currentRefinement,
      partSizes: newValues,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onColorChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      colorIds: newIds,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onPatternChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      patternIds: newIds,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onLogoChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      logoIds: newIds,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onDropSizeChanged = (newSizes: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      dropSizes: newSizes,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onNgChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      ngIds: newIds,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const onOptionChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      optionIds: newIds,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const categoryHandler = useCategoryRefinementHandler({
    onLargeCategoryChange: onLargeCategoryChanged,
    onMediumCategoryChange: onMediumCategoryChanged,
    onSmallCategoryChange: onSmallCategoryChanged,
    onMediumCategoryCancelled: onMediumCategoryCancelled,
  });
  const sizeHandler = useSizeRefinementHandler(onSizeChanged);
  const partSizeHandler = usePartSizeRefinementHandler(onPartSizeChanged);
  const colorHandler = useColorRefinementHandler(onColorChanged);
  const patternHandler = usePatternRefinementHandler(onPatternChanged);
  const logoHandler = useLogoRefinementHandler(onLogoChanged);
  const dropSizeHandler = useDropSizeRefinementHandler(onDropSizeChanged);
  const ngHandler = useNgRefinementHandler(onNgChanged);
  const optionHandler = useOptionRefinementHandler(onOptionChanged);

  const getAppliedFilterData = (
    choice: FilterChoiceResponse
  ): AppliedFilterData[] => {
    let result: AppliedFilterData[] = [];

    if (currentRefinement.itemId !== null) {
      result = result.concat({
        name: `アイテムID：${currentRefinement.itemId}`,
      });
    }

    const appliedCategories = categoryHandler.appliedFilters(
      choice.largeCategory,
      currentRefinement.largeCategoryId,
      currentRefinement.mediumCategoryId,
      currentRefinement.smallCategoryIds
    );
    if (appliedCategories.length) result = result.concat(appliedCategories);

    const appliedSizes = sizeHandler.appliedFilters(
      choice.size,
      currentRefinement.sizeIds
    );
    if (appliedSizes.length) result = result.concat(appliedSizes);

    const appliedPartSizes = partSizeHandler.appliedFilters(
      choice.partSize,
      currentRefinement.partSizes
    );
    if (appliedPartSizes.length) result = result.concat(appliedPartSizes);

    const appliedColors = colorHandler.appliedFilters(
      choice.color,
      currentRefinement.colorIds
    );
    if (appliedColors.length) result = result.concat(appliedColors);

    const appliedPatterns = patternHandler.appliedFilters(
      choice.pattern,
      currentRefinement.patternIds
    );
    if (appliedPatterns.length) result = result.concat(appliedPatterns);

    const appliedLogos = logoHandler.appliedFilters(
      choice.logo,
      currentRefinement.logoIds
    );
    if (appliedLogos.length) result = result.concat(appliedLogos);

    const appliedNgs = ngHandler.appliedFilters(
      choice.ng,
      currentRefinement.ngIds
    );
    if (appliedNgs.length) result = result.concat(appliedNgs);

    const appliedOptions = optionHandler.appliedFilters(
      choice.option,
      currentRefinement.optionIds
    );
    if (appliedOptions.length) result = result.concat(appliedOptions);

    return result;
  };

  const deleteAppliedFilter = (index: number) => {
    let currentIndex = 0;
    let newRefinement = currentRefinement;
    if (currentRefinement.itemId !== null) {
      if (currentIndex === index) {
        newRefinement = { ...currentRefinement, itemId: null, pageNo: 1 };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex++;
    }
    if (currentRefinement.smallCategoryIds.length > 0) {
      if (currentRefinement.smallCategoryIds.length + currentIndex >= index) {
        categoryHandler.deleteSmallCategoryFilter(
          currentRefinement.smallCategoryIds,
          index - currentIndex
        );
        return;
      }
      currentIndex += currentRefinement.smallCategoryIds.length;
    } else if (currentRefinement.mediumCategoryId !== null) {
      if (currentIndex === index) {
        categoryHandler.deleteMediumCategoryFilter();
        return;
      }
      currentIndex++;
    } else if (currentRefinement.largeCategoryId !== null) {
      if (currentIndex === index) {
        categoryHandler.deleteLargeCategoryFilter();
        return;
      }
      currentIndex++;
    }
    if (currentRefinement.sizeIds.length > 0) {
      if (currentRefinement.sizeIds.length - 1 + currentIndex >= index) {
        sizeHandler.deleteFilter(
          currentRefinement.sizeIds,
          index - currentIndex
        );
        return;
      }
      currentIndex += currentRefinement.sizeIds.length;
    }
    if (currentRefinement.partSizes.length > 0) {
      if (currentRefinement.partSizes.length - 1 + currentIndex >= index) {
        partSizeHandler.deleteFilter(
          currentRefinement.partSizes,
          index - currentIndex
        );
        return;
      }
      currentIndex += currentRefinement.partSizes.length;
    }
    if (currentRefinement.colorIds.length > 0) {
      if (currentRefinement.colorIds.length - 1 + currentIndex >= index) {
        colorHandler.deleteFilter(
          currentRefinement.colorIds,
          index - currentIndex
        );
        return;
      }
      currentIndex += currentRefinement.colorIds.length;
    }
    if (currentRefinement.patternIds.length > 0) {
      if (currentRefinement.patternIds.length - 1 + currentIndex >= index) {
        patternHandler.deleteFilter(
          currentRefinement.patternIds,
          index - currentIndex
        );
        return;
      }
      currentIndex += currentRefinement.patternIds.length;
    }
    if (currentRefinement.logoIds.length > 0) {
      if (currentRefinement.logoIds.length - 1 + currentIndex >= index) {
        logoHandler.deleteFilter(
          currentRefinement.logoIds,
          index - currentIndex
        );
        return;
      }
      currentIndex += currentRefinement.logoIds.length;
    }
    if (currentRefinement.ngIds.length > 0) {
      if (currentRefinement.ngIds.length - 1 + currentIndex >= index) {
        ngHandler.deleteFilter(currentRefinement.ngIds, index - currentIndex);
        return;
      }
      currentIndex += currentRefinement.ngIds.length;
    }
    if (currentRefinement.optionIds.length > 0) {
      if (currentRefinement.optionIds.length - 1 + currentIndex >= index) {
        optionHandler.deleteFilter(
          currentRefinement.optionIds,
          index - currentIndex
        );
        return;
      }
      currentIndex += currentRefinement.optionIds.length;
    }
  };

  const onSortChanged = () => (event: SelectChangeEvent<string | number>) => {
    const index = parseInt(event.target.value as string);
    const newRefinement = {
      ...currentRefinement,
      sortId: choice.sort[index].id,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
  };

  const paginationCallback = (): ItemBrowsePaginationCallback => {
    return {
      onPageChanged: (page: number) => {
        const newRefinement = { ...currentRefinement, pageNo: page };
        setCurrentRefinement(newRefinement);
      },
    };
  };

  const filterGroupCollectionCallback = (): FilterGroupCollectionCallback => {
    return {
      categoryCallback: categoryHandler.categoryCallback(
        choice.filter.largeCategory,
        currentRefinement.largeCategoryId,
        currentRefinement.mediumCategoryId,
        currentRefinement.smallCategoryIds
      ),
      sizeCallback: sizeHandler.sizeCallback(
        choice.filter.size,
        currentRefinement.sizeIds
      ),
      partSizeCallback: partSizeHandler.partSizeCallback(
        choice.filter.partSize,
        currentRefinement.partSizes
      ),
      colorCallback: colorHandler.colorCallback(
        choice.filter.color,
        currentRefinement.colorIds
      ),
      patternCallback: patternHandler.patternCallback(
        choice.filter.pattern,
        currentRefinement.patternIds
      ),
      logoCallback: logoHandler.logoCallback(
        choice.filter.logo,
        currentRefinement.logoIds
      ),
      dropSizeCallback: dropSizeHandler.dropSizeCallback(
        choice.filter.dropSize,
        currentRefinement.dropSizes
      ),
      ngCallback: ngHandler.ngCallback(
        choice.filter.ng,
        currentRefinement.ngIds
      ),
      optionCallback: optionHandler.optionCallback(
        choice.filter.option,
        currentRefinement.optionIds
      ),
      onItemIdChanged: (newId: number) => {
        let newRefinement;
        if (newId) {
          newRefinement = {
            ...currentRefinement,
            itemId: newId,
            pageNo: 1,
          };
        } else {
          newRefinement = {
            ...currentRefinement,
            itemId: null,
            pageNo: 1,
          };
        }
        setCurrentRefinement(newRefinement);
      },
    };
  };

  const appliedFiltersCallback = (): AppliedFiltersCallback => {
    return {
      onClear: () => resetRefinement(),
      onDelete: (index: number) => {
        deleteAppliedFilter(index);
      },
    };
  };

  const itemCardCollectionCallback = (): ItemCardCollectionCallback => {
    return {
      onSelect: (preregisteredItemId: number) => {
        setSelectedPreregisteredItemId(preregisteredItemId);
      },
    };
  };

  const browseDetailCallback = (): BrowseDetailCallback => {
    return {
      onClickBackButton: () => setSelectedPreregisteredItemId(null),
      onSelectItem: (item: SelectedItem) => {
        callback.onSelectItem(item);
        resetRefinement();
        setSelectedPreregisteredItemId(null);
      },
    };
  };

  const filterGroupCollectionData = (): FilterGroupCollectionData => {
    return {
      categoryData: categoryHandler.categoryData(
        choice.filter.largeCategory,
        currentRefinement.largeCategoryId,
        currentRefinement.mediumCategoryId,
        currentRefinement.smallCategoryIds
      ),
      sizeData: sizeHandler.sizeData(
        choice.filter.size,
        currentRefinement.sizeIds
      ),
      partSizeData: partSizeHandler.partSizeData(
        choice.filter.partSize,
        currentRefinement.partSizes
      ),
      colorData: colorHandler.colorData(
        choice.filter.color,
        currentRefinement.colorIds
      ),
      patternData: patternHandler.patternData(
        choice.filter.pattern,
        currentRefinement.patternIds
      ),
      logoData: logoHandler.logoData(
        choice.filter.logo,
        currentRefinement.logoIds
      ),
      dropSizeData: dropSizeHandler.dropSizeData(
        choice.filter.dropSize,
        currentRefinement.dropSizes
      ),
      ngData: ngHandler.ngData(choice.filter.ng, currentRefinement.ngIds),
      optionData: optionHandler.optionData(
        choice.filter.option,
        currentRefinement.optionIds
      ),
    };
  };

  const appliedFilterArrayData = (): AppliedFilterData[] => {
    return getAppliedFilterData(choice.filter);
  };

  const selectedSortIndex = (): number =>
    choice.sort.findIndex((sort) => sort.id === currentRefinement.sortId) ?? 0;

  const sortSelection = (): string[] => {
    return choice.sort.map((sort) => sort.name);
  };

  const resetRefinement = () => {
    setCurrentRefinement(choice.defaultRefinement);
    partSizeHandler.resetPresetIndex();
  };

  return {
    currentRefinement,
    selectedPreregisteredItemId,
    onSortChanged,
    paginationCallback,
    filterGroupCollectionCallback,
    appliedFiltersCallback,
    itemCardCollectionCallback,
    browseDetailCallback,
    filterGroupCollectionData,
    appliedFilterArrayData,
    selectedSortIndex,
    sortSelection,
  };
};
