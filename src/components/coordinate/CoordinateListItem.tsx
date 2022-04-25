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
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";
import { PopupImage } from "../shared/PopupImage";

type TProps = {
  coordinate: Coordinate;
};

export const CoordinateListItem = ({ coordinate }: TProps) => {
  return (
    <>
      <Typography>コーデID: {coordinate.id}</Typography>
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
      </ListItem>
      <Divider variant="middle" />
      <SelectedReviewContainer coordinateId={coordinate.id} />
    </>
  );
};
