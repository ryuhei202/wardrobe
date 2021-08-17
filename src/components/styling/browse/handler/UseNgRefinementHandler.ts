import FilterResponse from "../../../../model/api/response/styling/browse/FilterResponse";
import AppliedFilterData from "../../../../model/styling/browse/props_data/AppliedFilterData";
import FilterCheckboxData from "../../../../model/styling/browse/props_data/FilterCheckboxData";
import FilterCheckboxArrayCallback from "../callback/FilterCheckboxArrayCallback";

export interface NgRefinementHandler {
  ngCallback: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => FilterCheckboxArrayCallback;
  ngData: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => FilterCheckboxData[];
  appliedFilters: (
    choice: FilterResponse[],
    currentIds: number[]
  ) => AppliedFilterData[];
  deleteFilter: (currentIds: number[], index: number) => void;
}

export const useNgRefinementHandler = (
  onChange: (newIds: number[]) => void
): NgRefinementHandler => {
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

  const ngCallback = (
    choice: FilterResponse[],
    currentIds: number[]
  ): FilterCheckboxArrayCallback => {
    return {
      onClick: (index: number) => {
        const newNgs = newFilterArray(choice[index].id, currentIds);
        onChange(newNgs);
      },
    };
  };

  const ngData = (
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
    let newNgs = [...currentIds];
    newNgs.splice(index, 1);
    onChange(newNgs);
  };

  return {
    ngCallback,
    ngData,
    appliedFilters,
    deleteFilter,
  };
};
