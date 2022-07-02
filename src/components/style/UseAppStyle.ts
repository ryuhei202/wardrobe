import zIndex from "@mui/material/styles/zIndex";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useAppStyle = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
    },
    appBar: {
      zIndex: zIndex.drawer + 1,
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
    },
    chartPickButton: {
      float: "right",
    },
    coordinatesDropDownMenu: {
      flexGrow: 1,
    },
    title: {
      marginRight: "40px",
      fontWeight: "bold",
      letterSpacing: 1,
    },
  })
);
