import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemText,
  Rating,
  Tooltip,
} from "@mui/material";
import { KarteItemResponse } from "../../model/api/response/styling/karte/KarteItemResponse";
import { PopupImage } from "../shared/PopupImage";

type Props = {
  readonly data: KarteItemResponse[];
};
export const Items = (props: Props) => {
  const listFontSize = { fontSize: "0.8em" };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          m: 1,
          margin: "1em",
        }}
      >
        {props.data.map((item) => (
          <Tooltip key={item.id} title={item.reviewText} followCursor>
            <List>
              <ListItemAvatar>
                <Avatar variant="rounded">
                  <PopupImage
                    data={{
                      originalImageUrl: item.imagePath.thumb,
                      popupImageUrl: item.imagePath.large,
                    }}
                  ></PopupImage>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.id} />
              <ListItemText
                primary={item.categoryName}
                primaryTypographyProps={listFontSize}
              />
              <ListItemText
                secondary={item.mainColorName}
                secondaryTypographyProps={listFontSize}
              />
              <ListItemText
                secondary={item.subColorName}
                secondaryTypographyProps={listFontSize}
              />
              <Divider />
              <ListItemText
                secondary={<>サイズ: {item.size}</>}
                secondaryTypographyProps={listFontSize}
              />
              {item.partSizes.map((partSize, index) => (
                <ListItemText
                  key={index}
                  secondary={
                    <>
                      {partSize.name}: {partSize.value}
                    </>
                  }
                  secondaryTypographyProps={listFontSize}
                ></ListItemText>
              ))}
              <ListItemText
                secondary={`Drop: ${item.dropSize}`}
                secondaryTypographyProps={listFontSize}
              />
              <ListItemText
                secondary={
                  item.rating !== null ? (
                    <>
                      <Divider />
                      <Rating readOnly value={item.rating ?? 0} size="small" />
                    </>
                  ) : (
                    <></>
                  )
                }
                secondaryTypographyProps={listFontSize}
              />
            </List>
          </Tooltip>
        ))}
      </Box>
    </>
  );
};
