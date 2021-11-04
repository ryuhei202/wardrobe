import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

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
