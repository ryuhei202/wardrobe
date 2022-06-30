import { ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { OldCoordinateContainer } from "../coordinate/OldCoordinateContainer";

type TProps = {
  readonly id: number;
  readonly rentalStartedAt: string | null;
  readonly memoNext: string | null;
  readonly index: number;
};

export const Karte = ({ id, rentalStartedAt, memoNext, index }: TProps) => {
  return (
    <ListItem key={index}>
      <ListItemText>
        <Typography variant="h6">カルテID: {id}</Typography>
        <Typography variant="body2" style={{ color: "gray" }}>
          発送日:
          {rentalStartedAt
            ? new Date(rentalStartedAt!).toLocaleDateString()
            : ""}
        </Typography>
        <br />
        <Paper variant="outlined">
          <Typography variant="body2" style={{ fontWeight: "bold" }}>
            次回コーデに関して
          </Typography>
          <Typography
            style={{
              fontSize: 11,
              fontWeight: "600",
              paddingLeft: 10,
              whiteSpace: "pre-wrap",
            }}
          >
            {memoNext ?? "未回答"}
          </Typography>
        </Paper>
        <br />
        <OldCoordinateContainer chartId={id} />
      </ListItemText>
    </ListItem>
  );
};
