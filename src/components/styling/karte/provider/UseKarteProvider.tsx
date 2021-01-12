import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { useGetKarteCaller } from "../../../../model/styling/karte/api_caller/UseGetKarteCaller";
import SelectionProgress from "../../SelectionProgress";
import Karte from "../Karte";
import { KarteContainerProps } from "../KarteContainer";

export interface KarteProvider {
  karteComponent: () => JSX.Element;
  selectionProgressComponent: (props: KarteContainerProps) => JSX.Element;
}

export const useKarteProvider = (): KarteProvider => {
  const apiCaller = useGetKarteCaller();

  const karteComponent = (): JSX.Element => {
    if (apiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (apiCaller.errorResponse !== null) {
      return <Typography>{apiCaller.errorResponse.message}</Typography>;
    } else if (apiCaller.response !== null) {
      return <Karte response={apiCaller.response} />;
    } else {
      return <></>;
    }
  };

  const selectionProgressComponent = (
    props: KarteContainerProps
  ): JSX.Element => {
    if (apiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (apiCaller.errorResponse !== null) {
      return <Typography>{apiCaller.errorResponse.message}</Typography>;
    } else if (apiCaller.response !== null) {
      return (
        <SelectionProgress
          response={apiCaller.response}
          data={props.data}
          callback={props.callback}
        />
      );
    } else {
      return <></>;
    }
  };

  return { karteComponent, selectionProgressComponent };
};
