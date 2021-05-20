import FilterMediaResponse from "../../../../model/api/response/styling/browse/FilterMediaResponse";
import AppliedFilterData from "../../../../model/styling/browse/props_data/AppliedFilterData";
import FilterMediaData from "../../../../model/styling/browse/props_data/FilterMediaData";
import FilterMediaArrayCallback from "../callback/FilterMediaArrayCallback";

export interface PatternRefinementHandler {
  patternCallback: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => FilterMediaArrayCallback;
  patternData: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => FilterMediaData[];
  appliedFilters: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => AppliedFilterData[];
  deleteFilter: (currentIds: number[], index: number) => void;
}

export const usePatternRefinementHandler = (
  onChange: (newIds: number[]) => void
): PatternRefinementHandler => {
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

  const patternCallback = (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ): FilterMediaArrayCallback => {
    return {
      onClick: (index: number) => {
        const newPatterns = newFilterArray(choice[index].id, currentIds);
        onChange(newPatterns);
      },
    };
  };

  const patternData = (
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
    return currentIds.map((currentId) => {
      return { name: choice.find((filter) => filter.id === currentId)!!.name };
    });
  };

  const deleteFilter = (currentIds: number[], index: number) => {
    let newPatterns = [...currentIds];
    newPatterns.splice(index, 1);
    onChange(newPatterns);
  };

  return {
    patternCallback,
    patternData,
    appliedFilters,
    deleteFilter,
  };
};
