import { useState } from "react";
import { InfoResponse } from "../../../../model/api/response/styling/karte/InfoResponse";
import { MemberImageCollectionDialogData } from "../../../../model/selecting/karte/props_data/MemberImageCollectionDialogData";
import { NgMemoCollectionData } from "../../../../model/selecting/karte/props_data/NgMemoCollectionData";
import { PurchasedItemCollectionData } from "../../../../model/selecting/karte/props_data/PurchasedItemCollectionData";
import { MemberImageCollectionDialogCallback } from "../callback/MemberImageCollectionDialogCallback";

interface KarteHandler {
  setMemberImageDialogOpen: () => void;
  memberImageDialogData: () => MemberImageCollectionDialogData;
  memberImageDialogCallback: () => MemberImageCollectionDialogCallback;
  ngMemoCollectionData: () => NgMemoCollectionData;
  purchasedItemCollectionData: () => PurchasedItemCollectionData;
}

export const useKarteHandler = (response: InfoResponse): KarteHandler => {
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

  const ngMemoCollectionData = (): NgMemoCollectionData => {
    return {
      ngMemoResponses: response.ngCategories,
    };
  };

  const purchasedItemCollectionData = (): PurchasedItemCollectionData => {
    return {
      purchasedItemResponses: response.purchasedItems,
    };
  };

  return {
    setMemberImageDialogOpen,
    memberImageDialogData,
    memberImageDialogCallback,
    ngMemoCollectionData,
    purchasedItemCollectionData,
  };
};
