import React from "react";
import { useKarteStyle } from "./style/UseKarteStyle";
import Basic from "./Basic";
import Memo from "./Memo";
import Size from "./Size";
import KarteResponse from "../../../model/api/response/styling/karte/KarteResponse";

export interface KarteProps {
  response: KarteResponse;
}

const Karte = (props: KarteProps) => {
  const classes = useKarteStyle();

  return (
    <div className={classes.drawerContainer}>
      <Basic data={props.response.basic} />
      <Size data={props.response.size} />
      <Memo data={props.response.memo} />
    </div>
  );
};

export default Karte;
