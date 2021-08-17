import { pink } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
  })
);
