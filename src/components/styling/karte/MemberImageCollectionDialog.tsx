import {
  Dialog,
  DialogTitle,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import React from "react";
import { HostUrl } from "../../../model/HostUrl";
import MemberImageCollectionDialogCallback from "./callback/MemberImageCollectionDialogCallback";
import PopupImage from "../../shared/PopupImage";
import MemberImageCollectionDialogData from "../../../model/styling/karte/props_data/MemberImageCollectionDialogData";

interface MemberImageCollectionDialogProps {
  data: MemberImageCollectionDialogData;
  callback: MemberImageCollectionDialogCallback;
}

const MemberImageCollectionDialog = (
  props: MemberImageCollectionDialogProps
) => {
  return (
    <Dialog onClose={props.callback.onClose} open={props.data.isOpen}>
      <DialogTitle>パートナー画像一覧</DialogTitle>
      <GridList>
        {props.data.imageResponses.map((image, index) => (
          <GridListTile key={index}>
            <PopupImage
              data={{
                originalImageUrl: HostUrl() + image.imagePath.large,
                popupImageUrl: HostUrl() + image.imagePath.original,
              }}
            />
            <GridListTileBar title={image.comment} />
          </GridListTile>
        ))}
      </GridList>
    </Dialog>
  );
};

export default MemberImageCollectionDialog;
