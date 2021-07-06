import { useState } from "react";
import { InfoResponse } from "../../../../model/api/response/styling/karte/InfoResponse";
import { MemberImageCollectionDialogData } from "../../../../model/styling/karte/props_data/MemberImageCollectionDialogData";
import { PastOutfitCollectionData } from "../../../../model/styling/karte/props_data/PastOutfitCollectionData";
import { PastOutfitCollectionDialogData } from "../../../../model/styling/karte/props_data/PastOutfitCollectionDialogData";
import { MemberImageCollectionDialogCallback } from "../callback/MemberImageCollectionDialogCallback";
import { PastOutfitCollectionDialogCallback } from "../callback/PastOutfitCollectionDialogCallback";

interface KarteHandler {
  setMemberImageDialogOpen: () => void;
  memberImageDialogData: () => MemberImageCollectionDialogData;
  memberImageDialogCallback: () => MemberImageCollectionDialogCallback;
  setPastOutfitDialogOpen: () => void;
  pastOutfitDialogData: () => PastOutfitCollectionDialogData;
  pastOutfitDialogCallback: () => PastOutfitCollectionDialogCallback;
  pastOutfitCollectionData: () => PastOutfitCollectionData;
}

export const useKarteHandler = (response: InfoResponse): KarteHandler => {
  const [isMemberImageDialogOpen, setIsMemberImageDialogOpen] = useState(false);
  const [isPastOutfitDialogOpen, setIsPastOutfitDialogOpen] = useState(false);

  const setMemberImageDialogOpen = () => {
    setIsMemberImageDialogOpen(true);
  };

  const memberImageDialogData = (): MemberImageCollectionDialogData => {
    return {
      isOpen: isMemberImageDialogOpen,
      imageResponses: response.memberImages,
    };
  };

  const memberImageDialogCallback = (): MemberImageCollectionDialogCallback => {
    return {
      onClose: () => {
        setIsMemberImageDialogOpen(false);
      },
    };
  };

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

  const pastOutfitCollectionData = (): PastOutfitCollectionData => {
    return {
      pastOutfitResponses: response.pastOutfits,
      displayOutfitNum: 2, //前回と前々回コーデ
    };
  };

  return {
    setMemberImageDialogOpen,
    memberImageDialogData,
    memberImageDialogCallback,
    setPastOutfitDialogOpen,
    pastOutfitDialogData,
    pastOutfitDialogCallback,
    pastOutfitCollectionData,
  };
};
