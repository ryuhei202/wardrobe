import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import BrowseIndexContentResponse from "../../../model/api/response/styling/browse/BrowseIndexContentResponse";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface ItemCardCollectionProps {
  data: BrowseIndexContentResponse | null;
}

const ItemCardCollection = (props: ItemCardCollectionProps) => {
  const classes = useBrowseStyle();
  return (
    <div className={classes.cardCollection}>
      <Card className={classes.card}>
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia
            className={classes.media}
            image="https://leeap.jp/files/preregistered_item/149/14949/IMG_0371.JPG"
          />
          <CardContent>
            <img
              src="https://leeap.jp/images/color/2.jpg"
              width="30px"
              height="auto"
              alt=""
            />
            <img
              src="https://leeap.jp/images/color/3.jpg"
              width="30px"
              height="auto"
              alt=""
            />
            <br />
            <Typography display="inline" variant="body2" color="textSecondary">
              パーカー
            </Typography>
            <Typography
              className={classes.rightEndText}
              display="inline"
              variant="body2"
              color="textSecondary"
            >
              KZ-CS04
            </Typography>
            <Typography variant="h6">leeap</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia
            className={classes.media}
            image="https://leeap.jp/files/preregistered_item/0/58/IMG_2892.JPG"
          />
          <CardContent>
            <img
              src="https://leeap.jp/images/color/5.jpg"
              width="30px"
              height="auto"
              alt=""
            />
            <br />
            <Typography display="inline" variant="body2" color="textSecondary">
              パーカー
            </Typography>
            <Typography variant="h6">nano・universe</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={classes.card}>
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia
            className={classes.media}
            image="https://leeap.jp/files/preregistered_item/0/4/IMG_2893.JPG"
          />
          <CardContent>
            <img
              src="https://leeap.jp/images/color/1.jpg"
              width="30px"
              height="auto"
              alt=""
            />
            <br />
            <Typography display="inline" variant="body2" color="textSecondary">
              パーカー
            </Typography>
            <Typography variant="h6">nano・universe</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ItemCardCollection;
