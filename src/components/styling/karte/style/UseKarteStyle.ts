import { createStyles, makeStyles, Theme } from "@material-ui/core";

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
    accordionDetails: {
      display: "block",
    },
    itemImage: {
      display: "inline-block",
      width: "25%",
    },
    memberImageCollectionImage: {
      top: "50%",
      position: "relative",
      transform: "translateY(-50%)",
    },
  })
);
