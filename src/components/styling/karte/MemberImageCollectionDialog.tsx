import { Dialog } from "@material-ui/core";
import React from "react";
import { HostUrl } from "../../../model/HostUrl";
import ReactImageGallery from "react-image-gallery";
import { MemberImageCollectionDialogData } from "../../../model/styling/karte/props_data/MemberImageCollectionDialogData";
import { MemberImageCollectionDialogCallback } from "./callback/MemberImageCollectionDialogCallback";

interface MemberImageCollectionDialogProps {
  data: MemberImageCollectionDialogData;
  callback: MemberImageCollectionDialogCallback;
}

export const MemberImageCollectionDialog = (
  props: MemberImageCollectionDialogProps
) => {
  return (
    <Dialog onClose={props.callback.onClose} open={props.data.isOpen}>
      <ReactImageGallery
        showFullscreenButton={false}
        showPlayButton={false}
        lazyLoad={true}
        slideOnThumbnailOver={true}
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
