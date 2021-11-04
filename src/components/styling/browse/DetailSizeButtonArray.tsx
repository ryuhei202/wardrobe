import { Button, Radio } from "@mui/material";
import React from "react";
import { DetailSizeButtonData } from "../../../model/styling/browse/props_data/DetailSizeButtonData";
import { DetailSizeButtonArrayCallback } from "./callback/DetailSizeButtonArrayCallback";

interface DetailSizeButtonArrayProps {
  data: DetailSizeButtonData[];
  callback: DetailSizeButtonArrayCallback;
}

export const DetailSizeButtonArray = (props: DetailSizeButtonArrayProps) => {
  return (
    <>
      {props.data.map((buttonData, index) => (
        <Radio
          checked={buttonData.isSelected}
          onChange={() => props.callback.onSelect(index)}
          name="size-radio-button"
          disabled={buttonData.isDisabled}
          icon={
            <Button variant="outlined" disabled={buttonData.isDisabled}>
              {buttonData.name}
            </Button>
          }
          checkedIcon={
            <Button
              variant="contained"
              color="secondary"
              disableElevation={true}
            >
              {buttonData.name}
            </Button>
          }
          key={index}
        />
      ))}
    </>
  );
};
