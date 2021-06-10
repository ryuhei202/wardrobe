import { Dialog } from "@material-ui/core";
import React from "react";
import { HostUrl } from "../../../model/HostUrl";
import MemberImageCollectionDialogCallback from "./callback/MemberImageCollectionDialogCallback";
import MemberImageCollectionDialogData from "../../../model/styling/karte/props_data/MemberImageCollectionDialogData";
import ImageGallery from "react-image-gallery";

interface MemberImageCollectionDialogProps {
  data: MemberImageCollectionDialogData;
  callback: MemberImageCollectionDialogCallback;
}

const MemberImageCollectionDialog = (
  props: MemberImageCollectionDialogProps
) => {
  return (
    <Dialog onClose={props.callback.onClose} open={props.data.isOpen}>
      <ImageGallery
        showFullscreenButton={false}
        showPlayButton={false}
        thumbnailPosition="left"
        items={props.data.imageResponses.map((image) => {
          return {
            original: HostUrl() + image.imagePath.large,
            thumbnail: HostUrl() + image.imagePath.large,
            originalHeight: 650,
            description: image.comment,
            thumbnailLabel: image.createdAt,
          };
        })}
      />
    </Dialog>
  );
};

export default MemberImageCollectionDialog;
