import FilterMediaResponse from "../../../../model/api/response/styling/browse/FilterMediaResponse";
import AppliedFilterData from "../../../../model/styling/browse/data/AppliedFilterData";
import FilterMediaData from "../../../../model/styling/browse/data/FilterMediaData";
import FilterMediaArrayCallback from "../callback/FilterMediaArrayCallback";

export interface ColorRefinementHandler {
  colorCallback: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => FilterMediaArrayCallback;
  colorData: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => FilterMediaData[];
  appliedFilters: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => AppliedFilterData[];
}

export const useColorRefinementHandler = (
  callback: (newIds: number[]) => void
): ColorRefinementHandler => {
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

  const colorCallback = (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ): FilterMediaArrayCallback => {
    return {
      onClick: (index: number) => {
        const newColors = newFilterArray(choice[index].id, currentIds);
        callback(newColors);
      },
    };
  };

  const colorData = (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ): FilterMediaData[] => {
    return choice.map((filter) => {
      return {
        name: filter.name,
        isSelected: currentIds.includes(filter.id),
        imagePath: filter.imagePath,
      };
    });
  };

  const appliedFilters = (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ): AppliedFilterData[] => {
    return choice
      .filter((filter) => currentIds.includes(filter.id))
      .map((filter) => {
        return { name: filter.name };
      });
  };

  return {
    colorCallback,
    colorData,
    appliedFilters,
  };
};
