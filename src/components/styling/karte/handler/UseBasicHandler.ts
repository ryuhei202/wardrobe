import { useState } from "react";
import BasicResponse from "../../../../model/api/response/styling/karte/BasicResponse";
import MemberImageCollectionDialogData from "../../../../model/styling/karte/props_data/MemberImageCollectionDialogData";
import MemberImageCollectionDialogCallback from "../callback/MemberImageCollectionDialogCallback";

export interface BasicHandler {
  setMemberImageDialogOpen: () => void;
  memberImageDialogData: () => MemberImageCollectionDialogData;
  memberImageDialogCallback: () => MemberImageCollectionDialogCallback;
}

export const useBasicHandler = (response: BasicResponse): BasicHandler => {
  const [isMemberImageDialogOpen, setIsMemberImageDialogOpen] = useState(false);

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

  return {
    setMemberImageDialogOpen,
    memberImageDialogData,
    memberImageDialogCallback,
  };
};
