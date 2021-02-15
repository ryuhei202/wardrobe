import { useState } from "react";
import AdviceChoiceResponse from "../../../../model/api/response/styling/arrange/AdviceChoiceResponse";
import {
  PostCreateOutfitCaller,
  usePostCreateOutfitCaller,
} from "../../../../model/styling/arrange/api_caller/UsePostCreateOutfitCaller";
import AddedOutfitListData from "../../../../model/styling/arrange/props_data/AddedOutfitListData";
import OutfitFormData from "../../../../model/styling/arrange/props_data/OutfitFormData";
import SelectedAdvice from "../../../../model/styling/arrange/SelectedAdvice";
import SelectedOutfit from "../../../../model/styling/arrange/SelectedOutfit";
import SelectedItem from "../../../../model/styling/SelectedItem";
import AddedOutfitListCallback from "../callback/AddedOutfitListCallback";
import OutfitFormCallback from "../callback/OutfitFormCallback";

export interface ArrangeHandler {
  selectedOutfits: SelectedOutfit[];
  editingOutfit: number;
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
  const defaultSelectedAdvices = Array(4).fill(undefined);

  const [selectedOutfits, setSelectedOutfits] = useState<SelectedOutfit[]>([]);
  const [editingOutfit, setEditingOutfit] = useState<number>(
    selectedOutfits.length
  );
  const [editingSelectedItems, setEditingSelectedItems] = useState<number[]>(
    []
  );
  const [editingSelectedAdvices, setEditingSelectedAdvices] = useState<
    SelectedAdvice[]
  >(defaultSelectedAdvices);
  const createOutfitCaller = usePostCreateOutfitCaller(selectedOutfits);

  const initializeEditing = () => {
    setEditingSelectedItems([]);
    setEditingSelectedAdvices(defaultSelectedAdvices);
    setEditingOutfit(selectedOutfits.length);
  };

  const onClickComplete = () => {
    createOutfitCaller.prepare();
  };

  const addedOutfitListData = (): AddedOutfitListData => {
    return {
      outfitList: selectedOutfits.map((outfit, index) => {
        return {
          items: outfit.itemIds.map((itemId) => {
            return {
              id: itemId,
              categoryName:
                items.find((item) => item.itemId === itemId)?.categoryName ??
                "",
            };
          }),
          advices: outfit.advices.map(
            (selectedAdvice) =>
              responses[selectedAdvice.categoryIndex].advice.find(
                (advice) => advice.id === selectedAdvice.adviceId
              )?.title ?? ""
          ),
        };
      }),
      editingOutfit: editingOutfit,
    };
  };

  const onClickEdit = (index: number) => {
    let outfit = selectedOutfits[index];
    setEditingSelectedItems(outfit.itemIds);
    let newSelectedAdvices = defaultSelectedAdvices;
    outfit.advices.forEach((advice, index) => {
      newSelectedAdvices[index] = advice;
    });
    setEditingSelectedAdvices(newSelectedAdvices);
    setEditingOutfit(index);
  };

  const onClickNew = () => {
    initializeEditing();
  };

  const addedOutfitListCallback = (): AddedOutfitListCallback => {
    return {
      onClickEdit: onClickEdit,
      onClickNew: onClickNew,
    };
  };

  const outfitFormData = (): OutfitFormData => {
    return {
      items: items.map((item) => {
        return {
          itemId: item.itemId,
          itemImagePath: item.itemImagePath,
          categoryName: item.categoryName,
          isSelected: editingSelectedItems.indexOf(item.itemId) !== -1,
        };
      }),
      advices: editingSelectedAdvices.map((advice) => {
        return {
          categoryChoice: responses.map((response) => response.name),
          selectedCategory: advice ? advice.categoryIndex : null,
          adviceChoice: advice
            ? responses[advice.categoryIndex].advice.map((advice) => {
                return { title: advice.title, description: advice.description };
              })
            : [],
          selectedAdvice:
            advice && advice.adviceId
              ? responses[advice.categoryIndex].advice.findIndex(
                  (choice) => choice.id === advice.adviceId
                ) ?? null
              : null,
        };
      }),
    };
  };

  const outfitFormCallback = (): OutfitFormCallback => {
    return {
      onClickAddOutfit: () => {
        let newSelectedOutfits = [...selectedOutfits];
        let newSelectedOutfit = {
          itemIds: editingSelectedItems,
          advices: editingSelectedAdvices.filter((advice) => advice != null),
        };
        if (editingOutfit >= newSelectedOutfits.length) {
          newSelectedOutfits.push(newSelectedOutfit);
        } else {
          newSelectedOutfits[editingOutfit] = newSelectedOutfit;
        }
        setSelectedOutfits(newSelectedOutfits);
        initializeEditing();
      },
      onSelectCategory: (selectedIndex: number, categoryIndex: number) => {
        let newSelectedAdvices = [...editingSelectedAdvices];
        newSelectedAdvices[selectedIndex] = {
          ...editingSelectedAdvices[selectedIndex],
          categoryIndex: categoryIndex,
        };
        setEditingSelectedAdvices(newSelectedAdvices);
      },
      onSelectAdvice: (selectedIndex: number, adviceIndex: number) => {
        let newSelectedAdvices = [...editingSelectedAdvices];
        let categoryIndex = editingSelectedAdvices[selectedIndex].categoryIndex;
        newSelectedAdvices[selectedIndex] = {
          ...editingSelectedAdvices[selectedIndex],
          adviceId: responses[categoryIndex].advice[adviceIndex].id,
        };
        setEditingSelectedAdvices(newSelectedAdvices);
      },
      onSelectItem: (index: number) => {
        let item = items[index];
        const currentIndex = editingSelectedItems.indexOf(item.itemId);
        const newItems = [...editingSelectedItems];
        if (currentIndex === -1) {
          newItems.push(item.itemId);
        } else {
          newItems.splice(currentIndex, 1);
        }
        setEditingSelectedItems(newItems);
      },
    };
  };

  return {
    selectedOutfits,
    editingOutfit,
    createOutfitCaller,
    onClickComplete,
    addedOutfitListData,
    addedOutfitListCallback,
    outfitFormData,
    outfitFormCallback,
  };
};
