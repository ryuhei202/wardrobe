import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useFilterPartSizeStyle = makeStyles((theme: Theme) =>
  createStyles({
    presetSelectFormControl: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "100%",
    },
    presetSelect: {
      fontSize: "0.8rem",
    },
  })
);
