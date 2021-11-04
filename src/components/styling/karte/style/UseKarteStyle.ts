import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useKarteStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawerList: {
      maxWidth: 480,
    },
  })
);
