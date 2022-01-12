import qs from "qs";
import React from "react";

export const MemberIdContext = React.createContext(
  isNaN(Number(qs.parse(window.location.search.substring(1)).memberId))
    ? 0
    : Number(qs.parse(window.location.search.substring(1)).memberId)
);
