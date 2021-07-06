import { Dialog, DialogTitle } from "@material-ui/core";
import React from "react";
import { PastOutfitCollectionDialogData } from "../../../model/styling/karte/props_data/PastOutfitCollectionDialogData";
import { PastOutfitCollectionDialogCallback } from "./callback/PastOutfitCollectionDialogCallback";
import { PastOutfitCollection } from "./PastOutfitCollection";

interface PastOutfitCollectionDialogProps {
  data: PastOutfitCollectionDialogData;
  callback: PastOutfitCollectionDialogCallback;
}

export const PastOutfitCollectionDialog = (
  props: PastOutfitCollectionDialogProps
) => {
  return (
    <Dialog onClose={props.callback.onClose} open={props.data.isOpen}>
      <DialogTitle>過去コーデ一覧</DialogTitle>
      <PastOutfitCollection
        data={{ pastOutfitResponses: props.data.pastOutfitResponses }}
      />
    </Dialog>
  );
};
