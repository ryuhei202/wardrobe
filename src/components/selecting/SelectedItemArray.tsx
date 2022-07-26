import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { TItem } from "../../model/selecting/TItem";
import { useSelectedItemArrayStyle } from "./style/UseSelectedItemArrayStyle";

export interface SelectionConfirmProps {
  data: TItem[];
}

export const SelectedItemArray = (props: SelectionConfirmProps) => {
  const classes = useSelectedItemArrayStyle();

  return (
    <div className={classes.selectedItemsContainer}>
      {props.data.map((selectedItem, index) => (
        <Card key={selectedItem.id} className={classes.selectedItemCard}>
          <CardHeader subheader={`ID: ${props.data[index].id}`} />
          <CardMedia
            className={classes.selectedItemCardMedia}
            image={
              props.data[index].imagePath.largeThumb ??
              props.data[index].imagePath.large
            }
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
            <br />
            <Typography variant="body2">
              カテゴリー: {props.data[index].categoryName}
              <br />
              メインカラー: {props.data[index].mainColorName}
              <br />
              サブカラー: {props.data[index].subColorName}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
