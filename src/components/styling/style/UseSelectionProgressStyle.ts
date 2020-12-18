import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useSelectionProgressStyle = makeStyles((theme: Theme) =>
  createStyles({
    stepper: {
      width: "100%",
    },
    stepperImage: {
      height: 60,
      width: 40,
    },
  })
);
