import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import SelectionConfirmData from "../../model/styling/props_data/SelectionConfirmData";
import SelectionConfirmCallback from "./callback/SelectionConfirmCallback";
import FeedbackDialog from "./feedback/FeedbackDialog";
import SelectedItemArray from "./SelectedItemArray";
import { useStylingStyle } from "./style/UseStylingStyle";

export interface SelectionConfirmProps {
  data: SelectionConfirmData;
  callback: SelectionConfirmCallback;
}

const SelectionConfirm = (props: SelectionConfirmProps) => {
  const classes = useStylingStyle();
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  return (
    <>
      <Typography variant="h6" noWrap>
        選択コーデ確認画面
      </Typography>
      <SelectedItemArray data={props.data.items}></SelectedItemArray>
      <Button
        variant="contained"
        color="default"
        className={classes.changeButton}
        onClick={() => setIsFeedbackDialogOpen(true)}
      >
        アイテムを変更する
      </Button>
      <FeedbackDialog
        data={{
          isOpen: isFeedbackDialogOpen,
          itemIds: props.data.items.map((item) => item.itemId),
        }}
        callback={{
          onClose: () => setIsFeedbackDialogOpen(false),
          onPostComplete: props.callback.onCancelSelection,
        }}
      />
    </>
  );
};

export default SelectionConfirm;
