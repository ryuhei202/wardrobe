import { ListItem, ListItemText } from "@mui/material";
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
        発送日：
        {data.rentalStartedAt
          ? new Date(data.rentalStartedAt!).toLocaleDateString()
          : ""}
        <br />
        <CoordinateContainer chartId={data.id} />
      </ListItemText>
    </ListItem>
  );
};
