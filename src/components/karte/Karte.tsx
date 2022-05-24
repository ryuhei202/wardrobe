import { ListItem, ListItemText, Typography } from "@mui/material";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { CoordinateContainer } from "../coordinate/CoordinateContainer";

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
        <CoordinateContainer chartId={id} />
        <div style={{ marginLeft: 20 }}>
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
        </div>
      </ListItemText>
    </ListItem>
  );
};
