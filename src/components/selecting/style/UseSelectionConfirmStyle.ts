import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useSelectionConfirmStyle = makeStyles((theme: Theme) =>
  createStyles({
    confirmInfoContainer: {
      padding: theme.spacing(1),
    },
    confirmInfoTitle: {
      margin: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    changeButton: {
      margin: theme.spacing(2),
      float: "right",
    },
  })
);
