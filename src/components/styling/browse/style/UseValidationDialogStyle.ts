import { orange, red } from "@mui/material/colors";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

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
