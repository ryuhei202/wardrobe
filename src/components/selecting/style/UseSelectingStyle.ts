import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useSelectingStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 420,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 420,
    },
    drawerContents: {
      overflow: "auto",
    },
    oldProgressContainer: {
      marginTop: "auto",
    },
    selectionProgress: {
      position: "fixed",
      bottom: 0,
      left: "360px",
      right: "360px",
      margin: "0 16px",
    },
    browseContainer: {
      flexGrow: 1,
      padding: theme.spacing(0, 3, 3, 3),
    },
    selecting: {
      margin: "10px 0 220px",
    },
  })
);
