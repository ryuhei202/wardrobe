import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { CoordinatePattern } from "../../model/api/response/styling/coordinatePattern/CoordinatePattern";
import { PartSizeResponse } from "../../model/api/response/styling/karte/KartePartSizeResponse";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";
import { PopupImage } from "../shared/PopupImage";

type TProps = {
  readonly coordinatePattern: CoordinatePattern;
  readonly index: number;
};

export const CoordinateListItem = ({ coordinatePattern, index }: TProps) => {
  return (
    <Box
      sx={{
        marginBottom: 3,
      }}
    >
      <Typography
        variant="body2"
        style={{ fontWeight: "bold", marginLeft: 20 }}
      >
        コーデパターン{index + 1}
      </Typography>
      <ListItem key={coordinatePattern.id}>
        <List dense>
          {coordinatePattern.items.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar variant="rounded">
                  <PopupImage
                    data={{
                      originalImageUrl: item.imagePath.thumb,
                      popupImageUrl: item.imagePath.large,
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: 12 }}>
                    {`${item.id} / ${item.brandName} / ${item.categoryName} / ${item.mainColorName}(${item.subColorName}) / ${item.patternName}`}
                  </Typography>
                }
                secondary={
                  <Typography style={{ fontSize: 12, color: "gray" }}>
                    {`${item.size}, ${item.partSizes
                      .filter(
                        (partSize: PartSizeResponse) => partSize.value !== null
                      )
                      .map(
                        (partSize) => `${partSize.name}(${partSize.value})`
                      )}, Drop(${item.dropSize})`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </ListItem>
      <List dense style={{ marginLeft: 20 }}>
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          アドバイス
        </Typography>
        {coordinatePattern.advices.map((advice, index) => (
          <p style={{ lineHeight: 0.5, marginLeft: 20 }}>
            {index + 1}. {advice.title}
          </p>
        ))}
      </List>
      <SelectedReviewContainer coordinateId={coordinatePattern.id} />
      <Divider variant="middle" />
    </Box>
  );
};
