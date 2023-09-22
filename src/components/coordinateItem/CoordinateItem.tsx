import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { PartSizeResponse } from "../../model/api/response/styling/karte/KartePartSizeResponse";
import { TItem } from "../../model/selecting/TItem";
import { PopupImage } from "../shared/PopupImage";

type Props = {
  item: TItem;
};

export const CoordinateItem = ({ item }: Props) => {
  return (
    <ListItem key={item.id}>
      <ListItemAvatar>
        <Avatar variant="rounded">
          <PopupImage
            data={{
              originalImageUrl: item.imagePath.thumb,
              popupImageUrl: item.imagePath.large,
            }}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${item.id} / ${item.brandName} / ${item.categoryName} / ${item.mainColorName}(${item.subColorName}) / ${item.patternName}`}
        secondary={
          <>
            <b>{item.size}</b>,&nbsp;
            {item.partSizes
              .filter((partSize: PartSizeResponse) => partSize.value !== null)
              .map((partSize, index) => (
                <span key={index}>
                  {partSize.name}(<b>{partSize.value}</b>),&nbsp;
                </span>
              ))}
            Drop(<b>{item.dropSize}</b>)
          </>
        }
      />
    </ListItem>
  );
};
