import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

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
      backgroundColor: blue[500],
    },
    ProgressContainer: {
      height: 100,
      width: "100%",
      backgroundColor: red[500],
    },
  })
);
