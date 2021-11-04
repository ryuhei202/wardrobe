import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { SelectedItem } from "../../model/styling/SelectedItem";
import { useSelectedItemArrayPresenter } from "./presenter/UseSelectedItemArrayPresenter";
import { useSelectedItemArrayStyle } from "./style/UseSelectedItemArrayStyle";

export interface SelectionConfirmProps {
  data: SelectedItem[];
}

export const SelectedItemArray = (props: SelectionConfirmProps) => {
  const classes = useSelectedItemArrayStyle();
  const presenter = useSelectedItemArrayPresenter(props.data);

  return (
    <div className={classes.selectedItemsContainer}>
      {props.data.map((selectedItem, index) => (
        <Card key={selectedItem.itemId} className={classes.selectedItemCard}>
          <CardHeader subheader={presenter.itemIdText(index)} />
          <CardMedia
            className={classes.selectedItemCardMedia}
            image={presenter.itemImageUrl(index)}
          />
          <CardContent>
            <Typography variant="subtitle1">
              {presenter.locationName(index)}
            </Typography>
            <br />
            <Typography variant="body2">
              {presenter.sizeText(index).map((rowText, index) => (
                <Fragment key={index}>
                  {rowText}
                  <br />
                </Fragment>
              ))}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
