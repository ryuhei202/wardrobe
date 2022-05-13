import { ListItem, ListItemText, Typography } from "@mui/material";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { CoordinateContainer } from "../coordinate/CoordinateContainer";

type TProps = {
  readonly data: KarteIndexResponse;
  readonly index: number;
};

export const Karte = ({ data, index }: TProps) => {
  return (
    <ListItem key={index}>
      <ListItemText>
        <Typography variant="h6">カルテID: {data.id}</Typography>
        <Typography variant="body2" style={{ color: "gray" }}>
          発送日:
          {data.rentalStartedAt
            ? new Date(data.rentalStartedAt!).toLocaleDateString()
            : ""}
        </Typography>
        <br />
        <CoordinateContainer chartId={data.id} />
      </ListItemText>
    </ListItem>
  );
};
