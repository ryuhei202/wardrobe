import { Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import SelectionProgressData from "../../../model/styling/props_data/SelectionProgressData";
import SelectionProgressCallback from "../callback/SelectionProgressCallback";
import { useStylingStyle } from "../style/UseStylingStyle";
import { useKarteProvider } from "./provider/UseKarteProvider";

export interface KarteContainerProps {
  data: SelectionProgressData;
  callback: SelectionProgressCallback;
}

const KarteContainer = (props: KarteContainerProps) => {
  const classes = useStylingStyle();
  const karteProvider = useKarteProvider();

  return (
    <>
      <div className={classes.karteContainer}>
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            コーデ作成情報
          </Typography>
        </div>
        <Divider />
        {karteProvider.karteComponent()}
      </div>
      <Paper variant="outlined" className={classes.progressContainer}>
        {karteProvider.selectionProgressComponent(props)}
      </Paper>
    </>
  );
};

export default KarteContainer;
