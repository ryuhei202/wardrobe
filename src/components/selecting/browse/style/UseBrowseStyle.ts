import { indigo } from "@mui/material/colors";
import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useBrowseStyle = makeStyles((theme: Theme) =>
  createStyles({
    appliedFilter: {
      marginLeft: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    darkBlue: {
      backgroundColor: indigo[500],
    },
    categorySelection: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
