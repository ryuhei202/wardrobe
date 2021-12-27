import qs from "qs";
import React from "react";

export const MemberIdContext = React.createContext(
  Number(qs.parse(window.location.search.substring(1)).memberId) ?? 0
);
