import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { PastOutfitCollectionData } from "../../../model/styling/karte/props_data/PastOutfitCollectionData";
import PopupImage from "../../shared/PopupImage";
import { usePastOutfitCollectionPresenter } from "./presenter/UsePastOutfitCollectionPresenter";

interface PastOutfitCollectionProps {
  data: PastOutfitCollectionData;
}

export const PastOutfitCollection = (props: PastOutfitCollectionProps) => {
  const presenter = usePastOutfitCollectionPresenter(
    props.data.pastOutfitResponses
  );

  return (
    <List dense>
      {props.data.pastOutfitResponses.map((outfit, index) => {
        if (
          props.data.displayOutfitNum !== undefined &&
          props.data.displayOutfitNum <= index
        ) {
          return <></>;
        }
        return (
          <ListItem key={index}>
            <ListItemText>
              発送日：{presenter.shipmentDate(index)}
              <br />
              コーデの評価：
              <Paper variant="outlined">
                <Typography variant="body2">
                  {presenter.coordinateFeedback(index).map((word, index) => (
                    <Fragment key={index}>
                      {word}
                      <br></br>
                    </Fragment>
                  ))}
                </Typography>
              </Paper>
              <List dense>
                {outfit.items.map((item, index) => (
                  <ListItem key={index}>
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
                      primary={presenter.itemListPrimary(item)}
                      secondary={presenter.itemListSecondary(item)}
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
