import { Box, TextField } from "@mui/material";
import { StylingReferenceText } from "../../model/hearing/StylingReferenceText";
import { useHearingFormHandler } from "./handler/UseHearingFormHandler";

type Props = {
  readonly response: StylingReferenceText[];
};
export const HearingForm = (props: Props) => {
  const handler = useHearingFormHandler(props.response);
  return (
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
  );
};
