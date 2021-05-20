import { Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import KarteContainerData from "../../../model/styling/karte/props_data/KarteContainerData";
import { useStylingStyle } from "../style/UseStylingStyle";
import KarteContainerCallback from "./callback/KarteContainerCallback";
import { useKarteProvider } from "./provider/UseKarteProvider";
import QRCode from "react-qr-code";
import { ChartId } from "../../../model/ChartId";

export interface KarteContainerProps {
  data: KarteContainerData;
  callback: KarteContainerCallback;
}

const KarteContainer = (props: KarteContainerProps) => {
  const classes = useStylingStyle();
  const karteProvider = useKarteProvider(props.callback.onKarteFetched);

  return (
    <>
      <div className={classes.karteContainer}>
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap className={classes.sectionTitle}>
            コーデ作成情報
          </Typography>
          <span className={classes.qrCode}>
            <QRCode value={ChartId().toString()} size={50} />
          </span>
        </div>
        <Divider />
        {karteProvider.karteComponent()}
      </div>
      <Paper variant="outlined" className={classes.progressContainer}>
        {karteProvider.selectionProgressComponent(
          props.data.selectedIndex,
          props.data.items,
          props.callback.selectionProgressCallback
        )}
      </Paper>
    </>
  );
};

export default KarteContainer;
