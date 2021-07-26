import { indigo, pink } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useBrowseStyle = makeStyles((theme: Theme) =>
  createStyles({
    itemBrowseHeader: {
      padding: 0,
    },
    searchResult: {
      margin: 0,
      padding: theme.spacing(1, 1),
      width: 200,
    },
    filterPaper: {
      flexShrink: 0,
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
    appliedFilter: {
      marginLeft: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    sortSelection: {
      minWidth: 100,
    },
    searchField: {
      display: "flex",
    },
    card: {
      maxWidth: 200,
      margin: theme.spacing(1, 1),
      height: "min-content",
    },
    cardCollection: {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0, 2),
      height: "min-content",
    },
    media: {
      height: 300,
      width: 200,
    },
    paginationContainer: {
      marginTop: theme.spacing(1),
      float: "right",
    },
    itemImageContainer: {
      width: 400,
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
    primaryColor: {
      backgroundColor: pink[500],
    },
    darkBlue: {
      backgroundColor: indigo[500],
    },
    idSearch: {
      marginTop: theme.spacing(1),
    },
    categorySelection: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    partSize: {
      display: "block",
    },
    presetSelector: {
      display: "block",
    },
    presetLabal: {
      top: "-16px",
    },
  })
);
