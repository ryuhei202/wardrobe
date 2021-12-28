import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { Fragment } from "react";
import { NgsIndexResponse } from "../../model/api/response/styling/ng/NgsIndexResponse";
import { PopupImage } from "../shared/PopupImage";

type Props = {
  readonly response: NgsIndexResponse[];
};

export const NgMemoCollection = (props: Props) => {
  return (
    <>
      <ListItemText>
        NGメモ：
        <List dense>
          {props.response.map((ng_category, index) => (
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
                                originalImageUrl: ng.itemImagePath.thumb,
                                popupImageUrl: ng.itemImagePath.original,
                              }}
                            ></PopupImage>
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={ng.contentText}
                        secondary={`登録日：${new Date(
                          ng.createdAt
                        ).toLocaleDateString()} 更新日：${new Date(
                          ng.updatedAt
                        ).toLocaleDateString()}`}
                      ></ListItemText>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            </Fragment>
          ))}
        </List>
      </ListItemText>
    </>
  );
};
