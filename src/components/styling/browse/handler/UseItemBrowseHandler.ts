import { useState } from "react";
import BrowseIndexResponse from "../../../../model/api/response/styling/browse/BrowseIndexResponse";
import { useGetIndexCaller } from "../../../../model/styling/browse/api_caller/UseGetIndexCaller";
import Filter from "../../../../model/styling/browse/Filter";
import Refinement from "../../../../model/styling/browse/Refinement";
import AppliedFiltersCallback from "../callback/AppliedFiltersCallback";
import FilterGroupCollectionCallback from "../callback/FilterGroupCollectionCallback";

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
};

export interface ItemBrowseHandler {
  currentRefinement: Refinement;
  searchResult: () => BrowseIndexResponse | null;
  onSortChanged: (event: React.ChangeEvent<{ value: unknown }>) => void;
  filterGroupCollectionCallback: FilterGroupCollectionCallback;
  appliedFiltersCallback: AppliedFiltersCallback;
}

export const useItemBrowseHandler = (): ItemBrowseHandler => {
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
    const newRefinement = { ...currentRefinement };
    newRefinement.sort = id;
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
    const newRefinement = { ...currentRefinement };
    newRefinement.largeCategory = filter;
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onMediumCategoryChanged = (filter: Filter) => {
    const newRefinement = { ...currentRefinement };
    newRefinement.mediumCategory = filter;
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onSmallCategoryChanged = (filter: Filter) => {
    const newSmallCategories = newFilterArray(
      filter,
      currentRefinement.smallCategories
    );
    const newRefinement = { ...currentRefinement };
    newRefinement.smallCategories = newSmallCategories;
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onSizeChanged = (filter: Filter) => {
    const newSizes = newFilterArray(filter, currentRefinement.sizes);
    const newRefinement = { ...currentRefinement };
    newRefinement.sizes = newSizes;
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onColorChanged = (filter: Filter) => {
    const newColors = newFilterArray(filter, currentRefinement.colors);
    const newRefinement = { ...currentRefinement };
    newRefinement.colors = newColors;
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onPatternChanged = (filter: Filter) => {
    const newPatterns = newFilterArray(filter, currentRefinement.patterns);
    const newRefinement = { ...currentRefinement };
    newRefinement.patterns = newPatterns;
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onLogoChanged = (filter: Filter) => {
    const newLogos = newFilterArray(filter, currentRefinement.logos);
    const newRefinement = { ...currentRefinement };
    newRefinement.logos = newLogos;
    setCurrentRefinement(newRefinement);
    searchApiCaller.prepare();
  };

  const onOptionChanged = (filter: Filter) => {
    const newOptions = newFilterArray(filter, currentRefinement.options);
    const newRefinement = { ...currentRefinement };
    newRefinement.options = newOptions;
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
