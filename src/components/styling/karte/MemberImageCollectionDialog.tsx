import { Dialog } from "@material-ui/core";
import React from "react";
import { HostUrl } from "../../../model/HostUrl";
import ReactImageGallery from "react-image-gallery";
import { MemberImageCollectionDialogData } from "../../../model/styling/karte/props_data/MemberImageCollectionDialogData";
import { MemberImageCollectionDialogCallback } from "./callback/MemberImageCollectionDialogCallback";
import { useStylingStyle } from "../style/UseStylingStyle";

interface MemberImageCollectionDialogProps {
  data: MemberImageCollectionDialogData;
  callback: MemberImageCollectionDialogCallback;
}

export const MemberImageCollectionDialog = (
  props: MemberImageCollectionDialogProps
) => {
  const classes = useStylingStyle();
  return (
    <Dialog onClose={props.callback.onClose} open={props.data.isOpen}>
      <ReactImageGallery
        additionalClass={classes.imageGallery}
        showFullscreenButton={false}
        showPlayButton={false}
        thumbnailPosition="left"
        items={props.data.imageResponses.map((image) => {
          return {
            original: HostUrl() + image.imagePath.large,
            thumbnail: HostUrl() + image.imagePath.thumb,
            originalHeight: 650,
            description: image.comment,
            thumbnailLabel: image.createdAt,
          };
        })}
      />
    </Dialog>
  );
};
