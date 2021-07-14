import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { PurchasedItemCollectionData } from "../../../model/styling/karte/props_data/PurchasedItemCollectionData";
import PopupImage from "../../shared/PopupImage";
import { usePurchasedItemCollectionPresenter } from "./presenter/UsePurchasedItemCollectionPresenter";

interface PurchasedItemCollectionProps {
  data: PurchasedItemCollectionData;
}

export const PurchasedItemCollection = (
  props: PurchasedItemCollectionProps
) => {
  const presenter = usePurchasedItemCollectionPresenter();

  return (
    <List dense>
      {props.data.purchasedItemResponses.map((purchasedItem, index) => {
        return (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar variant="rounded">
                <PopupImage
                  data={{
                    originalImageUrl: presenter.itemListOriginalImageUrl(
                      purchasedItem
                    ),
                    popupImageUrl: presenter.itemListPopupImageUrl(
                      purchasedItem
                    ),
                  }}
                ></PopupImage>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={presenter.itemListText(purchasedItem)}
            ></ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};
