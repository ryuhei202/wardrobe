import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { HostUrl } from "../../../model/HostUrl";
import { NgMemoCollectionData } from "../../../model/styling/karte/props_data/NgMemoCollectionData";
import PopupImage from "../../shared/PopupImage";
import { useKartePresenter } from "./presenter/UseKartePresenter";
import { UseNgMemoCollectionPresenter } from "./presenter/UseNgMemoCollectionPresenter";

interface NgMemoCollectionProps {
  data: NgMemoCollectionData;
}

export const NgMemoCollection = (props: NgMemoCollectionProps) => {
  const presenter = UseNgMemoCollectionPresenter(props.data.NgMemoResponses);

  return (
    <List dense>
      {props.data.NgMemoResponses.map((ng_category, index) => (
        <ListItem key={index}>
          <ListSubheader>{ng_category.categoryName}</ListSubheader>
          <List dense>
            {ng_category.ngs.map((ng, index) => (
              <ListItem key={index}>
                {/* <ListItemAvatar>
                    <Avatar variant="rounded">
                      <PopupImage
                        data={{
                          originalImageUrl: HostUrl() + ng.imagePath.thumb,
                          popupImageUrl: HostUrl() + ng.imagePath.original,
                        }}
                      ></PopupImage>
                    </Avatar>
                  </ListItemAvatar> */}

                <ListItemText
                  primary={ng.contentText}
                  secondary={presenter.itemListSecondary(ng)}
                ></ListItemText>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
};
