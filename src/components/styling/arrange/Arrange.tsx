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
import React from "react";
import { AdviceChoiceResponse } from "../../../model/api/response/styling/arrange/AdviceChoiceResponse";
import { ArrangeData } from "../../../model/styling/arrange/props_data/ArrangeData";
import { AddedOutfitList } from "./AddedOutfitList";
import { ArrangeCallback } from "./callback/ArrangeCallback";
import { useArrangeHandler } from "./handler/UseArrageHandler";
import { OutfitForm } from "./OutfitForm";
import { useArrangeStyle } from "./style/UseArrangeStyle";

export interface ArrangeProps {
  data: ArrangeData;
  response: AdviceChoiceResponse;
  callback: ArrangeCallback;
}

export const Arrange = (props: ArrangeProps) => {
  const classes = useArrangeStyle();
  const handler = useArrangeHandler(props.data.items, props.response);

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
        onClick={() => handler.onClickComplete()}
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
      <Dialog
        open={handler.createOutfitCaller.isRunning()}
        disableEscapeKeyDown
      >
        <CircularProgress />
      </Dialog>
      <Snackbar
        open={
          handler.createOutfitCaller.errorResponse !== null ||
          handler.frontErrorMessage !== null
        }
      >
        <Alert severity="error">
          {handler.createOutfitCaller.errorResponse?.message ?? ""}
          {handler.frontErrorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={handler.createOutfitCaller.response !== null}
        autoHideDuration={6000}
      >
        <Alert severity="success">
          着こなしアドバイスの登録を完了しました！
        </Alert>
      </Snackbar>
    </>
  );
};
