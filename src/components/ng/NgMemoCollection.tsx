import { Delete } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Snackbar,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { useNgsDestroy } from "../../hooks/api/UseNgsDestroy";
import { NgIndexResponse } from "../../model/api/response/styling/ng/NgIndexResponse";
import { PopupImage } from "../shared/PopupImage";

type Props = {
  readonly response: NgIndexResponse[];
};
export const NgMemoCollection = (props: Props) => {
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string | undefined>(
    undefined
  );
  const queryClient = useQueryClient();
  const { mutate } = useNgsDestroy();

  const handleSubmit = (ngId: number) => {
    mutate(ngId, {
      onSuccess: () => {
        queryClient.invalidateQueries(`member/ngs`);
        setSeverity("success");
        setIsSnackBarOpen(true);
        setSnackBarText("NGメモの削除に成功しました！");
      },
      onError: () => {
        setSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText("NGメモの削除に失敗しました");
      },
    });
  };

  return (
    <>
      <ListItemText style={{ width: "100%" }}>
        NGメモ：
        <List dense style={{ width: "100%" }}>
          {props.response.map((ng_category, index) => (
            <Fragment key={index}>
              <ListSubheader disableSticky={true}>
                {ng_category.categoryName}
              </ListSubheader>
              <ListItem>
                <List dense style={{ width: "100%" }}>
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
                      <IconButton
                        edge="end"
                        aria-label="remove"
                        onClick={() => {
                          if (window.confirm("本当にNGメモを削除しますか？")) {
                            handleSubmit(ng.id);
                          }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            </Fragment>
          ))}
        </List>
      </ListItemText>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
    </>
  );
};
