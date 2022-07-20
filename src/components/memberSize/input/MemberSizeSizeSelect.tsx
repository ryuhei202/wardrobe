import { MenuItem, Select } from "@mui/material";
import React from "react";
import { SIZE_CHANGED_BG_COLOR } from "./SizeChangedBgColor";

type TProps = {
  changed: boolean;
  value: number;
  options: { id: number; name: string }[];
  onChange: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

export const MemberSizeSizeSelect = ({
  changed,
  options,
  value,
  onChange,
  className,
  style,
}: TProps) => {
  const customStyle: React.CSSProperties = {
    backgroundColor: changed ? SIZE_CHANGED_BG_COLOR : "white",
    height: "1.6em",
  };

  return (
    <Select
      size="small"
      className={className}
      style={{ ...customStyle, ...style }}
      value={value}
      onChange={(e) => onChange(e.target.value as number)}
    >
      {options.map((option) => {
        return (
          <MenuItem value={option.id} key={option.id}>
            {option.name}
          </MenuItem>
        );
      })}
    </Select>
  );
};
