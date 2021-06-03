import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { useGetKarteCaller } from "../../../../model/styling/karte/api_caller/UseGetKarteCaller";
import SelectedItem from "../../../../model/styling/SelectedItem";
import Karte from "../Karte";

export interface KarteProvider {
  karteComponent: () => JSX.Element;
}

export const useKarteProvider = (
  onKarteFetched: (
    isItemRegistered: boolean,
    registeredItems: SelectedItem[],
    rentableItemNum: number
  ) => void
): KarteProvider => {
  const apiCaller = useGetKarteCaller(onKarteFetched);

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

  return { karteComponent };
};
