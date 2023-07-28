import {
  Box,
  Button,
  Menu,
  PopoverPosition,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { TItem } from "../../model/selecting/TItem";
import { useSelectionProgressStyle } from "../selecting/style/UseSelectionProgressStyle";

const initialState = {
  mouseX: null,
  mouseY: null,
};

type TProps = {
  items: TItem[];
  selectedIndex: number;
  rentableNum: number;
  onSelect: (index: number) => void;
  onClickCompleteButton: () => void;
};
export const RentalSelectionProgress = ({
  items,
  selectedIndex,
  rentableNum,
  onSelect,
  onClickCompleteButton,
}: TProps) => {
  const classes = useSelectionProgressStyle();
  const [position, setPosition] = useState<{
    mouseX: null | Number;
    mouseY: null | number;
  }>(initialState);

  let steps = [];
  for (let i = 0; i < rentableNum; i++) {
    let stepLabel;
    if (items.length > i) {
      stepLabel = (
        <StepLabel
          StepIconComponent={() => (
            <Box
              display="flex"
              border={selectedIndex === i ? 1 : 0}
              borderColor="primary.main"
            >
              <img
                className={classes.stepperImage}
                src={items[i].imagePath.thumb}
                alt=""
              />
            </Box>
          )}
        >
          {items.length > i ? items[i].id.toString() : `アイテムNo.${i + 1}`}
        </StepLabel>
      );
    } else {
      stepLabel = (
        <StepLabel>
          {items.length > i ? items[i].id.toString() : `アイテムNo.${i + 1}`}
        </StepLabel>
      );
    }
    steps.push(
      <Tooltip
        key={i}
        title={
          <Typography variant="body2">
            {items.length > i
              ? items[i].partSizes.map((partSize, index) => (
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
        <Step disabled={items.length < i}>
          <StepButton
            className={classes.stepButton}
            onClick={() => onSelect(i)}
          >
            {stepLabel}
          </StepButton>
        </Step>
      </Tooltip>,
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
      <Button
        variant="contained"
        color="primary"
        onClick={onClickCompleteButton}
      >
        アイテム選択完了
      </Button>
      <div style={{ display: "flex" }}>
        <Stepper
          activeStep={selectedIndex}
          alternativeLabel
          className={classes.stepper}
        >
          {steps}
        </Stepper>
        <div style={{ width: 100 }}>
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
          ></Menu>
        </div>
      </div>
    </div>
  );
};
