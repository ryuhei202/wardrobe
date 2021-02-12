import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useArrangeStyle = makeStyles((theme: Theme) =>
  createStyles({
    adviceFormControl: {
      margin: theme.spacing(1),
      minWidth: 360,
    },
    registeredAdviceListContainer: {
      marginTop: theme.spacing(1),
    },
    completeButton: {
      float: "right",
    },
    registerButton: {
      marginTop: theme.spacing(2),
      float: "right",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
