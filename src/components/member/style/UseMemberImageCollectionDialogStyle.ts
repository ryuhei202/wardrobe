import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useMemberImageCollectionDialogStyle = makeStyles(() =>
  createStyles({
    imageGallery: {
      "& .image-gallery-thumbnails": {
        overflow: "scroll",
      },
      "& .image-gallery-thumbnails-container": {
        transform: "none !important",
      },
    },
  }),
);
