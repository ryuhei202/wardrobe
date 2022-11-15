import {
  Avatar,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useCoordinateFootwearsShow } from "../../hooks/api/UseCoordinateFootwearsShow";
import { HostUrl } from "../../model/HostUrl";
import { PopupImage } from "../shared/PopupImage";

type TProps = {
  readonly coordinateId: number;
};

export const CoordinateFootwearFetcher = ({ coordinateId }: TProps) => {
  const { data: footwearShowData, error: footwearShowError } =
    useCoordinateFootwearsShow({ coordinateId });

  if (footwearShowError)
    return <Typography>{footwearShowError.message}</Typography>;
  if (!footwearShowData) return <CircularProgress />;

  return (
    <>
      <ListSubheader>提案する靴</ListSubheader>
      <ListItem>
        {footwearShowData.coordinateFootwear ? (
          <>
            <ListItemAvatar>
              <Avatar variant="rounded">
                <PopupImage
                  data={{
                    originalImageUrl: `${HostUrl()}/images/footwear/${
                      footwearShowData.coordinateFootwear.id
                    }.jpg`,
                    popupImageUrl: `${HostUrl()}/images/footwear/${
                      footwearShowData.coordinateFootwear.id
                    }.jpg`,
                  }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={footwearShowData.coordinateFootwear.name}
              secondary={`キレイ度: ${footwearShowData.coordinateFootwear.formalRank}`}
            ></ListItemText>
          </>
        ) : (
          <ListItemText>未選択</ListItemText>
        )}
      </ListItem>
    </>
  );
};
