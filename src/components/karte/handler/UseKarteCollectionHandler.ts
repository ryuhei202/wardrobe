import { useState } from "react";
import { KarteIndexResponse } from "../../../model/api/response/styling/karte/KarteIndexResponse";
import { KarteCollectionDialogData } from "../../../model/selecting/karte/props_data/KarteCollectionDialogData";
import { KarteCollectionDialogCallback } from "../../selecting/karte/callback/PastOutfitCollectionDialogCallback";

type KarteCollectionHandler = {
  readonly setPastOutfitDialogOpen: () => void;
  readonly pastOutfitDialogData: () => KarteCollectionDialogData;
  readonly pastOutfitDialogCallback: () => KarteCollectionDialogCallback;
};
export const useKarteCollectionHandler = (
  response: KarteIndexResponse[]
): KarteCollectionHandler => {
  const [isPastOutfitDialogOpen, setIsPastOutfitDialogOpen] = useState<boolean>(
    false
  );
  const setPastOutfitDialogOpen = () => {
    setIsPastOutfitDialogOpen(true);
  };

  const pastOutfitDialogData = (): KarteCollectionDialogData => {
    return {
      isOpen: isPastOutfitDialogOpen,
      karteResponses: response,
    };
  };

  const pastOutfitDialogCallback = (): KarteCollectionDialogCallback => {
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
