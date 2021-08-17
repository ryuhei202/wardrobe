import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useOutfitFormStyle = makeStyles((theme: Theme) =>
  createStyles({
    adviceFormControl: {
      margin: theme.spacing(1),
      minWidth: 360,
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
