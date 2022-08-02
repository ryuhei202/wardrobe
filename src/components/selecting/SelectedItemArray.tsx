import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { ChangeItemSwitch } from "../coordinateItem/ChangeItemSwitch";
import { useSelectedItemArrayStyle } from "./style/UseSelectedItemArrayStyle";

export interface SelectionConfirmProps {
  data: TCoordinateItem[];
}

export const SelectedItemArray = (props: SelectionConfirmProps) => {
  const classes = useSelectedItemArrayStyle();

  return (
    <div className={classes.selectedItemsContainer}>
      {props.data.map((selectedItem, index) => (
        <Card key={selectedItem.id} className={classes.selectedItemCard}>
          <CardHeader subheader={`ID: ${props.data[index].itemInfo.id}`} />
          <ChangeItemSwitch coordinateItem={selectedItem} />
          <CardMedia
            className={classes.selectedItemCardMedia}
            image={
              props.data[index].itemInfo.imagePath.largeThumb ??
              props.data[index].itemInfo.imagePath.large
            }
          />
          <CardContent>
            <Typography variant="subtitle1">
              {`棚番: ${props.data[index].itemInfo.locationName}`}
            </Typography>
            <br />
            <Typography variant="body2">
              サイズ情報:
              <br />
              {props.data[index].itemInfo.partSizes.map((partSize, index) => (
                <Fragment key={index}>
                  {`${partSize.name}: ${partSize.value ?? ""}`}
                  <br />
                </Fragment>
              ))}
            </Typography>
            <br />
            <Typography variant="body2">
              カテゴリー: {props.data[index].itemInfo.categoryName}
              <br />
              メインカラー: {props.data[index].itemInfo.mainColorName}
              <br />
              サブカラー: {props.data[index].itemInfo.subColorName}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
