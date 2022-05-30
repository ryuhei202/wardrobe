import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

type TProps = {
  changed: boolean;
  adornment?: "cm" | "kg";
  className?: string;
  style?: React.CSSProperties;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",

    "& .MuiInputBase-input": {
      height: "1.1em",
    },
  },
  "&.changed .MuiInputBase-root": {
    backgroundColor: "rgb(255 213 223)",
  },
}));

export const MemberSizeNumberInput = ({
  changed,
  adornment,
  className,
  style,
}: TProps) => {
  const classes = () => {
    return [changed ? "changed" : "", className].join(" ");
  };

  return (
    <StyledTextField
      size="small"
      className={classes()}
      style={{ ...style }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">{adornment ?? "cm"}</InputAdornment>
        ),
      }}
    />
  );
};
