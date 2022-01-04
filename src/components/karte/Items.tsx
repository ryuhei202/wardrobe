import {
  Avatar,
  Box,
  Divider,
  ListItemAvatar,
  ListItemText,
  Rating,
} from "@mui/material";
import { KarteItemResponse } from "../../model/api/response/styling/karte/KarteItemResponse";
import { PopupImage } from "../shared/PopupImage";

type Props = {
  readonly data: KarteItemResponse[];
};
export const Items = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          p: 1,
          m: 1,
          margin: "1em",
        }}
      >
        {props.data.map((item) => (
          <div>
            <ListItemAvatar>
              <Avatar variant="rounded">
                <PopupImage
                  data={{
                    originalImageUrl: item.imagePath.thumb,
                    popupImageUrl: item.imagePath.original,
                  }}
                ></PopupImage>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.id} />
            <ListItemText
              primary={item.categoryName}
              primaryTypographyProps={{ fontSize: "0.8em" }}
            />
            <ListItemText
              secondary={item.mainColorName}
              secondaryTypographyProps={{ fontSize: "0.8em" }}
            />
            <ListItemText
              secondary={item.subColorName}
              secondaryTypographyProps={{ fontSize: "0.8em" }}
            />
            <Divider />
            <ListItemText secondary={<>サイズ: {item.size}</>} />
            {item.partSizes.map((partSize) => (
              <ListItemText
                secondary={
                  <>
                    {partSize.name}: {partSize.value}
                  </>
                }
                secondaryTypographyProps={{ fontSize: "0.9em" }}
              ></ListItemText>
            ))}
            <ListItemText secondary={<>Drop: {item.dropSize}</>} />
            <ListItemText
              secondary={
                item.rating !== null ? (
                  <>
                    <Divider />
                    <Rating readOnly value={item.rating ?? 0} size="small" />
                    <br />
                    {item.reviewText}
                  </>
                ) : (
                  <></>
                )
              }
              secondaryTypographyProps={{ fontSize: "0.7em" }}
            />
          </div>
        ))}
      </Box>
    </>
  );
};
