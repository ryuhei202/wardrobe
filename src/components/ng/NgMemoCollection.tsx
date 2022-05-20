import { AddCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { NgIndexResponse } from "../../model/api/response/styling/ng/NgIndexResponse";
import { PopupImage } from "../shared/PopupImage";
import { CreateNgMemoDialogContainer } from "./CreateNgMemoDialogContainer";

type Props = {
  readonly response: NgIndexResponse[];
};

export const NgMemoCollection = (props: Props) => {
  const [isOpenNgMemoDialog, setIsOpenNgMemoDialog] = useState<boolean>(false);

  return (
    <>
      <ListItemText>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", height: 30 }}
        >
          <Typography variant="body2">NGメモ：</Typography>
          <IconButton
            color="secondary"
            size="large"
            style={{ marginRight: 20 }}
            onClick={() => setIsOpenNgMemoDialog(true)}
          >
            <AddCircle />
          </IconButton>
        </Box>
        <CreateNgMemoDialogContainer
          isOpen={isOpenNgMemoDialog}
          onClose={() => setIsOpenNgMemoDialog(!isOpenNgMemoDialog)}
        />
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
                                popupImageUrl: ng.itemImagePath.large,
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
