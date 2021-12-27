import qs from "qs";
import React from "react";

export const ChartIdContext = React.createContext(
  Number(qs.parse(window.location.search.substring(1)).chartId) ?? 0
);
