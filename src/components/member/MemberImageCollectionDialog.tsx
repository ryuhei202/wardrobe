import { Dialog } from "@mui/material";
import React from "react";
import ReactImageGallery from "react-image-gallery";
import { MemberImageCollectionDialogData } from "../../model/selecting/member/props_data/MemberImageCollectionDialogData";
import { MemberImageCollectionDialogCallback } from "./callback/MemberImageCollectionDialogCallback";
import { useMemberImageCollectionDialogStyle } from "./style/UseMemberImageCollectionDialogStyle";

interface MemberImageCollectionDialogProps {
  data: MemberImageCollectionDialogData;
  callback: MemberImageCollectionDialogCallback;
}

export const MemberImageCollectionDialog = (
  props: MemberImageCollectionDialogProps
) => {
  const classes = useMemberImageCollectionDialogStyle();
  return (
    <Dialog onClose={props.callback.onClose} open={props.data.isOpen}>
      <ReactImageGallery
        additionalClass={classes.imageGallery}
        showFullscreenButton={false}
        showPlayButton={false}
        slideDuration={50}
        thumbnailPosition="left"
        items={props.data.imageResponses.map((image) => {
          return {
            original: image.imagePath.large,
            thumbnail: image.imagePath.thumb,
            originalHeight: 650,
            description: image.comment,
            thumbnailLabel: image.createdAt,
          };
        })}
      />
    </Dialog>
  );
};
