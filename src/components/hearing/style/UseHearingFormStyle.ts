import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useHearingFormStyle = makeStyles((theme: Theme) =>
  createStyles({
    completeButton: {
      float: "right",
      marginLeft: "70%",
      marginBottom: 20,
    },
  })
);
