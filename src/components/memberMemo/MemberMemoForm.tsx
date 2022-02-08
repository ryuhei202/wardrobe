import { Box, TextField } from "@mui/material";
import React from "react";
import { SendButton } from "../shared/SendButton";

type Props = {
  readonly label: string;
  readonly value: string;
  readonly disabled: boolean;
  readonly onChange: (text: string) => void;
  readonly onPost: () => void;
};

export const MemberMemoForm = ({
  label,
  value,
  disabled,
  onChange,
  onPost,
}: Props) => {
  return (
    <Box sx={{ m: 1, width: "600px", position: "relative" }}>
      <TextField
        label={label}
        multiline
        rows={8}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.altKey && event.key === "Enter" && !disabled) {
            onPost();
          }
        }}
        style={{ width: 600 }}
      />
      <SendButton
        onClick={onPost}
        disabled={disabled}
        style={{ position: "absolute", bottom: 18, left: 544 }}
      />
    </Box>
  );
};
