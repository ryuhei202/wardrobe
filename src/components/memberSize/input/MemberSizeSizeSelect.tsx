import { Select } from "@mui/material";
import React, { ReactNode } from "react";
import { SIZE_CHANGED_BG_COLOR } from "./SizeChangedBgColor";

type TProps = {
  changed: boolean;
  children: ReactNode;
  value: number;
  onChange: (value: number) => void;
  adornment?: "cm" | "kg";
  className?: string;
  style?: React.CSSProperties;
};

export const MemberSizeSizeSelect = ({
  changed,
  children,
  value,
  onChange,
  adornment,
  className,
  style,
}: TProps) => {
  const customStyle: React.CSSProperties = {
    backgroundColor: changed ? SIZE_CHANGED_BG_COLOR : "white",
    height: "2.2em",
  };

  return (
    <Select
      size="small"
      className={className}
      style={{ ...customStyle, ...style }}
      value={value}
      onChange={(e) => onChange(e.target.value as number)}
    >
      {children}
    </Select>
  );
};
