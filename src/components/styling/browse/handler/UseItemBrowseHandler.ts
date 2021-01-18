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
  const defaultRefinement = {
    largeCategoryId: null,
    mediumCategoryId: null,
    smallCategoryIds: [],
    sizeIds: [],
    partSizes: [],
    colorIds: [],
    patternIds: [],
    logoIds: [],
    optionIds: [3, 4], // NGはデフォルトで選択
    sortId: 1,
    pageNo: 1,
  };

  const [currentRefinement, setCurrentRefinement] = useState<Refinement>(
    defaultRefinement
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

  const onMediumCategoryChanged = (newId: number) => {
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
  });
  const sizeHandler = useSizeRefinementHandler(onSizeChanged);
  const partSizeHandler = usePartSizeRefinementHandler(onPartSizeChanged);
  const colorHandler = useColorRefinementHandler(onColorChanged);
  const patternHandler = usePatternRefinementHandler(onPatternChanged);
  const logoHandler = useLogoRefinementHandler(onLogoChanged);
  const optionHandler = useOptionRefinementHandler(onOptionChanged);

  const getAppliedFilterData = (
    choice: FilterChoiceResponse
  ): AppliedFilterData[] => {
    let result: AppliedFilterData[] = [];

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
      optionCallback: optionHandler.optionCallback(
        choice.filter.option,
        currentRefinement.optionIds
      ),
    };
  };

  const appliedFiltersCallback = (): AppliedFiltersCallback => {
    return { onClear: () => setCurrentRefinement(defaultRefinement) };
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
        setCurrentRefinement(defaultRefinement);
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
