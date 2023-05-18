import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useMemberSizesSizeChoice } from "../../hooks/api/UseMemberSizesSizeChoice";
import { useSizesShow } from "../../hooks/api/UseSizesShow";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import {
  MemberIdContext,
  MemberShowContext,
} from "../context/provider/ContextProvider";

import { MemberSizeContainer } from "./MemberSizeContainer";

type TProps = {
  style?: React.CSSProperties;
};

export const MemberSizeFetcher = ({ style }: TProps) => {
  const memberId = useContextDefinedState(MemberIdContext);
  const memberShow = useContextDefinedState(MemberShowContext);
  const { data: memberSizeResponse, error: memberSizeError } = useSizesShow({
    memberId,
  });
  const { data: sizeChoiceResponse, error: sizeChoiceError } =
    useMemberSizesSizeChoice({ memberId });

  if (memberSizeError || sizeChoiceError || memberShow.error)
    return (
      <Typography>
        {memberSizeError?.message || sizeChoiceError?.message}
      </Typography>
    );

  if (!(memberSizeResponse && sizeChoiceResponse && memberShow.data))
    return <CircularProgress />;

  return (
    <MemberSizeContainer
      style={style}
      memberSizeResponse={memberSizeResponse}
      sizeChoiceResponse={sizeChoiceResponse}
      aboutSize={memberShow.data.aboutSize}
    />
  );
};
