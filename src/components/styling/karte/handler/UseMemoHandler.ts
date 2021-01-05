import { useState } from "react";
import MemoResponse from "../../../../model/api/response/styling/karte/MemoResponse";
import PastOutfitCollectionDialogData from "../../../../model/styling/karte/props_data/PastOutfitCollectionDialogData";
import PastOutfitCollectionDialogCallback from "../callback/PastOutfitCollectionDialogCallback";

export interface MemoHandler {
  setPastOutfitDialogOpen: () => void;
  pastOutfitDialogData: () => PastOutfitCollectionDialogData;
  pastOutfitDialogCallback: () => PastOutfitCollectionDialogCallback;
}

export const useMemoHandler = (response: MemoResponse): MemoHandler => {
  const [isPastOutfitDialogOpen, setIsPastOutfitDialogOpen] = useState(false);

  const setPastOutfitDialogOpen = () => {
    setIsPastOutfitDialogOpen(true);
  };

  const pastOutfitDialogData = (): PastOutfitCollectionDialogData => {
    return {
      isOpen: isPastOutfitDialogOpen,
      pastOutfitResponses: response.pastOutfits,
    };
  };

  const pastOutfitDialogCallback = (): PastOutfitCollectionDialogCallback => {
    return {
      onClose: () => {
        setIsPastOutfitDialogOpen(false);
      },
    };
  };

  return {
    setPastOutfitDialogOpen,
    pastOutfitDialogData,
    pastOutfitDialogCallback,
  };
};
