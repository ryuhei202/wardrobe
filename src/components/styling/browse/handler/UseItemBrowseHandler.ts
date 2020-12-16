import { useCategoryRefinementHandler } from "./UseCategoryRefinementHandler";
import { useState } from "react";
import FilterChoiceResponse from "../../../../model/api/response/styling/browse/FilterChoiceResponse";
import FilterResponse from "../../../../model/api/response/styling/browse/FilterResponse";
import { useGetIndexCaller } from "../../../../model/styling/browse/api_caller/UseGetIndexCaller";
import AppliedFilterData from "../../../../model/styling/browse/data/AppliedFilterData";
import FilterGroupCollectionData from "../../../../model/styling/browse/data/FilterGroupCollectionData";
import Refinement from "../../../../model/styling/browse/Refinement";
import AppliedFiltersCallback from "../callback/AppliedFiltersCallback";
import FilterGroupCollectionCallback from "../callback/FilterGroupCollectionCallback";
import { useSizeRefinementHandler } from "./UseSizeRefinementHandler";
import { useColorRefinementHandler } from "./UseColorRefinementHandler";
import { usePatternRefinementHandler } from "./UsePatternRefinementHandler";
import { useLogoRefinementHandler } from "./UseLogoRefinementHandler";
import { useOptionRefinementHandler } from "./UseOptionRefinementHandler";
import ItemCardData from "../../../../model/styling/browse/data/ItemCardData";
import BrowseIndexResponse from "../../../../model/api/response/styling/browse/BrowseIndexResponse";

export interface ItemBrowseHandler {
  searchResult: () => BrowseIndexResponse | null;
  onSortChanged: (
    choice: FilterResponse[]
  ) => (event: React.ChangeEvent<{ value: unknown }>) => void;
  onPageChanged: (event: any, page: number) => void;
  filterGroupCollectionCallback: (
    choice: FilterChoiceResponse
  ) => FilterGroupCollectionCallback;
  appliedFiltersCallback: () => AppliedFiltersCallback;
  filterGroupCollectionData: (
    choice: FilterChoiceResponse
  ) => FilterGroupCollectionData;
  appliedFilterArrayData: (choice: FilterChoiceResponse) => AppliedFilterData[];
  itemCardData: () => ItemCardData[];
  sortSelection: (choice: FilterResponse[]) => string[];
}

export const useItemBrowseHandler = (): ItemBrowseHandler => {
  const defaultRefinement = {
    largeCategoryId: null,
    mediumCategoryId: null,
    smallCategoryIds: [],
    sizeIds: [],
    colorIds: [],
    patternIds: [],
    logoIds: [],
    optionIds: [],
    sortId: 1,
    pageNo: 1,
  };

  const [currentRefinement, setCurrentRefinement] = useState<Refinement>(
    defaultRefinement
  );

  const searchApiCaller = useGetIndexCaller(currentRefinement);

  const updateRefinement = (newRefinement: Refinement) => {
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };
  const onLargeCategoryChanged = (newId: number) => {
    const newRefinement = {
      ...currentRefinement,
      largeCategoryId: newId,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const onMediumCategoryChanged = (newId: number) => {
    const newRefinement = {
      ...currentRefinement,
      mediumCategoryId: newId,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const onSmallCategoryChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      smallCategoryIds: newIds,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const onSizeChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      sizeIds: newIds,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const onColorChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      colorIds: newIds,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const onPatternChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      patternIds: newIds,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const onLogoChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      logoIds: newIds,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const onOptionChanged = (newIds: number[]) => {
    const newRefinement = {
      ...currentRefinement,
      optionIds: newIds,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const categoryHandler = useCategoryRefinementHandler({
    onLargeCategoryChange: onLargeCategoryChanged,
    onMediumCategoryChange: onMediumCategoryChanged,
    onSmallCategoryChange: onSmallCategoryChanged,
  });
  const sizeHandler = useSizeRefinementHandler(onSizeChanged);
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

  const searchResult = (): BrowseIndexResponse | null =>
    searchApiCaller.response;

  const onSortChanged = (choice: FilterResponse[]) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const index = parseInt(event.target.value as string);
    const newRefinement = {
      ...currentRefinement,
      sortId: choice[index].id,
      pageNo: 1,
    };
    updateRefinement(newRefinement);
  };

  const onPageChanged = (event: object, page: number) => {
    const newRefinement = { ...currentRefinement, pageNo: page };
    updateRefinement(newRefinement);
  };

  const filterGroupCollectionCallback = (
    choice: FilterChoiceResponse
  ): FilterGroupCollectionCallback => {
    return {
      categoryCallback: categoryHandler.categoryCallback(
        choice.largeCategory,
        currentRefinement.largeCategoryId,
        currentRefinement.mediumCategoryId,
        currentRefinement.smallCategoryIds
      ),
      sizeCallback: sizeHandler.sizeCallback(
        choice.size,
        currentRefinement.sizeIds
      ),
      colorCallback: colorHandler.colorCallback(
        choice.color,
        currentRefinement.colorIds
      ),
      patternCallback: patternHandler.patternCallback(
        choice.pattern,
        currentRefinement.patternIds
      ),
      logoCallback: logoHandler.logoCallback(
        choice.logo,
        currentRefinement.logoIds
      ),
      optionCallback: optionHandler.optionCallback(
        choice.option,
        currentRefinement.optionIds
      ),
    };
  };

  const appliedFiltersCallback = (): AppliedFiltersCallback => {
    return { onClear: () => updateRefinement(defaultRefinement) };
  };

  const filterGroupCollectionData = (
    choice: FilterChoiceResponse
  ): FilterGroupCollectionData => {
    return {
      categoryData: categoryHandler.categoryData(
        choice.largeCategory,
        currentRefinement.largeCategoryId,
        currentRefinement.mediumCategoryId,
        currentRefinement.smallCategoryIds
      ),
      sizeData: sizeHandler.sizeData(choice.size, currentRefinement.sizeIds),
      colorData: colorHandler.colorData(
        choice.color,
        currentRefinement.colorIds
      ),
      patternData: patternHandler.patternData(
        choice.pattern,
        currentRefinement.patternIds
      ),
      logoData: logoHandler.logoData(choice.logo, currentRefinement.logoIds),
      optionData: optionHandler.optionData(
        choice.option,
        currentRefinement.optionIds
      ),
    };
  };

  const appliedFilterArrayData = (
    choice: FilterChoiceResponse
  ): AppliedFilterData[] => {
    return getAppliedFilterData(choice);
  };

  const itemCardData = (): ItemCardData[] => {
    if (searchApiCaller.response) {
      return searchApiCaller.response.itemCard.map((item) => {
        return {
          colorImagePath: item.colorImagePath,
          seriesName: item.seriesName,
          categoryName: item.categoryName,
          brandName: item.brandName,
          imagePath: item.imagePath,
        };
      });
    } else {
      return [];
    }
  };

  const sortSelection = (choice: FilterResponse[]): string[] => {
    return choice.map((sort) => sort.name);
  };

  return {
    searchResult,
    onSortChanged,
    onPageChanged,
    filterGroupCollectionCallback,
    appliedFiltersCallback,
    filterGroupCollectionData,
    appliedFilterArrayData,
    itemCardData,
    sortSelection,
  };
};
