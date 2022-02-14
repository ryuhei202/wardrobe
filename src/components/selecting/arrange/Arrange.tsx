import {
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Alert } from "@mui/material";
import React, { useContext } from "react";
import { AdviceChoiceResponse } from "../../../model/api/response/styling/arrange/AdviceChoiceResponse";
import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { AddedOutfitList } from "./AddedOutfitList";
import { ArrangeCallback } from "./callback/ArrangeCallback";
import { useArrangeHandler } from "./handler/UseArrageHandler";
import { OutfitForm } from "./OutfitForm";
import { useArrangeStyle } from "./style/UseArrangeStyle";
import { useArrangesCreateOutfits } from "../../../hooks/api/UseArrangesCreateOutfits";
import { ChartIdContext } from "../../context/provider/ContextProvider";

export interface ArrangeProps {
  data: ArrangeData;
  response: AdviceChoiceResponse;
  callback: ArrangeCallback;
}

export const Arrange = (props: ArrangeProps) => {
  const { state: chartId } = useContext(ChartIdContext);
  const classes = useArrangeStyle();
  const handler = useArrangeHandler(props.data.items, props.response);
  const { mutate, error, isLoading, isSuccess } = useArrangesCreateOutfits({
    outfits: handler.outfits,
    chartId: chartId!,
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
      <Snackbar open={error !== null || handler.upperLimitMessage !== null}>
        <Alert severity="error">
          {error?.message ?? ""}
          {handler.upperLimitMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={isSuccess} autoHideDuration={6000}>
        <Alert severity="success">
          着こなしアドバイスの登録を完了しました！
        </Alert>
      </Snackbar>
    </>
  );
};
