import { CircularProgress, Typography } from "@mui/material";
import { useCoordinateStylistCommentsShow } from "../../hooks/api/UseCoordinateStylistCommentsShow";
import { CoordinateStylistComment } from "./CoordinateStylistComment";

type TProps = {
  coordinateId: number;
};

export const CoordinateStylistCommentContainer = ({ coordinateId }: TProps) => {
  const { data, error, refetch } = useCoordinateStylistCommentsShow({
    coordinateId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  return (
    <CoordinateStylistComment
      data={data}
      key={data.text}
      coordinateId={coordinateId}
      onUpdateComplete={refetch}
    />
  );
};
