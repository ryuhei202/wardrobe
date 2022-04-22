import { ListItem, ListItemText } from "@mui/material";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { CoordinateContainer } from "../coordinate/CoordinateContainer";
import { useKarteHandler } from "./handler/UseKarteHandler";
type TProps = {
  readonly data: KarteIndexResponse;
  readonly index: number;
};

export const Karte = ({ data, index }: TProps) => {
  const handler = useKarteHandler();

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
