import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { orange, red } from "@material-ui/core/colors";

export const useValidationDialogStyle = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      backgroundColor: red[500],
    },
    warning: {
      backgroundColor: orange[500],
    },
  })
);
