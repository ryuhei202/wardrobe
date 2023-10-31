import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ReactImageGallery from "react-image-gallery";
import { HostUrl } from "../../model/HostUrl";
import { DetailResponse } from "../../model/api/response/styling/browse/DetailResponse";
import { Refinement } from "../../model/selecting/browse/Refinement";
import { DetailItemTable } from "../selecting/browse/DetailItemTable";
import { DetailSizeButtonArray } from "../selecting/browse/DetailSizeButtonArray";
import { useBrowseDetailStyle } from "../selecting/browse/style/UseBrowseDetailStyle";
import { theme } from "../style/Theme";
import { useRentalDetailHandler } from "./handler/useRentalDetailHandler";

type TProps = {
  browseDetail: DetailResponse;
  defaultRefinement: Refinement;
  onClickBackButton: () => void;
  onChangeCurrentRefinement: (refinement: Refinement) => void;
  onItemSelect: () => void;
  currentItemId?: number;
};
type itemImageGallery = {
  originalImagePath: string;
  thumbnailImagePath: string;
  itemSize?: string;
  height?: number;
};

export const RentalItemDetail = ({
  browseDetail,
  defaultRefinement,
  onClickBackButton,
  onChangeCurrentRefinement,
  onItemSelect,
  currentItemId,
}: TProps) => {
  const classes = useBrowseDetailStyle();
  const {
    selectedSizeName,
    detailSizeButtonArrayData,
    detailSizeButtonArrayCallback,
    selectedItemId,
    detailItemTableData,
    detailItemTableCallback,
    isSelectItemButtonDisabled,
    onClickSelectItemButton,
    isPatchLoading,
    patchError,
  } = useRentalDetailHandler({
    detail: browseDetail,
    defaultRefinement,
    onClickBackButton,
    onChangeCurrentRefinement,
    onItemSelect,
    currentItemId,
  });

  const itemImage: itemImageGallery[] = [
    {
      originalImagePath: browseDetail.itemImagePath.large,
      thumbnailImagePath: browseDetail.itemImagePath.thumb,
      itemSize: undefined,
      height: undefined,
    },
  ];

  const wearingImages: itemImageGallery[] = browseDetail.wearingImages.map((wearingImage) => {
    return {
      originalImagePath: wearingImage.imagePath.large,
      thumbnailImagePath: wearingImage.imagePath.thumb,
      itemSize: wearingImage.itemSize,
      height: wearingImage.height,
    };
  });

  return (
    <>
      <IconButton onClick={onClickBackButton} size="large">
        <ArrowBack />
      </IconButton>
      <Paper className={classes.itemInfo}>
        <div style={{ maxWidth: 400, marginRight: theme.spacing(2) }}>
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
                originalWidth: 300,
                originalHeight: 450,
                description:
                  image.itemSize && image.height
                    ? `H${image.height} 着用サイズ${image.itemSize}`
                    : undefined,
              };
            })}
          />
        </div>
        <div className={classes.itemInfoTextContainer}>
          <Typography className={classes.itemInfoText} variant="h5" color="textSecondary">
            {`${browseDetail.seriesName ?? ""}, ${browseDetail.seriesFeature ?? ""}`}
          </Typography>
          <Typography className={classes.itemInfoText} variant="h4">
            {browseDetail.categoryName}
          </Typography>
          <Typography className={classes.itemInfoText} variant="h3">
            {browseDetail.brandName}
          </Typography>
          <Typography variant="body1">メインカラー：{browseDetail.mainColor.name}</Typography>
          <div>
            <Box display="flex">
              <img
                className={classes.colorImage}
                src={HostUrl() + browseDetail.mainColor.imagePath}
                width="60px"
                height="auto"
                alt=""
              />
            </Box>
          </div>
          <Typography variant="body1">サブカラー：{browseDetail.subColor.name}</Typography>
          <div>
            <Box display="flex">
              <img
                className={classes.colorImage}
                src={HostUrl() + browseDetail.subColor.imagePath}
                width="60px"
                height="auto"
                alt=""
              />
            </Box>
          </div>
          <Typography variant="body1">サイズ：{selectedSizeName()}</Typography>
          <div>
            <DetailSizeButtonArray
              data={detailSizeButtonArrayData()}
              callback={detailSizeButtonArrayCallback()}
            />
          </div>
          <Typography variant="body1">アイテム：{selectedItemId()}</Typography>
          <div className={classes.itemTableContainer}>
            <DetailItemTable data={detailItemTableData()} callback={detailItemTableCallback()} />
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
            disabled={isSelectItemButtonDisabled()}
            onClick={() => onClickSelectItemButton()}
          >
            このアイテムを選択
          </Button>
        </div>
      </Paper>
      <Dialog open={isPatchLoading} disableEscapeKeyDown>
        <CircularProgress />
      </Dialog>
      <Dialog open={patchError !== null}>
        <DialogTitle>エラー</DialogTitle>
        <DialogContent>
          <Typography>{patchError?.message ?? ""}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
