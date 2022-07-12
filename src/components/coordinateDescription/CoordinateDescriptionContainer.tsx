import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCoordinateDescriptionsShow } from "../../hooks/api/UseCoordinateDescriptionsShow";
import { CoordinateDescription } from "./CoordinateDescription";

type TProps = {
  readonly coordinateId: number;
  readonly isEditable: boolean;
};

export const CoordinateDescriptionContainer = ({
  coordinateId,
  isEditable,
}: TProps) => {
  const { data, error, refetch } = useCoordinateDescriptionsShow({
    coordinateId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  if (isEditable)
    return (
      <CoordinateDescription
        data={data}
        key={data.text}
        coordinateId={coordinateId}
        onUpdateComplete={refetch}
      />
    );

  return (
    <Paper variant="outlined">
      <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
        {data.text}
      </Typography>
    </Paper>
  );
};
