import { CircularProgress, Typography } from "@mui/material";
import { useCoordinateFormalRanksShow } from "../../hooks/api/UseCoordinateFormalRanksShow";
import { CoordinateFormalRanks } from "./CoordinateFormalRanks";

type TProps = {
  readonly coordinateId: number;
  readonly isEditable: boolean;
};

export const CoordinateFormalRanksFetcher = ({
  coordinateId,
  isEditable,
}: TProps) => {
  const { data, error, refetch } = useCoordinateFormalRanksShow({
    coordinateId,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  if (isEditable) {
    return (
      <CoordinateFormalRanks
        coordinateId={coordinateId}
        response={data}
        key={data.formalRank}
        onUpdateComplete={refetch}
      />
    );
  }

  return (
    <div style={{ display: "block" }}>
      <Typography variant="body2">キレイ度: {data.formalRank}</Typography>
    </div>
  );
};
