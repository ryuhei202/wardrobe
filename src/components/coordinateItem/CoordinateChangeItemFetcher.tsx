import {
  Avatar,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useCoordinateItemsIndex } from "../../hooks/api/UseCoordinateItemsIndex";
import { PopupImage } from "../shared/PopupImage";

type TProps = {
  readonly coordinateId: number;
};

export const CoordinateChangeItemFetcher = ({ coordinateId }: TProps) => {
  const { data, error } = useCoordinateItemsIndex({
    coordinateId,
    isChangeItem: true,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  return (
    <>
      <ListSubheader>チェンジアイテム</ListSubheader>
      {data.map((item) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar variant="rounded">
              <PopupImage
                data={{
                  originalImageUrl: item.itemInfo.imagePath.thumb,
                  popupImageUrl: item.itemInfo.imagePath.large,
                }}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${item.itemInfo.id} / ${item.itemInfo.brandName} / ${item.itemInfo.categoryName} / ${item.itemInfo.mainColorName}(${item.itemInfo.subColorName}) / ${item.itemInfo.patternName}`}
            secondary={
              <>
                <b>{item.itemInfo.size}</b>,&nbsp;
                {item.itemInfo.partSizes
                  .filter((partSize) => partSize.value !== null)
                  .map((partSize, index) => (
                    <span key={index}>
                      {partSize.name}(<b>{partSize.value}</b>),&nbsp;
                    </span>
                  ))}
                Drop(<b>{item.itemInfo.dropSize}</b>)
              </>
            }
          />
        </ListItem>
      ))}
    </>
  );
};
