import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCoordinateDescriptionsShow } from "../../hooks/api/UseCoordinateDescriptionsShow";
import { useCoordinateHearingStatusShow } from "../../hooks/api/UseCoordinateHearingStatusShow";
import { useCoordinateItemsIndex } from "../../hooks/api/UseCoordinateItemsIndex";
import { CoordinateDescription } from "./CoordinateDescription";

type TProps = {
  readonly coordinateId: number;
  readonly defaultItemNum: number | undefined;
  readonly isEditable: boolean;
};

export const CoordinateDescriptionContainer = ({
  coordinateId,
  defaultItemNum,
  isEditable,
}: TProps) => {
  const { data: hearingStatusData, error: hearingStatusError } =
    useCoordinateHearingStatusShow({ coordinateId });

  const {
    data: coordinateDescriptionData,
    error: coordinateDescriptionError,
    refetch: refetchCoordinateDescription,
  } = useCoordinateDescriptionsShow({
    coordinateId,
  });
  const { data: coordinateItemData, error: coordinateItemError } =
    useCoordinateItemsIndex({
      coordinateId,
    });

  if (coordinateDescriptionError || coordinateItemError || hearingStatusError)
    return (
      <Typography>
        {coordinateDescriptionError?.message ??
          coordinateItemError?.message ??
          hearingStatusError?.message}
      </Typography>
    );
  if (!coordinateDescriptionData || !coordinateItemData || !hearingStatusData)
    return <CircularProgress />;
  if (isEditable)
    return (
      <CoordinateDescription
        data={coordinateDescriptionData}
        key={coordinateDescriptionData.text}
        coordinateId={coordinateId}
        coordinateItems={coordinateItemData}
        isLineMessagesSendDisable={
          defaultItemNum !== undefined &&
          coordinateItemData.length < defaultItemNum
        }
        onUpdateComplete={refetchCoordinateDescription}
        hearingStatusData={hearingStatusData}
      />
    );

  return (
    <Paper variant="outlined">
      <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
        {coordinateDescriptionData.text}
      </Typography>
    </Paper>
  );
};
