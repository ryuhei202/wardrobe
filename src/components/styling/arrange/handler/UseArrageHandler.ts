import { Outfit } from "./../../../../model/styling/arrange/Outfit";
import { useEffect, useState } from "react";
import { AdviceChoiceResponse } from "../../../../model/api/response/styling/arrange/AdviceChoiceResponse";
import {
  PostCreateOutfitCaller,
  usePostCreateOutfitCaller,
} from "../../../../model/styling/arrange/api_caller/UsePostCreateOutfitCaller";
import { AddedOutfitListData } from "../../../../model/styling/arrange/props_data/AddedOutfitListData";
import { SelectedItem } from "../../../../model/styling/SelectedItem";
import { AddedOutfitListCallback } from "../callback/AddedOutfitListCallback";
import { OutfitFormData } from "../../../../model/styling/arrange/props_data/OutfitFormData";
import { OutfitFormCallback } from "../callback/OutfitFormCallback";

export interface ArrangeHandler {
  editingOutfitIndex: number;
  upperLimitMessage: string | null;
  createOutfitCaller: PostCreateOutfitCaller;
  onClickComplete: () => void;
  addedOutfitListData: () => AddedOutfitListData;
  addedOutfitListCallback: () => AddedOutfitListCallback;
  outfitFormData: () => OutfitFormData;
  outfitFormCallback: () => OutfitFormCallback;
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
  const onPostComplete = () => setIsPostComplete(true);
  const createOutfitCaller = usePostCreateOutfitCaller(outfits, onPostComplete);
  const onClickComplete = () => createOutfitCaller.prepare();

  useEffect(() => {
    isPostComplete
      ? window.removeEventListener("beforeunload", onUnload)
      : window.addEventListener("beforeunload", onUnload);
    return () => {
      // アンマウント時にタブを閉じる時のアラートをするイベントを削除する。
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [isPostComplete]);

  const onUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

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
    editingOutfitIndex,
    upperLimitMessage,
    createOutfitCaller,
    onClickComplete,
    addedOutfitListData,
    addedOutfitListCallback,
    outfitFormData,
    outfitFormCallback,
  };
};
