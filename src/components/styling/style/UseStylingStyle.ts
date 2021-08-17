import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStylingStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 480,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 480,
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
      padding: theme.spacing(0, 3, 3, 3),
    },
  })
);
