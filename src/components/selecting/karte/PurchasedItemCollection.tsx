import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { PurchasedItemCollectionData } from "../../../model/selecting/karte/props_data/PurchasedItemCollectionData";
import { PopupImage } from "../../shared/PopupImage";

interface PurchasedItemCollectionProps {
  data: PurchasedItemCollectionData;
}

export const PurchasedItemCollection = (
  props: PurchasedItemCollectionProps
) => {
  return (
    <List dense>
      {props.data.purchasedItemResponses.map((purchasedItem, index) => {
        return (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar variant="rounded">
                <PopupImage
                  data={{
                    originalImageUrl: purchasedItem.imagePath.thumb,
                    popupImageUrl: purchasedItem.imagePath.original,
                  }}
                ></PopupImage>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${purchasedItem.id} / 
                ${purchasedItem.brandName} / 
                ${purchasedItem.size} / 
                ${purchasedItem.categoryName} / 
                ${purchasedItem.colorName} / 
                ${purchasedItem.patternName}`}
              secondary={`購入日：${new Date(
                purchasedItem.purchasedDate
              ).toLocaleDateString()}`}
            ></ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};
