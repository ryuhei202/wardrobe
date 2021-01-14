import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { useGetKarteCaller } from "../../../../model/styling/karte/api_caller/UseGetKarteCaller";
import SelectedItem from "../../../../model/styling/SelectedItem";
import SelectionProgressCallback from "../../callback/SelectionProgressCallback";
import SelectionProgress from "../../SelectionProgress";
import Karte from "../Karte";

export interface KarteProvider {
  karteComponent: () => JSX.Element;
  selectionProgressComponent: (
    selectedIndex: number,
    items: SelectedItem[],
    callback: SelectionProgressCallback
  ) => JSX.Element;
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
    selectedIndex: number,
    items: SelectedItem[],
    callback: SelectionProgressCallback
  ): JSX.Element => {
    if (apiCaller.isRunning()) {
      return <CircularProgress />;
    } else if (apiCaller.errorResponse !== null) {
      return <Typography>{apiCaller.errorResponse.message}</Typography>;
    } else if (apiCaller.response !== null) {
      return (
        <SelectionProgress
          data={{
            selectedIndex: selectedIndex,
            items: items,
            rentableItemNum: apiCaller.response.rentableItemNum,
          }}
          callback={callback}
        />
      );
    } else {
      return <></>;
    }
  };

  return { karteComponent, selectionProgressComponent };
};
