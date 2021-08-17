import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useMemberImageCollectionDialogStyle = makeStyles((theme: Theme) =>
  createStyles({
    imageGallery: {
      "& .image-gallery-thumbnails": {
        overflow: "scroll",
      },
      "& .image-gallery-thumbnails-container": {
        transform: "none !important",
      },
    },
  })
);
