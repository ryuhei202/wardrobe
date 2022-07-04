import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useHearingStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 360,
      flexShrink: 0,
    },
    rightDrawer: {
      width: 360,
      flexGrow: 1,
    },
    drawerPaper: {
      width: 360,
    },
    drawerContents: {
      overflow: "auto",
    },
    hearingMainContainer: {
      flexGrow: 1,
      padding: theme.spacing(3, 3, 3, 3),
    },
  })
);
