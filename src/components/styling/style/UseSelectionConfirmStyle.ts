import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
