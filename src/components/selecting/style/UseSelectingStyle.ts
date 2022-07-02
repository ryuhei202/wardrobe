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
    browseContainer: {
      flexGrow: 1,
      padding: theme.spacing(0, 3, 3, 3),
    },
  })
);
