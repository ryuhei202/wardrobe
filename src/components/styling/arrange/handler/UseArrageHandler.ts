import { useState } from "react";
import AdviceChoiceResponse from "../../../../model/api/response/styling/arrange/AdviceChoiceResponse";
import {
  PostCreateOutfitCaller,
  usePostCreateOutfitCaller,
} from "../../../../model/styling/arrange/api_caller/UsePostCreateOutfitCaller";
import CreatingOutfit from "../../../../model/styling/arrange/CreatingOutfit";
import AddedOutfitListData from "../../../../model/styling/arrange/props_data/AddedOutfitListData";
import OutfitFormData from "../../../../model/styling/arrange/props_data/OutfitFormData";
import SelectedOutfit from "../../../../model/styling/arrange/SelectedOutfit";
import SelectedItem from "../../../../model/styling/SelectedItem";
import AddedOutfitListCallback from "../callback/AddedOutfitListCallback";
import OutfitFormCallback from "../callback/OutfitFormCallback";

export interface ArrangeHandler {
  selectedOutfits: SelectedOutfit[];
  editingOutfitIndex: number;
  createOutfitCaller: PostCreateOutfitCaller;
  onClickComplete: () => void;
  addedOutfitListData: () => AddedOutfitListData;
  addedOutfitListCallback: () => AddedOutfitListCallback;
  outfitFormData: () => OutfitFormData;
  outfitFormCallback: () => OutfitFormCallback;
}

export const useArrangeHandler = (
  items: SelectedItem[],
  responses: AdviceChoiceResponse[]
): ArrangeHandler => {
  const defaultIsItemSelected = Array(items.length).fill(false);
  const defaultSelectedAdvices = Array(4).fill(undefined);

  const toCreatingOutfits = (
    selectedOutfits: SelectedOutfit[]
  ): CreatingOutfit[] => {
    return selectedOutfits.map((selectedOutfit) => {
      return {
        itemIds: items.reduce((result: number[], item, index) => {
          if (selectedOutfit.areItemsSelected[index]) result.push(item.itemId);
          return result;
        }, []),
        adviceIds: selectedOutfit.advices.map(
          (advice) =>
            responses[advice.categoryIndex].advice[advice.adviceIndex!!].id
        ),
      };
    });
  };

  const [selectedOutfits, setSelectedOutfits] = useState<SelectedOutfit[]>([]);
  const [editingOutfitIndex, setEditingOutfitIndex] = useState<number>(
    selectedOutfits.length
  );
  const [editingOutfit, setEditingOutfit] = useState<SelectedOutfit>({
    areItemsSelected: defaultIsItemSelected,
    advices: defaultSelectedAdvices,
  });
  const createOutfitCaller = usePostCreateOutfitCaller(
    toCreatingOutfits(selectedOutfits)
  );

  const initializeEditing = () => {
    setEditingOutfit({
      areItemsSelected: defaultIsItemSelected,
      advices: defaultSelectedAdvices,
    });
    setEditingOutfitIndex(selectedOutfits.length);
  };

  const onClickComplete = () => {
    createOutfitCaller.prepare();
  };

  const addedOutfitListData = (): AddedOutfitListData => {
    return {
      outfitList: selectedOutfits.map((outfit) => {
        return {
          items: outfit.areItemsSelected.reduce(
            (
              result: { id: number; categoryName: string }[],
              isItemSelected,
              index
            ) => {
              if (isItemSelected) {
                result.push({
                  id: items[index].itemId,
                  categoryName: items[index].categoryName,
                });
              }
              return result;
            },
            []
          ),
          advices: outfit.advices.map((selectedAdvice) =>
            selectedAdvice.adviceIndex
              ? responses[selectedAdvice.categoryIndex].advice[
                  selectedAdvice.adviceIndex
                ].title
              : ""
          ),
        };
      }),
      editingOutfit: editingOutfitIndex,
    };
  };

  const addedOutfitListCallback = (): AddedOutfitListCallback => {
    return {
      onClickEdit: (index: number) => {
        let outfit = selectedOutfits[index];
        setEditingOutfit(outfit);
        setEditingOutfitIndex(index);
      },
      onClickNew: () => {
        initializeEditing();
      },
    };
  };

  const outfitFormData = (): OutfitFormData => {
    return {
      items: items.map((item, index) => {
        return {
          itemId: item.itemId,
          itemImagePath: item.itemImagePath,
          categoryName: item.categoryName,
          isSelected: editingOutfit.areItemsSelected[index],
        };
      }),
      advices: editingOutfit.advices.map((advice) => {
        return {
          categoryChoice: responses.map((response) => response.name),
          selectedCategory: advice ? advice.categoryIndex : null,
          adviceChoice: advice
            ? responses[advice.categoryIndex].advice.map((advice) => {
                return { title: advice.title, description: advice.description };
              })
            : [],
          selectedAdvice: advice ? advice.adviceIndex ?? null : null,
        };
      }),
    };
  };

  const outfitFormCallback = (): OutfitFormCallback => {
    return {
      onClickAddOutfit: () => {
        let newSelectedOutfits = [...selectedOutfits];
        if (editingOutfitIndex >= newSelectedOutfits.length) {
          newSelectedOutfits.push(editingOutfit);
        } else {
          newSelectedOutfits[editingOutfitIndex] = editingOutfit;
        }
        setSelectedOutfits(newSelectedOutfits);
        initializeEditing();
      },
      onSelectCategory: (selectedIndex: number, categoryIndex: number) => {
        let newSelectedAdvices = [...editingOutfit.advices];
        newSelectedAdvices[selectedIndex] = {
          categoryIndex: categoryIndex,
          adviceIndex: undefined,
        };
        setEditingOutfit({ ...editingOutfit, advices: newSelectedAdvices });
      },
      onSelectAdvice: (selectedIndex: number, adviceIndex: number) => {
        let newSelectedAdvices = [...editingOutfit.advices];
        newSelectedAdvices[selectedIndex] = {
          categoryIndex: editingOutfit.advices[selectedIndex].categoryIndex,
          adviceIndex: adviceIndex,
        };
        setEditingOutfit({ ...editingOutfit, advices: newSelectedAdvices });
      },
      onSelectItem: (index: number) => {
        let newAreItemsSelected = [...editingOutfit.areItemsSelected];
        newAreItemsSelected[index] = !editingOutfit.areItemsSelected[index];
        setEditingOutfit({
          ...editingOutfit,
          areItemsSelected: newAreItemsSelected,
        });
      },
    };
  };

  const retrieveId = (categoryIndex: number, adviceIndex: number): number => {
    return responses[categoryIndex].advice[adviceIndex].id;
  };

  return {
    selectedOutfits,
    editingOutfitIndex,
    createOutfitCaller,
    onClickComplete,
    addedOutfitListData,
    addedOutfitListCallback,
    outfitFormData,
    outfitFormCallback,
  };
};
