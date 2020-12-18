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
