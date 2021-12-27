import { FilterResponse } from "../../../../model/api/response/styling/browse/FilterResponse";
import { AppliedFilterData } from "../../../../model/selecting/browse/props_data/AppliedFilterData";
import { FilterSizeData } from "../../../../model/selecting/browse/props_data/FilterSizeData";
import { FilterSizeArrayCallback } from "../callback/FilterSizeArrayCallback";

export interface SizeRefinementHandler {
  sizeCallback: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => FilterSizeArrayCallback;
  sizeData: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => FilterSizeData[];
  appliedFilters: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => AppliedFilterData[];
  deleteFilter: (currentIds: number[], index: number) => void;
}

export const useSizeRefinementHandler = (
  onChange: (newIds: number[]) => void
): SizeRefinementHandler => {
  const newFilterArray = (id: number, currentArray: number[]): number[] => {
    const currentIndex = currentArray.indexOf(id);
    const newArray = [...currentArray];
    if (currentIndex === -1) {
      newArray.push(id);
    } else {
      newArray.splice(currentIndex, 1);
    }
    return newArray;
  };

  const sizeCallback = (
    choice: FilterResponse[],
    currentIds: number[]
  ): FilterSizeArrayCallback => {
    return {
      onClick: (index: number) => {
        const newSizes = newFilterArray(choice[index].id, currentIds);
        onChange(newSizes);
      },
    };
  };

  const sizeData = (
    choice: FilterResponse[],
    currentIds: number[]
  ): FilterSizeData[] => {
    return choice.map((filter) => {
      return {
        name: filter.name,
        isSelected: currentIds.includes(filter.id),
      };
    });
  };

  const appliedFilters = (
    choice: FilterResponse[],
    currentIds: number[]
  ): AppliedFilterData[] => {
    return currentIds.map((currentId) => {
      return {
        name: choice.find((filter) => filter.id === currentId)?.name ?? "",
      };
    });
  };

  const deleteFilter = (currentIds: number[], index: number) => {
    let newSizes = [...currentIds];
    newSizes.splice(index, 1);
    onChange(newSizes);
  };

  return {
    sizeCallback,
    sizeData,
    appliedFilters,
    deleteFilter,
  };
};
