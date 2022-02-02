import { alertClosedWindow } from "./../../../../service/shared/alertClosedWindow";
import { Outfit } from "../../../../model/selecting/arrange/Outfit";
import { useCallback, useEffect, useState } from "react";
import { AdviceChoiceResponse } from "../../../../model/api/response/styling/arrange/AdviceChoiceResponse";
import { AddedOutfitListData } from "../../../../model/selecting/arrange/props_data/AddedOutfitListData";
import { SelectedItem } from "../../../../model/selecting/SelectedItem";
import { AddedOutfitListCallback } from "../callback/AddedOutfitListCallback";
import { OutfitFormData } from "../../../../model/selecting/arrange/props_data/OutfitFormData";
import { OutfitFormCallback } from "../callback/OutfitFormCallback";

export interface ArrangeHandler {
  outfits: Outfit[];
  editingOutfitIndex: number;
  upperLimitMessage: string | null;
  addedOutfitListData: () => AddedOutfitListData;
  addedOutfitListCallback: () => AddedOutfitListCallback;
  outfitFormData: () => OutfitFormData;
  outfitFormCallback: () => OutfitFormCallback;
  onPostComplete: () => void;
}

export const useArrangeHandler = (
  items: SelectedItem[],
  responses: AdviceChoiceResponse
): ArrangeHandler => {
  const defaultOutfit = {
    itemIds: [],
    adviceIds: [],
  };

  const [outfits, setOutfits] = useState<Outfit[]>(responses.selectedOutfits);
  const [editingOutfitIndex, setEditingOutfitIndex] = useState<number>(
    outfits.length
  );
  const [editingOutfit, setEditingOutfit] = useState<Outfit>(defaultOutfit);
  const [upperLimitMessage, setUpperLimitMessage] = useState<string | null>(
    null
  );
  const [isPostComplete, setIsPostComplete] = useState(false);
  const onPostComplete = useCallback(() => setIsPostComplete(true), []);

  useEffect(() => {
    alertClosedWindow(isPostComplete);
  }, [isPostComplete]);

  const addedOutfitListData = (): AddedOutfitListData => {
    return {
      outfitList: outfits.map((outfit) => {
        return {
          items: outfit.itemIds.reduce(
            (
              result: {
                readonly id: number;
                readonly categoryName: string;
              }[],
              itemId
            ) => {
              const item = items.find((item) => item.itemId === itemId);
              if (item) {
                result.push({
                  id: item.itemId,
                  categoryName: item.categoryName,
                });
              }
              return result;
            },
            []
          ),
          advices: outfit.adviceIds.map((adviceId) => {
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
        setEditingOutfit(outfits[index]);
        setEditingOutfitIndex(index);
      },
      onClickNew: () => {
        setEditingOutfit(defaultOutfit);
        setEditingOutfitIndex(outfits.length);
      },
    };
  };

  const outfitFormData = (): OutfitFormData => {
    const adviceNum = editingOutfit.adviceIds.length;
    let selectedAdviceIdArray: (number | null)[] = [...editingOutfit.adviceIds];
    selectedAdviceIdArray.length = 4;
    return {
      items: items.map((item) => {
        return {
          itemId: item.itemId,
          itemImagePath: item.itemImagePath,
          categoryName: item.categoryName,
          isSelected: editingOutfit.itemIds.indexOf(item.itemId) >= 0,
        };
      }),
      selectedAdviceIds: selectedAdviceIdArray.fill(null, adviceNum),
    };
  };

  const outfitFormCallback = (): OutfitFormCallback => {
    return {
      onClickAddOutfit: () => {
        //着こなしアドバイスは4つまでなので、フロントで超えないようにする。
        //3秒後にメッセージを消す。
        if (editingOutfitIndex > 3) {
          setUpperLimitMessage("着こなしアドバイスは最大4つまでです。");
          setTimeout(() => setUpperLimitMessage(null), 3000);
          return;
        }
        let newOutfits = [...outfits];
        if (editingOutfitIndex >= newOutfits.length) {
          newOutfits.push(editingOutfit);
        } else {
          newOutfits[editingOutfitIndex] = editingOutfit;
        }
        setOutfits(newOutfits);
        setEditingOutfit(defaultOutfit);
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
    };
  };

  return {
    outfits,
    editingOutfitIndex,
    upperLimitMessage,
    addedOutfitListData,
    addedOutfitListCallback,
    outfitFormData,
    outfitFormCallback,
    onPostComplete,
  };
};
