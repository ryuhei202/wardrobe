import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStylingStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 360,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 360,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(3),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    karteContainer: {
      overflow: "auto",
    },
    progressContainer: {
      marginTop: "auto",
    },
    browseContainer: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);
