import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useArrangePatternStyle = makeStyles((theme: Theme) =>
  createStyles({
    completeButton: {
      margin: "0 0 0 auto",
    },
  })
);
