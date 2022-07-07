import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import React from "react";
import ReactImageGallery from "react-image-gallery";
import { DetailResponse } from "../../../model/api/response/styling/browse/DetailResponse";
import { DetailStatus } from "../../../model/selecting/browse/DetailStatus";
import { BrowseDetailCallback } from "./callback/BrowseDetailCallback";
import { DetailItemTable } from "./DetailItemTable";
import { DetailSizeButtonArray } from "./DetailSizeButtonArray";
import { useBrowseDetailHandler } from "./handler/UseBrowseDetailHandler";
import { PostSelectDialog } from "./PostSelectDialog";
import { useBrowseDetailStyle } from "./style/UseBrowseDetailStyle";
import { ValidationDialog } from "./ValidationDialog";
import { HostUrl } from "../../../model/HostUrl";

interface BrowseDetailProps {
  response: DetailResponse;
  callback: BrowseDetailCallback;
  previousSelectedItemId: number | null;
}

type itemImageGallery = {
  originalImagePath: string;
  thumbnailImagePath: string;
  itemSize?: string;
  height?: number;
};

export const BrowseDetail = (props: BrowseDetailProps) => {
  const classes = useBrowseDetailStyle();
  const handler = useBrowseDetailHandler(props.response, props.callback);

  let itemImage: itemImageGallery[] = [
    {
      originalImagePath: props.response.itemImagePath.large,
      thumbnailImagePath: props.response.itemImagePath.thumb,
      itemSize: undefined,
      height: undefined,
    },
  ];

  let wearingImages: itemImageGallery[] = props.response.wearingImages.map(
    (wearingImage) => {
      return {
        originalImagePath: wearingImage.imagePath.large,
        thumbnailImagePath: wearingImage.imagePath.thumb,
        itemSize: wearingImage.itemSize,
        height: wearingImage.height,
      };
    }
  );
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
            selectedItemId={handler.selectedItem.id}
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
            slideDuration={50}
            showBullets={true}
            showNav={false}
            items={itemImage.concat(wearingImages).map((image) => {
              return {
                original: image.originalImagePath,
                thumbnail: image.thumbnailImagePath,
                originalWidth: 400,
                originalHeight: 600,
                description:
                  image.itemSize && image.height
                    ? `H${image.height} 着用サイズ${image.itemSize}`
                    : undefined,
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
            {`${props.response.seriesName ?? ""}, ${
              props.response.seriesFeature ?? ""
            }`}
          </Typography>
          <Typography className={classes.itemInfoText} variant="h4">
            {props.response.categoryName}
          </Typography>
          <Typography className={classes.itemInfoText} variant="h3">
            {props.response.brandName}
          </Typography>
          <Typography variant="body1">
            メインカラー：{props.response.mainColor.name}
          </Typography>
          <div>
            <Box display="flex">
              <img
                className={classes.colorImage}
                src={HostUrl() + props.response.mainColor.imagePath}
                width="60px"
                height="auto"
                alt=""
              />
            </Box>
          </div>
          <Typography variant="body1">
            サブカラー：{props.response.subColor.name}
          </Typography>
          <div>
            <Box display="flex">
              <img
                className={classes.colorImage}
                src={HostUrl() + props.response.subColor.imagePath}
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
