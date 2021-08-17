import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useItemCardCollectionStyle = makeStyles((theme: Theme) =>
  createStyles({
    cardCollection: {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0, 2),
      height: "min-content",
    },
  })
);
