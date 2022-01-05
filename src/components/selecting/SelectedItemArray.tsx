import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { SelectedItem } from "../../model/selecting/SelectedItem";
import { useSelectedItemArrayStyle } from "./style/UseSelectedItemArrayStyle";

export interface SelectionConfirmProps {
  data: SelectedItem[];
}

export const SelectedItemArray = (props: SelectionConfirmProps) => {
  const classes = useSelectedItemArrayStyle();

  return (
    <div className={classes.selectedItemsContainer}>
      {props.data.map((selectedItem, index) => (
        <Card key={selectedItem.itemId} className={classes.selectedItemCard}>
          <CardHeader subheader={`ID: ${props.data[index].itemId}`} />
          <CardMedia
            className={classes.selectedItemCardMedia}
            image={props.data[index].itemImagePath}
          />
          <CardContent>
            <Typography variant="subtitle1">
              {`棚番: ${props.data[index].locationName}`}
            </Typography>
            <br />
            <Typography variant="body2">
              サイズ情報:
              <br />
              {props.data[index].partSizes.map((partSize, index) => (
                <Fragment key={index}>
                  {`${partSize.name}: ${partSize.value ?? ""}`}
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
