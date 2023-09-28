import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { HostUrl } from "../../model/HostUrl";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { TFootwear } from "../../model/selecting/footwear/TFootwear";
import { ItemConfirmCard } from "../shared/ItemConfirmCard";
import { useSelectedItemArrayStyle } from "./style/UseSelectedItemArrayStyle";

export interface SelectionConfirmProps {
  data: TCoordinateItem[];
  footwear: TFootwear | null;
}

export const SelectedItemArray = (props: SelectionConfirmProps) => {
  const classes = useSelectedItemArrayStyle();

  return (
    <div className={classes.selectedItemsContainer}>
      {props.data.map((selectedItem, index) => (
        <ItemConfirmCard
          item={props.data[index].itemInfo}
          selectedItem={selectedItem}
          key={index}
        />
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
