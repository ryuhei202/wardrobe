import LargeCategoryChoiceResponse from "../../../../model/api/response/styling/browse/LargeCategoryChoiceResponse";
import AppliedFilterData from "../../../../model/styling/browse/props_data/AppliedFilterData";
import FilterCategoryGroupData from "../../../../model/styling/browse/props_data/FilterCategoryGroupData";
import FilterCheckboxData from "../../../../model/styling/browse/props_data/FilterCheckboxData";
import FilterListButtonData from "../../../../model/styling/browse/props_data/FilterListButtonData";
import FilterCategoryGroupCallback from "../callback/FilterCategoryGroupCallback";

export interface CategoryRefinementHandler {
  categoryCallback: (
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null,
    smallCategoryIds: number[]
  ) => FilterCategoryGroupCallback;
  categoryData: (
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null,
    smallCategoryIds: number[]
  ) => FilterCategoryGroupData;
  appliedFilters: (
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null,
    smallCategoryIds: number[]
  ) => AppliedFilterData[];
}

export interface CategoryRefinementCallback {
  onLargeCategoryChange: (newId: number) => void;
  onMediumCategoryChange: (newId: number | null) => void;
  onSmallCategoryChange: (newIds: number[]) => void;
  onMediumCategoryCancelled: () => void;
}

export const useCategoryRefinementHandler = (
  callback: CategoryRefinementCallback
): CategoryRefinementHandler => {
  const onBroaderCategoryChanged = (
    index: number,
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null
  ) => {
    if (largeCategoryId) {
      onMediumCategoryChanged(index, choice, largeCategoryId);
    } else {
      onLargeCategoryChanged(index, choice);
    }
  };

  const onLargeCategoryChanged = (
    index: number,
    choice: LargeCategoryChoiceResponse[]
  ) => {
    callback.onLargeCategoryChange(choice[index].id);
  };

  const onMediumCategoryChanged = (
    index: number,
    choice: LargeCategoryChoiceResponse[],
    currentLargeCategoryId: number
  ) => {
    const largeCategoryChoice = choice.find(
      (elem) => elem.id === currentLargeCategoryId
    );
    if (largeCategoryChoice) {
      callback.onMediumCategoryChange(
        largeCategoryChoice.mediumCategory[index].id
      );
    }
  };

  const onSmallCategoryChanged = (
    index: number,
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null,
    smallCategoryIds: number[]
  ) => {
    const largeCategoryChoice = choice.find(
      (elem) => elem.id === largeCategoryId
    );
    const mediumCategoryChoice = largeCategoryChoice?.mediumCategory.find(
      (elem) => elem.id === mediumCategoryId
    );
    if (mediumCategoryChoice) {
      const newSmallCategories = newFilterArray(
        mediumCategoryChoice.smallCategory[index].id,
        smallCategoryIds
      );
      callback.onSmallCategoryChange(newSmallCategories);
    }
  };

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

  const broaderCategoryData = (
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null
  ): FilterListButtonData[] | null => {
    if (mediumCategoryId) {
      // 中カテが既に指定されている場合
      return null;
    } else {
      if (largeCategoryId) {
        // 大カテが既に指定されている場合
        const largeCategoryChoice = choice.find(
          (elem) => elem.id === largeCategoryId
        );
        return largeCategoryChoice!!.mediumCategory.map((filter) => {
          return { name: filter.name };
        });
      } else {
        return choice.map((filter) => {
          return { name: filter.name };
        });
      }
    }
  };

  const smallCategoryData = (
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null,
    smallCategoryIds: number[]
  ): FilterCheckboxData[] => {
    const largeCategoryChoice = choice.find(
      (elem) => elem.id === largeCategoryId
    );
    const mediumCategoryChoice = largeCategoryChoice?.mediumCategory.find(
      (elem) => elem.id === mediumCategoryId
    );
    if (mediumCategoryChoice) {
      return mediumCategoryChoice.smallCategory.map((filter) => {
        return {
          name: filter.name,
          isSelected: smallCategoryIds.includes(filter.id),
        };
      });
    } else {
      return [];
    }
  };

  const categoryCallback = (
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null,
    smallCategoryIds: number[]
  ): FilterCategoryGroupCallback => {
    return {
      broaderCategoryCallback: {
        onClick: (index: number) =>
          onBroaderCategoryChanged(index, choice, largeCategoryId),
      },
      smallerCategoryCallback: {
        onClick: (index: number) =>
          onSmallCategoryChanged(
            index,
            choice,
            largeCategoryId,
            mediumCategoryId,
            smallCategoryIds
          ),
        onClickBackButton: () => {
          callback.onMediumCategoryCancelled();
        },
      },
    };
  };

  const categoryData = (
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null,
    smallCategoryIds: number[]
  ): FilterCategoryGroupData => {
    return {
      broaderCategoryData: broaderCategoryData(
        choice,
        largeCategoryId,
        mediumCategoryId
      ),
      smallCategoryData: smallCategoryData(
        choice,
        largeCategoryId,
        mediumCategoryId,
        smallCategoryIds
      ),
    };
  };

  const appliedFilters = (
    choice: LargeCategoryChoiceResponse[],
    largeCategoryId: number | null,
    mediumCategoryId: number | null,
    smallCategoryIds: number[]
  ): AppliedFilterData[] => {
    const largeCategoryChoice = choice.find(
      (elem) => elem.id === largeCategoryId
    );
    const mediumCategoryChoice = largeCategoryChoice?.mediumCategory.find(
      (elem) => elem.id === mediumCategoryId
    );
    if (mediumCategoryChoice && smallCategoryIds.length) {
      return mediumCategoryChoice.smallCategory
        .filter((filter) => smallCategoryIds.includes(filter.id))
        .map((filter) => {
          return { name: filter.name };
        });
    }
    if (mediumCategoryChoice) return [{ name: mediumCategoryChoice.name }];
    else if (largeCategoryChoice) return [{ name: largeCategoryChoice.name }];
    else return [];
  };

  return {
    categoryCallback,
    categoryData,
    appliedFilters,
  };
};
