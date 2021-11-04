import {
  Box,
  Button,
  Menu,
  MenuItem,
  PopoverPosition,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { SelectionProgressData } from "../../model/styling/props_data/SelectionProgressData";
import { SelectionProgressCallback } from "./callback/SelectionProgressCallback";
import { useSelectionProgressPresenter } from "./presenter/UseSelectionProgressPresenter";
import { useSelectionProgressStyle } from "./style/UseSelectionProgressStyle";

export interface SelectionProgressProps {
  data: SelectionProgressData;
  callback: SelectionProgressCallback;
}

const initialState = {
  mouseX: null,
  mouseY: null,
};

export const SelectionProgress = (props: SelectionProgressProps) => {
  const classes = useSelectionProgressStyle();
  const presenter = useSelectionProgressPresenter(props.data);
  const [position, setPosition] = useState<{
    mouseX: null | Number;
    mouseY: null | number;
  }>(initialState);

  let steps = [];
  for (let index = 0; index < props.data.rentableItemNum; index++) {
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
          <Typography variant="body2">
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
  if (presenter.isCompleteButtonAvailable()) {
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
    <div
      onContextMenu={(event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setPosition({
          mouseX: event.clientX - 2,
          mouseY: event.clientY - 4,
        });
      }}
    >
      {completeButton}
      <Stepper
        activeStep={props.data.selectedIndex}
        alternativeLabel
        className={classes.stepper}
      >
        {steps}
      </Stepper>
      <Menu
        keepMounted
        open={position.mouseY !== null}
        onClose={() => setPosition(initialState)}
        anchorReference="anchorPosition"
        anchorPosition={
          position.mouseY !== null && position.mouseX !== null
            ? ({
                top: position.mouseY,
                left: position.mouseX,
              } as PopoverPosition)
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            props.callback.onAddItemNum();
            setPosition(initialState);
          }}
        >
          アイテム数を追加
        </MenuItem>
      </Menu>
    </div>
  );
};
