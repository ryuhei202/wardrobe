import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useSelectedItemArrayStyle = makeStyles((theme: Theme) =>
  createStyles({
    selectedItemsContainer: {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0, 2),
    },
    selectedItemCardMedia: {
      height: 0,
      paddingTop: "150%",
    },
    selectedItemCard: {
      width: 220,
      margin: theme.spacing(1),
    },
  })
);
