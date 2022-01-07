import { List } from "@mui/material";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { Karte } from "./Karte";

type Props = {
  readonly response: KarteIndexResponse[];
};

export const KarteCollection = (props: Props) => {
  return (
    <List dense>
      {props.response.map((karte, index) => (
        <Karte key={index} data={karte} index={index} />
      ))}
    </List>
  );
};
