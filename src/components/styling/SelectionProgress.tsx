import { Box, Step, StepButton, StepLabel, Stepper } from "@material-ui/core";
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
    if (props.data.items.length > index) {
      let iconComponent: JSX.Element;
      if (props.data.selectedIndex === index) {
        iconComponent = (
          <Box display="flex" border={1} borderColor="primary.main">
            <img
              className={classes.stepperImage}
              src={presenter.itemImageUrl(index)}
              alt=""
            />
          </Box>
        );
      } else {
        iconComponent = (
          <Box display="flex">
            <img
              className={classes.stepperImage}
              src={presenter.itemImageUrl(index)}
              alt=""
            />
          </Box>
        );
      }
      stepLabel = (
        <StepLabel StepIconComponent={() => <>{iconComponent}</>}>
          {presenter.labelText(index)}
        </StepLabel>
      );
    } else {
      stepLabel = <StepLabel>{presenter.labelText(index)}</StepLabel>;
    }
    steps.push(
      <Step key={index} disabled={props.data.items.length < index}>
        <StepButton
          className={classes.stepButton}
          onClick={() => props.callback.onSelect(index)}
        >
          {stepLabel}
        </StepButton>
      </Step>
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
