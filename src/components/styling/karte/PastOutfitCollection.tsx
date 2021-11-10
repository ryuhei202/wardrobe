import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { InfoPastOutfitItemResponse } from "../../../model/api/response/styling/karte/InfoPastOutfitItemResponse";
import { PastOutfitCollectionData } from "../../../model/styling/karte/props_data/PastOutfitCollectionData";
import { PopupImage } from "../../shared/PopupImage";

interface PastOutfitCollectionProps {
  data: PastOutfitCollectionData;
}

export const PastOutfitCollection = (props: PastOutfitCollectionProps) => {
  const itemListSecondary = (item: InfoPastOutfitItemResponse): string => {
    let result = `${item.size}`;
    item.partSizes.forEach((partSize) => {
      result += `, ${partSize.name}: ${partSize.value ?? "未計測"}`;
    });
    result += `, ドロップサイズ: ${item.dropSize}`;
    return result;
  };

  return (
    <List dense>
      {props.data.pastOutfitResponses.map((outfit, index) => {
        if (
          props.data.displayOutfitNum !== undefined &&
          props.data.displayOutfitNum <= index
        ) {
          return <div key={index}></div>;
        }
        return (
          <ListItem key={index}>
            <ListItemText>
              発送日：
              {props.data.pastOutfitResponses[index].rentalStartedAt
                ? new Date(
                    props.data.pastOutfitResponses[index].rentalStartedAt!
                  ).toLocaleDateString()
                : ""}
              <br />
              コーデの評価：
              <Paper variant="outlined">
                <Typography variant="body2">
                  {props.data.pastOutfitResponses[index].feedback
                    .split("\n")
                    .map((word, index) => (
                      <Fragment key={index}>
                        {word}
                        <br></br>
                      </Fragment>
                    ))}
                </Typography>
              </Paper>
              <List dense>
                {outfit.items.map((item, index) => (
                  <ListItem alignItems="flex-start" key={index}>
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
                    <ListItemText
                      primary={`${item.id}, ${item.categoryName}, ${item.mainColorName}, ${item.subColorName}`}
                      secondary={
                        <Fragment>
                          {itemListSecondary(item)}
                          {item.rating !== null ? (
                            <>
                              <Divider />
                              <Rating readOnly value={item.rating ?? 0} />
                              <br />
                              {item.reviewText}
                            </>
                          ) : (
                            <></>
                          )}
                        </Fragment>
                      }
                    ></ListItemText>
                  </ListItem>
                ))}
              </List>
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};
