import { List, ListItem, ListItemText } from "@mui/material";
import { CoordinateDescriptionContainer } from "../coordinateDescription/CoordinateDescriptionContainer";
import { CoordinateFormalRanksFetcher } from "../coordinateFomalRank/CoordinateFomalRanksFetcher";
import { CoordinateHearingFetcher } from "../coordinateHearing/CoordinateHearingFetcher";
import { CoordinateHearingStatusContainer } from "../coordinateHearingStatus/CoordinateHearingStatusContainer";
import { CoordinateMemoFetcher } from "../coordinateMemo/CoordinateMemoFetcher";
import { CoordinatePatternContainer } from "../coordinatePattern/CoordinatePatternContainer";
import { CoordinateStylistCommentContainer } from "../coordinateStylistComment/CoordinateStylistCommentContainer";
import { CoordinateTopsRatioFetcher } from "../coordinateTopsRatio.tsx/CoordinateTopsRatioFetcher";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";
import { SimplifiedHearingContainer } from "../simplifiedHearing/SimplifiedHearingContainer";

type TProps = {
  readonly coordinateId: number;
  readonly defaultItemNum?: number;
  readonly isLeeapPlan?: boolean;
  readonly isEditable?: boolean;
};

export const Coordinate = ({
  coordinateId,
  defaultItemNum,
  isLeeapPlan,
  isEditable,
}: TProps) => {
  return (
    <List dense>
      <CoordinateHearingStatusContainer coordinateId={coordinateId} />
      <ListItem>
        <ListItemText secondary="ヒアリング" />
      </ListItem>
      <ListItem style={{ display: "block" }}>
        <CoordinateHearingFetcher coordinateId={coordinateId} />
      </ListItem>

      <ListItem>
        <ListItemText secondary="簡易ヒアリング内容(着こなしシートに反映)" />
      </ListItem>
      <ListItem style={{ display: "block" }}>
        <SimplifiedHearingContainer
          coordinateId={coordinateId}
          isEditable={isEditable ?? false}
        />
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
        <ListItemText secondary="キレイ度" />
      </ListItem>
      <ListItem>
        <CoordinateFormalRanksFetcher
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
        <ListItemText secondary="着こなし" />
      </ListItem>
      <ListItem>
        <CoordinatePatternContainer
          coordinateId={coordinateId}
          isLeeapPlan={isLeeapPlan}
        />
      </ListItem>
      {!isLeeapPlan && (
        <>
          <ListItem>
            <ListItemText secondary="根拠説明" />
          </ListItem>
          <ListItem style={{ display: "block" }}>
            <CoordinateDescriptionContainer
              coordinateId={coordinateId}
              defaultItemNum={defaultItemNum}
              isEditable={isEditable ?? false}
            />
          </ListItem>

          <ListItem>
            <ListItemText secondary="気持ち文章" />
          </ListItem>
          <ListItem style={{ display: "block" }}>
            <CoordinateStylistCommentContainer
              coordinateId={coordinateId}
              isEditable={isEditable ?? false}
            />
          </ListItem>
        </>
      )}

      <ListItem>
        <ListItemText secondary="レビュー" />
      </ListItem>
      <ListItem style={{ display: "block" }}>
        <SelectedReviewContainer coordinateId={coordinateId} />
      </ListItem>
    </List>
  );
};
