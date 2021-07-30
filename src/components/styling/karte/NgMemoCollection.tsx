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
import { useNgMemoCollectionPresenter } from "./presenter/UseNgMemoCollectionPresenter";

interface NgMemoCollectionProps {
  data: NgMemoCollectionData;
}

export const NgMemoCollection = (props: NgMemoCollectionProps) => {
  const presenter = useNgMemoCollectionPresenter(props.data.ngMemoResponses);

  return (
    <List dense>
      {props.data.ngMemoResponses.map((ng_category, index) => (
        <Fragment key={index}>
          <ListSubheader disableSticky={true}>
            {ng_category.categoryName}
          </ListSubheader>
          <ListItem>
            <List dense>
              {ng_category.ngs.map((ng, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar variant="rounded">
                      {ng.itemImagePath == null ? (
                        <></>
                      ) : (
                        <PopupImage
                          data={{
                            originalImageUrl:
                              HostUrl() + ng.itemImagePath.thumb,
                            popupImageUrl:
                              HostUrl() + ng.itemImagePath.original,
                          }}
                        ></PopupImage>
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={ng.contentText}
                    secondary={presenter.itemListSecondary(ng)}
                  ></ListItemText>
                </ListItem>
              ))}
            </List>
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
};
