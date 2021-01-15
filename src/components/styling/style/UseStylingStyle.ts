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
    changeButton: {
      marginTop: theme.spacing(2),
      float: "right",
    },
    selectedItemsContainer: {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0, 2),
    },
    selectedItemCard: {
      width: 220,
      margin: theme.spacing(1),
    },
    selectedItemCardMedia: {
      height: 0,
      paddingTop: "150%",
    },
  })
);
