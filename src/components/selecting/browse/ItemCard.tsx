import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { HostUrl } from "../../../model/HostUrl";
import { ItemCardData } from "../../../model/selecting/browse/props_data/ItemCardData";
import { ItemCardCallback } from "./callback/ItemCardCallback";
import { useItemCardStyle } from "./style/UseItemCardStyle";

interface ItemCardProps {
  data: ItemCardData;
  callback: ItemCardCallback;
}

export const ItemCard = (props: ItemCardProps) => {
  const classes = useItemCardStyle();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => props.callback.onClick()}>
        {props.data.isMarriage ? (
          <CardHeader
            avatar={<Avatar className={classes.primaryColor}>婚活</Avatar>}
          />
        ) : (
          <></>
        )}
        <CardMedia className={classes.media} image={props.data.imagePath} />
        <CardContent>
          <img
            src={HostUrl() + props.data.mainColorImagePath}
            width="30px"
            height="auto"
            alt=""
          />
          <img
            src={HostUrl() + props.data.subColorImagePath}
            width="30px"
            height="auto"
            alt=""
          />
          <Typography variant="body1">{props.data.seriesName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {props.data.categoryName}
          </Typography>
          <Typography variant="body1">{props.data.brandName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
