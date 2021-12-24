import { useState } from "react";
import { MemberShowResponse } from "../../../model/api/response/styling/member/MemberShowResponse";
import { MemberImageCollectionDialogData } from "../../../model/styling/karte/props_data/MemberImageCollectionDialogData";
import { MemberImageCollectionDialogCallback } from "../../styling/karte/callback/MemberImageCollectionDialogCallback";

type MemberHandler = {
  setMemberImageDialogOpen: () => void;
  memberImageDialogData: () => MemberImageCollectionDialogData;
  memberImageDialogCallback: () => MemberImageCollectionDialogCallback;
};
export const useMemberHandler = (
  response: MemberShowResponse | undefined
): MemberHandler => {
  const [isMemberImageDialogOpen, setIsMemberImageDialogOpen] = useState(false);

  const setMemberImageDialogOpen = () => {
    setIsMemberImageDialogOpen(true);
  };

  const memberImageDialogData = (): MemberImageCollectionDialogData => {
    const imageResponses = response === undefined ? [] : response.memberImages;
    return {
      isOpen: isMemberImageDialogOpen,
      imageResponses: imageResponses,
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
