import { useCategoryRefinementHandler } from "./UseCategoryRefinementHandler";
import { useState } from "react";
import FilterChoiceResponse from "../../../../model/api/response/styling/browse/FilterChoiceResponse";
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
import ValueRefinement from "../../../../model/styling/browse/ValueRefinement";
import { usePartSizeRefinementHandler } from "./UsePartSizeRefinementHandler";
import { useDropSizeRefinementHandler } from "./UseDropSizeRefinementHandler";

export interface ItemBrowseHandler {
  currentRefinement: Refinement;
  selectedPreregisteredItemId: number | null;
  onSortChanged: () => (event: React.ChangeEvent<{ value: unknown }>) => void;
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

  const onLargeCategoryChanged = (newId: number) => {
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
        let newSmallCategoryIds = [...currentRefinement.smallCategoryIds];
        newSmallCategoryIds.splice(index - currentIndex, 1);
        newRefinement = {
          ...currentRefinement,
          smallCategoryIds: newSmallCategoryIds,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex += currentRefinement.smallCategoryIds.length;
    } else if (currentRefinement.mediumCategoryId !== null) {
      if (currentIndex === index) {
        newRefinement = {
          ...currentRefinement,
          mediumCategoryId: null,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex++;
    } else if (currentRefinement.largeCategoryId !== null) {
      if (currentIndex === index) {
        newRefinement = {
          ...currentRefinement,
          largeCategoryId: null,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex++;
    }
    if (currentRefinement.sizeIds.length > 0) {
      if (currentRefinement.sizeIds.length - 1 + currentIndex >= index) {
        let newSizeIds = [...currentRefinement.sizeIds];
        newSizeIds.splice(index - currentIndex, 1);
        newRefinement = {
          ...currentRefinement,
          sizeIds: newSizeIds,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex += currentRefinement.sizeIds.length;
    }
    if (currentRefinement.partSizes.length > 0) {
      if (currentRefinement.partSizes.length - 1 + currentIndex >= index) {
        let newPartSizes = [...currentRefinement.partSizes];
        newPartSizes.splice(index - currentIndex, 1);
        newRefinement = {
          ...currentRefinement,
          partSizes: newPartSizes,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex += currentRefinement.partSizes.length;
    }
    if (currentRefinement.colorIds.length > 0) {
      if (currentRefinement.colorIds.length - 1 + currentIndex >= index) {
        let newColorIds = [...currentRefinement.colorIds];
        newColorIds.splice(index - currentIndex, 1);
        newRefinement = {
          ...currentRefinement,
          colorIds: newColorIds,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex += currentRefinement.colorIds.length;
    }
    if (currentRefinement.patternIds.length > 0) {
      if (currentRefinement.patternIds.length - 1 + currentIndex >= index) {
        let newPatternIds = [...currentRefinement.patternIds];
        newPatternIds.splice(index - currentIndex, 1);
        newRefinement = {
          ...currentRefinement,
          patternIds: newPatternIds,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex += currentRefinement.patternIds.length;
    }
    if (currentRefinement.logoIds.length > 0) {
      if (currentRefinement.logoIds.length - 1 + currentIndex >= index) {
        let newLogoIds = [...currentRefinement.logoIds];
        newLogoIds.splice(index - currentIndex, 1);
        newRefinement = {
          ...currentRefinement,
          logoIds: newLogoIds,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex += currentRefinement.logoIds.length;
    }
    if (currentRefinement.optionIds.length > 0) {
      if (currentRefinement.optionIds.length - 1 + currentIndex >= index) {
        let newOptionIds = [...currentRefinement.optionIds];
        newOptionIds.splice(index - currentIndex, 1);
        newRefinement = {
          ...currentRefinement,
          optionIds: newOptionIds,
          pageNo: 1,
        };
        setCurrentRefinement(newRefinement);
        return;
      }
      currentIndex += currentRefinement.optionIds.length;
    }
  };

  const onSortChanged = () => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
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
      onPageChanged: (event: object, page: number) => {
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
      onClear: () => setCurrentRefinement(choice.defaultRefinement),
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
        setCurrentRefinement(choice.defaultRefinement);
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
