import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useArrangeStyle = makeStyles((theme: Theme) =>
  createStyles({
    completeButton: {
      float: "right",
    },
  })
);
