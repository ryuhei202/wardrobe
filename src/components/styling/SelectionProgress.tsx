import {
  Box,
  Button,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import KarteResponse from "../../model/api/response/styling/karte/KarteResponse";
import SelectionProgressData from "../../model/styling/props_data/SelectionProgressData";
import SelectionProgressCallback from "./callback/SelectionProgressCallback";
import { useSelectionProgressPresenter } from "./presenter/UseSelectionProgressPresenter";
import { useSelectionProgressStyle } from "./style/UseSelectionProgressStyle";

export interface SelectionProgressProps {
  response: KarteResponse;
  data: SelectionProgressData;
  callback: SelectionProgressCallback;
}

const SelectionProgress = (props: SelectionProgressProps) => {
  const classes = useSelectionProgressStyle();
  const presenter = useSelectionProgressPresenter(props.data);

  let steps = [];
  for (let index = 0; index < props.response.rentableItemNum; index++) {
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
        key={index}
        title={
          <Typography>
            {presenter.tooltipText(index).map((text, index) => (
              <Fragment key={index}>
                {text}
                <br />
              </Fragment>
            ))}
          </Typography>
        }
        placement="top-start"
      >
        <Step disabled={presenter.isDisabled(index)}>
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

  let completeButton;
  if (props.response.rentableItemNum === props.data.items.length) {
    completeButton = (
      <Button
        variant="contained"
        color="primary"
        onClick={props.callback.onClickCompleteButton}
      >
        アイテム選択完了
      </Button>
    );
  }

  return (
    <>
      {completeButton}
      <Stepper
        activeStep={props.data.selectedIndex}
        alternativeLabel
        className={classes.stepper}
      >
        {steps}
      </Stepper>
    </>
  );
};

export default SelectionProgress;
