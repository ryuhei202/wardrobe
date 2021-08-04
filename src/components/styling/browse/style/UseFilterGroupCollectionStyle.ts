import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useFilterGroupCollectionStyle = makeStyles((theme: Theme) =>
  createStyles({
    filterPaper: {
      flexShrink: 0,
      width: 200,
      maxWidth: 200,
    },
    idSearch: {
      marginTop: theme.spacing(1),
    },
    partSize: {
      display: "block",
    },
  })
);
