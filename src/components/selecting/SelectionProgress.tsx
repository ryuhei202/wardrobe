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
import { SelectionProgressData } from "../../model/selecting/props_data/SelectionProgressData";
import { SelectionProgressCallback } from "./callback/SelectionProgressCallback";
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
  const [position, setPosition] = useState<{
    mouseX: null | Number;
    mouseY: null | number;
  }>(initialState);

  let steps = [];
  for (let index = 0; index < props.data.rentableItemNum; index++) {
    let stepLabel;
    if (props.data.items.length > index) {
      stepLabel = (
        <StepLabel
          StepIconComponent={() => (
            <Box
              display="flex"
              border={props.data.selectedIndex === index ? 1 : 0}
              borderColor="primary.main"
            >
              <img
                className={classes.stepperImage}
                src={props.data.items[index].itemImagePath}
                alt=""
              />
            </Box>
          )}
        >
          {props.data.items.length > index
            ? props.data.items[index].itemId.toString()
            : `アイテムNo.${index + 1}`}
        </StepLabel>
      );
    } else {
      stepLabel = (
        <StepLabel>
          {props.data.items.length > index
            ? props.data.items[index].itemId.toString()
            : `アイテムNo.${index + 1}`}
        </StepLabel>
      );
    }

    steps.push(
      <Tooltip
        key={index}
        title={
          <Typography variant="body2">
            {props.data.items.length > index
              ? props.data.items[index].partSizes.map((partSize, index) => (
                  <Fragment key={index}>
                    {`${partSize.name}: ${partSize.value ?? ""}`}
                    <br />
                  </Fragment>
                ))
              : []}
          </Typography>
        }
        placement="top-start"
      >
        <Step disabled={props.data.items.length < index}>
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

  if (props.data.rentableItemNum !== 0 && props.data.items.length !== 0) {
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
