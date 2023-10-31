import { orange, red } from "@mui/material/colors";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useValidationDialogStyle = makeStyles(() =>
  createStyles({
    error: {
      backgroundColor: red[500],
    },
    warning: {
      backgroundColor: orange[500],
    },
  }),
);
