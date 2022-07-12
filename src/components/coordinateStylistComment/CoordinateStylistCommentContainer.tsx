import { CircularProgress, Paper, Typography } from "@mui/material";
import { useCoordinateStylistCommentsShow } from "../../hooks/api/UseCoordinateStylistCommentsShow";
import { CoordinateStylistComment } from "./CoordinateStylistComment";

type TProps = {
  coordinateId: number;
  isEditable: boolean;
};

export const CoordinateStylistCommentContainer = ({
  coordinateId,
  isEditable,
}: TProps) => {
  const { data, error, refetch } = useCoordinateStylistCommentsShow({
    coordinateId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  if (isEditable)
    return (
      <CoordinateStylistComment
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
