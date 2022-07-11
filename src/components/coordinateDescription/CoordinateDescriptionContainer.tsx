import { CircularProgress, Typography } from "@mui/material";
import { useCoordinateDescriptionsShow } from "../../hooks/api/UseCoordinateDescriptionsShow";
import { CoordinateDescription } from "./CoordinateDescription";

type TProps = {
  coordinateId: number;
};

export const CoordinateDescriptionContainer = ({ coordinateId }: TProps) => {
  const { data, error, refetch } = useCoordinateDescriptionsShow({
    coordinateId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  return (
    <CoordinateDescription
      data={data}
      coordinateId={coordinateId}
      onUpdateComplete={refetch}
    />
  );
};
