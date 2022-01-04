import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { KarteCollectionDialogData } from "../../model/selecting/karte/props_data/KarteCollectionDialogData";
import { KarteCollectionDialogCallback } from "./callback/PastOutfitCollectionDialogCallback";
import { KarteCollection } from "./KarteCollection";

interface Props {
  data: KarteCollectionDialogData;
  callback: KarteCollectionDialogCallback;
}

export const KarteCollectionDialog = (props: Props) => {
  return (
    <Dialog onClose={props.callback.onClose} open={props.data.isOpen}>
      <DialogTitle>過去コーデ一覧</DialogTitle>
      <KarteCollection response={props.data.karteResponses} />
    </Dialog>
  );
};
