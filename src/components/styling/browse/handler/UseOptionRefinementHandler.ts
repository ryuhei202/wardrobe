import { FilterResponse } from "../../../../model/api/response/styling/browse/FilterResponse";
import { AppliedFilterData } from "../../../../model/styling/browse/props_data/AppliedFilterData";
import { FilterCheckboxData } from "../../../../model/styling/browse/props_data/FilterCheckboxData";
import { FilterCheckboxArrayCallback } from "../callback/FilterCheckboxArrayCallback";

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
  deleteFilter: (currentIds: number[], index: number) => void;
}

export const useOptionRefinementHandler = (
  onChange: (newIds: number[]) => void
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
        onChange(newOptions);
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
    return currentIds.map((currentId) => {
      return { name: choice.find((filter) => filter.id === currentId)!!.name };
    });
  };

  const deleteFilter = (currentIds: number[], index: number) => {
    let newOptions = [...currentIds];
    newOptions.splice(index, 1);
    onChange(newOptions);
  };

  return {
    optionCallback,
    optionData,
    appliedFilters,
    deleteFilter,
  };
};
