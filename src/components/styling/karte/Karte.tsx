import { Divider, Typography } from "@material-ui/core";
import React from "react";

import KarteResponse from "../../../model/api/response/karte/KarteResponse";

import { useKarteStyle } from "./style/UseKarteStyle";
import Basic from "./Basic";
import Memo from "./Memo";
import Size from "./Size";

const karteResponse: KarteResponse = {
  basic: {
    planName: "カジュアル",
    shipmentDate: new Date(),
  },
  size: {
    height: 173,
    weight: 60,
    bmi: 20.0,
    casualPartSize: { shoulder: 43, waist: 76 },
    jacketPartSize: { shoulder: 0, bust: 0 },
  },
  memo: {
    lastCoordinateFeedback:
      "02a > ★★★★ \n[備考]サイズは長さはピッタリにですが、ズボンのウエストが少しブカブカですね。自分が極端に痩せ過ぎだからだと思うのですが、ウエストがワンランク小さいサイズがもしあれば次回からお願いしたいです。色味やデザインは落ち着いた感じで好きです。ありがとうございました(^^)体重は60Kgくらいなんですが、ウエストは70cmとかなり細いですね。そこまで細いのはなかったりすると思いますので、出来る範囲で大丈夫です。[着用写真]あり",
    nextCoordinateRequest:
      "11 > プライベート / 12 > 日常的な用途 / 20 > その他 / 17 > 長袖3枚、半袖0枚 / 18 > はい\n[要望]ｗ76でいってください　友達と金沢に旅行　合わせたいアウターあり　カラーアイテム使う\n■全体イメージ（フォーマル-カジュアル度合い）ご旅行に合わせたカジュアルなイメージ\n■シルエット動きやすいシルエット\n■色味色数を多く取り入れた明るい色味",
  },
};

const Karte = () => {
  const classes = useKarteStyle();

  return (
    <>
      <div className={classes.drawerHeader}>
        <Typography variant="h6" noWrap>
          コーデ作成情報
        </Typography>
      </div>
      <Divider />
      <div className={classes.drawerContainer}>
        <Basic data={karteResponse.basic} />
        <Size />
        <Memo data={karteResponse.memo} />
      </div>
    </>
  );
};

export default Karte;
