import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { TItem } from "../../model/selecting/TItem";
import { ChangeItemSwitch } from "../coordinateItem/ChangeItemSwitch";
import { useSelectedItemArrayStyle } from "../selecting/style/UseSelectedItemArrayStyle";

type TProps = {
  item: TItem;
  selectedItem?: TCoordinateItem;
};
export const ItemConfirmCard = ({ item, selectedItem }: TProps) => {
  const classes = useSelectedItemArrayStyle();
  return (
    <Card key={item.id} className={classes.selectedItemCard}>
      <CardHeader subheader={`ID: ${item.id}`} />
      {selectedItem && <ChangeItemSwitch coordinateItem={selectedItem} />}
      <CardMedia
        className={classes.selectedItemCardMedia}
        image={item.imagePath.largeThumb ?? item.imagePath.large}
      />
      <CardContent>
        <Typography variant="subtitle1">
          {`棚番: ${item.locationName}`}
        </Typography>
        <br />
        <Typography variant="body2">
          サイズ情報:
          <br />
          {item.partSizes.map((partSize, index) => (
            <Fragment key={index}>
              {`${partSize.name}: ${partSize.value ?? ""}`}
              <br />
            </Fragment>
          ))}
        </Typography>
        <br />
        <Typography variant="body2">
          カテゴリー: {item.categoryName}
          <br />
          メインカラー: {item.mainColorName}
          <br />
          サブカラー: {item.subColorName}
          <br />
          ランク: {item.rank}
        </Typography>
      </CardContent>
    </Card>
  );
};
