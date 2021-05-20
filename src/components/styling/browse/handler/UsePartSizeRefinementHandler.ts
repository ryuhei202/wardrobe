import FilterRangeResponse from "../../../../model/api/response/styling/browse/FilterRangeResponse";
import AppliedFilterData from "../../../../model/styling/browse/props_data/AppliedFilterData";
import FilterSliderData from "../../../../model/styling/browse/props_data/FilterSliderData";
import ValueRefinement from "../../../../model/styling/browse/ValueRefinement";
import FilterSliderArrayCallback from "../callback/FilterSliderArrayCallback";

export interface PartSizeRefinementHandler {
  partSizeCallback: (
    choice: FilterRangeResponse[],
    currentValues: ValueRefinement[]
  ) => FilterSliderArrayCallback;
  partSizeData: (
    choice: FilterRangeResponse[],
    currentValues: ValueRefinement[]
  ) => FilterSliderData[];
  appliedFilters: (
    choice: FilterRangeResponse[],
    currentValues: ValueRefinement[]
  ) => AppliedFilterData[];
  deleteFilter: (currentValues: ValueRefinement[], index: number) => void;
}

export const usePartSizeRefinementHandler = (
  onChange: (newValues: ValueRefinement[]) => void
): PartSizeRefinementHandler => {
  const partSizeCallback = (
    choice: FilterRangeResponse[],
    currentValues: ValueRefinement[]
  ): FilterSliderArrayCallback => {
    return {
      onChange: (index: number, value: number[]) => {
        const currentIndex = currentValues.findIndex(
          (filter) => filter.id === choice[index].id
        );
        const newPartSizes = [...currentValues];
        const newValue = { id: choice[index].id, min: value[0], max: value[1] };
        if (currentIndex === -1) {
          newPartSizes.push(newValue);
        } else {
          newPartSizes.splice(currentIndex, 1, newValue);
        }
        onChange(newPartSizes);
      },
    };
  };

  const partSizeData = (
    choice: FilterRangeResponse[],
    currentValues: ValueRefinement[]
  ): FilterSliderData[] => {
    return choice.map((filter) => {
      return {
        key: filter.id,
        name: filter.name,
        range: [filter.min, filter.max],
        selectedValue: [
          currentValues.find((value) => value.id === filter.id)?.min ??
            filter.min,
          currentValues.find((value) => value.id === filter.id)?.max ??
            filter.max,
        ],
      };
    });
  };

  const appliedFilters = (
    choice: FilterRangeResponse[],
    currentValues: ValueRefinement[]
  ): AppliedFilterData[] => {
    return currentValues.map((valueRefinement) => {
      let filter = choice.find((row) => row.id === valueRefinement.id);
      return {
        name: `${filter?.name} ${valueRefinement.min}~${valueRefinement.max}`,
      };
    });
  };

  const deleteFilter = (currentValues: ValueRefinement[], index: number) => {
    let newPartSizes = [...currentValues];
    newPartSizes.splice(index, 1);
    onChange(newPartSizes);
  };

  return {
    partSizeCallback,
    partSizeData,
    appliedFilters,
    deleteFilter,
  };
};
