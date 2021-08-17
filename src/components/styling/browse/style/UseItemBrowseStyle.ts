import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useItemBrowseStyle = makeStyles((theme: Theme) =>
  createStyles({
    itemBrowseHeader: {
      padding: 0,
    },
    searchResult: {
      margin: 0,
      padding: theme.spacing(1, 1),
      width: 200,
    },
    appliedFilterContainer: {
      justifyContent: "flex-start",
      flexGrow: 1,
      flexWrap: "wrap",
    },
    sortSelection: {
      minWidth: 100,
    },
    searchField: {
      display: "flex",
    },
    paginationContainer: {
      marginTop: theme.spacing(1),
      float: "right",
    },
  })
);
