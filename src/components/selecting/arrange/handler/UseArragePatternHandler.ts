import { CoordinateBulkUpdateRequest } from "../../../../model/api/request/styling/coordinate/CoordinateBulkUpdateRequest";
import { alertClosedWindow } from "../../../../service/shared/alertClosedWindow";
import { useCallback, useEffect, useState } from "react";
import { AddedOutfitListData } from "../../../../model/selecting/arrange/props_data/AddedOutfitListData";
import { SelectedItem } from "../../../../model/selecting/SelectedItem";
import { AddedOutfitListCallback } from "../callback/AddedOutfitListCallback";
import { OutfitFormData } from "../../../../model/selecting/arrange/props_data/OutfitFormData";
import { OutfitFormCallback } from "../callback/OutfitFormCallback";
import { CoordinatePatternIndexResponse } from "../../../../model/api/response/styling/coordinatePattern/CoordinatePatternIndexResponse";

export interface ArrangePatternHandler {
  coordinates: CoordinateBulkUpdateRequest[];
  editingOutfitIndex: number;
  addedOutfitListData: () => AddedOutfitListData;
  addedOutfitListCallback: () => AddedOutfitListCallback;
  outfitFormData: () => OutfitFormData;
  outfitFormCallback: () => OutfitFormCallback;
  onPostComplete: () => void;
}

export const useArrangePatternHandler = (
  items: SelectedItem[],
  responses: CoordinatePatternIndexResponse
): ArrangePatternHandler => {
  const defaultCoordinate = {
    id: null,
    itemIds: [],
    adviceIds: [],
    formalLevel: 0,
  };

  const formattedCoordinates = (): CoordinateBulkUpdateRequest[] => {
    return responses.selectedCoordinatePatterns.map((coordinatePattern) => {
      return {
        id: coordinatePattern.id,
        itemIds: coordinatePattern.items.map((item) => item.id),
        adviceIds: coordinatePattern.advices.map((advice) => advice.id),
        formalLevel: coordinatePattern.formalLevel,
      };
    });
  };
  const [coordinates, setCoordinates] =
    useState<CoordinateBulkUpdateRequest[]>(formattedCoordinates);
  const [editingOutfitIndex, setEditingOutfitIndex] = useState<number>(
    coordinates.length
  );
  const [editingOutfit, setEditingOutfit] =
    useState<CoordinateBulkUpdateRequest>(defaultCoordinate);
  const [isPostComplete, setIsPostComplete] = useState(false);
  const onPostComplete = useCallback(() => setIsPostComplete(true), []);

  useEffect(() => {
    alertClosedWindow(isPostComplete);
  }, [isPostComplete]);

  const addedOutfitListData = (): AddedOutfitListData => {
    return {
      outfitList: coordinates.map((coordinate) => {
        return {
          items: coordinate.itemIds.reduce(
            (
              result: {
                id: number;
                categoryName: string;
                imagePath: string;
              }[],
              itemId
            ) => {
              const item = items.find((item) => item.itemId === itemId);
              if (item) {
                result.push({
                  id: item.itemId,
                  categoryName: item.categoryName,
                  imagePath: item.itemImagePath.thumb,
                });
              }
              return result;
            },
            []
          ),
          advices: coordinate.adviceIds.map((adviceId) => {
            let adviceTitle = "";
            responses.adviceCategories.forEach((category) => {
              category.advice.forEach((advice) => {
                if (advice.id === adviceId) {
                  adviceTitle = advice.title;
                }
              });
            });
            return adviceTitle;
          }),
        };
      }),
      editingOutfit: editingOutfitIndex,
    };
  };

  const addedOutfitListCallback = (): AddedOutfitListCallback => {
    return {
      onClickEdit: (index: number) => {
        setEditingOutfit(coordinates[index]);
        setEditingOutfitIndex(index);
      },
      onClickDelete: (index: number) => {
        const newOutfits = [...coordinates];
        newOutfits.splice(index, 1);
        setCoordinates(newOutfits);
        if (editingOutfitIndex === index) {
          setEditingOutfit(defaultCoordinate);
          setEditingOutfitIndex(newOutfits.length);
        } else if (editingOutfitIndex > index) {
          setEditingOutfit(editingOutfit);
          setEditingOutfitIndex(editingOutfitIndex - 1);
        }
      },
      onClickNew: () => {
        setEditingOutfit(defaultCoordinate);
        setEditingOutfitIndex(coordinates.length);
      },
    };
  };

  const outfitFormData = (): OutfitFormData => {
    let selectedAdviceIdArray: (number | null)[] = [...editingOutfit.adviceIds];
    selectedAdviceIdArray.push(null);
    return {
      items: items.map((item) => {
        return {
          itemId: item.itemId,
          itemImagePath: item.itemImagePath.thumb,
          categoryName: item.categoryName,
          isSelected: editingOutfit.itemIds.indexOf(item.itemId) >= 0,
        };
      }),
      selectedAdviceIds: selectedAdviceIdArray,
      formalLevel: editingOutfit.formalLevel,
    };
  };

  const outfitFormCallback = (): OutfitFormCallback => {
    return {
      onClickAddOutfit: () => {
        let newOutfits = [...coordinates];
        if (editingOutfitIndex >= newOutfits.length) {
          newOutfits.push(editingOutfit);
        } else {
          newOutfits[editingOutfitIndex] = editingOutfit;
        }
        setCoordinates(newOutfits);
        setEditingOutfit(defaultCoordinate);
        setEditingOutfitIndex(newOutfits.length);
        setIsPostComplete(false);
      },
      onSelectAdvice: (adviceId: number, index: number) => {
        let newAdviceIds = [...editingOutfit.adviceIds];
        if (index > editingOutfit.adviceIds.length) {
          newAdviceIds.push(adviceId);
        } else {
          newAdviceIds[index] = adviceId;
        }
        setEditingOutfit({ ...editingOutfit, adviceIds: newAdviceIds });
      },
      onSelectItem: (id: number) => {
        const newItemIds = [...editingOutfit.itemIds];
        const itemIndex = newItemIds.indexOf(id);
        if (itemIndex === -1) {
          newItemIds.push(id);
        } else {
          newItemIds.splice(itemIndex, 1);
        }
        setEditingOutfit({ ...editingOutfit, itemIds: newItemIds });
      },
      onSelectFormalLevel: (value: number) => {
        setEditingOutfit({ ...editingOutfit, formalLevel: value });
      },
      onClickDeleteAdvice: (index: number) => {
        const newAdviceIds = [...editingOutfit.adviceIds];
        newAdviceIds.splice(index, 1);
        setEditingOutfit({ ...editingOutfit, adviceIds: newAdviceIds });
      },
    };
  };

  return {
    coordinates,
    editingOutfitIndex,
    addedOutfitListData,
    addedOutfitListCallback,
    outfitFormData,
    outfitFormCallback,
    onPostComplete,
  };
};
