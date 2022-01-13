import qs from "qs";

export const ChartId = (): number => {
  const id = qs.parse(window.location.search.substring(1)).chartId;
  if (typeof id === "string") return parseInt(id);
  return 0;
};
