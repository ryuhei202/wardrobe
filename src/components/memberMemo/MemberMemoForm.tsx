import { Box, TextField } from "@mui/material";
import React from "react";
import { SendButton } from "../shared/SendButton";

type Props = {
  readonly value: string;
  readonly disabled: boolean;
  readonly onChange: (text: string) => void;
  readonly onPost: () => void;
  readonly label?: string;
};

export const MemberMemoForm = ({
  label,
  value,
  disabled,
  onChange,
  onPost,
}: Props) => {
  return (
    <Box sx={{ my: 1, position: "relative" }}>
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
        style={{ width: "100%" }}
        inputProps={{ style: { fontSize: ".8rem" } }}
      />
      <SendButton
        onClick={onPost}
        disabled={disabled}
        style={{ position: "absolute", bottom: 16, right: 16 }}
      />
    </Box>
  );
};
