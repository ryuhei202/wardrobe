import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import { Member } from "./Member";

export const IsMarriagePlanContext = React.createContext<boolean | undefined>(
  undefined
);

export const MemberContainer = () => {
  const { data, error } = useMembersShow();

  if (!data) return <CircularProgress />;
  if (error) return <Typography>{error.message}</Typography>;
  return (
    <IsMarriagePlanContext.Provider value={data.isMarriagePlan}>
      <Member response={data} />
    </IsMarriagePlanContext.Provider>
  );
};
