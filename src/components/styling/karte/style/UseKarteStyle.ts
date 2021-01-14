import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useKarteStyle = makeStyles((theme: Theme) =>
  createStyles({
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
