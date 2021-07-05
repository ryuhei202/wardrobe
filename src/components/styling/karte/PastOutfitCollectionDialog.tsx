import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { HostUrl } from "../../../model/HostUrl";
import { PastOutfitCollectionDialogData } from "../../../model/styling/karte/props_data/PastOutfitCollectionDialogData";
import PopupImage from "../../shared/PopupImage";
import { PastOutfitCollectionDialogCallback } from "./callback/PastOutfitCollectionDialogCallback";
import { usePastOutfitCollectionDialogPresenter } from "./presenter/UsePastOutfitCollectionDialogPresenter";

interface PastOutfitCollectionDialogProps {
  data: PastOutfitCollectionDialogData;
  callback: PastOutfitCollectionDialogCallback;
}

export const PastOutfitCollectionDialog = (
  props: PastOutfitCollectionDialogProps
) => {
  const presenter = usePastOutfitCollectionDialogPresenter(
    props.data.pastOutfitResponses
  );

  return (
    <Dialog onClose={props.callback.onClose} open={props.data.isOpen}>
      <DialogTitle>過去コーデ一覧</DialogTitle>
      <List dense>
        {props.data.pastOutfitResponses.map((outfit, index) => (
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
                            originalImageUrl: HostUrl() + item.imagePath.large,
                            popupImageUrl: HostUrl() + item.imagePath.original,
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
        ))}
      </List>
    </Dialog>
  );
};
