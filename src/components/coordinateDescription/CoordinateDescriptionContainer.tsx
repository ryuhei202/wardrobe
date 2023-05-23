import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCoordinateDescriptionsShow } from "../../hooks/api/UseCoordinateDescriptionsShow";
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

  if (coordinateDescriptionError || coordinateItemError)
    return (
      <Typography>
        {coordinateDescriptionError?.message ?? coordinateItemError?.message}
      </Typography>
    );
  if (!coordinateDescriptionData || !coordinateItemData)
    return <CircularProgress />;
  if (isEditable)
    return (
      <CoordinateDescription
        data={coordinateDescriptionData}
        key={coordinateDescriptionData.text}
        coordinateId={coordinateId}
        coordinateItems={coordinateItemData}
        isLineMessagesSendDisable={coordinateItemData.length !== defaultItemNum}
        onUpdateComplete={refetchCoordinateDescription}
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
