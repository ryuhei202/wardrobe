import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useReviewsUpdate } from "../../hooks/api/UseReviewsUpdate";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";
import { SendButton } from "../shared/SendButton";
import { SelectedReviewFormCallback } from "./callback/SelectedReviewFormCallback";
import { useLineMessageUrlHandler } from "./handler/UseLineMessageUrlHandler";

type TProps = {
  readonly callback: SelectedReviewFormCallback;
  readonly lineMessageUrl?: string | null;
  readonly coordinateId: number;
  readonly setIsUrlEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
export const LineMessageUrlForm = ({
  callback,
  lineMessageUrl,
  coordinateId,
  setIsUrlEditing,
}: TProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [lineMessageUrlText, setLineMessageUrlText] = useState<string>(
    lineMessageUrl ?? ""
  );
  const { mutate, isLoading } = useReviewsUpdate({
    coordinateId,
    lineMessageUrl: lineMessageUrlText,
  });
  const { handleChangeText, handleCaller, handleKeyDown } =
    useLineMessageUrlHandler({
      setLineMessageUrlText,
      isEditing,
      setIsEditing,
      setIsUrlEditing,
      mutate,
      isLoading,
      callback,
      coordinateId,
      prevLineMessageUrl: lineMessageUrl,
    });

  useEffect(() => {
    alertClosedWindow(isEditing);
  }, [isEditing]);

  return (
    <Box sx={{ m: 1, width: "100%", position: "relative" }}>
      <TextField
        style={{ width: "100%", position: "relative" }}
        id={`line-message-url-form-${coordinateId}`}
        defaultValue={lineMessageUrlText}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
      />
      <SendButton
        onClick={handleCaller}
        disabled={!isEditing}
        style={{ position: "absolute", bottom: 8, left: 430 }}
      />
    </Box>
  );
};
