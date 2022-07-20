import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/styles";
import React, { ChangeEvent } from "react";
import { SIZE_CHANGED_BG_COLOR } from "./SizeChangedBgColor";

type TProps = {
  changed: boolean;
  onChange: (value: number | null) => void;
  value: number | null;
  adornment?: "cm" | "kg";
  className?: string;
  onKeyDownEnter?: () => void;
  style?: React.CSSProperties;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    paddingRight: theme.spacing(1),

    "& .MuiInputBase-input": {
      height: "0.6em",

      "&::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  },
  "&.changed .MuiInputBase-root": {
    backgroundColor: SIZE_CHANGED_BG_COLOR,
  },
}));

export const MemberSizeNumberInput = ({
  changed,
  adornment,
  className,
  style,
  value,
  onChange,
  onKeyDownEnter,
}: TProps) => {
  const classes = () => {
    return [changed ? "changed" : "", className].join(" ");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") return onChange(null);

    const isNumber = (arg: any): arg is number => {
      return !Number.isNaN(arg);
    };

    if (isNumber(Number(v))) onChange(Number(v));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") onKeyDownEnter?.();
  };

  return (
    <StyledTextField
      size="small"
      className={classes()}
      style={{ maxWidth: "6rem", ...style }}
      onChange={handleChange}
      value={value ?? ""}
      type="number"
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{adornment ?? "cm"}</InputAdornment>
        ),
      }}
    />
  );
};
