import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import ItemCardData from "../../../model/styling/browse/data/ItemCardData";
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
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => props.callback.onClick}
      >
        <CardMedia className={classes.media} image={presenter.itemImageUrl()} />
        <CardContent>
          <img
            src={presenter.colorImageUrl()}
            width="30px"
            height="auto"
            alt=""
          />
          <br />
          <Typography display="inline" variant="body2" color="textSecondary">
            {props.data.categoryName}
          </Typography>
          <Typography
            className={classes.rightEndText}
            display="inline"
            variant="body2"
            color="textSecondary"
          >
            {props.data.seriesName}
          </Typography>
          <Typography variant="h6">{props.data.brandName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
