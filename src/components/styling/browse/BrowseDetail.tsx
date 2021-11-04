import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import React from "react";
import ReactImageGallery from "react-image-gallery";
import { DetailResponse } from "../../../model/api/response/styling/browse/DetailResponse";
import { DetailStatus } from "../../../model/styling/browse/DetailStatus";
import { BrowseDetailCallback } from "./callback/BrowseDetailCallback";
import { DetailItemTable } from "./DetailItemTable";
import { DetailSizeButtonArray } from "./DetailSizeButtonArray";
import { useBrowseDetailHandler } from "./handler/UseBrowseDetailHandler";
import { PostSelectDialog } from "./PostSelectDialog";
import { useBrowseDetailPresenter } from "./presenter/UseBrowseDetailPresenter";
import { useBrowseDetailStyle } from "./style/UseBrowseDetailStyle";
import { ValidationDialog } from "./ValidationDialog";

interface BrowseDetailProps {
  response: DetailResponse;
  callback: BrowseDetailCallback;
  previousSelectedItemId: number | null;
}

export const BrowseDetail = (props: BrowseDetailProps) => {
  const classes = useBrowseDetailStyle();
  const handler = useBrowseDetailHandler(props.response, props.callback);
  const presenter = useBrowseDetailPresenter(props.response);

  let dialog;
  if (handler.selectedItem) {
    switch (handler.detailStatus) {
      case DetailStatus.Validating: {
        if (handler.currentValidationErrors.length === 0) {
          handler.validationDialogCallback().onClickSelectButton();
        } else {
          dialog = (
            <ValidationDialog
              isOpen={true}
              errors={handler.currentValidationErrors}
              callback={handler.validationDialogCallback()}
            />
          );
        }
        break;
      }
      case DetailStatus.Selecting: {
        dialog = (
          <PostSelectDialog
            selectedItemId={handler.selectedItem.itemId}
            previousItemId={props.previousSelectedItemId}
            callback={handler.postSelectCallback()}
          />
        );
        break;
      }
    }
  }

  return (
    <>
      <IconButton
        onClick={() => props.callback.onClickBackButton()}
        size="large"
      >
        <ArrowBack />
      </IconButton>
      <Paper className={classes.itemInfo}>
        <div className={classes.itemImageContainer}>
          <ReactImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            items={presenter.imageGalleryList().map((image) => {
              return {
                original: image.originalImagePath,
                thumbnail: image.thumbnailImagePath,
                originalWidth: 400,
                originalHeight: 600,
              };
            })}
          />
        </div>
        <div className={classes.itemInfoTextContainer}>
          <Typography
            className={classes.itemInfoText}
            variant="h5"
            color="textSecondary"
          >
            {presenter.seriesName()}
          </Typography>
          <Typography className={classes.itemInfoText} variant="h4">
            {presenter.categoryName()}
          </Typography>
          <Typography className={classes.itemInfoText} variant="h3">
            {presenter.brandName()}
          </Typography>
          <Typography variant="body1">
            メインカラー：{presenter.mainColorName()}
          </Typography>
          <div>
            <Box display="flex">
              <img
                className={classes.colorImage}
                src={presenter.mainColorImageUrl()}
                width="60px"
                height="auto"
                alt=""
              />
            </Box>
          </div>
          <Typography variant="body1">
            サブカラー：{presenter.subColorName()}
          </Typography>
          <div>
            <Box display="flex">
              <img
                className={classes.colorImage}
                src={presenter.subColorImageUrl()}
                width="60px"
                height="auto"
                alt=""
              />
            </Box>
          </div>
          <Typography variant="body1">
            サイズ：{handler.selectedSizeName()}
          </Typography>
          <div>
            <DetailSizeButtonArray
              data={handler.detailSizeButtonArrayData()}
              callback={handler.detailSizeButtonArrayCallback()}
            />
          </div>
          <Typography variant="body1">
            アイテム：{handler.selectedItemId()}
          </Typography>
          <div className={classes.itemTableContainer}>
            <DetailItemTable
              data={handler.detailItemTableData()}
              callback={handler.detailItemTableCallback()}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth={true}
            disabled={handler.isSelectItemButtonDisabled()}
            onClick={() => handler.onClickSelectItemButton()}
          >
            このアイテムを選択
          </Button>
        </div>
      </Paper>
      {dialog}
    </>
  );
};
