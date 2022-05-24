import { Delete } from "@mui/icons-material";
import { AddCircle } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { useNgsDestroy } from "../../hooks/api/UseNgsDestroy";
import { NgIndexResponse } from "../../model/api/response/styling/ng/NgIndexResponse";
import { KarteDialogContainer } from "../karte/KarteDialogContainer";
import { PopupImage } from "../shared/PopupImage";
import { CreateNgMemoDialogContainer } from "./CreateNgMemoDialogContainer";

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
  const [isOpenNgMemoDialog, setIsOpenNgMemoDialog] = useState<boolean>(false);
  const [selectedChartId, setSelectedChartId] = useState<number | undefined>(
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
          onClose={() => setIsOpenNgMemoDialog(false)}
        />
        <KarteDialogContainer
          isOpen={selectedChartId !== undefined}
          onClose={() => setSelectedChartId(undefined)}
          chartId={selectedChartId}
        />
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
                      {ng.chartId && (
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => setSelectedChartId(ng.chartId)}
                          style={{ width: 60, fontSize: 10 }}
                        >
                          カルテ
                        </Button>
                      )}
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
