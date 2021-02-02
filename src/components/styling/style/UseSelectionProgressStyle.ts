import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useSelectionProgressStyle = makeStyles((theme: Theme) =>
  createStyles({
    stepper: {
      width: "100%",
      padding: theme.spacing(1, 0),
    },
    stepperImage: {
      height: 60,
      width: 40,
    },
    stepButton: {
      margin: 0,
      padding: 0,
    },
  })
);
