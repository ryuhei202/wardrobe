import { FilterMediaResponse } from "../../../../model/api/response/styling/browse/FilterMediaResponse";
import { AppliedFilterData } from "../../../../model/selecting/browse/props_data/AppliedFilterData";
import { FilterMediaData } from "../../../../model/selecting/browse/props_data/FilterMediaData";
import { FilterMediaArrayCallback } from "../callback/FilterMediaArrayCallback";

export interface LogoRefinementHandler {
  logoCallback: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => FilterMediaArrayCallback;
  logoData: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => FilterMediaData[];
  appliedFilters: (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ) => AppliedFilterData[];
  deleteFilter: (currentIds: number[], index: number) => void;
}

export const useLogoRefinementHandler = (
  onChange: (newIds: number[]) => void
): LogoRefinementHandler => {
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

  const logoCallback = (
    choice: FilterMediaResponse[],
    currentIds: number[]
  ): FilterMediaArrayCallback => {
    return {
      onClick: (index: number) => {
        const newLogos = newFilterArray(choice[index].id, currentIds);
        onChange(newLogos);
      },
    };
  };

  const logoData = (
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
    let newLogos = [...currentIds];
    newLogos.splice(index, 1);
    onChange(newLogos);
  };

  return {
    logoCallback,
    logoData,
    appliedFilters,
    deleteFilter,
  };
};
