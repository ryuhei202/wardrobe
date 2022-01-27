import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useLatestStylingReferenceTextsUpdate } from "../../hooks/api/UseLatestStylingReferenceTextsUpdate";
import { SendButton } from "../shared/SendButton";
import { useHearingFormHandler } from "./handler/useHearingFormHandler";

type Props = {
  readonly category: { id: number; title: string };
  readonly initialText: string;
};
export const HearingForm = ({ category, initialText }: Props) => {
  const [referenceText, setReferenceText] = useState<string>(initialText);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutate, isLoading } = useLatestStylingReferenceTextsUpdate(
    category.id,
    referenceText
  );

  const {
    handleChangeText,
    handleCaller,
    handleKeyDown,
  } = useHearingFormHandler(
    initialText,
    setReferenceText,
    isEditing,
    setIsEditing,
    mutate,
    isLoading
  );
  return (
    <Box sx={{ m: 1, width: "600px", position: "relative" }}>
      <TextField
        key={category.id}
        id={`outlined-multiline-static-${category.id}`}
        label={category.title}
        multiline
        rows={8}
        defaultValue={initialText}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
        style={{ width: 600 }}
      />
      <SendButton
        onClick={handleCaller}
        disabled={!isEditing}
        style={{ position: "absolute", bottom: 18, left: 544 }}
      />
    </Box>
  );
};
