import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { HostUrl } from "../../../model/HostUrl";
import { NgMemoCollectionData } from "../../../model/styling/karte/props_data/NgMemoCollectionData";
import PopupImage from "../../shared/PopupImage";
import { UseNgMemoCollectionPresenter } from "./presenter/UseNgMemoCollectionPresenter";

interface NgMemoCollectionProps {
  data: NgMemoCollectionData;
}

export const NgMemoCollection = (props: NgMemoCollectionProps) => {
  const presenter = UseNgMemoCollectionPresenter(props.data.NgMemoResponses);

  return (
    <List dense>
      {props.data.NgMemoResponses.map((ng_category, index) => (
        <div>
          <ListSubheader disableSticky={true}>
            {ng_category.categoryName}
          </ListSubheader>
          <ListItem key={index}>
            <List dense>
              {ng_category.ngs.map((ng, index) => (
                <ListItem key={index}>
                  {
                    <ListItemAvatar>
                      <Avatar variant="rounded">
                        {() => {
                          if (ng.itemImagePath == null) {
                            <></>;
                          } else {
                            <PopupImage
                              data={{
                                originalImageUrl:
                                  HostUrl() + ng.itemImagePath.thumb,
                                popupImageUrl:
                                  HostUrl() + ng.itemImagePath.original,
                              }}
                            ></PopupImage>;
                          }
                        }}
                      </Avatar>
                    </ListItemAvatar>
                  }
                  <ListItemText
                    primary={ng.contentText}
                    secondary={presenter.itemListSecondary(ng)}
                  ></ListItemText>
                </ListItem>
              ))}
            </List>
          </ListItem>
        </div>
      ))}
    </List>
  );
};
