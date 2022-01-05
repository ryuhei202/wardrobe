import { useState } from "react";
import { MemberShowResponse } from "../../../model/api/response/styling/member/MemberShowResponse";
import { MemberImageCollectionDialogData } from "../../../model/selecting/member/props_data/MemberImageCollectionDialogData";
import { MemberImageCollectionDialogCallback } from "../callback/MemberImageCollectionDialogCallback";

type MemberHandler = {
  setMemberImageDialogOpen: () => void;
  memberImageDialogData: () => MemberImageCollectionDialogData;
  memberImageDialogCallback: () => MemberImageCollectionDialogCallback;
};
export const useMemberHandler = (
  response: MemberShowResponse
): MemberHandler => {
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
