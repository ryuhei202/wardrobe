import { pink } from "@mui/material/colors";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useItemCardStyle = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 200,
      margin: theme.spacing(1, 1),
      height: "min-content",
    },
    primaryColor: {
      backgroundColor: pink[500],
    },
    media: {
      height: 300,
      width: 200,
    },
    seriesFeatureChip: {
      float: "right",
    },
  })
);
