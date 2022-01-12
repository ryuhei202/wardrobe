import { useState } from "react";
import { FilterPartSizeData } from "../../../../model/selecting/browse/props_data/FilterPartSizeData";
import { FilterPartSizeCallback } from "../callback/FilterPartSizeCallback";
import { FilterPartSizeResponse } from "../../../../model/api/response/styling/browse/FilterPartSizeResponse";
import { AppliedFilterData } from "../../../../model/selecting/browse/props_data/AppliedFilterData";
import { ValueRefinement } from "../../../../model/selecting/browse/ValueRefinement";

export interface PartSizeRefinementHandler {
  partSizeCallback: (
    choice: FilterPartSizeResponse,
    currentValues: ValueRefinement[]
  ) => FilterPartSizeCallback;
  partSizeData: (
    choice: FilterPartSizeResponse,
    currentValues: ValueRefinement[]
  ) => FilterPartSizeData;
  appliedFilters: (
    choice: FilterPartSizeResponse,
    currentValues: ValueRefinement[]
  ) => AppliedFilterData[];
  deleteFilter: (currentValues: ValueRefinement[], index: number) => void;
  resetPresetIndex: () => void;
}

export const usePartSizeRefinementHandler = (
  onChange: (newValues: ValueRefinement[]) => void
): PartSizeRefinementHandler => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(
    null
  );
  const partSizeCallback = (
    choice: FilterPartSizeResponse,
    currentValues: ValueRefinement[]
  ): FilterPartSizeCallback => {
    return {
      onPresetChanged: (index: number) => {
        setSelectedPresetIndex(index);
        onChange(choice.presets[index].values);
      },
      filterSliderArrayCallback: {
        onChange: (index: number, value: number[]) => {
          const currentIndex = currentValues.findIndex(
            (filter) => filter.id === choice.ranges[index].id
          );
          const newPartSizes = [...currentValues];
          const newValue = {
            id: choice.ranges[index].id,
            min: value[0],
            max: value[1],
          };
          if (currentIndex === -1) {
            newPartSizes.push(newValue);
          } else {
            newPartSizes.splice(currentIndex, 1, newValue);
          }
          onChange(newPartSizes);
        },
      },
    };
  };

  const partSizeData = (
    choice: FilterPartSizeResponse,
    currentValues: ValueRefinement[]
  ): FilterPartSizeData => {
    return {
      selectedPresetIndex: selectedPresetIndex,
      presets: choice.presets.map((preset) => {
        return preset.name;
      }),
      sliders: choice.ranges.map((filter) => {
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
      }),
    };
  };

  const appliedFilters = (
    choice: FilterPartSizeResponse,
    currentValues: ValueRefinement[]
  ): AppliedFilterData[] => {
    return currentValues.map((valueRefinement) => {
      let filter = choice.ranges.find((row) => row.id === valueRefinement.id);
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

  const resetPresetIndex = () => setSelectedPresetIndex(null);

  return {
    partSizeCallback,
    partSizeData,
    appliedFilters,
    deleteFilter,
    resetPresetIndex,
  };
};
