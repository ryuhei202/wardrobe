import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { CoordinatePattern } from "../../model/api/response/styling/coordinatePattern/CoordinatePattern";
import { PartSizeResponse } from "../../model/api/response/styling/karte/KartePartSizeResponse";
import { PopupImage } from "../shared/PopupImage";

type TProps = {
  readonly coordinatePattern: CoordinatePattern;
  readonly index: number;
};

export const CoordinateListItem = ({ coordinatePattern, index }: TProps) => {
  return (
    <>
      <ListSubheader>パターン {index + 1}</ListSubheader>
      <ListItem>
        <List dense>
          {coordinatePattern.items.map((item) => (
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
                      .filter(
                        (partSize: PartSizeResponse) => partSize.value !== null
                      )
                      .map((partSize) => (
                        <>
                          {partSize.name}(<b>{partSize.value}</b>),&nbsp;
                        </>
                      ))}
                    Drop(<b>{item.dropSize}</b>)
                  </>
                }
              />
            </ListItem>
          ))}
          <ListSubheader>アドバイス</ListSubheader>
          {coordinatePattern.advices.map((advice, index) => (
            <ListItem>
              <ListItemText>{`${index + 1}. ${advice.title}`}</ListItemText>
            </ListItem>
          ))}
        </List>
      </ListItem>
    </>
  );
};
