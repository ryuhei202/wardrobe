import FilterResponse from "../../../../model/api/response/styling/browse/FilterResponse";
import AppliedFilterData from "../../../../model/styling/browse/data/AppliedFilterData";
import FilterCheckboxData from "../../../../model/styling/browse/data/FilterCheckboxData";
import FilterCheckboxArrayCallback from "../callback/FilterCheckboxArrayCallback";

export interface OptionRefinementHandler {
  optionCallback: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => FilterCheckboxArrayCallback;
  optionData: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => FilterCheckboxData[];
  appliedFilters: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => AppliedFilterData[];
}

export const useOptionRefinementHandler = (
  callback: (newIds: number[]) => void
): OptionRefinementHandler => {
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

  const optionCallback = (
    choice: FilterResponse[],
    currentIds: number[]
  ): FilterCheckboxArrayCallback => {
    return {
      onClick: (index: number) => {
        const newOptions = newFilterArray(choice[index].id, currentIds);
        callback(newOptions);
      },
    };
  };

  const optionData = (
    choice: FilterResponse[],
    currentIds: number[]
  ): FilterCheckboxData[] => {
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
    return choice
      .filter((filter) => currentIds.includes(filter.id))
      .map((filter) => {
        return { name: filter.name };
      });
  };

  return {
    optionCallback,
    optionData,
    appliedFilters,
  };
};
