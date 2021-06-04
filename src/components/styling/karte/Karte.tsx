import React, { useState } from "react";
import { useKarteStyle } from "./style/UseKarteStyle";
import Basic from "./Basic";
import Memo from "./Memo";
import Size from "./Size";
import KarteResponse from "../../../model/api/response/styling/karte/KarteResponse";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { AccountBox, Chat, SquareFoot } from "@material-ui/icons";

export interface KarteProps {
  response: KarteResponse;
}

const Karte = (props: KarteProps) => {
  const classes = useKarteStyle();
  const [currentValue, setCurrentValue] = useState(0);

  let content;
  switch (currentValue) {
    case 0: {
      content = <Basic data={props.response.basic} />;
      break;
    }
    case 1: {
      content = <Size data={props.response.size} />;
      break;
    }
    case 2: {
      content = <Memo data={props.response.memo} />;
      break;
    }
  }

  return (
    <>
      <Paper square className={classes.tabContainer}>
        <Tabs
          value={currentValue}
          onChange={(_event: React.ChangeEvent<{}>, newValue: number) =>
            setCurrentValue(newValue)
          }
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon tabs"
        >
          <Tab icon={<AccountBox />} aria-label="basic" label="基本情報" />
          <Tab icon={<SquareFoot />} aria-label="size" label="サイズ情報" />
          <Tab icon={<Chat />} aria-label="memo" label="お話メモ" />
        </Tabs>
      </Paper>
      <div className={classes.contentContainer}>{content}</div>
    </>
  );
};

export default Karte;
