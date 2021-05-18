import FilterMediaResponse from "../../../../model/api/response/styling/browse/FilterMediaResponse";
import AppliedFilterData from "../../../../model/styling/browse/props_data/AppliedFilterData";
import FilterMediaData from "../../../../model/styling/browse/props_data/FilterMediaData";
import FilterMediaArrayCallback from "../callback/FilterMediaArrayCallback";

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
}

export const useLogoRefinementHandler = (
  callback: (newIds: number[]) => void
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
        callback(newLogos);
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

  return {
    logoCallback,
    logoData,
    appliedFilters,
  };
};
