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
import { useQueryClient } from "react-query";
import { useCoordinateFootwearsUpdate } from "../../hooks/api/UseCoordinateFootwearsUpdate";
import { HostUrl } from "../../model/HostUrl";
import { SelectionProgressData } from "../../model/selecting/props_data/SelectionProgressData";
import { CoordinateIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { SelectFootwearDialogContainer } from "../footwear/SelectFootwearDialogContainer";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = useSelectionProgressStyle();
  const [position, setPosition] = useState<{
    mouseX: null | Number;
    mouseY: null | number;
  }>(initialState);
  const coordinateId = useContextDefinedState(CoordinateIdContext);
  const { mutate } = useCoordinateFootwearsUpdate();
  const queryClient = useQueryClient();
  const handleSubmitFootwear = (footwearId: number) => {
    mutate(
      { footwearId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            `coordinates/${coordinateId}/coordinate_footwear`
          );
          setIsOpen(false);
        },
        onError: () => {
          setIsOpen(false);
        },
      }
    );
  };
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
                src={props.data.items[index].imagePath.thumb}
                alt=""
              />
            </Box>
          )}
        >
          {props.data.items.length > index
            ? props.data.items[index].id.toString()
            : `アイテムNo.${index + 1}`}
        </StepLabel>
      );
    } else {
      stepLabel = (
        <StepLabel>
          {props.data.items.length > index
            ? props.data.items[index].id.toString()
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
      <div style={{ display: "flex" }}>
        <Stepper
          activeStep={props.data.selectedIndex}
          alternativeLabel
          className={classes.stepper}
        >
          {steps}
        </Stepper>
        <div style={{ width: 100 }}>
          {!!props.data.selecterFootwear ? (
            <div style={{ height: "100%" }}>
              <Button onClick={() => setIsOpen(true)}>
                <img
                  style={{ width: 70, height: 70 }}
                  src={`${HostUrl()}/images/footwear/${
                    props.data.selecterFootwear.id
                  }.jpg`}
                  alt="くつ"
                />
              </Button>
            </div>
          ) : (
            <div>
              <Button variant="outlined" onClick={() => setIsOpen(true)}>
                靴を選ぶ
              </Button>
            </div>
          )}
        </div>
      </div>
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
      <SelectFootwearDialogContainer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClick={handleSubmitFootwear}
      />
    </div>
  );
};
