import { useState } from "react";
import BrowseIndexResponse from "../../../../model/api/response/styling/browse/BrowseIndexResponse";
import { useGetIndexCaller } from "../../../../model/styling/browse/api_caller/UseGetIndexCaller";
import Filter from "../../../../model/styling/browse/Filter";
import Refinement from "../../../../model/styling/browse/Refinement";
import AppliedFiltersCallback from "../callback/AppliedFiltersCallback";
import FilterGroupCollectionCallback from "../callback/FilterGroupCollectionCallback";

export interface ItemBrowseHandler {
  currentRefinement: Refinement;
  searchResult: () => BrowseIndexResponse | null;
  onSortChanged: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onPageChanged: (event: any, page: number) => void;
  filterGroupCollectionCallback: FilterGroupCollectionCallback;
  appliedFiltersCallback: AppliedFiltersCallback;
}

export const useItemBrowseHandler = (): ItemBrowseHandler => {
  const defaultRefinement = {
    largeCategory: null,
    mediumCategory: null,
    smallCategories: [],
    sizes: [],
    colors: [],
    patterns: [],
    logos: [],
    options: [],
    sort: 1,
    pageNo: 1,
  };

  const [currentRefinement, setCurrentRefinement] = useState<Refinement>(
    defaultRefinement
  );

  const searchApiCaller = useGetIndexCaller(currentRefinement);

  const searchResult = (): BrowseIndexResponse | null => {
    if (searchApiCaller.response !== null) {
      return searchApiCaller.response;
    } else {
      return null;
    }
  };

  const onSortChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
    const id = parseInt(event.target.value as string);
    const newRefinement = { ...currentRefinement, sort: id, pageNo: 1 };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onPageChanged = (event: object, page: number) => {
    const newRefinement = { ...currentRefinement, pageNo: page };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const newFilterArray = (filter: Filter, currentArray: Filter[]): Filter[] => {
    const currentIndex = currentArray.findIndex(
      (elem) => elem.id === filter.id
    );
    const newArray = [...currentArray];
    if (currentIndex === -1) {
      newArray.push(filter);
    } else {
      newArray.splice(currentIndex, 1);
    }
    return newArray;
  };

  const onLargeCategoryChanged = (filter: Filter) => {
    const newRefinement = {
      ...currentRefinement,
      largeCategory: filter,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onMediumCategoryChanged = (filter: Filter) => {
    const newRefinement = {
      ...currentRefinement,
      mediumCategory: filter,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onSmallCategoryChanged = (filter: Filter) => {
    const newSmallCategories = newFilterArray(
      filter,
      currentRefinement.smallCategories
    );
    const newRefinement = {
      ...currentRefinement,
      smallCategories: newSmallCategories,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onSizeChanged = (filter: Filter) => {
    const newSizes = newFilterArray(filter, currentRefinement.sizes);
    const newRefinement = { ...currentRefinement, sizes: newSizes, pageNo: 1 };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onColorChanged = (filter: Filter) => {
    const newColors = newFilterArray(filter, currentRefinement.colors);
    const newRefinement = {
      ...currentRefinement,
      colors: newColors,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onPatternChanged = (filter: Filter) => {
    const newPatterns = newFilterArray(filter, currentRefinement.patterns);
    const newRefinement = {
      ...currentRefinement,
      patterns: newPatterns,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onLogoChanged = (filter: Filter) => {
    const newLogos = newFilterArray(filter, currentRefinement.logos);
    const newRefinement = { ...currentRefinement, logos: newLogos, pageNo: 1 };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onOptionChanged = (filter: Filter) => {
    const newOptions = newFilterArray(filter, currentRefinement.options);
    const newRefinement = {
      ...currentRefinement,
      options: newOptions,
      pageNo: 1,
    };
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onClear = () => {
    setCurrentRefinement(defaultRefinement);
    searchApiCaller.prepare();
  };

  return {
    currentRefinement,
    searchResult,
    onSortChanged,
    onPageChanged,
    filterGroupCollectionCallback: {
      onLargeCategoryChanged,
      onMediumCategoryChanged,
      onSmallCategoryChanged,
      onSizeChanged,
      onColorChanged,
      onPatternChanged,
      onLogoChanged,
      onOptionChanged,
    },
    appliedFiltersCallback: { onClear },
  };
};
