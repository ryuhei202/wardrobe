import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

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
