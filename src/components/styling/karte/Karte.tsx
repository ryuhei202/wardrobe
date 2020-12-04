import { CircularProgress, Divider, Typography } from "@material-ui/core";
import React from "react";
import { useKarteStyle } from "./style/UseKarteStyle";
import Basic from "./Basic";
import Memo from "./Memo";
import Size from "./Size";
import { useGetKarteCaller } from "../../../model/styling/karte/api_caller/UseGetKarteCaller";

const Karte = () => {
  const classes = useKarteStyle();
  const apiCaller = useGetKarteCaller();

  if (apiCaller.isRunning()) {
    return <CircularProgress />;
  } else if (apiCaller.errorResponse !== null) {
    console.log("Error");
    console.log(apiCaller.errorResponse);
    return <Typography>{apiCaller.errorResponse.message}</Typography>;
  } else if (apiCaller.response !== null) {
    console.log("Success");
    console.log(apiCaller.response);
    return (
      <>
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            コーデ作成情報
          </Typography>
        </div>
        <Divider />
        <div className={classes.drawerContainer}>
          <Basic data={apiCaller.response.basic} />
          <Size data={apiCaller.response.size} />
          <Memo data={apiCaller.response.memo} />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Karte;
