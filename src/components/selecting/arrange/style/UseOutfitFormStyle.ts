import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useOutfitFormStyle = makeStyles((theme: Theme) =>
  createStyles({
    adviceFormControl: {
      margin: theme.spacing(1),
      minWidth: 360,
    },
    adviceDeleteButton: {
      margin: "1em 4em",
    },
    registerButton: {
      margin: "0 0 0 auto",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
