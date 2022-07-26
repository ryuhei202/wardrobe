import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

type TProps = {
  changed: boolean;
  onChange: (value: number | null) => void;
  value: number | null;
  adornment?: "cm" | "kg";
  className?: string;
  onKeyDownEnter?: () => void;
  style?: React.CSSProperties;
};

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
    <TextField
      size="small"
      className={classes()}
      style={{ maxWidth: "6rem", ...style }}
      onChange={handleChange}
      value={value ?? ""}
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" style={{ margin: 0 }}>
            {adornment ?? "cm"}
          </InputAdornment>
        ),
      }}
    />
  );
};
