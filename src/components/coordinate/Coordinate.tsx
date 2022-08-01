import { List, ListItem, ListItemText } from "@mui/material";
import { CoordinateHearingFetcher } from "../coordinateHearing/CoordinateHearingFetcher";
import { CoordinateMemoFetcher } from "../coordinateMemo/CoordinateMemoFetcher";
import { CoordinatePatternContainer } from "../coordinatePattern/CoordinatePatternContainer";
import { CoordinateTopsRatioFetcher } from "../coordinateTopsRatio.tsx/CoordinateTopsRatioFetcher";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";

type TProps = {
  coordinateId: number;
  isEditable?: boolean;
};

export const Coordinate = ({ coordinateId, isEditable }: TProps) => {
  return (
    <List dense>
      <ListItem>
        <ListItemText secondary="ヒアリング" />
      </ListItem>
      <ListItem style={{ display: "block" }}>
        <CoordinateHearingFetcher coordinateId={coordinateId} />
      </ListItem>
      <ListItem>
        <ListItemText secondary="トップス枚数" />
      </ListItem>
      <ListItem>
        <CoordinateTopsRatioFetcher
          coordinateId={coordinateId}
          isEditable={isEditable ?? false}
        />
      </ListItem>
      <ListItem>
        <ListItemText secondary="コーデメモ" />
      </ListItem>
      <ListItem style={{ display: "block" }}>
        <CoordinateMemoFetcher
          coordinateId={coordinateId}
          isEditable={isEditable ?? false}
        />
      </ListItem>
      <ListItem>
        <ListItemText secondary="レビュー" />
      </ListItem>
      <ListItem style={{ display: "block" }}>
        <SelectedReviewContainer coordinateId={coordinateId} />
      </ListItem>
      <ListItem>
        <ListItemText secondary="着こなし" />
      </ListItem>
      <ListItem>
        <CoordinatePatternContainer coordinateId={coordinateId} />
      </ListItem>
    </List>
  );
};