import { TextField } from "@mui/material";
import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";

type Props = {
  readonly data: ItemFeedbackShowResponse;
};
export const FeedbackForm = (props: Props) => {
  return (
    // TODO: 別タスクで実装
    <TextField
      key={props.data.chartItemId}
      fullWidth
      id="outlined-multiline-static"
      multiline
      rows={8}
      defaultValue={"テスト"}
    />
  );
};
