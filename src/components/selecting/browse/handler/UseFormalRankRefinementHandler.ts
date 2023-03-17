import { AppliedFilterData } from "../../../../model/selecting/browse/props_data/AppliedFilterData";
import { FilterFormalRankData } from "../../../../model/selecting/browse/props_data/FilterFormalRankData";
import { FilterMediaData } from "../../../../model/selecting/browse/props_data/FilterMediaData";
import { ValueRefinement } from "../../../../model/selecting/browse/ValueRefinement";
import { FilterFormalRankCallback } from "../callback/FilterFormalRankCallback";

export interface FormalRankRefinementHandler {
  formalRankCallback: (choice: number[]) => FilterFormalRankCallback;
  formalRankData: (currentValues: number[]) => number[];
  // appliedFilters: (
  //   choice: FilterFormalRankResponse[],
  //   currentIds: number[]
  // ) => AppliedFilterData[];
  // deleteFilter: (currentIds: number[], index: number) => void;
}

interface FormalRankRefinementData {
  selectedValue: number[];
}

export const useFormalRankRefinementHandler = (
  onChange: (newValues: number[]) => void
): FormalRankRefinementHandler => {
  const formalRankCallback = (choice: number[]): FilterFormalRankCallback => {
    return {
      onChange: () => {
        onChange(choice);
      },
    };
  };

  const formalRankData = (currentValues: number[]): number[] => {
    return currentValues;
  };

  // const appliedFilters = (
  //   choice: FilterFormalRankData,
  //   currentValues: FilterFormalRankData
  // ): string => {
  //   return (
  //     if (Object.keys(currentValues).length > 1) {
  //       name: `${choice.name} ${currentValues.min}~${currentValues.max}`
  //     } else {

  //     }
  //     );
  // };

  // const deleteFilter = (currentValues: ValueRefinement[], index: number) => {

  // }

  return {
    formalRankCallback,
    formalRankData,
    // appliedFilters,
    // deleteFilter,
  };
};
