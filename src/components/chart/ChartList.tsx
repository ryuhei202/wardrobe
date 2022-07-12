import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { Chart } from "./Chart";

type Props = {
  readonly response: KarteIndexResponse[];
};

export const ChartList = (props: Props) => {
  return (
    <>
      {props.response.map((karte, index) => (
        <Chart
          key={index}
          id={karte.id}
          rentalStartedAt={karte.rentalStartedAt}
        />
      ))}
    </>
  );
};
