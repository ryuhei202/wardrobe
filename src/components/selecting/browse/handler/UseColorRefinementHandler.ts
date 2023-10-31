import { FilterMediaResponse } from "../../../../model/api/response/styling/browse/FilterMediaResponse";
import { AppliedFilterData } from "../../../../model/selecting/browse/props_data/AppliedFilterData";
import { FilterMediaData } from "../../../../model/selecting/browse/props_data/FilterMediaData";
import { FilterMediaArrayCallback } from "../callback/FilterMediaArrayCallback";

export interface ColorRefinementHandler {
  colorCallback: (choice: FilterMediaResponse[], currentIds: number[]) => FilterMediaArrayCallback;
  colorData: (choice: FilterMediaResponse[], currentIds: number[]) => FilterMediaData[];
  appliedFilters: (choice: FilterMediaResponse[], currentIds: number[]) => AppliedFilterData[];
  deleteFilter: (currentIds: number[], index: number) => void;
}

export const useColorRefinementHandler = (
  onChange: (newIds: number[]) => void,
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
    currentIds: number[],
  ): FilterMediaArrayCallback => {
    return {
      onClick: (index: number) => {
        const newColors = newFilterArray(choice[index].id, currentIds);
        onChange(newColors);
      },
    };
  };

  const colorData = (choice: FilterMediaResponse[], currentIds: number[]): FilterMediaData[] => {
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
    currentIds: number[],
  ): AppliedFilterData[] => {
    return currentIds.map((currentId) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { name: choice.find((filter) => filter.id === currentId)!.name };
    });
  };

  const deleteFilter = (currentIds: number[], index: number) => {
    const newColors = [...currentIds];
    newColors.splice(index, 1);
    onChange(newColors);
  };

  return {
    colorCallback,
    colorData,
    appliedFilters,
    deleteFilter,
  };
};
