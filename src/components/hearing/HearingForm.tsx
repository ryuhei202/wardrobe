import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLatestStylingReferenceTextUpdate } from "../../hooks/api/UseLatestStylingReferenceTextUpdate";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";
import { SendButton } from "../shared/SendButton";
import { HearingFormCallback } from "./callback/HearingFormCallback";
import { useHearingFormHandler } from "./handler/useHearingFormHandler";

type Props = {
  readonly category: { id: number; title: string };
  readonly callback: HearingFormCallback;
  readonly initialText: string;
};
export const HearingForm = ({ category, callback, initialText }: Props) => {
  const [referenceText, setReferenceText] = useState<string>(initialText);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutate, isLoading } = useLatestStylingReferenceTextUpdate(
    category.id,
    referenceText
  );

  const {
    handleChangeText,
    handleCaller,
    handleKeyDown,
  } = useHearingFormHandler(
    callback,
    initialText,
    setReferenceText,
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
