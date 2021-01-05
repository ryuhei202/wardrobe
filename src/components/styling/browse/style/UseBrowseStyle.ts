import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useBrowseStyle = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    itemBrowseHeader: {
      padding: 0,
    },
    searchResult: {
      margin: 0,
      padding: theme.spacing(1, 1),
      width: 200,
    },
    filterPaper: {
      width: 200,
      maxWidth: 200,
    },
    appliedFilterContainer: {
      justifyContent: "flex-start",
      flexGrow: 1,
      flexWrap: "wrap",
    },
    button: {
      marginBlock: theme.spacing(1),
    },
    appliedFilterButton: {
      marginLeft: theme.spacing(1),
    },
    sortSelection: {
      minWidth: 100,
    },
    searchField: {
      display: "flex",
    },
    card: {
      width: 200,
      height: 425,
      margin: theme.spacing(1, 1),
      paddingBottom: theme.spacing(1),
    },
    cardActionArea: {
      width: 200,
      height: 425,
    },
    cardCollection: {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0, 2),
    },
    media: {
      height: 300,
      width: 200,
    },
    rightEndText: {
      float: "right",
    },
    paginationContainer: {
      marginTop: theme.spacing(1),
      float: "right",
    },
    itemImage: {
      height: 600,
      width: 400,
    },
    itemImageContainer: {
      marginRight: theme.spacing(2),
    },
    itemInfo: {
      display: "flex",
    },
    itemInfoText: {
      margin: theme.spacing(2, 0),
    },
    itemInfoTextContainer: {
      flexGrow: 1,
      margin: theme.spacing(0, 4, 0, 2),
    },
    colorImage: {
      margin: theme.spacing(1, 1),
    },
    itemTableContainer: {
      height: "auto",
      maxWidth: "100%",
    },
    filterSliderList: {
      width: "100%",
    },
  })
);
