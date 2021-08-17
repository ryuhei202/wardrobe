import { indigo } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
