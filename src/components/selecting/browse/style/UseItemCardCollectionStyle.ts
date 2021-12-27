import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

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
