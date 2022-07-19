import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useBrowseDetailStyle = makeStyles((theme: Theme) =>
  createStyles({
    itemInfo: {
      display: "flex",
    },
    itemInfoText: {
      margin: theme.spacing(2, 0),
    },
    itemInfoTextContainer: {
      flexGrow: 1,
      margin: theme.spacing(0, 4, 0, 2),
    },
    colorImage: {
      margin: theme.spacing(1, 1),
    },
    itemTableContainer: {
      height: "auto",
      maxWidth: "100%",
    },
    button: {
      marginBlock: theme.spacing(1),
    },
  })
);
