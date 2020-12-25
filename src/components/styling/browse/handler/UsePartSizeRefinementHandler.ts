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
}

export const usePartSizeRefinementHandler = (
  callback: (newValues: ValueRefinement[]) => void
): PartSizeRefinementHandler => {
  const partSizeCallback = (
    choice: FilterRangeResponse[],
    currentValues: ValueRefinement[]
  ): FilterSliderArrayCallback => {
    return {
      onChange: (index: number, value: number) => {
        const currentIndex = currentValues.findIndex(
          (o) => o.id === choice[index].id
        );
        const newPartSizes = [...currentValues];
        const newValue = { id: choice[index].id, value: value };
        if (currentIndex === -1) {
          newPartSizes.push(newValue);
        } else {
          newPartSizes.splice(currentIndex, 1, newValue);
        }
        callback(newPartSizes);
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
        selectedValue:
          currentValues.find((o) => o.id === filter.id)?.value ?? filter.min,
      };
    });
  };

  const appliedFilters = (
    choice: FilterRangeResponse[],
    currentValues: ValueRefinement[]
  ): AppliedFilterData[] => {
    return currentValues.map((valueRefinement) => {
      let filter = choice.find((o) => o.id === valueRefinement.id);
      return { name: `${filter?.name} ${valueRefinement.value}` };
    });
  };

  return {
    partSizeCallback,
    partSizeData,
    appliedFilters,
  };
};
