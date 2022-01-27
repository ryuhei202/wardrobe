import { Box, Button, TextField } from "@mui/material";
import { useLatestStylingReferenceTextsUpdate } from "../../hooks/api/UseLatestStylingReferenceTextsUpdate";
import { StylingReferenceText } from "../../model/hearing/StylingReferenceText";
import { useHearingFormHandler } from "./handler/UseHearingFormHandler";
import { useHearingFormStyle } from "./style/UseHearingFormStyle";

type Props = {
  readonly response: StylingReferenceText[];
};
export const HearingForm = (props: Props) => {
  const classes = useHearingFormStyle();
  const handler = useHearingFormHandler(props.response);
  const { mutate, isLoading } = useLatestStylingReferenceTextsUpdate(
    handler.referenceTexts
  );
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.completeButton}
        onClick={() => mutate()}
        disabled={isLoading}
      >
        ヒアリングを保存する
      </Button>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "600px" },
        }}
        noValidate
        autoComplete="off"
      >
        {handler.ACTIVE_CATEGORIES.map((category) => (
          <TextField
            key={category.id}
            fullWidth
            id="outlined-multiline-static"
            label={category.title}
            multiline
            rows={8}
            defaultValue={
              handler.referenceTexts.find(
                (referenceText) => referenceText.categoryId === category.id
              )?.text
            }
            onChange={(event) => handler.changeText(event, category.id)}
          />
        ))}
      </Box>
    </>
  );
};
