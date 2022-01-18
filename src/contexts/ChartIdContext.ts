import qs from "qs";
import React from "react";

export const ChartIdContext = React.createContext(
  isNaN(Number(qs.parse(window.location.search.substring(1)).chartId))
    ? 0
    : Number(qs.parse(window.location.search.substring(1)).chartId)
);