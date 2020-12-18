import { Box, Button, IconButton, Paper, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import DetailResponse from "../../../model/api/response/styling/browse/DetailResponse";
import BrowseDetailCallback from "./callback/BrowseDetailCallback";
import DetailItemTable from "./DetailItemTable";
import DetailSizeButtonArray from "./DetailSizeButtonArray";
import { useBrowseDetailHandler } from "./handler/UseBrowseDetailHandler";
import { useBrowseDetailPresenter } from "./presenter/UseBrowseDetailPresenter";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface BrowseDetailProps {
  response: DetailResponse;
  callback: BrowseDetailCallback;
}

const BrowseDetail = (props: BrowseDetailProps) => {
  const classes = useBrowseStyle();
  const handler = useBrowseDetailHandler(props.response, props.callback);
  const presenter = useBrowseDetailPresenter(props.response);

  return (
    <>
      <IconButton onClick={() => props.callback.onClickBackButton()}>
        <ArrowBack />
      </IconButton>
      <Paper className={classes.itemInfo}>
        <div className={classes.itemImageContainer}>
          <img
            className={classes.itemImage}
            src={presenter.itemImageUrl()}
            alt=""
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
          <Typography className={classes.itemInfoText} variant="h3">
            {presenter.brandName()}
          </Typography>
          <Typography variant="body1">
            カラー：{presenter.colorName()}
          </Typography>
          <div>
            <Box display="flex">
              <img
                className={classes.colorImage}
                src={presenter.colorImageUrl()}
                width="60px"
                height="auto"
                alt=""
              />
            </Box>
          </div>
          <Typography variant="body1">
            サイズ：{handler.selectedSizeName}
          </Typography>
          <div>
            <DetailSizeButtonArray
              data={handler.detailSizeButtonArrayData()}
              callback={handler.detailSizeButtonArrayCallback()}
            />
          </div>
          <Typography variant="body1">
            アイテム：{handler.selectedItemId}
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
    </>
  );
};

export default BrowseDetail;
