import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

export const useKarteStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(3),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    drawerContainer: {
      overflow: "auto",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    drawerList: {
      width: 360,
    },
  })
);
