import { Step, StepButton, StepLabel, Stepper } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
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
      stepLabel = (
        <StepLabel
          StepIconComponent={() => (
            <img
              className={classes.stepperImage}
              src={presenter.itemImageUrl(4)}
              alt=""
            />
          )}
        >
          {presenter.labelText(index)}
        </StepLabel>
      );
    } else {
      stepLabel = <StepLabel>{presenter.labelText(index)}</StepLabel>;
    }
    steps.push(
      <Step key={index}>
        <StepButton onClick={() => props.callback.onSelect(index)}>
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
