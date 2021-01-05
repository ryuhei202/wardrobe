import {
  Box,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import SelectionProgressData from "../../model/styling/props_data/SelectionProgressData";
import SelectionProgressCallback from "./callback/SelectionProgressCallback";
import { useSelectionProgressPresenter } from "./presenter/UseSelectionProgressPresenter";
import { useSelectionProgressStyle } from "./style/UseSelectionProgressStyle";

export interface SelectionProgressProps {
  data: SelectionProgressData;
  callback: SelectionProgressCallback;
}

const SelectionProgress = (props: SelectionProgressProps) => {
  const classes = useSelectionProgressStyle();
  const presenter = useSelectionProgressPresenter(props.data);

  let steps = [];
  for (let index = 0; index < 4; index++) {
    let stepLabel;
    if (presenter.hasItemImage(index)) {
      stepLabel = (
        <StepLabel
          StepIconComponent={() => (
            <Box
              display="flex"
              border={presenter.borderProp(index)}
              borderColor="primary.main"
            >
              <img
                className={classes.stepperImage}
                src={presenter.itemImageUrl(index)}
                alt=""
              />
            </Box>
          )}
        >
          {presenter.labelText(index)}
        </StepLabel>
      );
    } else {
      stepLabel = <StepLabel>{presenter.labelText(index)}</StepLabel>;
    }

    steps.push(
      <Tooltip
        title={
          <Typography>
            {presenter.tooltipText(index).map((text) => (
              <>
                {text}
                <br />
              </>
            ))}
          </Typography>
        }
        placement="top-start"
      >
        <Step key={index} disabled={presenter.isDisabled(index)}>
          <StepButton
            className={classes.stepButton}
            onClick={() => props.callback.onSelect(index)}
          >
            {stepLabel}
          </StepButton>
        </Step>
      </Tooltip>
    );
  }

  return (
    <Stepper
      activeStep={props.data.selectedIndex}
      alternativeLabel
      className={classes.stepper}
    >
      {steps}
    </Stepper>
  );
};

export default SelectionProgress;
