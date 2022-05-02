import { ArrowBack } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useCoordinatesBulkUpdate } from "../../../hooks/api/UseCoordinatesBulkUpdate";
import { CoordinateIndexResponse } from "../../../model/api/response/styling/coordinate/CoordinateIndexResponse";
import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { ChartIdContext } from "../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { AddedOutfitList } from "./AddedOutfitList";
import { ArrangeCallback } from "./callback/ArrangeCallback";
import { useArrangeHandler } from "./handler/UseArrageHandler";
import { OutfitForm } from "./OutfitForm";
import { useArrangeStyle } from "./style/UseArrangeStyle";

export interface ArrangeProps {
  data: ArrangeData;
  response: CoordinateIndexResponse;
  callback: ArrangeCallback;
}

export const Arrange = (props: ArrangeProps) => {
  const chartId = useContextDefinedState(ChartIdContext);
  const classes = useArrangeStyle();
  const handler = useArrangeHandler(props.data.items, props.response);
  const { mutate, isLoading, isSuccess } = useCoordinatesBulkUpdate({
    coordinates: handler.coordinates,
    chartId,
  });

  return (
    <>
      <IconButton
        onClick={() => props.callback.onClickBackButton()}
        size="large"
      >
        <ArrowBack />
      </IconButton>
      <br />
      <Typography display="inline" variant="h6" paragraph>
        着こなしアドバイス
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.completeButton}
        onClick={() =>
          mutate(undefined, {
            onSuccess: () => {
              handler.onPostComplete();
            },
          })
        }
      >
        登録を完了する
      </Button>
      <AddedOutfitList
        data={handler.addedOutfitListData()}
        callback={handler.addedOutfitListCallback()}
      />
      {handler.editingOutfitIndex >= 0 ? (
        <OutfitForm
          data={handler.outfitFormData()}
          response={props.response.adviceCategories}
          callback={handler.outfitFormCallback()}
        />
      ) : (
        <></>
      )}
      <Dialog open={isLoading} disableEscapeKeyDown>
        <CircularProgress />
      </Dialog>
      <Snackbar open={isSuccess} autoHideDuration={6000}>
        <Alert severity="success">
          着こなしアドバイスの登録を完了しました！
        </Alert>
      </Snackbar>
    </>
  );
};
