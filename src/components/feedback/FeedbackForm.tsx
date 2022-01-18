import { Box, TextField } from "@mui/material";
import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { useFeedbackFormHandler } from "./handler/UseFeedbackFormHandler";
import { useFeedbackFormStyle } from "./style/UseFeedbackFormStyle";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { useItemFeedbacksUpdate } from "../../hooks/api/UseItemFeedbacksUpdate";
import { FeedbackFormCallback } from "./callback/FeedbackFormCallback";

type Props = {
  readonly data: ItemFeedbackShowResponse;
  readonly callback: FeedbackFormCallback;
};
export const FeedbackForm = (props: Props) => {
  const classes = useFeedbackFormStyle();
  const handler = useFeedbackFormHandler(props.data);
  const { mutateAsync } = useItemFeedbacksUpdate(
    props.data.chartItemId,
    handler.textFeedback
  );

  useEffect(() => {
    window.document.onkeydown = async (event) => {
      if (event.altKey && event.key === "Enter") {
        try {
          await mutateAsync();
          handler.onSuccessUpdate(true);
          props.callback.onSuccess();
        } catch (error) {
          handler.onSuccessUpdate(false);
          props.callback.onFailure();
        }
      }
    };
  });

  useEffect(() => {
    handler.isEditing
      ? window.addEventListener("beforeunload", handler.onUnload)
      : window.removeEventListener("beforeunload", handler.onUnload);
    return () => {
      // アンマウント時にタブを閉じる時のアラートをするイベントを削除する。
      window.removeEventListener("beforeunload", handler.onUnload);
    };
  }, [handler.isEditing, handler.onUnload]);

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
        onChange={(event) => handler.changeText(event)}
      />
      {handler.isEditing && <EditIcon className={classes.editIcon} />}
    </Box>
  );
};
