import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useFeedbackDialogStyle = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
  })
);
