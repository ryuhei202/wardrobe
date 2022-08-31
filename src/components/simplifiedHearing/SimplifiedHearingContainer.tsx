import { CircularProgress, Paper, Typography } from "@mui/material";
import { useSimplifiedHearingsShow } from "../../hooks/api/UseSimplifiedHearingsShow";
import { SimplifiedHearing } from "./SimplifiedHearing";

type TProps = {
  readonly coordinateId: number;
  readonly isEditable: boolean;
};
export const SimplifiedHearingContainer = ({
  coordinateId,
  isEditable,
}: TProps) => {
  const { data, error, refetch } = useSimplifiedHearingsShow({
    coordinateId,
  });
  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  if (isEditable)
    return (
      <SimplifiedHearing
        data={data}
        key={coordinateId}
        coordinateId={coordinateId}
        onUpdateComplete={refetch}
      />
    );

  return (
    <>
      <Paper variant="outlined">
        <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
          意識する相手: {data.target}
        </Typography>
        <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
          シーン: {data.scene}
        </Typography>
        <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
          印象: {data.impression}
        </Typography>
      </Paper>
    </>
  );
};
