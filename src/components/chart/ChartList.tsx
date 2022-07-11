import { List } from "@mui/material";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { Chart } from "./Chart";

type Props = {
  readonly response: KarteIndexResponse[];
};

export const ChartList = (props: Props) => {
  return (
    <List dense>
      {props.response.map((karte, index) => (
        <Chart
          key={index}
          id={karte.id}
          rentalStartedAt={karte.rentalStartedAt}
          index={index}
        />
      ))}
    </List>
  );
};
