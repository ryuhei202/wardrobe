import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Coordinate } from "../../model/api/response/styling/coordinate/Coordinate";
import { PopupImage } from "../shared/PopupImage";

type TProps = {
  readonly coordinate: Coordinate;
  readonly index: number;
};

export const CoordinateListItem = ({ coordinate, index }: TProps) => {
  return (
    <>
      <Typography variant="body2">コーデ{index + 1}</Typography>
      <ListItem key={coordinate.id}>
        <List dense>
          {coordinate.items.map((item) => (
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
                primary={`${item.id}: ${item.categoryName}、${item.mainColorName}(${item.subColorName})`}
                secondary={`${item.partSizes
                  .filter((partSize) => partSize.value !== null)
                  .map((partSize) => `${partSize.name}(${partSize.value})`)}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" />
      </ListItem>
      <List dense style={{ marginLeft: 20 }}>
        <Typography variant="body2">アドバイス</Typography>
        {coordinate.advices.map((advice, index) => (
          <p>
            {index + 1}. {advice.title}
          </p>
        ))}
      </List>
    </>
  );
};
