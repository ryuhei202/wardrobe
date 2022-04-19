import { Box, TextField } from "@mui/material";
import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { useFeedbackFormHandler } from "./handler/UseFeedbackFormHandler";
import { useFeedbackFormStyle } from "./style/UseFeedbackFormStyle";
import { useEffect, useState } from "react";
import { useItemFeedbacksUpdate } from "../../hooks/api/UseItemFeedbacksUpdate";
import { FeedbackFormCallback } from "./callback/FeedbackFormCallback";
import { SendButton } from "../shared/SendButton";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";

type Props = {
  readonly data: ItemFeedbackShowResponse;
  readonly callback: FeedbackFormCallback;
};
export const FeedbackForm = (props: Props) => {
  const [textFeedback, setTextFeedback] = useState<string>(
    props.data.textFeedback
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const classes = useFeedbackFormStyle();
  const { mutate, isLoading } = useItemFeedbacksUpdate(
    props.data.chartItemId,
    textFeedback
  );
  const { handleChangeText, handleCaller, handleKeyDown } =
    useFeedbackFormHandler(
      props.data,
      props.callback,
      setTextFeedback,
      isEditing,
      setIsEditing,
      mutate,
      isLoading
    );

  useEffect(() => {
    alertClosedWindow(isEditing);
  }, [isEditing]);

  return (
    <Box sx={{ m: 1, width: "600px", position: "relative" }}>
      <img
        src={props.data.imagePath.large}
        className={classes.itemImage}
        alt=""
      />
      <TextField
        className={classes.feedbackTextField}
        id={`outlined-multiline-static-${props.data.chartItemId}`}
        multiline
        rows={8}
        defaultValue={props.data.textFeedback}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
      />
      <SendButton
        onClick={handleCaller}
        disabled={!isEditing}
        style={{ position: "absolute", bottom: 18, left: 544 }}
      />
    </Box>
  );
};
