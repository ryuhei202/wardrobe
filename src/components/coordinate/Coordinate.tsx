import { CoordinateDescriptionContainer } from "../coordinateDescription/CoordinateDescriptionContainer";
import { CoordinateHearingFetcher } from "../coordinateHearing/CoordinateHearingFetcher";
import { CoordinateMemoFetcher } from "../coordinateMemo/CoordinateMemoFetcher";
import { CoordinatePatternContainer } from "../coordinatePattern/CoordinatePatternContainer";
import { CoordinateStylistCommentContainer } from "../coordinateStylistComment/CoordinateStylistCommentContainer";
import { CoordinateTopsRatioFetcher } from "../coordinateTopsRatio.tsx/CoordinateTopsRatioFetcher";
import { SelectedReviewContainer } from "../review/SelectedReviewContainer";

type TProps = {
  coordinateId: number;
};

export const Coordinate = ({ coordinateId }: TProps) => {
  return (
    <>
      <CoordinateHearingFetcher coordinateId={coordinateId} />
      <CoordinateTopsRatioFetcher coordinateId={coordinateId} />
      <CoordinateMemoFetcher coordinateId={coordinateId} />
      <CoordinateDescriptionContainer coordinateId={coordinateId} />
      <CoordinateStylistCommentContainer coordinateId={coordinateId} />
      <SelectedReviewContainer coordinateId={coordinateId} />
      <CoordinatePatternContainer coordinateId={coordinateId} />
    </>
  );
};
