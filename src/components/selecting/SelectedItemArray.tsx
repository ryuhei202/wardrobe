import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { HostUrl } from "../../model/HostUrl";
import { TFootwear } from "../../model/selecting/footwear/TFootwear";
import { TItem } from "../../model/selecting/TItem";
import { useSelectedItemArrayStyle } from "./style/UseSelectedItemArrayStyle";

export interface SelectionConfirmProps {
  data: TItem[];
  footwear: TFootwear | null;
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
      {!!props.footwear && (
        <Card key={props.footwear.id} className={classes.selectedItemCard}>
          <CardMedia
            className={classes.selectedItemCardMedia}
            image={`${HostUrl()}/images/footwear/${props.footwear.id}.jpg`}
          />
          <CardContent>
            <Typography variant="subtitle1">{props.footwear.name}</Typography>
            <Typography variant="body2">
              キレイ度: {props.footwear.formalRank}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
