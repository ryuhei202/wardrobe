import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useAppStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
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
      height: 100,
      width: "100%",
      marginTop: "auto",
    },
    browseContainer: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);
