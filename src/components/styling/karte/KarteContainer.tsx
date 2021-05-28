import { Paper } from "@material-ui/core";
import React from "react";
import KarteContainerData from "../../../model/styling/karte/props_data/KarteContainerData";
import { useStylingStyle } from "../style/UseStylingStyle";
import KarteContainerCallback from "./callback/KarteContainerCallback";
import { useKarteProvider } from "./provider/UseKarteProvider";

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
