import { Box, TextField } from "@mui/material";
import { ItemFeedbackShowResponse } from "../../model/api/response/styling/itemFeedback/ItemFeedbackShowResponse";
import { useFeedbackFormStyle } from "./style/UseFeedbackFormStyle";

type Props = {
  readonly data: ItemFeedbackShowResponse;
};
export const FeedbackForm = (props: Props) => {
  const classes = useFeedbackFormStyle();
  return (
    <Box sx={{ m: 1, width: "600px" }}>
      <img src={props.data.imagePath.large} className={classes.itemImage} />
      <TextField
        style={{ width: "445px" }}
        key={props.data.chartItemId}
        fullWidth
        id="outlined-multiline-static"
        multiline
        rows={8}
        defaultValue={"テスト"}
      />
    </Box>
  );
};
