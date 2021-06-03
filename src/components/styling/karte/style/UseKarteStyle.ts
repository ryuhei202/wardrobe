import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useKarteStyle = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    drawerList: {
      maxWidth: 360,
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
    tabContainer: {
      flexGrow: 1,
      maxWidth: 360,
    },
    contentContainer: {
      overflow: "auto",
    },
    karteTab: {
      minWidth: 120,
    },
  })
);
