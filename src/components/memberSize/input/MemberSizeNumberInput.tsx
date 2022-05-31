import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/styles";
import React, { ChangeEvent, ChangeEventHandler } from "react";

type TProps = {
  changed: boolean;
  value: number;
  onChange: (value: number) => void;
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

      "&::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
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
  value,
  onChange,
}: TProps) => {
  const classes = () => {
    return [changed ? "changed" : "", className].join(" ");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    const isNumber = (arg: any): arg is number => {
      return !Number.isNaN(Number(arg));
    };

    if (isNumber(v)) onChange(v);
  };

  return (
    <StyledTextField
      size="small"
      className={classes()}
      style={{ ...style }}
      onChange={handleChange}
      value={value}
      type="number"
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">{adornment ?? "cm"}</InputAdornment>
        ),
      }}
    />
  );
};
