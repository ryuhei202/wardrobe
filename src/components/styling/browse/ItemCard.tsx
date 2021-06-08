import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import ItemCardData from "../../../model/styling/browse/props_data/ItemCardData";
import ItemCardCallback from "./callback/ItemCardCallback";
import { useItemCardPresenter } from "./presenter/UseItemCardPresenter";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface ItemCardProps {
  data: ItemCardData;
  callback: ItemCardCallback;
}

const ItemCard = (props: ItemCardProps) => {
  const classes = useBrowseStyle();
  const presenter = useItemCardPresenter(props.data);

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
        <CardMedia className={classes.media} image={presenter.itemImageUrl()} />
        <CardContent>
          <img
            src={presenter.colorImageUrl()}
            width="30px"
            height="auto"
            alt=""
          />
          <Typography color="textSecondary">{props.data.seriesName}</Typography>
          <Typography variant="h6">{props.data.categoryName}</Typography>
          <Typography color="textSecondary">{props.data.brandName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
