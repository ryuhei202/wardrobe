import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export const useFilterSliderArrayStyle = makeStyles((theme: Theme) =>
  createStyles({
    filterSliderList: {
      width: "100%",
    },
  })
);
